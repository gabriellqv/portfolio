"use client";

import { useMemo } from "react";

import { getSkillsForCarousel } from "@/data/skills";

/**
 * Auto-scrolling infinite marquee of technology skill icons.
 *
 * Renders the skill list twice consecutively inside a CSS-masked container.
 * The first copy scrolls fully out of view just as the second copy reaches
 * the same position, creating a seamless loop without visible gaps.
 *
 * Uses `useMemo` to avoid regenerating the doubled array on every render.
 */
export default function SkillsCarousel() {
  const skills = useMemo(() => getSkillsForCarousel(), []);

  const doubledSkills = useMemo(() => [...skills, ...skills], [skills]);

  return (
    <div
      role="marquee"
      aria-label="Technology skills"
      className="w-full max-w-2xl mx-auto relative mt-8 mb-10 overflow-hidden py-4"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
      }}
    >
      <div className="flex w-fit animate-marquee">
        {doubledSkills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <div
              key={`${skill.name}-${index}`}
              className="group flex items-center gap-2 px-4 py-2 mx-2 text-muted-foreground whitespace-nowrap transition-all duration-300 cursor-default"
            >
              <Icon
                size={18}
                className={`shrink-0 transition-colors duration-300 ${skill.color}`}
              />
              <span className="text-xs font-medium group-hover:text-foreground transition-colors duration-300">
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
