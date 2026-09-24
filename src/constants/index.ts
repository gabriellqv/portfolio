/**
 * Central source of truth for all site-wide configuration values.
 * Components and data files reference these instead of hardcoding strings,
 * ensuring a single place to update personal info, URLs, and filenames.
 */
export const SITE = {
  name: "Gabriel Queiroz",
  title: "Desenvolvedor Full Stack",
  tagline:
    "Foco em TypeScript, Node.js e PHP. Experiência prática em APIs REST (NestJS, Express, Laravel) e interfaces web (Next.js, React, Vue.js, Angular)",
  description:
    "Desenvolvedor Full Stack com foco em TypeScript, Node.js e PHP. Experiência prática em APIs REST (NestJS, Express, Laravel) e interfaces web (Next.js, React, Vue.js, Angular).",
  location: "São Paulo, Brasil",
  email: "gabriellqv@gmail.com",
  githubUsername: "gabriellqv",
  linkedinUsername: "gabriellqv",
  cvFilename: "CV_Gabriel_Queiroz_Desenvolvedor_Full_Stack.pdf",
  siteUrl: "https://gabriellqv.vercel.app",
  repoUrl: "https://github.com/gabriellqv/portfolio",
  brandDomain: "GABRIELLQV.DEV",
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
