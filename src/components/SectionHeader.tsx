import type { SectionHeaderProps } from "@/types";

/**
 * Reusable section heading with a decorative divider and optional subtitle.
 * Used by every page section to maintain consistent visual hierarchy.
 */
export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="flex flex-col mb-16">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
        {title}
      </h2>
      <div className="w-20 h-1 bg-foreground/20 rounded-full" />
      {subtitle && (
        <p className="mt-6 text-muted-foreground max-w-2xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
