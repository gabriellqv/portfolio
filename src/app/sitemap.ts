import type { MetadataRoute } from "next";

import { SITE } from "@/constants";

/**
 * Dynamically generated sitemap.xml listing all public routes.
 * Currently a single-page site, so only the root route is listed.
 * The `lastModified` date is set to the current build time.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
