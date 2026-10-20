"use client";

/**
 * Minimalist background layer.
 * Replaces the heavy wave animation with a clean, grounded dot-matrix canvas
 * and subtle ambient atmospheric depth at the hero header.
 *
 * Anchors section cards firmly to the layout without distracting animations
 * or GPU/CPU overhead.
 */
export default function Background() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Soft atmospheric radial gradient at the top (hero section) */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] opacity-35 dark:opacity-25 pointer-events-none blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(56, 189, 248, 0.16), rgba(99, 102, 241, 0.1), transparent 70%)",
        }}
      />

      {/* Grounded minimalist technical dot-matrix canvas */}
      <div
        className="absolute inset-0 bg-[radial-gradient(var(--grid-color)_1.25px,transparent_1.25px)] bg-[size:28px_28px]"
        style={{
          maskImage:
            "radial-gradient(ellipse 85% 75% at 50% 25%, black 40%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 75% at 50% 25%, black 40%, transparent 95%)",
        }}
      />
    </div>
  );
}
