"use client";

import { useEffect, useRef, useState } from "react";

import { useTheme } from "next-themes";

import { Activity, CircleDot, Sliders, Sparkles, X } from "lucide-react";

import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

// Interface for elevation center
interface ElevationCenter {
  cx: number;
  cy: number;
  rings: number[];
  seed: number;
  speed: number;
}

export default function TopographicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme, resolvedTheme } = useTheme();
  const isMounted = useMounted();
  const isDark = (resolvedTheme || theme) === "dark";

  // Configuration tuned to user feedback:
  // - Real living interactive effect (NOT a static PNG!)
  // - Orange Neon & Dot Grid by default (matching the user's latest aesthetic)
  // - Crisp 1.2px/2.4px lines (curvas mestras + secundárias) with zero blur
  // - Smooth interactive mouse lighting & subtle fluid pulse
  const [colorMode, setColorMode] = useState<"orange" | "cyber" | "rgb" | "mono">(
    "orange",
  );
  const [motionMode, setMotionMode] = useState<"alive" | "calm" | "static">("alive");
  const [showDotGrid, setShowDotGrid] = useState<boolean>(true);
  const [glowIntensity, setGlowIntensity] = useState<"subtle" | "normal" | "vivid">(
    "normal",
  );
  const [isControlsOpen, setIsControlsOpen] = useState<boolean>(false);

  // Mutable refs for animation state
  const stateRef = useRef({
    time: 0,
    mouse: { x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: 0 },
    animationFrameId: 0,
    colorMode: "orange" as "orange" | "cyber" | "rgb" | "mono",
    motionMode: "alive" as "alive" | "calm" | "static",
    showDotGrid: true,
    glowIntensity: "normal" as "subtle" | "normal" | "vivid",
    isDark: true,
  });

  // Sync state with refs for 60fps render loop
  useEffect(() => {
    stateRef.current.colorMode = colorMode;
  }, [colorMode]);

  useEffect(() => {
    stateRef.current.motionMode = motionMode;
  }, [motionMode]);

  useEffect(() => {
    stateRef.current.showDotGrid = showDotGrid;
  }, [showDotGrid]);

  useEffect(() => {
    stateRef.current.glowIntensity = glowIntensity;
  }, [glowIntensity]);

  useEffect(() => {
    stateRef.current.isDark = isDark;
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const state = stateRef.current;

    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      state.motionMode = "static";
    }

    // Topographic Elevation Centers (configured in normalized 0-1 coords for full responsiveness)
    const centers: ElevationCenter[] = [
      {
        cx: 0.22,
        cy: 0.28,
        rings: [0.04, 0.08, 0.13, 0.19, 0.26, 0.34, 0.43],
        seed: 1.2,
        speed: 0.8,
      },
      {
        cx: 0.78,
        cy: 0.35,
        rings: [0.05, 0.09, 0.14, 0.21, 0.28, 0.36, 0.45],
        seed: 2.7,
        speed: -0.7,
      },
      {
        cx: 0.15,
        cy: 0.78,
        rings: [0.03, 0.07, 0.12, 0.18, 0.25, 0.33],
        seed: 3.9,
        speed: 0.9,
      },
      {
        cx: 0.62,
        cy: 0.75,
        rings: [0.04, 0.08, 0.13, 0.19, 0.27, 0.35],
        seed: 4.5,
        speed: -0.8,
      },
      {
        cx: 0.88,
        cy: 0.82,
        rings: [0.03, 0.07, 0.12, 0.17, 0.24],
        seed: 5.3,
        speed: 0.75,
      },
    ];

    // Saddle / Envelope pairs
    const saddles = [
      { c1: centers[0], c2: centers[1], r: 0.2, seed: 1.6 },
      { c1: centers[0], c2: centers[1], r: 0.3, seed: 2.1 },
      { c1: centers[2], c2: centers[3], r: 0.18, seed: 3.4 },
      { c1: centers[3], c2: centers[4], r: 0.16, seed: 4.2 },
      { c1: centers[0], c2: centers[2], r: 0.17, seed: 2.9 },
    ];

    // Transverse flowing curves
    const flowYOffsets = [0.08, 0.22, 0.38, 0.54, 0.68, 0.84, 0.96];

    let width = 0;
    let height = 0;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // Interactive mouse listeners
    const handleMouseMove = (e: MouseEvent) => {
      state.mouse.targetX = e.clientX;
      state.mouse.targetY = e.clientY;
      state.mouse.active = 1.0;
    };

    const handleMouseLeave = () => {
      state.mouse.active = 0.0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        state.mouse.targetX = touch.clientX;
        state.mouse.targetY = touch.clientY;
        state.mouse.active = 1.0;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Helper: Catmull-Rom spline interpolation on Canvas 2D
    const drawSpline = (pts: [number, number][], closed = true) => {
      if (pts.length < 3) return;
      const n = pts.length;
      const first = pts[0];
      if (!first) return;

      ctx.beginPath();
      ctx.moveTo(first[0], first[1]);

      const iters = closed ? n : n - 1;
      for (let i = 0; i < iters; i++) {
        const p0 = pts[(i - 1 + n) % n] ?? first;
        const p1 = pts[i] ?? first;
        const p2 = pts[(i + 1) % n] ?? first;
        const p3 = pts[(i + 2) % n] ?? first;

        const c1x = p1[0] + (p2[0] - p0[0]) / 6;
        const c1y = p1[1] + (p2[1] - p0[1]) / 6;
        const c2x = p2[0] - (p3[0] - p1[0]) / 6;
        const c2y = p2[1] - (p3[1] - p1[1]) / 6;

        ctx.bezierCurveTo(c1x, c1y, c2x, c2y, p2[0], p2[1]);
      }

      if (closed) ctx.closePath();
      ctx.stroke();
    };

    // Helper: calculate organic ring points with subtle breathing drift
    const getRingPoints = (
      cxNorm: number,
      cyNorm: number,
      rNorm: number,
      seed: number,
      speed: number,
      steps = 36,
    ): [number, number][] => {
      const cx = cxNorm * width;
      const cy = cyNorm * height;
      const maxDim = Math.max(width, height);
      const r = rNorm * maxDim;

      const t =
        state.motionMode === "static"
          ? 0
          : state.time * (state.motionMode === "calm" ? 0.3 : 0.8) * speed;
      const pts: [number, number][] = [];

      for (let i = 0; i < steps; i++) {
        const th = (i / steps) * Math.PI * 2;
        const w =
          1 +
          0.14 * Math.sin(th * 2 + seed + t * 0.4) +
          0.1 * Math.cos(th * 3 + seed * 1.6 - t * 0.3) +
          0.05 * Math.sin(th * 5 + seed * 2.5 + t * 0.5);

        // Interactive mouse repulsion/ripple
        let mouseDisplace = 0;
        if (state.mouse.active > 0.05) {
          const px = cx + r * w * Math.cos(th);
          const py = cy + r * w * Math.sin(th) * 0.75;
          const dx = px - state.mouse.x;
          const dy = py - state.mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 220) {
            mouseDisplace =
              Math.exp(-dist * 0.018) * 18 * Math.sin(dist * 0.06 - state.time * 3);
          }
        }

        const finalR = r * w + mouseDisplace;
        pts.push([cx + finalR * Math.cos(th), cy + finalR * Math.sin(th) * 0.75]);
      }

      return pts;
    };

    // Animation Render Loop
    let lastTime = performance.now();

    const render = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (state.motionMode !== "static") {
        state.time += delta;
      }

      // Smooth mouse interpolation
      const m = state.mouse;
      m.x += (m.targetX - m.x) * 0.1;
      m.y += (m.targetY - m.y) * 0.1;

      // 1. Draw Background
      ctx.fillStyle = state.isDark ? "#050608" : "#f6f6f4";
      ctx.fillRect(0, 0, width, height);

      // 2. Ambient Dot Grid (Signature from uploaded wallpaper!)
      if (state.showDotGrid) {
        const gridSpacing = 38;
        const dotBaseColor = state.isDark
          ? state.colorMode === "orange"
            ? "rgba(255, 122, 41, 0.18)"
            : state.colorMode === "cyber"
              ? "rgba(0, 245, 212, 0.16)"
              : "rgba(255, 255, 255, 0.12)"
          : "rgba(0, 0, 0, 0.08)";

        ctx.fillStyle = dotBaseColor;
        const cols = Math.ceil(width / gridSpacing) + 1;
        const rows = Math.ceil(height / gridSpacing) + 1;

        for (let r = 0; r < rows; r++) {
          const y = r * gridSpacing;
          for (let c = 0; c < cols; c++) {
            const x = c * gridSpacing;

            // Illuminate dots near the mouse cursor
            if (m.active > 0.1) {
              const dMouse = Math.hypot(x - m.x, y - m.y);
              if (dMouse < 180) {
                const boost = 1 - dMouse / 180;
                ctx.fillStyle = state.isDark
                  ? state.colorMode === "orange"
                    ? `rgba(255, 150, 60, ${0.18 + boost * 0.45})`
                    : `rgba(0, 245, 212, ${0.16 + boost * 0.4})`
                  : `rgba(0, 0, 0, ${0.08 + boost * 0.25})`;
                ctx.beginPath();
                ctx.arc(x, y, 1.2 + boost * 1.0, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = dotBaseColor;
                continue;
              }
            }

            ctx.beginPath();
            ctx.arc(x, y, 1.0, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 3. Prepare Color Palettes & Stroke Gradients
      let strokeGrad: CanvasGradient | string;

      if (state.colorMode === "orange") {
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0.0, "#ff5500");
        grad.addColorStop(0.35, "#ff7a29");
        grad.addColorStop(0.7, "#ff9e42");
        grad.addColorStop(1.0, "#ffb86c");
        strokeGrad = grad;
      } else if (state.colorMode === "cyber") {
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0.0, "#00f5d4");
        grad.addColorStop(0.4, "#00bbf9");
        grad.addColorStop(0.75, "#0077b6");
        grad.addColorStop(1.0, "#3a86ff");
        strokeGrad = grad;
      } else if (state.colorMode === "rgb") {
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0.0, "#ff4500");
        grad.addColorStop(0.2, "#ffb300");
        grad.addColorStop(0.42, "#00e676");
        grad.addColorStop(0.65, "#00e5ff");
        grad.addColorStop(0.85, "#2979ff");
        grad.addColorStop(1.0, "#e040fb");
        strokeGrad = grad;
      } else {
        // Monochrome OLED
        strokeGrad = state.isDark ? "#ffffff" : "#1e293b";
      }

      // Glow parameters (crisp neon stroke, not a blurry fog!)
      const glowBlur =
        state.glowIntensity === "subtle" ? 2 : state.glowIntensity === "normal" ? 4.5 : 8;
      const glowColor =
        state.colorMode === "orange"
          ? "rgba(255, 122, 41, 0.45)"
          : state.colorMode === "cyber"
            ? "rgba(0, 245, 212, 0.45)"
            : state.colorMode === "rgb"
              ? "rgba(0, 229, 255, 0.4)"
              : "rgba(255, 255, 255, 0.35)";

      ctx.save();
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = state.isDark ? glowBlur : 0;
      ctx.strokeStyle = strokeGrad;

      // 4. Render Nested Rings around Elevation Centers
      centers.forEach((center) => {
        if (!center) return;
        center.rings.forEach((r, idx) => {
          // Distinction: Index curves (Curvas Mestras) vs Intermediate curves
          const isIndexCurve = idx % 2 === 1;
          ctx.lineWidth = isIndexCurve
            ? state.isDark
              ? 2.3
              : 1.8
            : state.isDark
              ? 1.15
              : 0.9;
          ctx.globalAlpha = isIndexCurve
            ? state.isDark
              ? 0.95
              : 0.75
            : state.isDark
              ? 0.65
              : 0.45;

          const pts = getRingPoints(
            center.cx,
            center.cy,
            r,
            center.seed + idx * 0.32,
            center.speed,
          );
          drawSpline(pts, true);
        });
      });

      // 5. Render Saddle / Dual Envelope Contours connecting peaks
      saddles.forEach((saddle, sIdx) => {
        if (!saddle.c1 || !saddle.c2) return;
        const c1x = saddle.c1.cx * width;
        const c1y = saddle.c1.cy * height;
        const c2x = saddle.c2.cx * width;
        const c2y = saddle.c2.cy * height;
        const midX = (c1x + c2x) / 2;
        const midY = (c1y + c2y) / 2;
        const dx = c2x - c1x;
        const dy = c2y - c1y;
        const dist = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);
        const maxDim = Math.max(width, height);
        const r = saddle.r * maxDim;

        const t = state.motionMode === "static" ? 0 : state.time * 0.4;
        const steps = 44;
        const pts: [number, number][] = [];

        for (let i = 0; i < steps; i++) {
          const th = (i / steps) * Math.PI * 2;
          const wobble =
            1 +
            0.1 * Math.sin(th * 2 + saddle.seed + t * 0.3) +
            0.07 * Math.cos(th * 3 + saddle.seed * 1.5 - t * 0.2);

          const rx = (dist / 2 + r) * wobble;
          const ry = r * 0.82 * wobble;
          const px = rx * Math.cos(th);
          const py = ry * Math.sin(th);
          const rotX = px * Math.cos(angle) - py * Math.sin(angle);
          const rotY = px * Math.sin(angle) + py * Math.cos(angle);

          pts.push([midX + rotX, midY + rotY]);
        }

        ctx.lineWidth = sIdx === 1 ? 2.2 : 1.15;
        ctx.globalAlpha =
          sIdx === 1 ? (state.isDark ? 0.9 : 0.7) : state.isDark ? 0.6 : 0.4;
        drawSpline(pts, true);
      });

      // 6. Render Flowing Transverse Contours across full width
      flowYOffsets.forEach((yNorm, i) => {
        const yBase = yNorm * height;
        const amp = 42 + i * 5;
        const steps = 32;
        const t = state.motionMode === "static" ? 0 : state.time * (0.3 + (i % 3) * 0.1);
        const pts: [number, number][] = [];

        for (let s = 0; s <= steps; s++) {
          const x = (s / steps) * (width + 120) - 60;
          const th = (s / steps) * Math.PI * 3.4;
          const y =
            yBase +
            amp *
              (Math.sin(th + i * 1.2 + t * 0.4) * 0.65 +
                Math.cos(th * 1.7 + i * 1.7 - t * 0.3) * 0.35);
          pts.push([x, y]);
        }

        ctx.lineWidth = i % 3 === 0 ? 2.1 : 1.1;
        ctx.globalAlpha =
          i % 3 === 0 ? (state.isDark ? 0.85 : 0.65) : state.isDark ? 0.55 : 0.35;
        drawSpline(pts, false);
      });

      // 7. Interactive Pulse / Light Beam along contours
      if (state.motionMode !== "static") {
        const pulseCycle = (state.time * 0.6) % 1;
        const pulseX = pulseCycle * (width + 400) - 200;
        const gradPulse = ctx.createRadialGradient(
          pulseX,
          height * 0.45,
          10,
          pulseX,
          height * 0.45,
          300,
        );
        gradPulse.addColorStop(
          0.0,
          state.colorMode === "orange"
            ? "rgba(255, 180, 80, 0.35)"
            : "rgba(0, 245, 212, 0.35)",
        );
        gradPulse.addColorStop(1.0, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradPulse;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.restore();

      // 8. Soft central vignette to preserve 100% text readability
      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.48,
        Math.min(width, height) * 0.25,
        width * 0.5,
        height * 0.48,
        Math.max(width, height) * 0.7,
      );
      if (state.isDark) {
        vignette.addColorStop(0.0, "rgba(5, 6, 8, 0.45)");
        vignette.addColorStop(0.65, "rgba(5, 6, 8, 0.72)");
        vignette.addColorStop(1.0, "rgba(5, 6, 8, 0.92)");
      } else {
        vignette.addColorStop(0.0, "rgba(246, 246, 244, 0.35)");
        vignette.addColorStop(0.65, "rgba(246, 246, 244, 0.65)");
        vignette.addColorStop(1.0, "rgba(246, 246, 244, 0.90)");
      }

      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      state.animationFrameId = requestAnimationFrame(render);
    };

    // Pause rendering when tab is hidden to save battery & CPU
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(state.animationFrameId);
      } else {
        lastTime = performance.now();
        state.animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    state.animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(state.animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Background Interactive Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 w-full h-full object-cover"
      />

      {/* Floating Interactive Controls Pill */}
      {isMounted && (
        <div className="fixed bottom-6 left-6 z-40">
          {!isControlsOpen ? (
            <button
              onClick={() => setIsControlsOpen(true)}
              aria-label="Personalizar efeito topográfico interativo"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/15 dark:border-white/10 bg-white/80 dark:bg-black/75 backdrop-blur-xl shadow-lg hover:shadow-orange-500/20 text-xs font-medium text-foreground transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <span className="size-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="font-mono tracking-tight">Topo Interativo</span>
              <Sliders className="size-3.5 text-muted-foreground group-hover:text-orange-400 transition-colors" />
            </button>
          ) : (
            <div className="w-72 p-4 rounded-2xl border border-white/20 dark:border-white/10 bg-white/95 dark:bg-black/90 backdrop-blur-2xl shadow-2xl animate-menu-slide text-xs">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="font-semibold text-foreground tracking-tight">
                    Efeito Topográfico Vivo
                  </span>
                </div>
                <button
                  onClick={() => setIsControlsOpen(false)}
                  className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Fechar controles"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              {/* Controls */}
              <div className="mt-3.5 space-y-3">
                {/* Paleta de Cores */}
                <div>
                  <label className="text-[11px] text-muted-foreground font-medium mb-1.5 block">
                    Paleta de Cores
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => setColorMode("orange")}
                      className={cn(
                        "px-2 py-1.5 rounded-lg border text-[11px] font-medium transition-all text-center",
                        colorMode === "orange"
                          ? "border-orange-500/80 bg-orange-500/15 text-orange-400 font-semibold"
                          : "border-border/40 hover:bg-muted text-muted-foreground",
                      )}
                    >
                      Laranja Neon
                    </button>
                    <button
                      onClick={() => setColorMode("cyber")}
                      className={cn(
                        "px-2 py-1.5 rounded-lg border text-[11px] font-medium transition-all text-center",
                        colorMode === "cyber"
                          ? "border-cyan-500/80 bg-cyan-500/15 text-cyan-400 font-semibold"
                          : "border-border/40 hover:bg-muted text-muted-foreground",
                      )}
                    >
                      Cyber Aqua
                    </button>
                    <button
                      onClick={() => setColorMode("rgb")}
                      className={cn(
                        "px-2 py-1.5 rounded-lg border text-[11px] font-medium transition-all text-center",
                        colorMode === "rgb"
                          ? "border-purple-500/80 bg-purple-500/15 text-purple-400 font-semibold"
                          : "border-border/40 hover:bg-muted text-muted-foreground",
                      )}
                    >
                      RGB Teclado
                    </button>
                    <button
                      onClick={() => setColorMode("mono")}
                      className={cn(
                        "px-2 py-1.5 rounded-lg border text-[11px] font-medium transition-all text-center",
                        colorMode === "mono"
                          ? "border-zinc-400/80 bg-zinc-500/15 text-zinc-300 font-semibold"
                          : "border-border/40 hover:bg-muted text-muted-foreground",
                      )}
                    >
                      OLED Branco
                    </button>
                  </div>
                </div>

                {/* Movimento / Dinâmica */}
                <div>
                  <label className="text-[11px] text-muted-foreground font-medium mb-1.5 flex items-center gap-1.5">
                    <Activity className="size-3" /> Dinâmica do Relevo
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: "alive" as const, label: "Fluido" },
                      { id: "calm" as const, label: "Calmo" },
                      { id: "static" as const, label: "Fixo" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setMotionMode(m.id)}
                        className={cn(
                          "px-2 py-1 rounded-md text-[10px] font-medium transition-all border",
                          motionMode === m.id
                            ? "border-orange-500/70 bg-orange-500/20 text-orange-400 font-semibold"
                            : "border-border/40 text-muted-foreground hover:bg-muted",
                        )}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid Pontilhado Toggle */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
                    <CircleDot className="size-3" /> Grid Pontilhado
                  </span>
                  <button
                    onClick={() => setShowDotGrid(!showDotGrid)}
                    className={cn(
                      "px-2.5 py-1 rounded-full text-[11px] font-medium transition-all border",
                      showDotGrid
                        ? "border-orange-500/50 bg-orange-500/15 text-orange-400"
                        : "border-border/40 bg-muted/50 text-muted-foreground",
                    )}
                  >
                    {showDotGrid ? "Ativado" : "Desativado"}
                  </button>
                </div>

                {/* Brilho Neon */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
                    <Sparkles className="size-3" /> Brilho Neon
                  </span>
                  <div className="flex items-center gap-1">
                    {[
                      { id: "subtle" as const, label: "S" },
                      { id: "normal" as const, label: "M" },
                      { id: "vivid" as const, label: "L" },
                    ].map((lvl) => (
                      <button
                        key={lvl.id}
                        onClick={() => setGlowIntensity(lvl.id)}
                        className={cn(
                          "size-6 rounded-md text-[10px] font-medium transition-all border flex items-center justify-center",
                          glowIntensity === lvl.id
                            ? "border-orange-500/70 bg-orange-500/20 text-orange-400 font-semibold"
                            : "border-border/40 text-muted-foreground hover:bg-muted",
                        )}
                      >
                        {lvl.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status info */}
              <p className="mt-3 pt-2 text-[10px] text-muted-foreground/75 border-t border-border/40 text-center">
                ✨ 100% gerado por código a 60 FPS com resposta ao mouse
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
