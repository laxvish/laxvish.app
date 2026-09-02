import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

// Content-Security-Policy Directives:
// - default-src 'self': Restrict default resource loading to same origin.
// - script-src:
//   - 'self': Allow same-origin scripts.
//   - 'unsafe-inline': Accepted risk — required by Next.js App Router for inline bootstrap and hydration scripts. (Nonce migration deferred to future pass).
//   - 'unsafe-eval': Included only in development (process.env.NODE_ENV !== "production") for source maps and build tooling; omitted in production to prevent runtime code injection.
//   - Removed 'https://static.cloudflareinsights.com' (stale Cloudflare Insights relic on Vercel deployment; dead attack surface).
// - style-src 'self' 'unsafe-inline': Allow same-origin styles and inline style attributes for Tailwind / UI animations.
// - img-src 'self' data: https:: Allow same-origin, inline data URIs, and HTTPS images.
// - font-src 'self' data: https://fonts.gstatic.com: Allow same-origin fonts, inline data fonts, and Google Fonts CDN assets.
// - connect-src 'self': Allow same-origin XHR/fetch (/api/lead-capture). Removed wildcard 'https://*.vercel.app' to eliminate cross-origin exfiltration surface.
// - frame-ancestors 'none': Prevent clickjacking by forbidding embedding in frames.
const scriptSrc = isProduction
  ? "script-src 'self' 'unsafe-inline'"
  : "script-src 'self' 'unsafe-inline' 'unsafe-eval'";

const cspDirectives = [
  "default-src 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self'",
  "frame-ancestors 'none'",
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspDirectives.join("; "),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Note: X-XSS-Protection header is deliberately removed. It is deprecated across modern browsers
          // and can introduce client-side side-channel vulnerabilities; protection is enforced via CSP.
        ],
      },
    ];
  },
};

export default nextConfig;
