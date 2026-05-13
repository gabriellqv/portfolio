import { ExternalLink, FolderGit2 } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Link from "next/link";

const projects = [
  {
    title: "HydroTrack",
    description: "Aplicação voltada para a gestão de recursos hídricos. Combina a reatividade do Vue.js com Leaflet para monitoramento geolocalizado, apoiada por um ecossistema de alta performance.",
    techs: ["Vue 3", "PHP", "Laravel", "TypeScript", "Leaflet", "Pinia"],
    github: "https://github.com/gabriellqv/hydrotrack",
    deploy: "#",
    image: "/hydrotrack.webp",
    status: "Concluído"
  },
  {
    title: "FlowERP",
    description: "Sistema de Gestão Empresarial (ERP) completo para controle de vendas, clientes e produtos. Interface altamente interativa com painéis administrativos e relatórios gerenciais dinâmicos. Arquitetura com forte foco em testes automatizados e regras de negócio sólidas.",
    techs: ["Vue 3", "PHP", "Laravel", "TypeScript", "Pinia", "TailwindCSS"],
    github: "https://github.com/gabriellqv/flowerp",
    deploy: "#",
    image: "",
    status: "Em Produção"
  },
  {
    title: "StockSnap",
    description: "Plataforma de gerenciamento de estoque em tempo real. Desenvolvida utilizando os princípios SOLID, focando em uma comunicação RESTful otimizada, autenticação segura via JWT e forte controle de permissões (RBAC).",
    techs: ["Next.js", "NestJS", "TypeScript", "Prisma", "PostgreSQL", "TailwindCSS"],
    github: "https://github.com/gabriellqv/stocksnap",
    deploy: "#",
    image: "/stocksnap.webp",
    status: "Versão 2.0"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="w-full max-w-5xl mx-auto px-4 py-24">
      <div className="flex flex-col mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
          Projetos em Destaque
        </h2>
        <div className="w-20 h-1 bg-neutral-700 rounded-full"></div>
        <p className="mt-6 text-muted-foreground max-w-2xl leading-relaxed">
          Uma seleção das minhas aplicações mais completas. Foco em arquitetura escalável, código limpo e resolução de problemas complexos de negócios.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {projects.map((project, idx) => (
          <div 
            key={idx} 
            className="flex flex-col lg:flex-row group rounded-3xl bg-card dark:bg-muted/5 border border-border/40 hover:shadow-2xl dark:hover:bg-muted/10 transition-colors shadow-xl overflow-hidden"
          >
            {/* Image Section */}
            <div className="w-full lg:w-1/2 min-h-[16rem] bg-[#0a0a0a] relative overflow-hidden border-b lg:border-b-0 lg:border-r border-border/40 flex items-center justify-center">
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/30 to-neutral-900/10"></div>
                  <div className="relative z-10 flex flex-col items-center justify-center text-neutral-600 group-hover:scale-105 transition-transform duration-500">
                    <FolderGit2 className="size-16 mb-4 opacity-50" />
                    <span className="text-xl font-bold tracking-widest uppercase opacity-40">{project.title}</span>
                  </div>
                </>
              )}
            </div>

            {/* Content Section */}
            <div className="w-full lg:w-1/2 p-8 md:p-10 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {project.title}
                </h3>
                <span className="px-3 py-1 rounded-full border border-border/30 bg-neutral-100 dark:bg-muted/20 text-xs font-semibold text-neutral-800 dark:text-neutral-300 tracking-wider">
                  {project.status}
                </span>
              </div>

              <p className="text-neutral-700 dark:text-neutral-400 leading-relaxed mb-8 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.techs.map(tech => (
                  <span 
                    key={tech} 
                    className="px-3 py-1 rounded-md border border-border/20 bg-neutral-100 dark:bg-neutral-900/50 text-xs font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-auto">
                <Link 
                  href={project.deploy} 
                  className="flex justify-center items-center gap-2 py-3 px-6 sm:px-5 sm:py-2.5 rounded-xl bg-neutral-200 text-neutral-900 hover:bg-white font-semibold transition-colors whitespace-nowrap"
                >
                  <ExternalLink className="size-4 shrink-0" />
                  <span>Ver Projeto</span>
                </Link>
                
                <Link 
                  href={project.github} 
                  className="flex justify-center items-center gap-2 py-3 px-6 sm:px-5 sm:py-2.5 rounded-xl border border-border/50 bg-neutral-100 dark:bg-neutral-800/50 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-200 font-medium transition-colors whitespace-nowrap"
                >
                  <SiGithub className="size-4 shrink-0" />
                  <span>Repositório</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
