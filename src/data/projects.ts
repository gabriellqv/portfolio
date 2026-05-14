import type { Project } from "@/types";

/**
 * Portfolio project entries rendered in the Projects section.
 *
 * @field deploy - Uses "#" as a placeholder when the project has no public URL.
 *                 The component handles this by keeping the link non-functional.
 * @field image - Set to an empty string for projects without screenshots (e.g.
 *                FlowERP). The component falls back to a FolderGit2 icon and
 *                title placeholder.
 * @field status - Displayed as a badge. Pure display text, not used for filtering.
 */
export const projects: Project[] = [
  {
    title: "HydroTrack",
    description:
      "Aplicação voltada para a gestão de recursos hídricos. Combina a reatividade do Vue.js com Leaflet para monitoramento geolocalizado, apoiada por um ecossistema de alta performance.",
    techs: ["Vue 3", "PHP", "Laravel", "TypeScript", "Leaflet", "Pinia"],
    github: "https://github.com/gabriellqv/hydrotrack",
    deploy: "#",
    image: "/hydrotrack.webp",
    status: "Concluído",
  },
  {
    title: "FlowERP",
    description:
      "Sistema de Gestão Empresarial (ERP) completo para controle de vendas, clientes e produtos. Interface altamente interativa com painéis administrativos e relatórios gerenciais dinâmicos. Arquitetura com forte foco em testes automatizados e regras de negócio sólidas.",
    techs: ["Vue 3", "PHP", "Laravel", "TypeScript", "Pinia", "TailwindCSS"],
    github: "https://github.com/gabriellqv/flowerp",
    deploy: "#",
    image: "",
    status: "Em Produção",
  },
  {
    title: "StockSnap",
    description:
      "Plataforma de gerenciamento de estoque em tempo real. Desenvolvida utilizando os princípios SOLID, focando em uma comunicação RESTful otimizada, autenticação segura via JWT e forte controle de permissões (RBAC).",
    techs: ["Next.js", "NestJS", "TypeScript", "Prisma", "PostgreSQL", "TailwindCSS"],
    github: "https://github.com/gabriellqv/stocksnap",
    deploy: "#",
    image: "/stocksnap.webp",
    status: "Versão 2.0",
  },
];
