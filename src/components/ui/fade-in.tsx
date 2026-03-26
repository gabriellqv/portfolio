/**
 * Scroll-triggered entrance animation wrapper.
 *
 * Uses `IntersectionObserver` with a 10% visibility threshold. The observer
 * disconnects after first intersection to prevent redundant callbacks and
 * re-triggering on scroll-back. All motion is CSS-only (opacity + translate),
 * delegating compositing to the GPU via the browser's transition engine.
 */

"use client";

import { useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms before the entrance animation starts. */
  delay?: number;
  /** Axis along which the element slides into view. */
  direction?: "up" | "down" | "left" | "right" | "none";
}

/**
 * Scroll-triggered entrance animation wrapper.
 *
 * Uses `IntersectionObserver` with a 10% visibility threshold to trigger
 * a single opacity + translate transition. The observer disconnects after
 * first intersection to avoid redundant callbacks.
 */
export default function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const directionStyles = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    none: "",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? "translate-x-0 translate-y-0 opacity-100"
          : `opacity-0 ${directionStyles[direction]}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
