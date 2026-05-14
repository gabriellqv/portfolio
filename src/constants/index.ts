/**
 * Central source of truth for all site-wide configuration values.
 * Components and data files reference these instead of hardcoding strings,
 * ensuring a single place to update personal info, URLs, and filenames.
 */
export const SITE = {
  name: "Gabriel Queiroz",
  title: "Desenvolvedor Full Stack",
  tagline:
    "Desenvolvedor Full Stack especializado em React, Next.js, Vue.js, NestJS e Laravel",
  description:
    "Desenvolvedor Full Stack — React, Next.js, NestJS, Laravel. Portfolio profissional com projetos em destaque.",
  location: "São Paulo, Brasil",
  email: "gabriellqv@gmail.com",
  githubUsername: "gabriellqv",
  linkedinUsername: "gabriellqv",
  cvFilename: "CV_Gabriel_Queiroz_Desenvolvedor_Full_Stack.pdf",
  siteUrl: "https://gabrielqueiroz.dev",
} as const;

/**
 * Ordered list of all page section IDs used by the IntersectionObserver
 * for active-section tracking and by the navbar for link rendering.
 * Order determines the default active section (first item) and the nav link order.
 */
export const SECTION_IDS = [
  "home",
  "about",
  "projects",
  "skills",
  "education",
  "contact",
] as const;
