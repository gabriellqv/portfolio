import type { MetadataRoute } from "next";

import { SITE } from "@/constants";

/**
 * Dynamically generated robots.txt instructing all crawlers to index
 * the entire site and pointing them to the sitemap for discovery.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE.siteUrl}/sitemap.xml`,
  };
}
