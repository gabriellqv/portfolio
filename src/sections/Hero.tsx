"use client";

import Link from "next/link";

import { ArrowRight, Download } from "lucide-react";

import { buttonVariants } from "@/components/Button";
import SkillsCarousel from "@/components/SkillsCarousel";
import { SITE } from "@/constants";
import { useHeroFadeOut } from "@/hooks/useHeroFadeOut";
import { useDictionary } from "@/i18n";
import { cn } from "@/lib/utils";

export default function Hero() {
  const { dict } = useDictionary();
  const heroRef = useHeroFadeOut<HTMLElement>();

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 pt-20 pb-10"
    >
      <h1
        className="hero-stagger text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-0 pb-2"
        style={{ "--hero-delay": "0ms" } as React.CSSProperties}
      >
        <span className="animate-text-shine">{SITE.name}</span>
      </h1>

      <h2
        className="hero-stagger text-lg sm:text-xl md:text-3xl font-medium tracking-tight mb-4"
        style={{ "--hero-delay": "150ms" } as React.CSSProperties}
      >
        <span className="text-muted-foreground">{dict.hero.roleMuted}</span>
        <span className="text-foreground">{dict.hero.roleAccent}</span>
      </h2>

      <p
        className="hero-stagger max-w-[600px] text-sm md:text-base text-muted-foreground leading-relaxed"
        style={{ "--hero-delay": "300ms" } as React.CSSProperties}
      >
        {dict.hero.tagline}
      </p>

      <div
        className="hero-stagger"
        style={{ "--hero-delay": "450ms" } as React.CSSProperties}
      >
        <SkillsCarousel />
      </div>

      <div
        className="hero-stagger flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mt-2 w-full max-w-[300px] sm:max-w-none mx-auto"
        style={{ "--hero-delay": "600ms" } as React.CSSProperties}
      >
        <Link
          href="#projects"
          className={cn(
            buttonVariants({ variant: "primary", size: "default" }),
            "rounded-full w-full sm:w-auto",
          )}
        >
          {dict.hero.viewProjects} <ArrowRight className="size-4 shrink-0" />
        </Link>
        <a
          href={`/${SITE.cvFilename}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "secondary", size: "default" }),
            "rounded-full w-full sm:w-auto font-medium",
          )}
        >
          <Download className="size-4 shrink-0" /> {dict.hero.downloadCV}
        </a>
      </div>
    </section>
  );
}
