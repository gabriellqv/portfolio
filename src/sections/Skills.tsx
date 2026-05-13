"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { 
  SiTypescript, SiReact, SiNextdotjs, SiVuedotjs, 
  SiNodedotjs, SiNestjs, SiPhp, SiLaravel, 
  SiDocker, SiPostgresql, SiTailwindcss, SiGit,
  SiHtml5, SiCss, SiJavascript, SiMysql,
  SiPrisma, SiRedis, SiJest, SiGithubactions,
  SiVite, SiVitest, SiPostman, SiFigma,
  SiPinia, SiZod, SiLinux, SiMongodb, SiExpress, SiGraphql
} from "react-icons/si";

import { Code2, LayoutTemplate, Server, Database, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Linguagens Core",
    icon: Code2,
    skills: [
      { name: "TypeScript", icon: SiTypescript, hex: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, hex: "#F7DF1E" },
      { name: "PHP", icon: SiPhp, hex: "#777BB4" },
    ]
  },
  {
    title: "Frontend",
    icon: LayoutTemplate,
    skills: [
      { name: "React", icon: SiReact, hex: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, hex: "#FFFFFF" },
      { name: "Vue.js", icon: SiVuedotjs, hex: "#4FC08D" },
      { name: "Pinia", icon: SiPinia, hex: "#FFE262" },
      { name: "Tailwind CSS", icon: SiTailwindcss, hex: "#06B6D4" },
      { name: "Vite", icon: SiVite, hex: "#646CFF" },
      { name: "HTML", icon: SiHtml5, hex: "#E34F26" },
      { name: "CSS", icon: SiCss, hex: "#1572B6" },
    ]
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", icon: SiNodedotjs, hex: "#339933" },
      { name: "Express", icon: SiExpress, hex: "#FFFFFF" },
      { name: "NestJS", icon: SiNestjs, hex: "#E0234E" },
      { name: "Laravel", icon: SiLaravel, hex: "#FF2D20" },
    ]
  },
  {
    title: "Banco de Dados",
    icon: Database,
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, hex: "#4169E1" },
      { name: "MySQL", icon: SiMysql, hex: "#4479A1" },
      { name: "MongoDB", icon: SiMongodb, hex: "#47A248" },
      { name: "Redis", icon: SiRedis, hex: "#DC382D" },
      { name: "Prisma", icon: SiPrisma, hex: "#FFFFFF" },
    ]
  },
  {
    title: "Ferramentas",
    icon: Wrench,
    skills: [
      { name: "Docker", icon: SiDocker, hex: "#2496ED" },
      { name: "Linux", icon: SiLinux, hex: "#FFFFFF" },
      { name: "Git", icon: SiGit, hex: "#F05032" },
      { name: "GitHub Actions", icon: SiGithubactions, hex: "#2088FF" },
      { name: "Jest", icon: SiJest, hex: "#C21325" },
      { name: "Vitest", icon: SiVitest, hex: "#FCC72B" },
      { name: "Zod", icon: SiZod, hex: "#3E67B1" },
      { name: "GraphQL", icon: SiGraphql, hex: "#E10098" },
      { name: "Postman", icon: SiPostman, hex: "#FF6C37" },
      { name: "Figma", icon: SiFigma, hex: "#F24E1E" },
    ]
  }
];

export default function Skills() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const isLight = mounted && resolvedTheme === "light";
  const bgOpacity = isLight ? "25" : "15";
  const borderOpacity = isLight ? "40" : "30";

  return (
    <section id="skills" className="w-full max-w-5xl mx-auto px-4 py-24">
      <div className="flex flex-col mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
          Habilidades Técnicas
        </h2>
        <div className="w-20 h-1 bg-neutral-700 rounded-full"></div>
        <p className="mt-6 text-muted-foreground max-w-2xl leading-relaxed">
          Especializado em desenvolvimento moderno de software, utilizo as melhores tecnologias do mercado para construir sistemas escaláveis, seguros e de alta performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {skillCategories.map((category, idx) => (
          <div 
            key={idx} 
            className={`flex flex-col p-8 rounded-3xl bg-card dark:bg-muted/5 border border-border/40 hover:shadow-xl dark:hover:bg-muted/10 transition-all shadow-lg ${idx === 4 ? 'md:col-span-2' : ''}`}
          >
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border/40">
              <div className="p-2 bg-neutral-100 dark:bg-neutral-800/50 rounded-lg border border-border/50">
                <category.icon className="size-5 text-neutral-600 dark:text-neutral-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
                {category.title}
              </h3>
            </div>
            
            <div className={`grid gap-3 ${idx === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2'}`}>
              {category.skills.map((skill, skillIdx) => {
                const Icon = skill.icon;
                const isWhite = skill.hex === "#FFFFFF";
                
                return (
                  <div 
                    key={skillIdx} 
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all hover:scale-105 ${isWhite ? 'border-neutral-300 bg-neutral-200/50 dark:border-white/30 dark:bg-white/10' : ''}`}
                    style={isWhite ? undefined : { 
                      backgroundColor: `${skill.hex}${bgOpacity}`, 
                      borderColor: `${skill.hex}${borderOpacity}` 
                    }}
                  >
                    <Icon size={18} style={isWhite ? undefined : { color: skill.hex }} className={`shrink-0 ${isWhite ? 'text-neutral-900 dark:text-white' : ''}`} />
                    <span className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
