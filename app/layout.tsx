import type { Metadata } from "next";
import { JetBrains_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { NoiseOverlay } from "@/components/layout/NoiseOverlay";
import { GlobalBackground } from "@/components/layout/GlobalBackground";
import { PageTransitionProvider } from "@/components/layout/PageTransitionProvider";
import { ROOT_METADATA, getSiteUrl } from "@/lib/seo";

// Display & Body: a refined industrial grotesque (no Inter/Roboto).
// We pair it with a classical serif for editorial cinematic headlines.
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// 1. Merge your ROOT_METADATA with applicationName to explicitly state the brand name
export const metadata: Metadata = {
  ...ROOT_METADATA,
  applicationName: "Laxvish",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = getSiteUrl();

  // 2. Enriched Organization Schema (Added logo and description for brand authority)
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Laxvish",
    url: siteUrl,
    logo: `${siteUrl}/icon.png`, // Make sure you have an icon.png in your /public or /app folder
    description: "Enterprise AI Operating System",
    // sameAs: [ "twitter.com/your-handle", "linkedin.com/company/your-page" ] // Uncomment and add your socials when ready
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Laxvish",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  // 3. Combine into a Schema "@graph" for cleaner, unified injection
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd, websiteJsonLd],
  };

  return (
    <html
      lang="en"
      className={`${jetbrains.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-clip">
        {/* Render a single, unified script tag */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaGraph),
          }}
        />
        <GlobalBackground />
        <NoiseOverlay />
        <Navbar />
        <main className="relative z-10 flex min-h-screen flex-col">
          <PageTransitionProvider>
            {children}
          </PageTransitionProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
