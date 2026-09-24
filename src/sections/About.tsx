"use client";

import { ChevronRight, Layout, Server, ShieldCheck } from "lucide-react";

import SectionHeader from "@/components/SectionHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useDictionary } from "@/i18n";
import { cn } from "@/lib/utils";

const ICONS_BY_ID: Record<string, React.ComponentType<{ className?: string }>> = {
  frontend: Layout,
  backend: Server,
  devops: ShieldCheck,
};

/**
 * About section component.
 * Displays curriculum-based engineering domains and core competencies
 * using luxury glass cards with project theme styling and circular chevron highlights.
 */
export default function About() {
  const { dict } = useDictionary();
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="about" className="section-wrapper">
      <SectionHeader title={dict.about.title} subtitle={dict.about.subtitle} />

      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
      >
        {dict.about.cards.map((card, index) => {
          const Icon = ICONS_BY_ID[card.id] ?? Layout;
          const isLastOnTablet = index === 2;

          return (
            <div
              key={card.id}
              className={cn(
                "group relative flex flex-col justify-between p-7 sm:p-8 lg:p-9 rounded-3xl border border-border/40 bg-card backdrop-blur-xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-border/70 dark:hover:bg-white/[0.04] reveal-fade-up overflow-hidden",
                "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 dark:before:via-white/15 before:to-transparent",
                isLastOnTablet && "md:col-span-2 lg:col-span-1",
              )}
              style={{ "--reveal-delay": `${index * 150}ms` } as React.CSSProperties}
            >
              <div>
                {/* Icon Squircle */}
                <div className="size-12 rounded-2xl bg-neutral-200/80 dark:bg-white/[0.05] border border-border/50 flex items-center justify-center mb-6 text-foreground group-hover:scale-105 transition-transform duration-300 shadow-sm">
                  <Icon className="size-6 text-foreground/80 dark:text-zinc-200" />
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-normal">
                  {card.description}
                </p>
              </div>

              {/* Skills list with circular chevron icons */}
              <div className="pt-5 border-t border-border/30 mt-auto">
                <ul className="space-y-3">
                  {card.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground/85 dark:text-zinc-300 font-medium"
                    >
                      <span className="size-4.5 rounded-full border border-neutral-400/50 dark:border-zinc-700/80 flex items-center justify-center flex-shrink-0 text-muted-foreground group-hover:border-zinc-400 dark:group-hover:border-zinc-500 transition-colors">
                        <ChevronRight className="size-2.5 text-muted-foreground" />
                      </span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
