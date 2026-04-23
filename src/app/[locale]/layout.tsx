import type { Metadata, Viewport } from "next";
import { Alexandria, Syne } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { siteConfig } from "@/lib/site-data";
import type { Locale } from "@/lib/locale";
import { isLocale, localeDirections } from "@/lib/locale";
import { FloatingContactBar } from "@/components/layout/floating-contact-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Analytics } from "@/components/common/analytics";

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

export function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;

  return (
    <html
      lang={typedLocale}
      dir={localeDirections[typedLocale]}
      className={`${alexandria.variable} ${syne.variable} h-full scroll-smooth antialiased`}
      data-locale={typedLocale}
    >
      <body className="min-h-full bg-[var(--surface)] text-[var(--text)]">
        <SiteHeader locale={typedLocale} />
        <main>{children}</main>
        <SiteFooter locale={typedLocale} />
        <FloatingContactBar locale={typedLocale} />
        <Analytics />
      </body>
    </html>
  );
}
