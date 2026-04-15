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
      { label: "Contact", href: "/contact", kind: "support" },
      { label: "FAQ", href: "/faq", kind: "support" },
    ],
  },
];

export const SOCIAL_LINKS: SiteLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    kind: "support",
    external: true,
  },
  {
    label: "X",
    href: "https://x.com",
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
