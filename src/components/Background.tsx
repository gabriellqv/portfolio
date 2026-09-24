"use client";

import { Waves } from "@/components/ui/wave-background";

export default function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
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
