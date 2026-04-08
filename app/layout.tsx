import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { NoiseOverlay } from "@/components/layout/NoiseOverlay";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laxvish | Enterprise AI Operating System",
  description: "Laxvish marketing website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-clip">
        <NoiseOverlay />
        <Navbar />
        <main className="relative z-10 flex min-h-screen flex-col">{children}</main>
      </body>
    </html>
  );
}
