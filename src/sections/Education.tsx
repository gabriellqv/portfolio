"use client";

import Image from "next/image";

import SectionHeader from "@/components/SectionHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useDictionary } from "@/i18n";

/**
 * Education section component.
 * Displays academic history and degrees using a clean timeline layout.
 */
export default function Education() {
  const { dict } = useDictionary();
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="education" className="section-wrapper">
      <SectionHeader title={dict.education.title} subtitle={dict.education.subtitle} />

      <div ref={ref} className="relative pl-6 sm:pl-8 md:pl-10">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border dark:bg-[#2c2e33]" />
        <div className="absolute -left-1 top-8 size-2 rounded-full bg-foreground" />

        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12">
          <div className="md:w-1/4 pt-3 sm:pt-6 reveal-fade-up">
            <p className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1]">
              2018 -<br className="hidden sm:inline" /> 2023
            </p>
          </div>

          <div className="md:w-3/4 reveal-fade-up">
            <div className="flex flex-col p-5 sm:p-7 md:p-8 card-base">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                <div className="flex gap-3 sm:gap-4 items-center">
                  <div className="p-2 sm:p-3 bg-neutral-100 dark:bg-[#141619] rounded-lg border border-border/70 dark:border-[#2c2e33] shrink-0 flex items-center justify-center size-14 sm:size-16">
                    <Image
                      src="/uninove.webp"
                      alt={dict.education.universityLogoAlt}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground leading-tight mb-1">
                      {dict.education.institution}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                      {dict.education.degree}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 px-2.5 py-1 rounded-md border border-border/60 dark:border-[#2c2e33] bg-neutral-100/60 dark:bg-[#141619] text-xs font-medium text-foreground">
                  {dict.education.completed}
                </div>
              </div>

              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-6">
                {dict.education.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {dict.education.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md border border-border/50 dark:border-[#2c2e33] bg-neutral-100/40 dark:bg-[#141619] text-xs font-medium text-muted-foreground"
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
