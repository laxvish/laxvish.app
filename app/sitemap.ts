import type { MetadataRoute } from "next";
import { USE_CASES } from "@/lib/use-cases";
import { getSiteUrl } from "@/lib/seo";

/**
 * Generated from the same data the router renders from, so the sitemap cannot
 * drift from the site again. The previous hand-maintained public/sitemap.xml
 * was missing /callme, /careers/apply and all 13 /solutions/[slug] pages —
 * the highest-intent pages on the site.
 */
const STATIC_PATHS: ReadonlyArray<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/solutions", changeFrequency: "weekly", priority: 0.9 },
  { path: "/workers", changeFrequency: "monthly", priority: 0.8 },
  { path: "/brain", changeFrequency: "monthly", priority: 0.8 },
  { path: "/brakes", changeFrequency: "monthly", priority: 0.8 },
  { path: "/security-trust", changeFrequency: "monthly", priority: 0.7 },
  { path: "/callme", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "yearly", priority: 0.5 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.5 },
  { path: "/careers/apply", changeFrequency: "monthly", priority: 0.4 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().replace(/\/$/, "");
  const lastModified = new Date();

  const staticEntries = STATIC_PATHS.map((entry) => ({
    url: `${base}${entry.path === "/" ? "/" : entry.path}`,
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));

  const useCaseEntries = USE_CASES.map((useCase) => ({
    url: `${base}/solutions/${useCase.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticEntries, ...useCaseEntries];
}
