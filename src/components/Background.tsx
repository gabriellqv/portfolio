"use client";

import { useEffect, useRef } from "react";

import { Waves } from "@/components/ui/wave-background";

export default function Background() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let targetX = 0.5;
    let targetY = 0.5;
    let currentX = 0.5;
    let currentY = 0.5;

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX / window.innerWidth;
      targetY = event.clientY / window.innerHeight;
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      if (glowRef.current) {
        glowRef.current.style.setProperty("--glow-x", `${(currentX * 100).toFixed(2)}%`);
        glowRef.current.style.setProperty("--glow-y", `${(currentY * 100).toFixed(2)}%`);
      }
      raf = requestAnimationFrame(loop);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        raf = requestAnimationFrame(loop);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <div
        ref={glowRef}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle 260px at var(--glow-x, 50%) var(--glow-y, 50%), var(--glow-color), transparent 70%)",
        }}
      />
      <Waves
        strokeColorLight="rgba(88, 92, 125, 0.35)"
        backgroundColorLight="transparent"
        strokeColorDark="rgba(75, 76, 104, 0.2)"
        backgroundColorDark="transparent"
        pointerSize={0}
      />
    </div>
  );
}
