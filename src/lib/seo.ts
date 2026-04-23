import type { Metadata } from "next";
import type { Locale } from "@/lib/locale";
import { localeRegions, oppositeLocale, toLocalizedPath } from "@/lib/locale";
import { siteConfig } from "@/lib/site-data";
import { siteUrl } from "@/lib/utils";

export function buildMetadata({
  locale,
  title,
  description,
  path,
  image = "/fleet/14897.png",
  index = true,
}: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  image?: string;
  index?: boolean;
}): Metadata {
  const canonicalPath = toLocalizedPath(locale, path);
  const alternateLocale = oppositeLocale(locale);
  const alternatePath = toLocalizedPath(alternateLocale, path);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        [localeRegions[locale]]: canonicalPath,
        [localeRegions[alternateLocale]]: alternatePath,
      },
    },
    openGraph: {
      title,
      description,
      siteName: siteConfig.company.name.en,
      locale: localeRegions[locale],
      type: "website",
      url: siteUrl(canonicalPath),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index,
      follow: index,
    },
  };
}

export function jsonLd<T>(value: T) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.company.name.en,
    alternateName: siteConfig.company.name.ar,
    url: siteConfig.siteUrl,
    logo: siteUrl("/brand/eagle-logo.png"),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.company.phone,
        contactType: "customer service",
        areaServed: "AE",
        availableLanguage: ["Arabic", "English"],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.company.name.en,
    url: siteConfig.siteUrl,
    inLanguage: ["ar-AE", "en-AE"],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.company.name.en,
    image: siteUrl("/fleet/14897.png"),
    telephone: siteConfig.company.phone,
    email: siteConfig.company.email,
    areaServed: siteConfig.serviceAreas.map((item) => item.en),
    url: siteConfig.siteUrl,
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  locale: Locale,
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: siteUrl(toLocalizedPath(locale, item.path)),
    })),
  };
}

export function serviceSchema({
  name,
  description,
  locale,
  path,
}: {
  name: string;
  description: string;
  locale: Locale;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    provider: {
      "@type": "Organization",
      name: siteConfig.company.name.en,
    },
    areaServed: "AE",
    description,
    url: siteUrl(toLocalizedPath(locale, path)),
  };
}

export function productSchema({
  name,
  description,
  image,
  dailyFrom,
  locale,
  path,
}: {
  name: string;
  description: string;
  image: string;
  dailyFrom: number;
  locale: Locale;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: siteUrl(image),
    brand: {
      "@type": "Brand",
      name: siteConfig.company.name.en,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "AED",
      price: dailyFrom,
      availability: "https://schema.org/InStock",
      url: siteUrl(toLocalizedPath(locale, path)),
      description: "Starting from public daily rate.",
    },
  };
}
