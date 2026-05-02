import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { buildMetadata } from "@/lib/seo";
import { client } from "@/sanity/lib/client";
import { layoutQuery } from "@/sanity/lib/queries";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata();
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { settings } = await client.fetch(layoutQuery, {}, { next: { tags: ["layout"] } });

  return (
    <html lang="tr" className={`${inter.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <body>
        {settings?.gtmId && <GoogleTagManager gtmId={settings.gtmId} />}
        {settings?.gaId && <GoogleAnalytics gaId={settings.gaId} />}
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
