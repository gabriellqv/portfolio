"use client";

import Image from "next/image";
import Link from "next/link";

import { Briefcase, ChevronRightCircle, Code2, ExternalLink, Lock } from "lucide-react";
import { SiGithub } from "react-icons/si";

import { buttonVariants } from "@/components/Button";
import SectionHeader from "@/components/SectionHeader";
import { projects } from "@/data/projects";
import { getTechMeta } from "@/data/skills";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useDictionary } from "@/i18n";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

/**
 * Featured Project Card.
 * Full-width horizontal showcase with mockup preview on one side,
 * structured typography, category badge, highlights, and action buttons on the other.
 */
function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  const { dict } = useDictionary();
  const ref = useScrollReveal<HTMLDivElement>();

  const item = dict.projectItems[project.title] ?? {
    subtitle: project.subtitle,
    description: project.description,
    status: project.status,
    highlights: project.highlights,
  };

  return (
    <div
      ref={ref}
      className="reveal-fade-up flex flex-col lg:flex-row group card-base rounded-2xl sm:rounded-3xl overflow-hidden p-5 sm:p-7 md:p-8 lg:p-10 gap-6 sm:gap-8 lg:gap-12 items-center"
      style={{ "--reveal-delay": `${index * 100}ms` } as React.CSSProperties}
    >
      {/* Mockup photo container */}
      <div className="w-full lg:w-1/2 rounded-xl sm:rounded-2xl bg-neutral-100/80 dark:bg-[#141619] border border-border/60 dark:border-[#2c2e33] p-2.5 sm:p-4 md:p-6 flex items-center justify-center overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          width={1200}
          height={675}
          priority={true}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      {/* Project content and metadata */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30">
            <Briefcase className="size-3 shrink-0" />
            <span>{dict.projects.badgeProfessional}</span>
            {project.company && (
              <span className="opacity-75 font-normal">({project.company})</span>
            )}
          </span>
          {item.status && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-muted/60 text-muted-foreground border border-border/40 font-medium">
              {item.status}
            </span>
          )}
        </div>

        <div>
          <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            {project.title}
          </h4>
          {item.subtitle && (
            <p className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 mt-1">
              {item.subtitle}
            </p>
          )}
        </div>

        <p className="text-muted-foreground leading-relaxed mt-3 sm:mt-4 text-xs sm:text-sm md:text-base">
          {item.description}
        </p>

        {/* Feature bullet points (laschisa tags style) */}
        {item.highlights && item.highlights.length > 0 && (
          <ul className="flex flex-col gap-1.5 sm:gap-2 my-4 sm:my-5">
            {item.highlights.map((highlight) => (
              <li
                key={highlight}
                className="text-xs sm:text-sm text-foreground/85 flex items-center gap-2"
              >
                <ChevronRightCircle className="size-3.5 text-emerald-500 shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
          {project.techs.map((tech) => {
            const meta = getTechMeta(tech);
            const Icon = meta.icon;

            return (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg border border-border/60 dark:border-[#2c2e33] bg-neutral-100/60 dark:bg-[#141619] text-xs font-medium text-foreground"
              >
                {Icon && (
                  <Icon
                    size={14}
                    className="shrink-0 text-foreground/80 dark:text-[#f3f4f6]"
                  />
                )}
                <span>{tech}</span>
              </span>
            );
          })}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 mt-auto">
          {project.deploy !== "#" && (
            <Link
              href={project.deploy}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "primary", size: "sm" }),
                "rounded-full w-full sm:w-auto",
              )}
            >
              <ExternalLink className="size-3.5 shrink-0" />
              <span>{dict.projects.viewProject}</span>
            </Link>
          )}

          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "rounded-full w-full sm:w-auto",
              )}
            >
              <SiGithub className="size-3.5 shrink-0" />
              <span>{dict.projects.repository}</span>
            </Link>
          )}

          {!project.github && (
            <span className="text-xs text-muted-foreground flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-[#141619] border border-border/70 dark:border-[#2c2e33] select-none">
              <Lock className="size-3 text-muted-foreground/70 shrink-0" />
              <span>{dict.projects.privateRepoNotice}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Secondary Project Card (laschisa.dev DefaultCard style).
 * Vertical card with desktop + mobile mockup on top,
 * followed by badges, description, highlights, tech badges, and action buttons.
 */
function ProjectCard({
  project,
  index,
  isLastOnTablet,
}: {
  project: Project;
  index: number;
  isLastOnTablet?: boolean;
}) {
  const { dict } = useDictionary();
  const ref = useScrollReveal<HTMLDivElement>();

  const item = dict.projectItems[project.title] ?? {
    subtitle: project.subtitle,
    description: project.description,
    status: project.status,
    highlights: project.highlights,
  };

  return (
    <div
      ref={ref}
      className={cn(
        "reveal-fade-up flex flex-col group card-base rounded-2xl sm:rounded-3xl overflow-hidden",
        isLastOnTablet && "md:col-span-2 lg:col-span-1",
      )}
      style={{ "--reveal-delay": `${index * 100}ms` } as React.CSSProperties}
    >
      {/* Mockup photo container */}
      <div className="w-full bg-neutral-100/80 dark:bg-[#141619] border-b border-border/60 dark:border-[#2c2e33] p-3 sm:p-5 md:p-6 flex items-center justify-center overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          width={1200}
          height={675}
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <div className="p-5 sm:p-7 md:p-8 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30">
            <Code2 className="size-3 shrink-0" />
            <span>{dict.projects.badgePersonal}</span>
          </span>
          {item.status && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-muted/60 text-muted-foreground border border-border/40 font-medium">
              {item.status}
            </span>
          )}
        </div>

        <div>
          <h4 className="text-2xl font-bold text-foreground">{project.title}</h4>
          {item.subtitle && (
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mt-1">
              {item.subtitle}
            </p>
          )}
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mt-3 flex-1">
          {item.description}
        </p>

        {/* Feature bullet points */}
        {item.highlights && item.highlights.length > 0 && (
          <ul className="flex flex-col gap-1.5 my-4">
            {item.highlights.map((highlight) => (
              <li
                key={highlight}
                className="text-xs text-foreground/85 flex items-center gap-2"
              >
                <ChevronRightCircle className="size-3 text-blue-500 shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techs.map((tech) => {
            const meta = getTechMeta(tech);
            const Icon = meta.icon;

            return (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border/60 dark:border-[#2c2e33] bg-neutral-100/60 dark:bg-[#141619] text-xs font-medium text-foreground"
              >
                {Icon && (
                  <Icon
                    size={12}
                    className="shrink-0 text-foreground/80 dark:text-[#f3f4f6]"
                  />
                )}
                <span>{tech}</span>
              </span>
            );
          })}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-auto">
          {project.deploy !== "#" && (
            <Link
              href={project.deploy}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "primary", size: "sm" }),
                "rounded-full flex-1 justify-center",
              )}
            >
              <ExternalLink className="size-3.5 shrink-0" />
              <span>{dict.projects.viewProject}</span>
            </Link>
          )}

          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "rounded-full flex-1 justify-center",
              )}
            >
              <SiGithub className="size-3.5 shrink-0" />
              <span>{dict.projects.repository}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Projects section component.
 * Displays portfolio projects divided into Professional/Client work and Personal projects,
 * presented through desktop + mobile device mockups based on laschisa.dev.
 */
export default function Projects() {
  const { dict } = useDictionary();

  const professionalProjects = projects.filter(
    (project) => project.category === "professional",
  );
  const personalProjects = projects.filter((project) => project.category === "personal");

  return (
    <section id="projects" className="section-wrapper">
      <SectionHeader title={dict.projects.title} subtitle={dict.projects.subtitle} />

      <div className="space-y-16">
        {/* Professional & Client Projects Subsection */}
        {professionalProjects.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center gap-3 pb-3 border-b border-border/40">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Briefcase className="size-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  {dict.projects.professionalTitle}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {dict.projects.professionalSubtitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-12">
              {professionalProjects.map((project, index) => (
                <FeaturedProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* Personal & Open Source Projects Subsection */}
        {personalProjects.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center gap-3 pb-3 border-b border-border/40">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                <Code2 className="size-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  {dict.projects.personalTitle}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {dict.projects.personalSubtitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {personalProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={professionalProjects.length + index}
                  isLastOnTablet={index === personalProjects.length - 1}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
