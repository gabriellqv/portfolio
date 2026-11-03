"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { SectionHeaderProps } from "@/types";

/**
 * Reusable section heading with optional subtitle.
 * Used by page sections to maintain a consistent typographic hierarchy.
 */
export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="flex flex-col mb-10 sm:mb-14 md:mb-16">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
