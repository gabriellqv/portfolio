"use client";

import { Layout, Server, ShieldCheck } from "lucide-react";

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
 * Features:
 * 1. Narrative presentation card with bio and verified engineering metrics.
 * 2. Tri-column engineering domain cards with clean typographic structure.
 */
export default function About() {
  const { dict } = useDictionary();
  const narrativeRef = useScrollReveal<HTMLDivElement>();
  const cardsRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="about" className="section-wrapper space-y-10 lg:space-y-12">
      <SectionHeader title={dict.about.title} subtitle={dict.about.subtitle} />

      {/* Narrative Card */}
      <div
        ref={narrativeRef}
        className="card-base p-6 sm:p-8 md:p-10 lg:p-12 reveal-fade-up"
      >
        <div className="flex flex-col space-y-4 sm:space-y-6 max-w-4xl">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            {dict.about.headline}
          </h3>

          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed font-normal">
            <p>{dict.about.bioP1}</p>
            <p>{dict.about.bioP2}</p>
          </div>

          {/* Stats Row */}
          <div className="pt-6 sm:pt-8 mt-2 border-t border-border/40 flex flex-wrap items-center gap-8 sm:gap-12 md:gap-16">
            {dict.about.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col min-w-[100px] sm:min-w-0">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-medium text-muted-foreground mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engineering Domain Cards */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch"
      >
        {dict.about.cards.map((card, index) => {
          const Icon = ICONS_BY_ID[card.id] ?? Layout;
          const isLastOnTablet = index === 2;

          return (
            <div
              key={card.id}
              className={cn(
                "flex flex-col justify-between p-6 sm:p-7 md:p-8 card-base reveal-fade-up",
                isLastOnTablet && "md:col-span-2 lg:col-span-1",
              )}
            >
              <div>
                <div className="size-10 rounded-lg bg-neutral-100 dark:bg-[#141619] border border-border/70 dark:border-[#2c2e33] flex items-center justify-center mb-5 text-foreground">
                  <Icon className="size-5 text-foreground" />
                </div>

                <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-3">
                  {card.title}
                </h4>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-normal">
                  {card.description}
                </p>
              </div>

              <div className="pt-5 border-t border-border/30 dark:border-[#2c2e33]/60 mt-auto">
                <ul className="space-y-2.5">
                  {card.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground/90 font-medium"
                    >
                      <span className="size-1.5 rounded-full bg-foreground/40 shrink-0" />
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
