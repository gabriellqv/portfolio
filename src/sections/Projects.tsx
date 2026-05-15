"use client";

import Image from "next/image";
import Link from "next/link";

import { ExternalLink, FolderGit2 } from "lucide-react";
import { SiGithub } from "react-icons/si";

import SectionHeader from "@/components/SectionHeader";
import { projects } from "@/data/projects";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useDictionary } from "@/i18n";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

/**
 * Single project card with scroll-triggered fade-up animation.
 * Uses its own IntersectionObserver so each card animates independently.
 */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { dict } = useDictionary();
  const ref = useScrollReveal<HTMLDivElement>();

  const item = dict.projectItems[project.title] ?? {
    description: project.description,
    status: project.status,
  };

  return (
    <div
      ref={ref}
      className="reveal-fade-up flex flex-col lg:flex-row group card-base overflow-hidden"
      style={{ "--reveal-delay": `${index * 100}ms` } as React.CSSProperties}
    >
      <div className="w-full lg:w-1/2 min-h-[16rem] bg-card relative overflow-hidden border-b lg:border-b-0 lg:border-r border-border/40 flex items-center justify-center">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/30 to-neutral-900/10" />
            <div className="relative z-10 flex flex-col items-center justify-center text-muted-foreground group-hover:scale-105 transition-transform duration-500">
              <FolderGit2 className="size-16 mb-4 opacity-50" />
              <span className="text-xl font-bold tracking-widest uppercase opacity-40">
                {project.title}
              </span>
            </div>
          </>
        )}
      </div>

      <div className="w-full lg:w-1/2 p-8 md:p-10 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
          <span className="px-3 py-1 rounded-full border border-border/30 bg-white dark:bg-muted/20 text-xs font-semibold text-foreground tracking-wider">
            {item.status}
          </span>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.techs.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-md border border-border/20 bg-white dark:bg-neutral-900/50 text-xs font-medium text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-auto">
          {project.deploy !== "#" && (
            <Link
              href={project.deploy}
              className={cn(
                "flex justify-center items-center gap-2 py-2 px-4 rounded-full bg-foreground text-background font-semibold text-sm transition-all hover:bg-neutral-800 dark:hover:bg-neutral-200 hover:scale-[1.02] active:scale-95 whitespace-nowrap",
                "focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              <ExternalLink className="size-3.5 shrink-0" />
              <span>{dict.projects.viewProject}</span>
            </Link>
          )}

          <Link
            href={project.github}
            className={cn(
              "flex justify-center items-center gap-2 py-2 px-4 rounded-full border border-border/50 bg-white dark:bg-transparent hover:bg-neutral-100 dark:hover:bg-white/5 text-foreground font-medium text-sm transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap",
              "focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            <SiGithub className="size-3.5 shrink-0" />
            <span>{dict.projects.repository}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { dict } = useDictionary();

  return (
    <section id="projects" className="section-wrapper">
      <SectionHeader title={dict.projects.title} subtitle={dict.projects.subtitle} />

      <div className="grid grid-cols-1 gap-12">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
