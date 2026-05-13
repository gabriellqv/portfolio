"use client";

import { 
  SiTypescript, SiReact, SiNextdotjs, SiVuedotjs, 
  SiNodedotjs, SiNestjs, SiPhp, SiLaravel, 
  SiDocker, SiPostgresql, SiTailwindcss, SiGit,
  SiHtml5, SiCss, SiJavascript, SiMysql,
  SiPrisma, SiRedis, SiJest, SiVite
} from "react-icons/si";

const skills = [
  // Fundamentals
  { name: "HTML5", icon: SiHtml5, color: "group-hover:text-[#E34F26]" },
  { name: "CSS3", icon: SiCss, color: "group-hover:text-[#1572B6]" },
  { name: "JavaScript", icon: SiJavascript, color: "group-hover:text-[#F7DF1E]" },
  { name: "TypeScript", icon: SiTypescript, color: "group-hover:text-[#3178C6]" },
  
  // Frontend & UI
  { name: "React", icon: SiReact, color: "group-hover:text-[#61DAFB]" },
  { name: "Next.js", icon: SiNextdotjs, color: "group-hover:text-foreground" },
  { name: "Vue.js", icon: SiVuedotjs, color: "group-hover:text-[#4FC08D]" },
  { name: "Tailwind", icon: SiTailwindcss, color: "group-hover:text-[#06B6D4]" },
  { name: "Vite", icon: SiVite, color: "group-hover:text-[#646CFF]" },

  // Backend
  { name: "Node.js", icon: SiNodedotjs, color: "group-hover:text-[#339933]" },
  { name: "NestJS", icon: SiNestjs, color: "group-hover:text-[#E0234E]" },
  { name: "PHP", icon: SiPhp, color: "group-hover:text-[#777BB4]" },
  { name: "Laravel", icon: SiLaravel, color: "group-hover:text-[#FF2D20]" },

  // Database & ORM
  { name: "PostgreSQL", icon: SiPostgresql, color: "group-hover:text-[#4169E1]" },
  { name: "MySQL", icon: SiMysql, color: "group-hover:text-[#4479A1]" },
  { name: "Redis", icon: SiRedis, color: "group-hover:text-[#DC382D]" },
  { name: "Prisma", icon: SiPrisma, color: "group-hover:text-foreground" },

  // DevOps & Tools
  { name: "Jest", icon: SiJest, color: "group-hover:text-[#C21325]" },
  { name: "Docker", icon: SiDocker, color: "group-hover:text-[#2496ED]" },
  { name: "Git", icon: SiGit, color: "group-hover:text-[#F05032]" },
];

export default function SkillsCarousel() {
  return (
    <div 
      className="w-full max-w-[600px] mx-auto relative mt-8 mb-10 overflow-hidden py-4" 
      style={{ 
        maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
      }}
    >
      <div className="flex w-fit animate-marquee">
        {/* Render twice for the seamless infinite loop */}
        {[...skills, ...skills].map((skill, index) => {
          const Icon = skill.icon;
          return (
            <div 
              key={index} 
              className="group flex items-center gap-2 px-4 py-2 mx-2 rounded-full border border-border/40 bg-muted/20 backdrop-blur-sm text-muted-foreground whitespace-nowrap hover:border-border/80 transition-all duration-300 cursor-default hover:bg-muted/40"
            >
              <Icon size={16} className={`shrink-0 transition-colors duration-300 ${skill.color}`} />
              <span className="text-xs font-medium group-hover:text-foreground transition-colors duration-300">{skill.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
