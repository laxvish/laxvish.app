import type { Metadata } from "next";

const DEFAULT_SITE_URL = "https://www.laxvish.app";
const SITE_NAME = "Laxvish";
const DEFAULT_TITLE = "AI Systems for Indian Enterprise";
const DEFAULT_DESCRIPTION =
  "Laxvish is an AI company that builds the AI systems that do the real work in your business — sales, customer support, document processing, finance, IT, and more. Built for Indian enterprises. DPDP-ready.";

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

/**
 * Absolute URL for the generated social card (app/opengraph-image.tsx).
 * Declared explicitly rather than relying on `metadataBase`, because several
 * crawlers do not resolve relative og:image URLs.
 */
function absoluteOgImage(): string {
  return `${getSiteUrl().replace(/\/$/, "")}/opengraph-image`;
}

const OG_IMAGE_ALT = "Laxvish — an AI company building AI systems for Indian enterprises";

function ogImages() {
  return [
    {
      url: absoluteOgImage(),
      width: 1200,
      height: 630,
      alt: OG_IMAGE_ALT,
    },
  ];
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
      images: ogImages(),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: ogImages(),
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
    images: ogImages(),
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${DEFAULT_TITLE}`,
    description: DEFAULT_DESCRIPTION,
    images: ogImages(),
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
