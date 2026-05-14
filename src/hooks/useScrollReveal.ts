"use client";

import { useEffect, useRef } from "react";

/**
 * Observes when an element enters the viewport and applies a CSS class
 * to trigger a reveal animation. Uses IntersectionObserver for performance.
 *
 * Uses a negative rootMargin so the element must be well inside the
 * viewport (not just peeking in) before the animation fires.
 *
 * @param rootMargin - Shrinks the trigger zone. Default "-80px" means
 *   the element must be 80px inside the viewport edge to trigger.
 * @param once - If true, unobserves after the first intersection (default: true).
 * @returns A ref to attach to the target element.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  rootMargin = "-300px",
  once = true,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("revealed");
            if (once) observer.unobserve(el);
          }
        }
      },
      { threshold: 0.1, rootMargin },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [rootMargin, once]);

  return ref;
}
