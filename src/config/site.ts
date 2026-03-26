/**
 * Global site configuration consumed by metadata, SEO tags, and UI components.
 *
 * The `description` field defaults to Portuguese to match the root `lang="pt-BR"`
 * attribute. Bilingual rendering is handled at the component level via i18n.
 */

import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Gabriel Queiroz",
  handle: ">_ gabriellqv",
  title: "Gabriel Queiroz | Portfolio",
  description:
    "Desenvolvedor Full Stack especializado em React, Next.js e TypeScript. Construindo aplicações web modernas e performáticas.",
  url: "https://gabriellqv.dev",
  ogImage: "/og-image.png",
  links: {
    github: "https://github.com/gabriellqv",
    linkedin: "https://linkedin.com/in/gabriellqv",
    email: "mailto:gabriellqv@gmail.com",
    displayGithub: "github.com/gabriellqv",
    displayLinkedin: "linkedin.com/in/gabriellqv",
    displayEmail: "gabriellqv@gmail.com",
  },
};
