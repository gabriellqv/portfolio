"use client";

import Image from "next/image";
import Link from "next/link";

import { ExternalLink, Lock } from "lucide-react";
import { SiGithub } from "react-icons/si";

import { buttonVariants } from "@/components/Button";
import SectionHeader from "@/components/SectionHeader";
import { projects } from "@/data/projects";
import { landingSites } from "@/data/sites";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useDictionary } from "@/i18n";
import { cn } from "@/lib/utils";
import type { LandingSite, Project } from "@/types";

/**
 * Featured Professional Project.
 * Architectural case-study layout: visual preview on one side,
 * structured technical narrative, highlights, and direct actions on the other.
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
      className="reveal-fade-up flex flex-col lg:flex-row gap-8 lg:gap-12 items-center pt-8 first:pt-0"
      style={{ "--reveal-delay": `${index * 100}ms` } as React.CSSProperties}
    >
      {/* Mockup Preview */}
      <div className="w-full lg:w-1/2 rounded-lg overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          width={1200}
          height={675}
          priority={true}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="w-full h-auto object-contain transition-transform duration-300 hover:scale-[1.01]"
        />
      </div>

      {/* Project Details */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-3">
          <span>
            {project.company
              ? `${dict.projects.badgeProfessional} — ${project.company}`
              : dict.projects.badgeProfessional}
          </span>
          {item.status && (
            <>
              <span>·</span>
              <span className="text-foreground">{item.status}</span>
            </>
          )}
        </div>

        <div>
          <h4 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
            {project.title}
          </h4>
          {item.subtitle && (
            <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-1">
              {item.subtitle}
            </p>
          )}
        </div>

        <p className="text-muted-foreground leading-relaxed mt-4 text-sm sm:text-base font-normal">
          {item.description}
        </p>

        {/* Feature Highlights */}
        {item.highlights && item.highlights.length > 0 && (
          <ul className="flex flex-col gap-2 my-5 border-l-2 border-border/80 pl-4">
            {item.highlights.map((highlight) => (
              <li
                key={highlight}
                className="text-xs sm:text-sm text-foreground/85 font-medium"
              >
                {highlight}
              </li>
            ))}
          </ul>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-muted-foreground my-4">
          <span className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
            Stack:
          </span>
          {project.techs.map((tech, i) => (
            <span key={tech} className="text-foreground/90 font-medium">
              {tech}
              {i < project.techs.length - 1 ? " ·" : ""}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-border/40">
          {project.deploy !== "#" && (
            <Link
              href={project.deploy}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "primary", size: "sm" }),
                "rounded-md",
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
                "rounded-md",
              )}
            >
              <SiGithub className="size-3.5 shrink-0" />
              <span>{dict.projects.repository}</span>
            </Link>
          )}

          {!project.github && (
            <span className="text-xs text-muted-foreground flex items-center gap-1.5 py-1 select-none">
              <Lock className="size-3 text-muted-foreground shrink-0" />
              <span>{dict.projects.privateRepoNotice}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Personal & Open Source Project.
 * Open column presentation without nested boxes or bubble cards.
 */
function ProjectCard({ project, index }: { project: Project; index: number }) {
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
      className="reveal-fade-up flex flex-col pt-6 border-t border-border/60"
      style={{ "--reveal-delay": `${index * 100}ms` } as React.CSSProperties}
    >
      {/* Mockup Preview */}
      <div className="w-full rounded-lg overflow-hidden mb-4">
        <Image
          src={project.image}
          alt={project.title}
          width={1200}
          height={675}
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="w-full h-auto object-contain transition-transform duration-300 hover:scale-[1.01]"
        />
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2">
          <span>{dict.projects.badgePersonal}</span>
          {item.status && (
            <>
              <span>·</span>
              <span className="text-foreground">{item.status}</span>
            </>
          )}
        </div>

        <h4 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
          {project.title}
        </h4>
        {item.subtitle && (
          <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-0.5">
            {item.subtitle}
          </p>
        )}

        <p className="text-muted-foreground text-sm leading-relaxed mt-3 mb-4 font-normal">
          {item.description}
        </p>

        {/* Feature Highlights */}
        {item.highlights && item.highlights.length > 0 && (
          <ul className="flex flex-col gap-1.5 my-3 border-l border-border/70 pl-3">
            {item.highlights.map((highlight) => (
              <li key={highlight} className="text-xs text-foreground/85 font-medium">
                {highlight}
              </li>
            ))}
          </ul>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-muted-foreground mb-5 mt-auto pt-2">
          {project.techs.map((tech, i) => (
            <span key={tech} className="text-foreground/90 font-medium">
              {tech}
              {i < project.techs.length - 1 ? " ·" : ""}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-3 border-t border-border/40">
          {project.deploy !== "#" && (
            <Link
              href={project.deploy}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:underline"
            >
              <span>{dict.projects.viewProject}</span>
              <ExternalLink className="size-3" />
            </Link>
          )}

          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:underline"
            >
              <SiGithub className="size-3" />
              <span>{dict.projects.repository}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Published Site / Landing Page.
 * Compact grid card: hero preview, niche context, stack and direct link.
 */
function LandingSiteCard({ site, index }: { site: LandingSite; index: number }) {
  const { dict } = useDictionary();
  const ref = useScrollReveal<HTMLAnchorElement>();

  const item = dict.siteItems[site.title] ?? { niche: "", description: "" };

  return (
    <Link
      ref={ref}
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${dict.projects.viewProject}: ${site.title}`}
      className="reveal-fade-up group flex flex-col pt-6 border-t border-border/60"
      style={{ "--reveal-delay": `${index * 100}ms` } as React.CSSProperties}
    >
      {/* Hero Preview */}
      <div className="w-full rounded-lg overflow-hidden mb-4">
        <Image
          src={site.image}
          alt={site.title}
          width={1440}
          height={900}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full aspect-[16/10] object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2">
        <span>
          {site.kind === "template"
            ? dict.projects.badgeTemplateSite
            : dict.projects.badgeClientSite}
        </span>
        <span>·</span>
        <span className="text-foreground/80 normal-case tracking-normal font-medium">
          {site.location}
        </span>
      </div>

      <h4 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
        {site.title}
      </h4>
      {item.niche && (
        <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-0.5">
          {item.niche}
        </p>
      )}

      <p className="text-muted-foreground text-sm leading-relaxed mt-3 mb-4 font-normal">
        {item.description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-muted-foreground mb-4 mt-auto pt-2">
        {site.techs.map((tech, i) => (
          <span key={tech} className="text-foreground/90 font-medium">
            {tech}
            {i < site.techs.length - 1 ? " ·" : ""}
          </span>
        ))}
      </div>

      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground group-hover:underline pt-3 border-t border-border/40">
        <span>{dict.projects.viewProject}</span>
        <ExternalLink className="size-3" />
      </span>
    </Link>
  );
}

/**
 * Projects section component.
 * Displays portfolio projects divided into Professional/Client work, published
 * landing pages, and Personal projects, using an open case-study presentation.
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

      <div className="space-y-20 sm:space-y-24">
        {/* Professional & Client Projects */}
        {professionalProjects.length > 0 && (
          <div className="space-y-6">
            <div className="pb-3 border-b border-border/60">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {dict.projects.professionalTitle}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {dict.projects.professionalSubtitle}
              </p>
            </div>

            <div className="flex flex-col gap-12">
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

        {/* Published Sites & Landing Pages */}
        {landingSites.length > 0 && (
          <div className="space-y-6">
            <div className="pb-3 border-b border-border/60">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {dict.projects.landingPagesTitle}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {dict.projects.landingPagesSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {landingSites.map((site, index) => (
                <LandingSiteCard key={site.title} site={site} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Personal & Open Source Projects */}
        {personalProjects.length > 0 && (
          <div className="space-y-6">
            <div className="pb-3 border-b border-border/60">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {dict.projects.personalTitle}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {dict.projects.personalSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {personalProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={professionalProjects.length + index}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
