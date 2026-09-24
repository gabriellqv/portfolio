"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface CountUpProps {
  value: string;
  duration?: number;
  className?: string;
}

/**
 * Smooth quadratic ease-out deceleration.
 * Provides a steady, visible progression for small numbers (e.g., 3, 5)
 * and an energetic speedometer-like roll for larger numbers (e.g., 178+).
 */
function easeOutQuad(x: number): number {
  return 1 - (1 - x) * (1 - x);
}

/**
 * Parses numeric value, prefix, and suffix.
 * Examples: "3"    -> { prefix: "", target: 3, suffix: "" }
 *           "5"    -> { prefix: "", target: 5, suffix: "" }
 *           "178+" -> { prefix: "", target: 178, suffix: "+" }
 *           "100%" -> { prefix: "", target: 100, suffix: "%" }
 */
function parseValue(value: string) {
  const match = value.match(/^([^\d]*)(\d+)([^\d]*)$/);
  if (!match) {
    return { prefix: "", target: NaN, suffix: value };
  }
  return {
    prefix: match[1] ?? "",
    target: parseInt(match[2] ?? "0", 10),
    suffix: match[3] ?? "",
  };
}

export default function CountUp({ value, duration = 1600, className }: CountUpProps) {
  const { prefix, target, suffix } = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const isAnimatingRef = useRef(false);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isNaN(target)) return;

    let animationFrameId: number | undefined;
    let delayTimeoutId: ReturnType<typeof setTimeout> | undefined;

    const startAnimation = () => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuad(progress);
        const nextValue = Math.round(easedProgress * target);

        if (element) {
          element.textContent = `${prefix}${nextValue}${suffix}`;
        }

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          isAnimatingRef.current = false;
          if (element) {
            element.textContent = `${prefix}${target}${suffix}`;
          }
        }
      };

      animationFrameId = requestAnimationFrame(step);
    };

    // If IntersectionObserver is not available in environment, show target
    if (typeof IntersectionObserver === "undefined") {
      element.textContent = `${prefix}${target}${suffix}`;
      return;
    }

    // Set initial 0 before entering view
    if (!hasAnimatedRef.current) {
      element.textContent = `${prefix}0${suffix}`;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          if (!hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            // Short delay so the user perceives the count starting from 0
            // and syncs gracefully with the card scroll reveal transition
            delayTimeoutId = setTimeout(startAnimation, 120);
          }
        } else {
          // Reset when scrolled out of view so user can re-trigger on return
          hasAnimatedRef.current = false;
          isAnimatingRef.current = false;
          if (animationFrameId !== undefined) {
            cancelAnimationFrame(animationFrameId);
          }
          if (delayTimeoutId !== undefined) {
            clearTimeout(delayTimeoutId);
          }
          if (element) {
            element.textContent = `${prefix}0${suffix}`;
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px" },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (delayTimeoutId !== undefined) {
        clearTimeout(delayTimeoutId);
      }
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [prefix, target, suffix, duration]);

  return (
    <span
      ref={ref}
      className={cn("tabular-nums inline-block", className)}
      aria-label={value}
    >
      {value}
    </span>
  );
}
