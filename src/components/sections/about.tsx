"use client";

import { Briefcase, GraduationCap, Globe, Code2, Server, Container, TestTube2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLocale } from "@/i18n/context";

// ---------------------------------------------------------------------------
// Highlight badges — scannable at-a-glance stats
// ---------------------------------------------------------------------------

const HIGHLIGHTS = [
  { icon: Code2, labelKey: "frontend" as const, value: "React · Next.js · TypeScript" },
  { icon: Server, labelKey: "backend" as const, value: "Node.js · NestJS · Express" },
  { icon: Container, labelKey: "devops" as const, value: "Docker · CI/CD · GitHub Actions" },
  { icon: TestTube2, labelKey: "quality" as const, value: "Jest · Cypress · SOLID" },
] as const;

export default function About() {
  const { t } = useLocale();

  return (
    <section id="about" className="py-20">
      <h2 className="mb-2 bg-linear-to-b from-white to-gray-500 bg-clip-text text-3xl font-bold text-transparent">{t.about.title}</h2>
      <p className="text-fg-secondary mb-12 text-sm">{t.about.subtitle}</p>

      <div className="border-edge bg-surface hover:border-edge-hover hover:shadow-glow rounded-xl border p-4 shadow-lg backdrop-blur-[2px] transition-all duration-200 min-[20rem]:p-6 md:p-10">
        {/* Bio — condensed to first paragraph only */}
        <p className="text-fg-secondary mb-8 leading-relaxed">
          {t.about.bio[0]}
        </p>

        {/* Highlight badges — visual scanning */}
        <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {HIGHLIGHTS.map(({ icon: Icon, labelKey, value }) => (
            <div
              key={labelKey}
              className="border-edge bg-surface rounded-lg border p-3 transition-all hover:border-edge-hover"
            >
              <Icon className="text-fg-secondary mb-2 h-4 w-4" strokeWidth={1.5} />
              <p className="text-fg-primary text-xs font-semibold">{t.about.highlights[labelKey]}</p>
              <p className="text-fg-tertiary mt-0.5 text-[0.625rem] leading-snug">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Experience */}
          <div>
            <h3 className="text-fg-primary mb-6 flex items-center gap-2 text-xl font-semibold">
              <Briefcase className="h-5 w-5" strokeWidth={1.5} />
              {t.about.experience.title}
            </h3>
            <div className="border-edge border-l pl-4 min-[20rem]:pl-6">
              <div className="relative">
                <div className="absolute top-1.5 -left-[1.8125rem] h-2 w-2 rounded-full border border-edge-hover bg-surface-subtle" />
                <p className="text-fg-secondary text-sm">{t.about.experience.period}</p>
                <p className="text-fg-primary mt-1 font-medium">{t.about.experience.role}</p>
                <ul className="text-fg-secondary mt-3 space-y-2 text-sm">
                  {t.about.experience.items.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Education & Languages */}
          <div className="space-y-8">
            {/* Education */}
            <div>
              <h3 className="text-fg-primary mb-6 flex items-center gap-2 text-xl font-semibold">
                <GraduationCap className="h-5 w-5" strokeWidth={1.5} />
                {t.about.education.title}
              </h3>
              <div className="border-edge border-l pl-4 min-[20rem]:pl-6">
                <div className="relative">
                  <div className="absolute top-1.5 -left-[1.8125rem] h-2 w-2 rounded-full border border-edge-hover bg-surface-subtle" />
                  <p className="text-fg-secondary text-sm">{t.about.education.period}</p>
                  <p className="text-fg-primary mt-1 font-medium">{t.about.education.degree}</p>
                  <p className="text-fg-secondary mt-1 text-sm">{t.about.education.institution}</p>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-fg-primary mb-4 flex items-center gap-2 text-xl font-semibold">
                <Globe className="h-5 w-5" strokeWidth={1.5} />
                {t.about.languages.title}
              </h3>
              <div className="space-y-3">
                {t.about.languages.items.map((lang, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between">
                      <span className="text-fg-secondary text-sm">{lang.name}</span>
                      <span className="text-fg-primary text-xs">{lang.level}</span>
                    </div>
                    {i < t.about.languages.items.length - 1 && (
                      <div className="bg-surface-subtle mt-3 h-px" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="mt-10 flex gap-4 border-t border-surface-subtle pt-6">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-secondary hover:text-fg-primary font-mono text-sm transition"
          >
            GitHub ↗
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-secondary hover:text-fg-primary font-mono text-sm transition"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  );
}
