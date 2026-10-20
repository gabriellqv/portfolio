"use client";

import { useTheme } from "next-themes";

import SectionHeader from "@/components/SectionHeader";
import { skillCategories } from "@/data/skills";
import { useMounted } from "@/hooks/useMounted";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useDictionary } from "@/i18n";
import { cn } from "@/lib/utils";
import type { SkillCategory } from "@/types";

/**
 * Single skill category card with scroll-triggered fade-up animation.
 * Skill badges inside use scale-in with stagger delays.
 */
function SkillCategoryCard({
  category,
  index,
  isLast,
}: {
  category: SkillCategory;
  index: number;
  isLast: boolean;
}) {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const { dict } = useDictionary();
  const ref = useScrollReveal<HTMLDivElement>("-100px");

  const isLight = mounted && resolvedTheme === "light";
  const bgOpacity = isLight ? "15" : "15";
  const borderOpacity = isLight ? "35" : "30";

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col p-5 sm:p-7 md:p-8 card-base reveal-fade-up",
        isLast && "md:col-span-2",
      )}
      style={{ "--reveal-delay": `${index * 100}ms` } as React.CSSProperties}
    >
      <div className="flex items-center gap-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border/40 dark:border-[#2c2e33]/60">
        <div className="flex items-center justify-center size-9 sm:size-10 bg-neutral-100 dark:bg-[#141619] rounded-xl border border-border/70 dark:border-[#2c2e33]">
          <category.icon className="size-4.5 sm:size-5 text-muted-foreground" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-foreground">
          {dict.skills.categoryTitles[category.title] ?? category.title}
        </h3>
      </div>

      <div className="grid gap-2 sm:gap-2.5 grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(130px,1fr))]">
        {category.skills.map((skill, skillIdx) => {
          const Icon = skill.icon;
          const isWhite = skill.hex === "#FFFFFF";

          return (
            <div
              key={skill.name}
              className={cn(
                "flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border transition-all hover:scale-105 reveal-scale-in min-w-0",
                isWhite &&
                  "border-neutral-200 bg-neutral-100 text-foreground dark:border-[#2c2e33] dark:bg-[#141619] dark:text-[#f3f4f6]",
              )}
              style={
                {
                  "--reveal-delay": `${skillIdx * 20}ms`,
                  ...(isWhite
                    ? {}
                    : {
                        backgroundColor: `${skill.hex}${bgOpacity}`,
                        borderColor: `${skill.hex}${borderOpacity}`,
                      }),
                } as React.CSSProperties
              }
            >
              <Icon
                size={16}
                {...(isWhite ? {} : { style: { color: skill.hex } })}
                className={cn("shrink-0", isWhite && "text-neutral-900 dark:text-white")}
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
 * Integrates an infinite marquee carousel and a categorized bento-box grid
 * to showcase technical proficiencies and tooling expertise.
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
            index={idx}
            isLast={idx === skillCategories.length - 1}
          />
        ))}
      </div>
    </>
  );
}
