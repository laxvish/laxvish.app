import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { NoiseOverlay } from "@/components/layout/NoiseOverlay";
import { ROOT_METADATA, getSiteUrl } from "@/lib/seo";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
    // sameAs: [ "https://twitter.com/your-handle", "https://linkedin.com/company/your-page" ] // Uncomment and add your socials when ready
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
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-clip">
        {/* Render a single, unified script tag */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaGraph),
          }}
        />
        <NoiseOverlay />
        <Navbar />
        <main className="relative z-10 flex min-h-screen flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
