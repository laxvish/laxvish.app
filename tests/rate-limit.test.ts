import assert from "node:assert/strict";
import { test } from "node:test";

import {
  InMemoryRateLimitStore,
  getClientIp,
  getRequesterKey,
} from "../lib/rate-limit.ts";

function headers(init: Record<string, string>): Headers {
  return new Headers(init);
}

test("getClientIp prefers the first x-forwarded-for entry", () => {
  const ip = getClientIp(
    headers({ "x-forwarded-for": " 203.0.113.7 , 70.41.3.18, 150.172.238.178" }),
  );
  assert.equal(ip, "203.0.113.7");
});

test("getClientIp falls back through vercel, cloudflare and x-real-ip", () => {
  assert.equal(getClientIp(headers({ "x-vercel-forwarded-for": "198.51.100.4" })), "198.51.100.4");
  assert.equal(getClientIp(headers({ "cf-connecting-ip": "198.51.100.5" })), "198.51.100.5");
  assert.equal(getClientIp(headers({ "x-real-ip": "198.51.100.6" })), "198.51.100.6");
});

test("distinct clients get distinct buckets (regression: shared 'anonymous' bucket)", () => {
  const a = getRequesterKey(headers({ "x-forwarded-for": "203.0.113.1" }));
  const b = getRequesterKey(headers({ "x-forwarded-for": "203.0.113.2" }));

  assert.equal(a.identified, true);
  assert.equal(b.identified, true);
  assert.notEqual(a.key, b.key);
});

test("an unidentified caller is flagged rather than silently collapsed", () => {
  const result = getRequesterKey(headers({}));
  assert.equal(result.identified, false);
  assert.equal(result.key, "unidentified");
});

test("in-memory store blocks once the limit is reached", async () => {
  const store = new InMemoryRateLimitStore();
  const decisions: boolean[] = [];
  for (let i = 0; i < 5; i += 1) {
    const d = await store.hit("ip:10.0.0.1", 3, 60);
    decisions.push(d.allowed);
  }
  assert.deepEqual(decisions, [true, true, true, false, false]);
});

test("in-memory store evicts a window after it expires", async () => {
  // windowSeconds is floored to at least 1s by the retry-after guard, so use a
  // tiny window and advance past it.
  const store = new InMemoryRateLimitStore();
  await store.hit("ip:10.0.0.2", 1, 1);
  const blocked = await store.hit("ip:10.0.0.2", 1, 1);
  assert.equal(blocked.allowed, false);

  await new Promise((resolve) => setTimeout(resolve, 1100));
  const afterWindow = await store.hit("ip:10.0.0.2", 1, 1);
  assert.equal(afterWindow.allowed, true, "window should have reset");
});

test("in-memory store is bounded and cannot grow without limit", async () => {
  const store = new InMemoryRateLimitStore(50);
  for (let i = 0; i < 500; i += 1) {
    await store.hit(`ip:10.0.${i >> 8}.${i & 0xff}`, 10, 60);
  }
  assert.ok(store.size <= 50, `expected <= 50 keys, got ${store.size}`);
});
