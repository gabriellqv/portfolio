"use client";

import Image from "next/image";

import SectionHeader from "@/components/SectionHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useDictionary } from "@/i18n";

/**
 * Education section component.
 * Displays academic history and degrees using an open timeline layout without card enclosures.
 */
export default function Education() {
  const { dict } = useDictionary();
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="education" className="section-wrapper">
      <SectionHeader title={dict.education.title} subtitle={dict.education.subtitle} />

      <div ref={ref} className="relative pl-6 sm:pl-8 md:pl-10">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border/80 dark:bg-[#23262d]" />
        <div className="absolute -left-1 top-6 size-2.5 rounded-full bg-foreground" />

        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12">
          {/* Period */}
          <div className="md:w-1/4 pt-1 sm:pt-2 reveal-fade-up">
            <p className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1]">
              2018 —<br className="hidden sm:inline" /> 2023
            </p>
          </div>

          {/* Academic Content */}
          <div className="md:w-3/4 reveal-fade-up flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
              <div className="flex gap-4 items-center">
                <div className="p-2 bg-neutral-100 dark:bg-[#16181d] rounded-md border border-border/70 shrink-0 flex items-center justify-center size-12 sm:size-14">
                  <Image
                    src="/uninove.webp"
                    alt={dict.education.universityLogoAlt}
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                    {dict.education.institution}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5">
                    {dict.education.degree}
                  </p>
                </div>
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2.5 py-1 bg-neutral-100 dark:bg-[#16181d] rounded-sm">
                {dict.education.completed}
              </span>
            </div>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 max-w-2xl font-normal">
              {dict.education.description}
            </p>

            <div className="flex flex-wrap gap-x-2.5 gap-y-1.5 text-xs text-muted-foreground pt-4 border-t border-border/40">
              <span className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
                Grade & Tópicos:
              </span>
              {dict.education.tags.map((tag, i) => (
                <span key={tag} className="text-foreground/80 font-medium">
                  {tag}
                  {i < dict.education.tags.length - 1 ? " ·" : ""}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
