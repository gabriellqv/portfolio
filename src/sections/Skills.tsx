"use client";

import { useTheme } from "next-themes";

import SectionHeader from "@/components/SectionHeader";
import { skillCategories } from "@/data/skills";
import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

/**
 * Skills section displaying technologies grouped by category in a card grid.
 *
 * Each skill item is tinted with its brand color at low opacity, creating
 * a subtle colored badge effect. Opacity values are slightly higher in
 * light mode to compensate for the lighter background.
 *
 * Skills with a white hex color (#FFFFFF) receive a neutral gray badge
 * style instead, since white would be invisible on the card background.
 */
export default function Skills() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  const isLight = mounted && resolvedTheme === "light";
  const bgOpacity = isLight ? "25" : "15";
  const borderOpacity = isLight ? "40" : "30";

  return (
    <section id="skills" className="section-wrapper">
      <SectionHeader
        title="Habilidades Técnicas"
        subtitle="Especializado em desenvolvimento moderno de software, utilizo as melhores tecnologias do mercado para construir sistemas escaláveis, seguros e de alta performance."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {skillCategories.map((category, idx) => (
          <div
            key={category.title}
            className={cn("flex flex-col p-8 card-base", idx === 4 && "md:col-span-2")}
          >
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border/40">
              <div className="p-2 bg-white dark:bg-neutral-800/50 rounded-lg border border-border/50">
                <category.icon className="size-5 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
            </div>

            <div
              className={cn(
                "grid gap-3",
                idx === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2",
              )}
            >
              {category.skills.map((skill) => {
                const Icon = skill.icon;
                const isWhite = skill.hex === "#FFFFFF";

                return (
                  <div
                    key={skill.name}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all hover:scale-105",
                      isWhite &&
                        "border-neutral-300 bg-neutral-200/50 dark:border-white/30 dark:bg-white/10",
                    )}
                    style={
                      isWhite
                        ? undefined
                        : {
                            backgroundColor: `${skill.hex}${bgOpacity}`,
                            borderColor: `${skill.hex}${borderOpacity}`,
                          }
                    }
                  >
                    <Icon
                      size={18}
                      {...(isWhite ? {} : { style: { color: skill.hex } })}
                      className={cn(
                        "shrink-0",
                        isWhite && "text-neutral-900 dark:text-white",
                      )}
                    />
                    <span className="text-sm font-medium text-foreground">
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
