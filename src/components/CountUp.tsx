"use client";

import { useEffect, useRef } from "react";

interface CountUpProps {
  value: string;
  duration?: number;
  className?: string;
}

/**
 * Easing function for smooth deceleration (Apple / Vercel style).
 */
function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

/**
 * Parses numeric value, prefix, and suffix.
 * Examples: "3+" -> { prefix: "", target: 3, suffix: "+" }
 *           "116+" -> { prefix: "", target: 116, suffix: "+" }
 *           "100%" -> { prefix: "", target: 100, suffix: "%" }
 */
function parseValue(value: string) {
  const match = value.match(/^([^\d]*)(\d+)([^\d]*)$/);
  if (!match) {
    return { prefix: "", target: NaN, suffix: value };
  }
  return {
    prefix: match[1] || "",
    target: parseInt(match[2] ?? "0", 10),
    suffix: match[3] || "",
  };
}

export default function CountUp({ value, duration = 1800, className }: CountUpProps) {
  const { prefix, target, suffix } = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (isNaN(target)) return;

    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      element.textContent = `${prefix}${target}${suffix}`;
      return;
    }

    // Set initial 0 before viewport entrance
    if (!hasAnimatedRef.current) {
      element.textContent = `${prefix}0${suffix}`;
    }

    let animationFrameId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          const startTime = performance.now();

          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutExpo(progress);
            const nextValue = Math.round(easedProgress * target);

            if (element) {
              element.textContent = `${prefix}${nextValue}${suffix}`;
            }

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(step);
            } else if (element) {
              element.textContent = `${prefix}${target}${suffix}`;
            }
          };

          animationFrameId = requestAnimationFrame(step);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -30px 0px" },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [prefix, target, suffix, duration]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {value}
    </span>
  );
}
