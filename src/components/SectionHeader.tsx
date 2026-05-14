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
    <div ref={ref} className="flex flex-col mb-16">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
        {title}
      </h2>
      <div className="w-20 h-1 bg-foreground/20 rounded-full reveal-line-grow" />
      {subtitle && (
        <p className="mt-6 text-muted-foreground max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
