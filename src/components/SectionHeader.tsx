"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { SectionHeaderProps } from "@/types";

/**
 * Reusable section heading with a decorative divider and optional subtitle.
 * Used by every page section to maintain consistent visual hierarchy.
 * The decorative line animates with a grow-from-left effect on scroll.
 */
export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="flex flex-col mb-10 sm:mb-14 md:mb-16">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-3 sm:mb-4">
        {title}
      </h2>
      <div className="w-16 sm:w-20 h-1 bg-foreground/20 rounded-full reveal-line-grow" />
      {subtitle && (
        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
