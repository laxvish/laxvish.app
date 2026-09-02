/**
 * Rate limiting for the public lead-capture endpoint.
 *
 * Two properties drive every decision here:
 *
 * 1. AVAILABILITY OVER STRICTNESS. This endpoint is the company's only lead
 *    funnel. A limiter that misfires turns away paying prospects, which is far
 *    worse than a limiter that is slightly permissive. Every failure path in
 *    this module FAILS OPEN.
 *
 * 2. SHARED STATE. The previous implementation kept counters in module-level
 *    Maps. On serverless each instance has its own memory, so limits reset on
 *    cold start and scale horizontally — trivially bypassed. When a Redis-
 *    compatible URL is configured we use it; otherwise we fall back to a
 *    bounded in-memory store, which is correct for the documented single-
 *    instance `npm start` deployment.
 *
 * No third-party client library is used: the Upstash HTTP API is reached with
 * global fetch, so this adds zero dependencies.
 */

export interface RateLimitDecision {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds: number;
}

export interface RateLimitStore {
  /** Atomically count one hit for `key` in the current fixed window. */
  hit(key: string, limit: number, windowSeconds: number): Promise<RateLimitDecision>;
}

const ALLOWED = (limit: number): RateLimitDecision => ({
  allowed: true,
  limit,
  remaining: limit,
  retryAfterSeconds: 0,
});

/* -------------------------------------------------------------------------- */
/* In-memory store (single instance / local development)                      */
/* -------------------------------------------------------------------------- */

interface Bucket {
  count: number;
  resetAt: number;
}

/**
 * Bounded so a long-lived `npm start` process cannot leak memory. The previous
 * implementation never evicted entries at all.
 */
export class InMemoryRateLimitStore implements RateLimitStore {
  private readonly buckets: Map<string, Bucket> = new Map();
  private readonly maxKeys: number;

  // Explicit field assignment rather than constructor parameter properties:
  // `node --experimental-strip-types` erases types but cannot *transform*
  // parameter properties, so they break the test runner.
  constructor(maxKeys: number = 10_000) {
    this.maxKeys = maxKeys;
  }

  async hit(key: string, limit: number, windowSeconds: number): Promise<RateLimitDecision> {
    const now = Date.now();
    this.evictExpired(now);

    const existing = this.buckets.get(key);
    if (!existing || existing.resetAt <= now) {
      // Guard against unbounded growth under key churn (e.g. spoofed IPs).
      if (this.buckets.size >= this.maxKeys) {
        const oldest = this.buckets.keys().next().value;
        if (oldest !== undefined) {
          this.buckets.delete(oldest);
        }
      }
      this.buckets.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
      return { allowed: true, limit, remaining: limit - 1, retryAfterSeconds: 0 };
    }

    if (existing.count >= limit) {
      return {
        allowed: false,
        limit,
        remaining: 0,
        retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
      };
    }

    existing.count += 1;
    return {
      allowed: true,
      limit,
      remaining: Math.max(0, limit - existing.count),
      retryAfterSeconds: 0,
    };
  }

  private evictExpired(now: number): void {
    for (const [key, bucket] of this.buckets) {
      if (bucket.resetAt <= now) {
        this.buckets.delete(key);
      }
    }
  }

  /** Test seam. */
  get size(): number {
    return this.buckets.size;
  }
}

/* -------------------------------------------------------------------------- */
/* Redis-compatible store over HTTP (Upstash REST), dependency-free           */
/* -------------------------------------------------------------------------- */

export class HttpRedisRateLimitStore implements RateLimitStore {
  private readonly url: string;
  private readonly token: string;
  private readonly timeoutMs: number;

  constructor(url: string, token: string, timeoutMs: number = 200) {
    this.url = url;
    this.token = token;
    this.timeoutMs = timeoutMs;
  }

  async hit(key: string, limit: number, windowSeconds: number): Promise<RateLimitDecision> {
    // Fixed window: the bucket index is part of the key, so the window rotates
    // on its own and EXPIRE can never slide the deadline forwards.
    const bucket = Math.floor(Date.now() / (windowSeconds * 1000));
    const scopedKey = `rl:${key}:${bucket}`;

    try {
      const response = await fetch(this.url, {
        method: "POST",
        headers: {
          authorization: `Bearer ${this.token}`,
          "content-type": "application/json",
        },
        // Pipeline INCR + EXPIRE so a key always carries a TTL, even if the
        // process dies between commands.
        body: JSON.stringify([
          ["INCR", scopedKey],
          ["EXPIRE", scopedKey, String(windowSeconds)],
        ]),
        signal: AbortSignal.timeout(this.timeoutMs),
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`redis rest responded ${response.status}`);
      }

      const parsed = (await response.json()) as unknown;
      const first = Array.isArray(parsed) ? parsed[0] : parsed;
      const count = typeof first === "number" ? first : Number(first);

      if (!Number.isFinite(count)) {
        throw new Error("redis rest returned a non-numeric counter");
      }

      return {
        allowed: count <= limit,
        limit,
        remaining: Math.max(0, limit - count),
        retryAfterSeconds: count <= limit ? 0 : windowSeconds,
      };
    } catch (error) {
      // FAIL OPEN: an unreachable or slow cache must not block a lead.
      console.warn("[rate-limit] redis store unavailable, failing open", {
        message: error instanceof Error ? error.message : "unknown",
      });
      return ALLOWED(limit);
    }
  }
}

/* -------------------------------------------------------------------------- */
/* Wiring                                                                     */
/* -------------------------------------------------------------------------- */

let cachedStore: RateLimitStore | null = null;

export function getRateLimitStore(): RateLimitStore {
  const existing = cachedStore;
  if (existing) {
    return existing;
  }

  const url = process.env.RATELIMIT_REDIS_URL?.trim();
  const token = process.env.RATELIMIT_REDIS_TOKEN?.trim();

  const store: RateLimitStore =
    url && token ? new HttpRedisRateLimitStore(url, token) : new InMemoryRateLimitStore();

  if (!url || !token) {
    console.warn(
      "[rate-limit] using in-memory store; limits are per-instance. " +
        "Set RATELIMIT_REDIS_URL and RATELIMIT_REDIS_TOKEN for serverless deployments.",
    );
  }

  cachedStore = store;
  return store;
}

/** For tests. */
export function resetRateLimitStore(): void {
  cachedStore = null;
}

/* -------------------------------------------------------------------------- */
/* Client identification                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Extract the caller's address across the proxies this app actually sits
 * behind. The previous implementation checked only Vercel and Cloudflare
 * headers and otherwise collapsed *every* visitor into one shared "anonymous"
 * bucket — which on the documented self-hosted path meant real prospects were
 * rate-limited against each other.
 */
export function getClientIp(headers: Headers): string | null {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    // X-Forwarded-For is "client, proxy1, proxy2"; the first entry is the
    // original caller.
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }

  const single =
    headers.get("x-vercel-forwarded-for") ??
    headers.get("cf-connecting-ip") ??
    headers.get("x-real-ip") ??
    headers.get("x-forwarded-ip");

  const trimmed = single?.trim();
  return trimmed ? trimmed : null;
}

/**
 * Returns a bucket key. `null` means "we could not identify the caller"; the
 * caller must then apply a deliberately generous shared limit rather than
 * locking everyone out.
 */
export function getRequesterKey(headers: Headers): { key: string; identified: boolean } {
  const ip = getClientIp(headers);
  if (ip) {
    return { key: ip, identified: true };
  }
  return { key: "unidentified", identified: false };
}
