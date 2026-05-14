"use client";

import Link from "next/link";

import { ArrowRight, Download } from "lucide-react";

import SkillsCarousel from "@/components/SkillsCarousel";
import { SITE } from "@/constants";
import { useDictionary } from "@/i18n";
import { cn } from "@/lib/utils";

export default function Hero() {
  const { dict } = useDictionary();

  return (
    <section
      id="home"
      className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 pt-20 pb-10"
    >
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-0 bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-200 dark:to-neutral-500 pb-2">
        {SITE.name}
      </h1>

      <h2 className="text-xl md:text-3xl font-medium tracking-tight mb-4">
        <span className="text-muted-foreground">{dict.hero.roleMuted}</span>
        <span className="text-foreground">{dict.hero.roleAccent}</span>
      </h2>

      <p className="max-w-[600px] text-sm md:text-base text-muted-foreground leading-relaxed">
        {SITE.tagline}
      </p>

      <SkillsCarousel />

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mt-2 w-full max-w-[300px] sm:max-w-none mx-auto">
        <Link
          href="/#projects"
          className={cn(
            "flex justify-center items-center gap-2 px-6 py-3 sm:py-2.5 rounded-full text-sm bg-foreground text-background font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap w-full sm:w-auto",
            "focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
        >
          {dict.hero.viewProjects} <ArrowRight className="size-4 shrink-0" />
        </Link>
        <a
          href={`/${SITE.cvFilename}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex justify-center items-center gap-2 px-6 py-3 sm:py-2.5 rounded-full text-sm border border-border/50 bg-white dark:bg-transparent hover:bg-neutral-100 dark:hover:bg-white/5 transition-all text-foreground hover:text-foreground font-medium hover:scale-[1.02] active:scale-95 whitespace-nowrap w-full sm:w-auto",
            "focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
        >
          <Download className="size-4 shrink-0" /> {dict.hero.downloadCV}
        </a>
      </div>
    </section>
  );
}
