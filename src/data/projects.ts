import type { Project } from "@/types";

/**
 * Portfolio project entries rendered in the Projects section.
 *
 * Each project maps its `title` to a key in `dict.projectItems` so the
 * description and status labels are resolved from the active i18n dictionary.
 *
 * When `deploy` is set to `"#"`, the "View Project" button is hidden
 * to avoid leading visitors to a dead link.
 */
export const projects: Project[] = [
  {
    title: "HydroTrack",
    description: "",
    techs: ["Vue 3", "PHP", "Laravel", "TypeScript", "Leaflet", "Pinia"],
    github: "https://github.com/gabriellqv/hydrotrack",
    deploy: "#",
    image: "/hydrotrack.webp",
    status: "",
  },
  {
    title: "FlowERP",
    description: "",
    techs: ["Vue 3", "PHP", "Laravel", "TypeScript", "Pinia", "TailwindCSS"],
    github: "https://github.com/gabriellqv/flowerp",
    deploy: "#",
    image: "",
    status: "",
  },
  {
    title: "StockSnap",
    description: "",
    techs: ["Next.js", "NestJS", "TypeScript", "Prisma", "PostgreSQL", "TailwindCSS"],
    github: "https://github.com/gabriellqv/stocksnap",
    deploy: "#",
    image: "/stocksnap.webp",
    status: "",
  },
];
