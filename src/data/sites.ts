import type { LandingSite } from "@/types";

/**
 * Published landing pages shown in the "Sites & Landing Pages" subsection.
 *
 * Each entry maps its `title` to a key in `dict.siteItems`, where the niche
 * and description are resolved from the active i18n dictionary.
 *
 * Rafael Nutre is intentionally omitted here because it is already rendered
 * as the featured professional case study above this grid.
 */
export const landingSites: LandingSite[] = [
  {
    title: "Ana Paula Praes",
    location: "Bocaiúva/MG",
    url: "https://ana-paula-praes.vercel.app/",
    image: "/site-ana-paula-praes.webp",
    kind: "client",
    techs: ["Astro", "TailwindCSS", "SEO Local"],
  },
  {
    title: "Dr. Gustavo Andrade",
    location: "Montes Claros/MG",
    url: "https://gustavo-andrade-khaki.vercel.app/",
    image: "/site-gustavo-andrade.webp",
    kind: "client",
    techs: ["Astro", "TailwindCSS", "SEO Local"],
  },
  {
    title: "Dane Maia",
    location: "Montes Claros/MG",
    url: "https://dane-maia-psicologa-landing-page.vercel.app/",
    image: "/site-dane-maia.webp",
    kind: "client",
    techs: ["Astro", "TailwindCSS", "SEO Local"],
  },
  {
    title: "Vértice Arquitetura",
    location: "Montes Claros/MG",
    url: "https://tpl-arquitetura.vercel.app/",
    image: "/site-vertice-arquitetura.webp",
    kind: "template",
    techs: ["Astro", "TailwindCSS", "Design Editorial"],
  },
];
