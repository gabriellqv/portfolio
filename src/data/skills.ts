import { Code2, Database, LayoutTemplate, Server, Wrench } from "lucide-react";
import {
  SiCss,
  SiDocker,
  SiExpress,
  SiFigma,
  SiGit,
  SiGithubactions,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiLaravel,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPinia,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVitest,
  SiVuedotjs,
  SiZod,
} from "react-icons/si";

import type { SkillCategory, SkillItem } from "@/types";

const allSkills: SkillItem[] = [
  { name: "HTML5", icon: SiHtml5, hex: "#E34F26" },
  { name: "CSS3", icon: SiCss, hex: "#1572B6" },
  { name: "JavaScript", icon: SiJavascript, hex: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, hex: "#3178C6" },
  { name: "React", icon: SiReact, hex: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, hex: "#FFFFFF" },
  { name: "Vue.js", icon: SiVuedotjs, hex: "#4FC08D" },
  { name: "Tailwind", icon: SiTailwindcss, hex: "#06B6D4" },
  { name: "Vite", icon: SiVite, hex: "#646CFF" },
  { name: "Node.js", icon: SiNodedotjs, hex: "#339933" },
  { name: "NestJS", icon: SiNestjs, hex: "#E0234E" },
  { name: "PHP", icon: SiPhp, hex: "#777BB4" },
  { name: "Laravel", icon: SiLaravel, hex: "#FF2D20" },
  { name: "PostgreSQL", icon: SiPostgresql, hex: "#4169E1" },
  { name: "MySQL", icon: SiMysql, hex: "#4479A1" },
  { name: "Redis", icon: SiRedis, hex: "#DC382D" },
  { name: "Prisma", icon: SiPrisma, hex: "#FFFFFF" },
  { name: "Jest", icon: SiJest, hex: "#C21325" },
  { name: "Docker", icon: SiDocker, hex: "#2496ED" },
  { name: "Git", icon: SiGit, hex: "#F05032" },
];

export function getSkillsForCarousel(): (SkillItem & {
  color: string;
})[] {
  const brandColors: Record<string, string> = {
    HTML5: "group-hover:text-[#E34F26]",
    CSS3: "group-hover:text-[#1572B6]",
    JavaScript: "group-hover:text-[#F7DF1E]",
    TypeScript: "group-hover:text-[#3178C6]",
    React: "group-hover:text-[#61DAFB]",
    "Next.js": "group-hover:text-foreground",
    "Vue.js": "group-hover:text-[#4FC08D]",
    Tailwind: "group-hover:text-[#06B6D4]",
    Vite: "group-hover:text-[#646CFF]",
    "Node.js": "group-hover:text-[#339933]",
    NestJS: "group-hover:text-[#E0234E]",
    PHP: "group-hover:text-[#777BB4]",
    Laravel: "group-hover:text-[#FF2D20]",
    PostgreSQL: "group-hover:text-[#4169E1]",
    MySQL: "group-hover:text-[#4479A1]",
    Redis: "group-hover:text-[#DC382D]",
    Prisma: "group-hover:text-foreground",
    Jest: "group-hover:text-[#C21325]",
    Docker: "group-hover:text-[#2496ED]",
    Git: "group-hover:text-[#F05032]",
  };

  return allSkills.map((skill) => ({
    ...skill,
    color: brandColors[skill.name] ?? "group-hover:text-foreground",
  }));
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Linguagens Core",
    icon: Code2,
    skills: [
      { name: "TypeScript", icon: SiTypescript, hex: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, hex: "#F7DF1E" },
      { name: "PHP", icon: SiPhp, hex: "#777BB4" },
    ],
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
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", icon: SiNodedotjs, hex: "#339933" },
      { name: "Express", icon: SiExpress, hex: "#FFFFFF" },
      { name: "NestJS", icon: SiNestjs, hex: "#E0234E" },
      { name: "Laravel", icon: SiLaravel, hex: "#FF2D20" },
    ],
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
    ],
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
    ],
  },
];
