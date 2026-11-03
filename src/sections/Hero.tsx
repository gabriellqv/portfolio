"use client";

import Link from "next/link";

import { ArrowRight, Download } from "lucide-react";

import { buttonVariants } from "@/components/Button";
import { SITE } from "@/constants";
import { useHeroFadeOut } from "@/hooks/useHeroFadeOut";
import { useDictionary } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * Hero section component.
 * Direct, confident above-the-fold presentation with solid typography,
 * clear value proposition, and primary call-to-action buttons.
 */
export default function Hero() {
  const { dict, lang } = useDictionary();
  const heroRef = useHeroFadeOut<HTMLElement>();

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[90svh] w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-20 overflow-hidden"
    >
      <h1 className="hero-stagger text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight mb-3 text-foreground">
        {SITE.name}
      </h1>

      <h2 className="hero-stagger text-base sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-tight mb-4 sm:mb-5">
        <span className="text-muted-foreground font-normal">{dict.hero.roleMuted}</span>
        <span className="text-foreground font-semibold">{dict.hero.roleAccent}</span>
      </h2>

      <p className="hero-stagger max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed font-normal px-2 sm:px-0 mb-8 sm:mb-10">
        {dict.hero.tagline}
      </p>

      <div className="hero-stagger flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none mx-auto">
        <Link
          href="#projects"
          className={cn(
            buttonVariants({ variant: "primary", size: "default" }),
            "group w-full sm:w-auto font-medium",
          )}
        >
          <span>{dict.hero.viewProjects}</span>
          <ArrowRight className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
        <a
          href={`/${lang === "en" ? "Gabriel_Queiroz_Full_Stack_Developer.pdf" : SITE.cvFilename}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "secondary", size: "default" }),
            "group w-full sm:w-auto font-medium",
          )}
        >
          <Download className="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5" />
          <span>{dict.hero.downloadCV}</span>
        </a>
      </div>
    </section>
  );
}
