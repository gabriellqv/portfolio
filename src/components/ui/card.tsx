/**
 * Project card component with cover image, contextual icons, and tech tags.
 *
 * The `TAG_ICONS` map provides visual differentiation between project types.
 * `getProjectIcons` deduplicates icons when multiple tags share the same
 * Lucide component (e.g. "TypeScript" and "React" both map to Code2),
 * capping at 2 icons per card for visual balance.
 *
 * The blur placeholder is a 20x12 inline SVG encoded as a data URI.
 * This avoids an extra network request while providing a dark shimmer
 * effect that matches the site's background color.
 */

import type { Project } from "@/types";
import Image from "next/image";
import {
  Globe,
  Code2,
  Server,
  Container,
  Cloud,
  Smartphone,
  Database,
  ShieldCheck,
  LayoutDashboard,
  ExternalLink,
} from "lucide-react";

const BLUR_DATA_URL =
  "data:image/svg+xml;base64," +
  btoa(
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="12"><rect width="20" height="12" fill="#111"/></svg>'
  );

/**
 * Maps technology tag names to representative Lucide icons.
 * Used to display up to 2 contextual icons per project card.
 */
const TAG_ICONS: Record<string, React.ElementType> = {
  "Next.js": Globe,
  React: Code2,
  TypeScript: Code2,
  "Node.js": Server,
  Docker: Container,
  AWS: Cloud,
  "Tailwind CSS": LayoutDashboard,
  "Canvas API": Smartphone,
  Stripe: ShieldCheck,
  Supabase: Database,
  Vercel: Cloud,
};

/**
 * Selects up to 2 unique icons from a project's tag list.
 * Deduplicates icons when multiple tags share the same visual representation.
 *
 * @param tags - Array of technology tag strings from the project data.
 * @returns Array of at most 2 unique Lucide icon components.
 */
function getProjectIcons(tags: string[]) {
  const icons: React.ElementType[] = [];
  for (const tag of tags) {
    if (TAG_ICONS[tag] && !icons.includes(TAG_ICONS[tag])) {
      icons.push(TAG_ICONS[tag]);
    }
    if (icons.length >= 2) break;
  }
  return icons;
}

interface ProjectCardProps {
  project: Project;
  /** When true, the cover image is preloaded (use for above-the-fold cards). */
  priority?: boolean;
}

/**
 * Displays a single project as a bordered card with cover image, icons,
 * description, and tech tags. The card uses glassmorphism styling and
 * reveals an external link icon on hover.
 */
export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const icons = getProjectIcons(project.tags);

  return (
    <div className="group border-edge bg-surface hover:border-edge-hover hover:bg-surface-hover hover:shadow-glow relative flex h-full flex-col overflow-hidden rounded-xl border shadow-lg backdrop-blur-[2px] transition-all duration-200">
      {project.image && (
        <div className="relative h-32 w-full overflow-hidden sm:h-40">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            priority={priority}
          />
        </div>
      )}

      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-3">
            {icons.map((Icon, i) => (
              <Icon
                key={i}
                className="text-fg-secondary group-hover:text-fg-primary h-5 w-5 transition-colors"
                strokeWidth={1.5}
              />
            ))}
          </div>
          {(project.links.live || project.links.github) && (
            <a
              href={project.links.live || project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
              aria-label={`View ${project.title}`}
            >
              <ExternalLink className="text-fg-secondary hover:text-fg-primary h-4 w-4 opacity-0 transition-all group-hover:opacity-100" />
            </a>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-fg-primary mb-2 text-lg font-semibold">{project.title}</h3>
          <p className="text-fg-secondary text-sm leading-relaxed">{project.description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-surface-subtle text-fg-secondary group-hover:text-fg-highlight rounded-sm px-2 py-0.5 text-xs transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
