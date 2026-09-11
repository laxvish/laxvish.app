import {
  getFlagshipUseCases,
  getOtherUseCases,
  getUseCasesByCategory,
  type UseCaseCategory,
} from "@/lib/use-cases";

export type NavKind = "primary" | "support";

export interface SiteLink {
  label: string;
  href: string;
  kind: NavKind;
  description?: string;
  external?: boolean;
}

export interface FooterGroup {
  title: string;
  links: SiteLink[];
}

export interface UseCaseGroup {
  category: UseCaseCategory;
  links: SiteLink[];
}

export const DEFAULT_NEETOCAL_URL =
  "https://laxvish.neetocal.com/meeting-with-shubham-kumar";

export const getBookDemoUrl = (): string =>
  process.env.NEXT_PUBLIC_NEETOCAL_URL ?? DEFAULT_NEETOCAL_URL;

// Binding button system (see AGENTS.md §1, §4). No `rounded-full` cluster, no
// glow shadow, no glassmorphism, no scale hover. Solid mark fill for action;
// hairline border for secondary. Hover changes color/border, not shape.
export const BOOK_NOW_BUTTON_CLASS =
  "relative inline-flex items-center justify-center bg-charcoal px-8 py-3 text-sm font-medium tracking-wide text-obsidian transition-colors duration-500 hover:bg-neonCyan";

export const SECONDARY_HERO_CTA_CLASS =
  "inline-flex items-center justify-center border border-charcoal/20 bg-transparent px-8 py-3 text-sm font-medium tracking-wide text-charcoal transition-colors duration-500 hover:border-charcoal hover:bg-vaultAmber";

/**
 * Build the "What we automate" mega-menu group from the use cases.
 * Memoized — categories are static, rebuilt only if use-cases change.
 */
let cachedNavGroups: UseCaseGroup[] | null = null;
export function getUseCaseNavGroups(): UseCaseGroup[] {
  if (cachedNavGroups) return cachedNavGroups;
  const grouped = getUseCasesByCategory();
  const categories = Object.keys(grouped) as UseCaseCategory[];
  cachedNavGroups = categories.map((category) => ({
    category,
    links: grouped[category].map((uc) => ({
      label: uc.title,
      href: `/solutions/${uc.slug}`,
      kind: "primary" as NavKind,
      description: uc.oneLiner,
    })),
  }));
  return cachedNavGroups;
}

/** Flagship links — memoized; underlying data is static. */
let cachedFlagshipLinks: SiteLink[] | null = null;
export function getFlagshipNavLinks(): SiteLink[] {
  if (cachedFlagshipLinks) return cachedFlagshipLinks;
  cachedFlagshipLinks = getFlagshipUseCases().map((uc) => ({
    label: uc.title,
    href: `/solutions/${uc.slug}`,
    kind: "primary" as NavKind,
    description: uc.oneLiner,
  }));
  return cachedFlagshipLinks;
}

/** Non-flagship links — memoized. */
let cachedOtherLinks: SiteLink[] | null = null;
export function getOtherUseCaseNavLinks(): SiteLink[] {
  if (cachedOtherLinks) return cachedOtherLinks;
  cachedOtherLinks = getOtherUseCases().map((uc) => ({
    label: uc.title,
    href: `/solutions/${uc.slug}`,
    kind: "primary" as NavKind,
    description: uc.oneLiner,
  }));
  return cachedOtherLinks;
}

export const PRIMARY_NAV_LINKS: SiteLink[] = [
  {
    label: "What we automate",
    href: "/solutions",
    kind: "primary",
    description: "AI workers for every part of your business",
  },
  {
    label: "Workers",
    href: "/workers",
    kind: "primary",
    description: "Your AI team does the work",
  },
  {
    label: "Brain",
    href: "/brain",
    kind: "primary",
    description: "Coordinates everything",
  },
  {
    label: "Brakes",
    href: "/brakes",
    kind: "primary",
    description: "Keeps it safe and compliant",
  },
  {
    label: "Trust",
    href: "/security-trust",
    kind: "support",
    description: "DPDP-first controls and security posture",
  },
  {
    label: "Careers",
    href: "/careers/apply",
    kind: "support",
    description: "Internship and full-time opportunities",
  },
];

export const FOOTER_GROUPS: FooterGroup[] = [
  {
    title: "What we automate",
    links: [
      { label: "All automations", href: "/solutions", kind: "primary" },
      ...getFlagshipUseCases().map((uc) => ({
        label: uc.title,
        href: `/solutions/${uc.slug}`,
        kind: "primary" as NavKind,
      })),
    ],
  },
  {
    title: "Platform & Trust",
    links: [
      { label: "Workers", href: "/workers", kind: "primary" },
      { label: "Brain", href: "/brain", kind: "primary" },
      { label: "Brakes", href: "/brakes", kind: "primary" },
      { label: "Security & Trust", href: "/security-trust", kind: "support" },
      { label: "Privacy", href: "/privacy", kind: "support" },
      { label: "Terms", href: "/terms", kind: "support" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about", kind: "support" },
      { label: "Careers", href: "/careers/apply", kind: "support" },
      { label: "Contact", href: "/contact", kind: "support" },
      { label: "FAQ", href: "/faq", kind: "support" },
    ],
  },
];

export const SOCIAL_LINKS: SiteLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/laxvish/",
    kind: "support",
    external: true,
  },
  {
    label: "X",
    href: "https://x.com/HelloLaxvish",
    kind: "support",
    external: true,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com",
    kind: "support",
    external: true,
  },
];
