"use client";

import { Waves } from "@/components/ui/wave-background";

export default function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <Waves
        strokeColorLight="#585C7D"
        strokeColorDark="#9697cf"
        backgroundColorLight="#F0F1F2"
        backgroundColorDark="#20202c"
        pointerSize={0.5}
      />
    </div>
  );
}
