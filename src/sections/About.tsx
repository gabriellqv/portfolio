"use client";

import { Layout, Server, ShieldCheck } from "lucide-react";

import CountUp from "@/components/CountUp";
import SectionHeader from "@/components/SectionHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useDictionary } from "@/i18n";

const ICONS_BY_ID: Record<string, React.ComponentType<{ className?: string }>> = {
  frontend: Layout,
  backend: Server,
  devops: ShieldCheck,
};

/**
 * About section component.
 * Editorial layout inspired by high-craft software engineering portfolios:
 * 1. Open narrative directly on canvas without card enclosures.
 * 2. High-impact metrics strip framed with subtle structural divider lines.
 * 3. Tri-column architectural engineering domains with clean typographic hierarchy.
 */
export default function About() {
  const { dict } = useDictionary();
  const narrativeRef = useScrollReveal<HTMLDivElement>();
  const statsRef = useScrollReveal<HTMLDivElement>();
  const domainsRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="about" className="section-wrapper">
      <SectionHeader title={dict.about.title} subtitle={dict.about.subtitle} />

      {/* Narrative Headline & Bio */}
      <div ref={narrativeRef} className="reveal-fade-up max-w-4xl space-y-6">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
          {dict.about.headline}
        </h3>

        <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed font-normal">
          <p>{dict.about.bioP1}</p>
          <p>{dict.about.bioP2}</p>
        </div>
      </div>

      {/* Editorial Metrics Strip */}
      <div
        ref={statsRef}
        className="reveal-fade-up my-12 sm:my-16 py-8 sm:py-10 border-y border-border/70 grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12"
      >
        {dict.about.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <CountUp
              value={stat.value}
              duration={1100}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground"
            />
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-muted-foreground mt-2">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Engineering Domains (3 Columns without card boxes) */}
      <div
        ref={domainsRef}
        className="reveal-fade-up grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 pt-2"
      >
        {dict.about.cards.map((domain) => {
          const Icon = ICONS_BY_ID[domain.id] ?? Layout;

          return (
            <div key={domain.id} className="flex flex-col">
              <div className="flex items-center gap-2.5 mb-3.5">
                <Icon className="size-5 text-foreground shrink-0" />
                <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  {domain.title}
                </h4>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 font-normal">
                {domain.description}
              </p>

              <div className="mt-auto pt-4 border-t border-border/40">
                <ul className="space-y-2">
                  {domain.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground/85 font-medium"
                    >
                      <span className="size-1 rounded-full bg-foreground/60 shrink-0" />
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
