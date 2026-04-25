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

export const DEFAULT_NEETOCAL_URL =
  "https://laxvish.neetocal.com/meeting-with-shubham-kumar";

export const getBookDemoUrl = (): string =>
  process.env.NEXT_PUBLIC_NEETOCAL_URL ?? DEFAULT_NEETOCAL_URL;

export const BOOK_NOW_BUTTON_CLASS =
  "relative inline-flex items-center justify-center overflow-hidden rounded-full border border-[#90b2ff]/50 bg-[linear-gradient(135deg,#d9e8ff_0%,#a9c4ff_50%,#7ea7ff_100%)] px-5 py-2 text-sm font-semibold tracking-[0.01em] text-obsidian shadow-[0_12px_30px_rgba(62,108,214,0.38)] transition-all duration-300 before:absolute before:inset-0 before:bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.58)_50%,transparent_100%)] before:translate-x-[-140%] before:transition-transform before:duration-700 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(62,108,214,0.46)] hover:before:translate-x-[140%]";

export const SECONDARY_HERO_CTA_CLASS =
  "inline-flex items-center justify-center rounded-full border border-charcoal/40 bg-black/35 px-6 py-3 text-sm font-semibold text-neonCyan transition-colors duration-200 hover:border-charcoal/75";

export const PRIMARY_NAV_LINKS: SiteLink[] = [
  {
    label: "Solutions",
    href: "/solutions",
    kind: "primary",
    description: "Enterprise AI outcomes by workflow",
  },
  {
    label: "Workers",
    href: "/workers",
    kind: "primary",
    description: "Domain AI agents for real operations",
  },
  {
    label: "Brain",
    href: "/brain",
    kind: "primary",
    description: "Orchestration and control intelligence",
  },
  {
    label: "Brakes",
    href: "/brakes",
    kind: "primary",
    description: "Verification and governance safeguards",
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
    title: "Platform",
    links: [
      { label: "Solutions", href: "/solutions", kind: "primary" },
      { label: "Workers", href: "/workers", kind: "primary" },
      { label: "Brain", href: "/brain", kind: "primary" },
      { label: "Brakes", href: "/brakes", kind: "primary" },
    ],
  },
  {
    title: "Trust",
    links: [
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
