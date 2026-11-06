"use client";

import SectionHeader from "@/components/SectionHeader";
import { skillCategories } from "@/data/skills";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useDictionary } from "@/i18n";
import type { SkillCategory } from "@/types";

/**
 * Single skill category group in an open editorial layout.
 * Eliminates outer card containers and heavy individual box borders.
 */
function SkillCategoryGroup({ category }: { category: SkillCategory }) {
  const { dict } = useDictionary();
  const ref = useScrollReveal<HTMLDivElement>("-100px");

  return (
    <div ref={ref} className="reveal-fade-up flex flex-col">
      <div className="flex items-center gap-2.5 pb-3 border-b border-border/70 mb-4">
        <category.icon className="size-5 text-foreground shrink-0" />
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
          {dict.skills.categoryTitles[category.title] ?? category.title}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => {
          const Icon = skill.icon;

          return (
            <span
              key={skill.name}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs sm:text-sm font-medium text-foreground/90 bg-neutral-100/80 dark:bg-[#16181d] rounded-sm hover:bg-neutral-200/80 dark:hover:bg-[#20232a] transition-colors"
            >
              <Icon
                size={14}
                className="shrink-0 text-foreground/75 dark:text-[#f3f4f6]"
              />
              <span>{skill.name}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Skills section component.
 * Categorized technical proficiencies presented in an open, structured editorial panel.
 */
export default function Skills() {
  const { dict } = useDictionary();

  return (
    <section id="skills" className="section-wrapper">
      <SectionHeader title={dict.skills.title} subtitle={dict.skills.subtitle} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {skillCategories.map((category) => (
          <SkillCategoryGroup key={category.title} category={category} />
        ))}
      </div>
    </section>
  );
}
