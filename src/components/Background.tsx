"use client";

import { Waves } from "@/components/ui/wave-background";

/**
 * Fixed background layer rendering the pure vertical lines waves effect.
 * Completely clean without any artificial radial gradients or glows.
 */
export default function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <Waves
        strokeColorLight="rgba(88, 92, 125, 0.35)"
        backgroundColorLight="transparent"
        strokeColorDark="rgba(255, 255, 255, 0.16)"
        backgroundColorDark="#050505"
        pointerSize={0.5}
      />
    </div>
  );
}
