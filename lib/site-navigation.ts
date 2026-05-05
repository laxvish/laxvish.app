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
  "relative inline-flex items-center justify-center bg-charcoal px-8 py-3 text-sm font-medium tracking-wide text-obsidian transition-colors duration-500 hover:bg-neonCyan";

export const SECONDARY_HERO_CTA_CLASS =
  "inline-flex items-center justify-center border border-charcoal/20 bg-transparent px-8 py-3 text-sm font-medium tracking-wide text-charcoal transition-colors duration-500 hover:border-charcoal hover:bg-vaultAmber";

export const PRIMARY_NAV_LINKS: SiteLink[] = [
  {
    label: "Solutions",
    href: "/solutions",
    kind: "primary",
    description: "AI workflow automation for enterprise",
  },
  {
    label: "Workers",
    href: "/workers",
    kind: "primary",
    description: "Enterprise AI agents for domain execution",
  },
  {
    label: "Brain",
    href: "/brain",
    kind: "primary",
    description: "AI orchestration platform for workflow control",
  },
  {
    label: "Brakes",
    href: "/brakes",
    kind: "primary",
    description: "AI governance and verification controls",
  },
  {
    label: "CallMe",
    href: "/callme",
    kind: "primary",
    description: "Enterprise AI voice agent for business calls",
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
      { label: "CallMe", href: "/callme", kind: "primary" },
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
