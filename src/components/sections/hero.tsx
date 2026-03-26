/**
 * Hero section with parallax scrolling and animated skill carousel.
 *
 * Parallax uses a `requestAnimationFrame`-debounced scroll listener
 * with `{ passive: true }` to avoid blocking the compositor thread.
 * The `will-change-transform` hint promotes the parallax container
 * to its own GPU layer, preventing layout thrashing on the rest of
 * the page during scroll.
 *
 * The skills carousel (`SkillsCarousel`) renders two copies of the
 * skills array, then measures the exact pixel width of one copy via
 * a DOM marker element (`data-copy-start`). A dynamically injected
 * `@keyframes` rule translates by that exact pixel distance, avoiding
 * the sub-pixel misalignment that percentage-based `translateX(-50%)`
 * causes when CSS flex gaps are involved.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { skills } from "@/data/skills";
import FadeIn from "@/components/ui/fade-in";
import { useLocale } from "@/i18n/context";

/** Parallax speed factor. */
const PARALLAX_FACTOR = 0.3;

/** Pixel-per-second scroll speed for the skills carousel. */
const CAROUSEL_SPEED = 30;

/**
 * Self-contained infinite carousel that measures its own scroll
 * distance in pixels to avoid the sub-pixel misalignment inherent
 * in CSS percentage-based translateX with flex gaps.
 */
function SkillsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollStyle, setScrollStyle] = useState("");

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    /**
     * The marker separates copy 1 from copy 2 in the DOM.
     * Its `offsetLeft` gives the exact pixel distance that one
     * full copy occupies, including all gaps.
     */
    const marker = track.querySelector<HTMLElement>("[data-copy-start]");
    if (!marker) return;

    const distance = marker.offsetLeft;
    const duration = distance / CAROUSEL_SPEED;

    const id = "carousel-scroll";
    setScrollStyle(`
      @keyframes ${id} {
        0% { transform: translateX(0); }
        100% { transform: translateX(-${distance}px); }
      }
    `);

    track.style.animation = `${id} ${duration}s linear infinite`;

    return () => {
      track.style.animation = "";
    };
  }, []);

  return (
    <>
      <style>{scrollStyle}</style>
      <div ref={trackRef} className="flex w-max gap-3">
        {skills.map((skill, i) => (
          <div
            key={`c1-${skill.name}-${i}`}
            className="bg-surface group flex shrink-0 items-center gap-2 rounded px-1.5 py-0.5 backdrop-blur-[2px]"
          >
            <Image
              src={skill.icon}
              alt={skill.name}
              width={20}
              height={20}
              className="h-5 w-5 object-contain opacity-50 transition-all duration-200 group-hover:brightness-0 group-hover:invert"
            />
            <span className="text-fg-tertiary group-hover:text-fg-primary text-xs whitespace-nowrap transition-colors">
              {skill.name}
            </span>
          </div>
        ))}
        {/* Marker element: its offsetLeft = exact pixel width of one copy. */}
        <div data-copy-start="" className="flex shrink-0 gap-3">
          {skills.map((skill, i) => (
            <div
              key={`c2-${skill.name}-${i}`}
              className="bg-surface group flex shrink-0 items-center gap-2 rounded px-1.5 py-0.5 backdrop-blur-[2px]"
            >
              <Image
                src={skill.icon}
                alt={skill.name}
                width={20}
                height={20}
                className="h-5 w-5 object-contain opacity-50 transition-all duration-200 group-hover:brightness-0 group-hover:invert"
              />
              <span className="text-fg-tertiary group-hover:text-fg-primary text-xs whitespace-nowrap transition-colors">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function Hero() {
  const { t } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrollOffset(window.scrollY);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const parallaxY = scrollOffset * PARALLAX_FACTOR;
  const parallaxOpacity = Math.max(1 - scrollOffset / 600, 0);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[85dvh] flex-col items-center justify-center px-2 text-center min-[20rem]:px-4"
    >
      <div
        className="relative z-10 flex flex-col items-center will-change-transform"
        style={{
          transform: `translateY(${parallaxY}px)`,
          opacity: parallaxOpacity,
        }}
      >
        <FadeIn delay={0}>
          <p className="text-fg-secondary mb-4 font-mono text-sm">{t.hero.greeting}</p>
        </FadeIn>

        <FadeIn delay={150}>
          <h1 className="mb-4 bg-linear-to-br from-white to-white/40 bg-clip-text text-2xl font-bold text-transparent min-[20rem]:text-4xl sm:text-5xl md:text-7xl">
            {siteConfig.name}
          </h1>
        </FadeIn>

        <FadeIn delay={300}>
          <h2 className="mb-6 bg-linear-to-r from-gray-200 to-gray-500 bg-clip-text text-base text-transparent min-[20rem]:text-xl sm:text-2xl md:text-3xl">
            {t.hero.role}
          </h2>
        </FadeIn>

        <FadeIn delay={450}>
          <p className="text-fg-secondary mb-10 max-w-xl text-sm sm:text-base">
            {t.hero.description}
          </p>
        </FadeIn>

        <FadeIn delay={600}>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="#projects"
              className="rounded-xl border border-white bg-white px-5 py-2.5 font-mono text-sm font-medium text-black transition-all hover:bg-gray-200"
            >
              {t.hero.viewProjects}
            </Link>
            <a
              href="/cv.pdf"
              download
              className="border-edge bg-surface text-fg-secondary hover:border-edge-hover hover:shadow-glow-strong hover:text-fg-primary rounded-xl border px-5 py-2.5 font-mono text-sm backdrop-blur-[2px] transition-all hover:bg-white/5"
            >
              {t.hero.downloadCv}
            </a>
          </div>
        </FadeIn>

        {/* Skills carousel */}
        <FadeIn delay={750}>
          <div
            className="mt-12 w-[80vw] max-w-2xl overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <SkillsCarousel />
          </div>
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <div 
        className="text-fg-secondary absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-300 hover:opacity-100"
        style={{ opacity: parallaxOpacity === 1 ? 0.5 : parallaxOpacity }}
      >
        <span className="text-[10px] font-medium tracking-[0.3em] uppercase">
          {t.hero.scroll}
        </span>
        <div className="border-fg-secondary flex h-8 w-5 justify-center rounded-full border-2 p-1">
          <div className="bg-fg-secondary h-1.5 w-1.5 animate-bounce rounded-full" />
        </div>
      </div>
    </section>
  );
}
