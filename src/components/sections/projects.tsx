"use client";

import { projects } from "@/data/projects";
import { useLocale } from "@/i18n/context";
import FadeIn from "@/components/ui/fade-in";
import ProjectCard from "@/components/ui/card";

/** Client wrapper for the projects grid — enables i18n for project titles/descriptions. */
export default function Projects() {
  const { t } = useLocale();

  return (
    <section id="projects" className="py-20">
      <h2 className="mb-2 bg-linear-to-b from-white to-gray-500 bg-clip-text text-3xl font-bold text-transparent">
        {t.projects.title}
      </h2>
      <p className="text-fg-secondary mb-8 text-sm">{t.projects.subtitle}</p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project, i) => (
          <FadeIn key={project.slug} delay={i * 100} className="h-full">
            <ProjectCard
              project={{
                ...project,
                title: t.projects.items[project.slug]?.title || project.title,
                description: t.projects.items[project.slug]?.description || project.description,
              }}
            />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
