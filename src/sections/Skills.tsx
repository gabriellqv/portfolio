"use client";

import SectionHeader from "@/components/SectionHeader";
import { skillCategories } from "@/data/skills";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useDictionary } from "@/i18n";
import { cn } from "@/lib/utils";
import type { SkillCategory } from "@/types";

/**
 * Single skill category card with clean badge layout.
 */
function SkillCategoryCard({
  category,
  isLast,
}: {
  category: SkillCategory;
  isLast: boolean;
}) {
  const { dict } = useDictionary();
  const ref = useScrollReveal<HTMLDivElement>("-100px");

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col p-5 sm:p-7 md:p-8 card-base reveal-fade-up",
        isLast && "md:col-span-2",
      )}
    >
      <div className="flex items-center gap-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border/40 dark:border-[#2c2e33]/60">
        <div className="flex items-center justify-center size-9 sm:size-10 bg-neutral-100 dark:bg-[#141619] rounded-lg border border-border/70 dark:border-[#2c2e33]">
          <category.icon className="size-4.5 sm:size-5 text-foreground" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-foreground">
          {dict.skills.categoryTitles[category.title] ?? category.title}
        </h3>
      </div>

      <div className="grid gap-2 sm:gap-2.5 grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(130px,1fr))]">
        {category.skills.map((skill) => {
          const Icon = skill.icon;

          return (
            <div
              key={skill.name}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 dark:border-[#2c2e33] bg-neutral-100/60 dark:bg-[#141619] min-w-0"
            >
              <Icon
                size={16}
                className="shrink-0 text-foreground/80 dark:text-[#f3f4f6]"
              />
              <span className="text-xs sm:text-sm font-medium text-foreground truncate">
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Skills section component.
 * Categorized technical proficiencies and tooling expertise presented
 * with consistent, grounded surface styling.
 */
export default function Skills() {
  return (
    <section id="skills" className="section-wrapper">
      <SkillsContent />
    </section>
  );
}

function SkillsContent() {
  const { dict } = useDictionary();

  return (
    <>
      <SectionHeader title={dict.skills.title} subtitle={dict.skills.subtitle} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {skillCategories.map((category, idx) => (
          <SkillCategoryCard
            key={category.title}
            category={category}
            isLast={idx === skillCategories.length - 1}
          />
        ))}
      </div>
    </>
  );
}
