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
    title: "Rafael Nutre",
    subtitle: "Nutrição Clínica & Esportiva",
    description: "",
    category: "professional",
    company: "Dr. Rafael Nutricionista",
    role: "Freelance",
    techs: ["Astro", "TypeScript", "TailwindCSS", "Vitest", "Cloudflare"],
    deploy: "https://rafaelnutre.com.br",
    image: "/mockup-rafaelnutre.webp",
    status: "",
  },
  {
    title: "FlowERP",
    subtitle: "Gestão Empresarial & Analytics",
    description: "",
    category: "personal",
    techs: ["Vue 3", "PHP", "Laravel", "TypeScript", "Pinia", "TailwindCSS"],
    github: "https://github.com/gabriellqv/flowerp",
    deploy: "https://flowerp-dashboard.vercel.app/",
    image: "/mockup-flowerp.webp",
    status: "",
  },
  {
    title: "StockSnap",
    subtitle: "Inventário & Supply Chain em Tempo Real",
    description: "",
    category: "personal",
    techs: ["Next.js", "NestJS", "TypeScript", "Prisma", "PostgreSQL", "TailwindCSS"],
    github: "https://github.com/gabriellqv/stocksnap",
    deploy: "https://stocksnap-dashboard.vercel.app/",
    image: "/mockup-stocksnap.webp",
    status: "",
  },
  {
    title: "HydroTrack",
    subtitle: "Telemetria & Monitoramento Hídrico",
    description: "",
    category: "personal",
    techs: ["Vue 3", "PHP", "Laravel", "TypeScript", "Leaflet", "Pinia"],
    github: "https://github.com/gabriellqv/hydrotrack",
    deploy: "https://hydrotrack-telemetry.vercel.app/",
    image: "/mockup-hydrotrack.webp",
    status: "",
  },
];
