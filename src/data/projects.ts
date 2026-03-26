/**
 * Static project data. Titles and descriptions here serve as fallbacks;
 * the actual rendered text comes from `t.projects.items[slug]` in the
 * i18n layer, enabling bilingual project descriptions without duplicating
 * the structural data (tags, image, links).
 */

import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "landing-page",
    title: "Landing Page Profissional",
    description:
      "Landing page full-stack com SSR, formulário com validação Zod, rate limiting, security headers e design system customizado.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/projects/landingPageImage.webp",
    links: {},
    featured: true,
  },
  {
    slug: "portfolio",
    title: "Portfólio Pessoal",
    description:
      "Portfólio responsivo com glassmorphism, starfield animado em Canvas, animações de scroll e design system com Tailwind CSS.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Canvas API"],
    image: "/projects/portfolioImage.webp",
    links: {
      live: "",
      github: "https://github.com/gabriellqv/portfolio",
    },
    featured: true,
  },
];
