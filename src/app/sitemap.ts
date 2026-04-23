import type { MetadataRoute } from "next";
import { cityPages, guides, services, siteConfig, vehicles } from "@/lib/site-data";

const locales = ["ar", "en"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/fleet",
    "/daily-rental",
    "/monthly-rental",
    "/offers",
    "/corporate",
    "/faq",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${siteConfig.siteUrl}/${locale}${path}`,
        lastModified: new Date(),
      });
    }

    for (const vehicle of vehicles) {
      entries.push({
        url: `${siteConfig.siteUrl}/${locale}/fleet/${vehicle.slug}`,
        lastModified: new Date(),
      });
    }

    for (const service of services) {
      entries.push({
        url: `${siteConfig.siteUrl}/${locale}/services/${service.slug}`,
        lastModified: new Date(),
      });
    }

    for (const city of cityPages) {
      entries.push({
        url: `${siteConfig.siteUrl}/${locale}/cities/${city.slug}`,
        lastModified: new Date(),
      });
    }

    for (const guide of guides) {
      entries.push({
        url: `${siteConfig.siteUrl}/${locale}/guides/${guide.slug}`,
        lastModified: new Date(),
      });
    }
  }

  return entries;
}
