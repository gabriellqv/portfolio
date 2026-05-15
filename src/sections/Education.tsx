"use client";

import Image from "next/image";

import SectionHeader from "@/components/SectionHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useDictionary } from "@/i18n";

export default function Education() {
  const { dict } = useDictionary();
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="education" className="section-wrapper">
      <SectionHeader title={dict.education.title} subtitle={dict.education.subtitle} />

      <div ref={ref} className="relative pl-8 md:pl-12">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-black/20 dark:bg-border/40" />
        <div className="absolute -left-[4.5px] top-10 w-2.5 h-2.5 rounded-full border border-neutral-800 dark:border-neutral-500 bg-background reveal-dot-pulse" />

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <div
            className="md:w-1/4 pt-8 reveal-fade-up"
            style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
          >
            <p className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1]">
              2018 -<br />
              2023
            </p>
          </div>

          <div
            className="md:w-3/4 reveal-fade-up"
            style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
          >
            <div className="flex flex-col p-8 card-base">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-background rounded-xl border border-border/50 shrink-0 flex items-center justify-center w-20 h-20">
                    <Image
                      src="/uninove.webp"
                      alt={dict.education.universityLogoAlt}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-foreground leading-tight mb-1">
                      {dict.education.institution}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      {dict.education.degree}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 px-3 py-1 rounded-full border border-border/30 bg-white dark:bg-muted/20 text-xs font-semibold text-foreground tracking-wider uppercase">
                  {dict.education.completed}
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {dict.education.description}
              </p>

              <div className="flex flex-wrap gap-2.5">
                {dict.education.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full border border-border/20 bg-white dark:bg-muted/10 text-xs font-medium text-muted-foreground hover:bg-neutral-50 dark:hover:bg-muted/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
