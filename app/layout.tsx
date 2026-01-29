import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { Providers } from "@/components/Providers";
import { fetchSiteData } from "@/lib/api";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

async function getLayoutData() {
  try {
    const res = await fetchSiteData();

    return {
      siteConfig: res.data.siteConfig || null,
      navItems: res.data.navItems || [],
      socialLinks: res.data.socialLinks || [],
    };
  } catch (error) {
    console.error("Error fetching layout data:", error);
    return { siteConfig: null, navItems: [], socialLinks: [] };
  }
}



export async function generateMetadata(): Promise<Metadata> {
  const { siteConfig } = await getLayoutData();

  const name = siteConfig?.site_name ?? "Portfolio";
  const description = siteConfig?.tagline ?? "Personal portfolio";
  const faviconUrl = siteConfig?.favicon_url ?? "/favicon.ico";

  return {
    title: {
      default: name,
      template: `%s — ${name}`,
    },
    description,
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
    openGraph: {
      type: "website",
      title: name,
      description,
      images: siteConfig?.logo_url
        ? [{ url: siteConfig.logo_url }]
        : [],
    },
  };
}


export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrains.variable}`}>
      {/*
        Root layout is intentionally minimal.
        Each portfolio version owns its own layout/shell so Laravel can swap versions freely.
      */}
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
