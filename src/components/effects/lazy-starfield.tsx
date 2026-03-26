/**
 * Lazy wrapper for StarfieldPixel.
 *
 * Uses `next/dynamic` with `ssr: false` so the entire canvas module
 * (including the 256-entry RGB lookup table and animation loop) is
 * excluded from the server-rendered HTML bundle.
 */

"use client";

import dynamic from "next/dynamic";

const StarfieldPixel = dynamic(() => import("@/components/effects/starfield-pixel"), {
  ssr: false,
});

export default function LazyStarfield() {
  return <StarfieldPixel />;
}
