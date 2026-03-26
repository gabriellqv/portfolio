/**
 * Full-viewport animated starfield rendered on a fixed `<canvas>`.
 *
 * Performance strategy:
 * 1. The component is dynamically imported via `lazy-starfield.tsx` to exclude
 *    the canvas JS from the SSR bundle entirely.
 * 2. A 500ms deferred mount (`setTimeout`) prevents the canvas initialization
 *    from competing with the critical rendering path (LCP, TTI).
 * 3. The animation loop avoids per-frame heap allocations:
 *    a) `RGB_COLORS[]` is a pre-computed lookup table of 256 CSS rgb strings.
 *    b) `BASE_GRAYS` caches parsed hex values per layer configuration.
 *    c) Cursor proximity uses squared distance to avoid `Math.sqrt()` per star.
 * 4. Delta-time normalization (`dt = elapsed / (1000/60)`) ensures consistent
 *    star speed regardless of monitor refresh rate (60Hz, 120Hz, 144Hz).
 * 5. The `visibilitychange` listener pauses `requestAnimationFrame` when the
 *    tab is hidden, preventing unnecessary CPU/GPU usage.
 *
 * The canvas is excluded from the accessibility tree via `aria-hidden` and
 * rendered behind all content with `z-[-1]`.
 */

"use client";

import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Star {
  x: number;
  y: number;
  size: number;
  baseColor: string;
  speed: number;
  /** Current hover brightness (0 = base gray, 1 = pure white). */
  brightness: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * Parallax depth layers. Rear stars are dimmer, smaller, and slower,
 * creating the illusion of depth without a true 3D projection.
 */
const LAYER_CONFIG = [
  { count: 220, size: 1, color: "#333333", speed: 0.25 },
  { count: 120, size: 2, color: "#666666", speed: 0.35 },
  { count: 50, size: 3, color: "#999999", speed: 0.45 },
] as const;

const HOVER_RADIUS = 100;
const FADE_SPEED = 0.08;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Generates the initial star field distributed randomly across the viewport.
 * Mobile devices (viewport < 768px) receive half the star count to preserve
 * the 60fps frame budget on lower-powered GPUs.
 *
 * @param width  Viewport width in CSS pixels.
 * @param height Viewport height in CSS pixels.
 */
function createStars(width: number, height: number): Star[] {
  const stars: Star[] = [];
  const isMobile = width < 768;

  for (const layer of LAYER_CONFIG) {
    const count = isMobile ? Math.floor(layer.count / 2) : layer.count;
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: layer.size,
        baseColor: layer.color,
        speed: layer.speed + Math.random() * layer.speed * 0.3,
        brightness: 0,
      });
    }
  }

  return stars;
}

/** Extracts the numeric gray channel from a pure-gray hex string like "#666666". */
function grayHexToValue(hex: string): number {
  return parseInt(hex.slice(1, 3), 16);
}

/**
 * Pre-computed CSS RGB strings indexed 0..255.
 * Allocated once at module load to avoid string concatenation inside
 * the 60fps animation loop, which would cause GC pauses.
 */
const RGB_COLORS: string[] = [];
for (let i = 0; i <= 255; i++) {
  RGB_COLORS.push(`rgb(${i},${i},${i})`);
}

/**
 * Linearly interpolates between `baseGray` and 255 (white) by `brightness`.
 * Returns a pre-computed CSS rgb string from the lookup table.
 */
function lerpColor(baseGray: number, brightness: number): string {
  const val = Math.round(baseGray + (255 - baseGray) * brightness);
  return RGB_COLORS[val];
}

const BASE_GRAYS: Record<string, number> = {};
for (const l of LAYER_CONFIG) {
  BASE_GRAYS[l.color] = grayHexToValue(l.color);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function StarfieldPixel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  // Deferred mount: yields the main thread during initial page load.
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let stars: Star[] = [];
    let rafId = 0;
    const mouse = { x: -9999, y: -9999 };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);

      stars = createStars(w, h);
    };

    let lastTime = performance.now();

    const animate = (time: DOMHighResTimeStamp) => {
      // Normalize dt so that dt = 1.0 at 60 FPS
      const dt = (time - lastTime) / (1000 / 60);
      lastTime = time;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const { x: mx, y: my } = mouse;

      ctx.clearRect(0, 0, w, h);
      ctx.imageSmoothingEnabled = false;

      const hoverRadiusSq = HOVER_RADIUS * HOVER_RADIUS;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.y += star.speed * dt;
        if (star.y > h + star.size) {
          star.y = -star.size;
          star.x = Math.random() * w;
        }

        // Squared distance avoids Math.sqrt() per star per frame.
        const dx = star.x - mx;
        const dy = star.y - my;
        const distSq = dx * dx + dy * dy;

        if (distSq < hoverRadiusSq) {
          star.brightness = 1;
        } else if (star.brightness > 0) {
          star.brightness = Math.max(0, star.brightness - FADE_SPEED);
        }

        const baseGray = BASE_GRAYS[star.baseColor] ?? 0x66;
        ctx.fillStyle = star.brightness > 0 ? lerpColor(baseGray, star.brightness) : star.baseColor;

        // Floor prevents sub-pixel anti-aliasing, preserving the pixel-art aesthetic.
        ctx.fillRect(Math.floor(star.x), Math.floor(star.y), star.size, star.size);
      }

      rafId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        lastTime = performance.now();
        rafId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);
    handleResize();
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [mounted]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-[-1] transition-opacity duration-1000 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    />
  );
}
