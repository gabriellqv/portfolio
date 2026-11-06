"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { SectionHeaderProps } from "@/types";

/**
 * Reusable section heading with optional subtitle.
 * Uses an editorial presentation with a crisp structural divider,
 * large confident typography, and comfortable reading measure.
 */
export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="reveal-fade-up flex flex-col mb-12 sm:mb-16 md:mb-20 border-t border-border/70 pt-8 sm:pt-10"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
