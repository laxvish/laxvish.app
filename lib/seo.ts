import type { Metadata } from "next";

const DEFAULT_SITE_URL = "https://www.laxvish.app";
const SITE_NAME = "Laxvish";
const DEFAULT_TITLE = "AI Workers for Indian Businesses";
const DEFAULT_DESCRIPTION =
  "Laxvish builds AI workers that take over the repetitive work in your business — sales, customer support, document processing, finance, IT, and more. Built for Indian enterprises. DPDP-ready.";

const BASE_KEYWORDS = [
  "ai for business",
  "ai workers",
  "ai automation india",
  "ai solutions for business",
  "ai customer support",
  "ai sales automation",
  "ai document processing",
  "ai finance automation",
  "ai hr automation",
  "ai helpdesk",
  "ai voice agent india",
  "ai whatsapp business",
  "dpdp compliant ai",
  "ai for indian enterprises",
];

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const url = canonicalPath === "/" ? "/" : canonicalPath;
  return {
    title,
    description,
    keywords: [...BASE_KEYWORDS, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}

export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE_NAME} | ${DEFAULT_TITLE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: BASE_KEYWORDS,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME} | ${DEFAULT_TITLE}`,
    description: DEFAULT_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${DEFAULT_TITLE}`,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};
