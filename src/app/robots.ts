import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/api/", "/mcp"],
      },
      {
        userAgent: "GPTBot",
        allow: ["/", "/api/public/site", "/api/public/fleet", "/api/public/offers"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: ["/", "/api/public/site", "/api/public/fleet", "/api/public/offers"],
      },
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
    host: siteConfig.siteUrl,
  };
}
