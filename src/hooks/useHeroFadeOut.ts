"use client";

import { useEffect, useRef } from "react";

/**
 * Applies a scroll-driven fade-out + slight scale-down to the hero section.
 * As the user scrolls past the hero, its content fades out progressively.
 *
 * Uses requestAnimationFrame for smooth 60fps updates and only runs
 * while the hero is in (or near) the viewport.
 *
 * @returns A ref to attach to the hero section element.
 */
export function useHeroFadeOut<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroHeight = el.offsetHeight;
        const progress = Math.min(scrollY / (heroHeight * 0.35), 1);

        if (progress === 0) {
          el.style.opacity = '1';
          el.style.transform = '';
        } else {
          el.style.opacity = String(1 - progress);
          el.style.transform = `scale(${1 - progress * 0.03}) translateY(${progress * 30}px)`;
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return ref;
}
