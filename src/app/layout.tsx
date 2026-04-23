import type { Metadata, Viewport } from "next";
import { Alexandria, Syne } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-data";

const alexandria = Alexandria({
  variable: "--font-sans",
  subsets: ["latin", "arabic"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.company.name.en,
    template: `%s | ${siteConfig.company.name.en}`,
  },
  description: siteConfig.company.tagline.en,
  applicationName: siteConfig.company.name.en,
  alternates: {
    canonical: "/ar",
    languages: {
      "ar-AE": "/ar",
      "en-AE": "/en",
    },
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.company.name.en,
    title: siteConfig.company.name.en,
    description: siteConfig.company.tagline.en,
    images: ["/fleet/14897.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.company.name.en,
    description: siteConfig.company.tagline.en,
    images: ["/fleet/14897.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${alexandria.variable} ${syne.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[var(--surface)] text-[var(--text)]">
        {children}
      </body>
    </html>
  );
}
