/**
 * Skills section with categorized proficiency bars.
 *
 * Category and level keys are stable English IDs (e.g. "languages",
 * "advanced") that map to translated display strings via
 * `t.skills.categories[key]` and `t.skills.levels[key]`. This
 * decoupling ensures the data structure survives translation edits
 * without silent breakage in icon or bar-width lookups.
 *
 * The proficiency bars animate from 0% to their target width on first
 * viewport intersection, using staggered `transitionDelay` per skill
 * for a cascade effect. The observer disconnects after first trigger
 * to prevent re-animation on scroll-back.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/i18n/context";
import { Code2, Layout, Server, BookOpen, GitBranch, Palette } from "lucide-react";
import type { ElementType } from "react";

/** Maps category keys to representative Lucide icons. */
const CATEGORY_ICONS: Record<string, ElementType> = {
  languages: Code2,
  frontend: Layout,
  backend: Server,
  fundamentals: BookOpen,
  devops: GitBranch,
  design: Palette,
};

/** Fixed bar width for each proficiency level — ensures visual consistency. */
const LEVEL_PERCENT: Record<string, number> = {
  advanced: 90,
  proficient: 70,
  working: 50,
  familiar: 30,
};

const skillCategories = [
  {
    key: "languages",
    skills: [
      { name: "TypeScript", levelKey: "advanced" },
      { name: "JavaScript", levelKey: "advanced" },
      { name: "SQL", levelKey: "proficient" },
      { name: "Python", levelKey: "familiar" },
      { name: "Rust", levelKey: "familiar" },
    ],
  },
  {
    key: "frontend",
    skills: [
      { name: "React.js", levelKey: "advanced" },
      { name: "HTML5", levelKey: "advanced" },
      { name: "CSS3", levelKey: "advanced" },
      { name: "Tailwind CSS", levelKey: "advanced" },
      { name: "Next.js", levelKey: "advanced" },
      { name: "Framer Motion", levelKey: "proficient" },
      { name: "Electron", levelKey: "familiar" },
      { name: "Tauri", levelKey: "familiar" },
    ],
  },
  {
    key: "backend",
    skills: [
      { name: "Node.js", levelKey: "advanced" },
      { name: "Express.js", levelKey: "advanced" },
      { name: "Prisma ORM", levelKey: "proficient" },
      { name: "PostgreSQL", levelKey: "proficient" },
      { name: "NestJS", levelKey: "proficient" },
      { name: "Zod", levelKey: "proficient" },
      { name: "Jest / Cypress", levelKey: "proficient" },
      { name: "MongoDB", levelKey: "familiar" },
      { name: "Redis", levelKey: "familiar" },
      { name: "Vitest", levelKey: "familiar" },
      { name: "Swagger / OpenAPI", levelKey: "familiar" },
    ],
  },
  {
    key: "fundamentals",
    skills: [
      { name: "REST APIs", levelKey: "advanced" },
      { name: "SOLID / Clean Code", levelKey: "advanced" },
      { name: "Arquitetura em Camadas", levelKey: "advanced" },
      { name: "Autenticação JWT", levelKey: "advanced" },
      { name: "WebSockets", levelKey: "proficient" },
    ],
  },
  {
    key: "devops",
    skills: [
      { name: "Git / GitHub", levelKey: "advanced" },
      { name: "Postman", levelKey: "proficient" },
      { name: "Docker", levelKey: "proficient" },
      { name: "GitHub Actions (CI/CD)", levelKey: "proficient" },
    ],
  },
  {
    key: "design",
    skills: [
      { name: "Responsividade", levelKey: "advanced" },
      { name: "Acessibilidade", levelKey: "proficient" },
      { name: "Figma", levelKey: "familiar" },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLocale();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-20" ref={sectionRef}>
      <h2 className="mb-2 bg-linear-to-b from-white to-gray-500 bg-clip-text text-3xl font-bold text-transparent">{t.skills.title}</h2>
      <p className="text-fg-secondary mb-12 text-sm">{t.skills.subtitle}</p>

      <div className="grid gap-8 md:grid-cols-2">
        {skillCategories.map((category) => (
          <div
            key={category.key}
            className="border-edge bg-surface hover:border-edge-hover hover:bg-surface-hover hover:shadow-glow rounded-xl border p-3 shadow-lg backdrop-blur-[2px] transition-all duration-200 min-[20rem]:p-6"
          >
            <div className="mb-6 flex items-center gap-3">
              {(() => {
                const Icon = CATEGORY_ICONS[category.key];
                return Icon ? <Icon className="text-fg-secondary h-5 w-5" strokeWidth={2} /> : null;
              })()}
              <h3 className="text-fg-primary text-lg font-semibold">
                {t.skills.categories[category.key] || category.key}
              </h3>
            </div>

            <div className="space-y-4">
              {category.skills.map((skill, i) => (
                <div key={skill.name} className="group/skill">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-fg-highlight group-hover/skill:text-fg-primary text-sm transition-colors">
                      {skill.name}
                    </span>
                    <span className="group text-fg-secondary relative cursor-help text-xs font-medium">
                      {t.skills.levels[skill.levelKey] || skill.levelKey}
                      <span className="border-edge text-fg-highlight pointer-events-none absolute bottom-full left-0 z-10 mb-2 w-48 rounded-lg border bg-surface/90 p-2 text-[0.625rem] leading-relaxed opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 sm:right-0 sm:left-auto">
                        {t.skills.tooltips[skill.levelKey] || ""}
                      </span>
                    </span>
                  </div>
                  <div className="bg-surface-subtle h-1.5 w-full overflow-hidden rounded-full">
                    <div
                      className="h-full rounded-full bg-fg-secondary transition-all duration-1500 ease-out group-hover/skill:bg-fg-primary"
                      style={{
                        width: isVisible ? `${LEVEL_PERCENT[skill.levelKey] ?? 50}%` : "0%",
                        transitionDelay: `${i * 100}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
