"use client";

import { useEffect, useRef, useState } from "react";

import { useTheme } from "next-themes";

import { Activity, CircleDot, Sliders, Sparkles, X } from "lucide-react";

import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

// Lookup table for Marching Squares cell line segments
// Edges: 0: top, 1: right, 2: bottom, 3: left
const EDGE_TABLE: [number, number][][] = [
  [], // 0
  [[3, 0]], // 1
  [[0, 1]], // 2
  [[3, 1]], // 3
  [[1, 2]], // 4
  [
    [3, 0],
    [1, 2],
  ], // 5 (saddle)
  [[0, 2]], // 6
  [[3, 2]], // 7
  [[2, 3]], // 8
  [[2, 0]], // 9
  [
    [0, 1],
    [2, 3],
  ], // 10 (saddle)
  [[2, 1]], // 11
  [[1, 3]], // 12
  [[1, 0]], // 13
  [[0, 3]], // 14
  [], // 15
];

export default function TopographicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme, resolvedTheme } = useTheme();
  const isMounted = useMounted();
  const isDark = (resolvedTheme || theme) === "dark";

  const [colorMode, setColorMode] = useState<"orange" | "cyber" | "rgb" | "mono">(
    "orange",
  );
  const [motionMode, setMotionMode] = useState<"alive" | "calm" | "static">("alive");
  const [showDotGrid, setShowDotGrid] = useState<boolean>(true);
  const [glowIntensity, setGlowIntensity] = useState<"subtle" | "normal" | "vivid">(
    "normal",
  );
  const [isControlsOpen, setIsControlsOpen] = useState<boolean>(false);

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

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      state.motionMode = "static";
    }

    // Grid resolution for 60fps Marching Squares (< 0.4ms evaluation per frame)
    const GRID_X = 110;
    const GRID_Y = 70;
    const grid = new Float32Array((GRID_X + 1) * (GRID_Y + 1));

    // Perlin noise permutation table
    const P = new Uint8Array(512);
    for (let i = 0; i < 256; i++) {
      P[i] = P[i + 256] = Math.floor(Math.sin(i * 12.9898 + 78.233) * 43758.5453) & 255;
    }

    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (t: number, a: number, b: number) => a + t * (b - a);
    const grad = (hash: number, x: number, y: number) => {
      const h = hash & 7;
      const u = h < 4 ? x : y;
      const v = h < 4 ? y : x;
      return (h & 1 ? -u : u) + (h & 2 ? -2.0 * v : 2.0 * v);
    };

    const noise2D = (x: number, y: number) => {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      const xf = x - Math.floor(x);
      const yf = y - Math.floor(y);
      const u = fade(xf);
      const v = fade(yf);
      const a = (P[X] ?? 0) + Y;
      const b = (P[X + 1] ?? 0) + Y;
      return lerp(
        v,
        lerp(u, grad(P[a] ?? 0, xf, yf), grad(P[b] ?? 0, xf - 1, yf)),
        lerp(u, grad(P[a + 1] ?? 0, xf, yf - 1), grad(P[b + 1] ?? 0, xf - 1, yf - 1)),
      );
    };

    // 8 Organic Summits (arranged naturally to give rich perimeter ridges and open center)
    const summits = [
      { x: 0.18, y: 0.18, h: 2.2, r: 0.15, s: 0.22, p: 0.4, dx: 0.025, dy: 0.02 },
      { x: 0.85, y: 0.2, h: 2.4, r: 0.16, s: 0.18, p: 1.6, dx: 0.02, dy: 0.025 },
      { x: 0.32, y: 0.42, h: 2.1, r: 0.14, s: 0.25, p: 2.8, dx: 0.02, dy: 0.02 },
      { x: 0.68, y: 0.4, h: 2.3, r: 0.15, s: 0.2, p: 3.5, dx: 0.025, dy: 0.02 },
      { x: 0.16, y: 0.72, h: 2.0, r: 0.15, s: 0.24, p: 4.6, dx: 0.02, dy: 0.02 },
      { x: 0.84, y: 0.76, h: 2.2, r: 0.16, s: 0.21, p: 5.3, dx: 0.025, dy: 0.02 },
      { x: 0.5, y: 0.68, h: 1.9, r: 0.14, s: 0.26, p: 0.9, dx: 0.02, dy: 0.02 },
      { x: 0.5, y: 0.22, h: 1.8, r: 0.13, s: 0.23, p: 2.0, dx: 0.02, dy: 0.02 },
    ];

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

    // Edge crossing interpolation helper
    const getEdgePoint = (
      edge: number,
      x0: number,
      y0: number,
      x1: number,
      y1: number,
      v0: number,
      v1: number,
      v2: number,
      v3: number,
      iso: number,
    ): [number, number] => {
      if (edge === 0) {
        const t = (iso - v0) / (v1 - v0 || 0.0001);
        return [x0 + t * (x1 - x0), y0];
      } else if (edge === 1) {
        const t = (iso - v1) / (v2 - v1 || 0.0001);
        return [x1, y0 + t * (y1 - y0)];
      } else if (edge === 2) {
        const t = (iso - v3) / (v2 - v3 || 0.0001);
        return [x0 + t * (x1 - x0), y1];
      } else {
        const t = (iso - v0) / (v3 - v0 || 0.0001);
        return [x0, y0 + t * (y1 - y0)];
      }
    };

    const NUM_LEVELS = 24;
    let lastTime = performance.now();

    const render = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (state.motionMode !== "static") {
        state.time += delta * (state.motionMode === "calm" ? 0.35 : 0.85);
      }

      const m = state.mouse;
      m.x += (m.targetX - m.x) * 0.12;
      m.y += (m.targetY - m.y) * 0.12;

      // 1. OLED Dark Background
      ctx.fillStyle = state.isDark ? "#060608" : "#f6f6f4";
      ctx.fillRect(0, 0, width, height);

      // 2. Ambient Dot Matrix Grid
      if (state.showDotGrid) {
        const dotSpacing = 32;
        const dotBaseColor = state.isDark
          ? state.colorMode === "orange"
            ? "rgba(255, 122, 41, 0.12)"
            : state.colorMode === "cyber"
              ? "rgba(0, 245, 212, 0.12)"
              : state.colorMode === "rgb"
                ? "rgba(180, 140, 255, 0.12)"
                : "rgba(255, 255, 255, 0.10)"
          : "rgba(0, 0, 0, 0.07)";

        ctx.fillStyle = dotBaseColor;
        const cols = Math.ceil(width / dotSpacing) + 1;
        const rows = Math.ceil(height / dotSpacing) + 1;

        for (let r = 0; r < rows; r++) {
          const py = r * dotSpacing;
          for (let c = 0; c < cols; c++) {
            const px = c * dotSpacing;

            if (m.active > 0.05) {
              const d = Math.hypot(px - m.x, py - m.y);
              if (d < 180) {
                const boost = 1 - d / 180;
                ctx.fillStyle = state.isDark
                  ? state.colorMode === "orange"
                    ? `rgba(255, 150, 50, ${0.12 + boost * 0.5})`
                    : state.colorMode === "cyber"
                      ? `rgba(0, 245, 212, ${0.12 + boost * 0.45})`
                      : state.colorMode === "rgb"
                        ? `rgba(220, 100, 255, ${0.12 + boost * 0.45})`
                        : `rgba(255, 255, 255, ${0.1 + boost * 0.4})`
                  : `rgba(0, 0, 0, ${0.07 + boost * 0.25})`;
                ctx.beginPath();
                ctx.arc(px, py, 0.9 + boost * 0.8, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = dotBaseColor;
                continue;
              }
            }

            ctx.beginPath();
            ctx.arc(px, py, 0.85, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 3. Compute Elevation Field on Grid
      const cellW = width / GRID_X;
      const cellH = height / GRID_Y;

      const currentSummits = summits.map((p) => ({
        x: (p.x + Math.sin(state.time * p.s + p.p) * p.dx) * width,
        y: (p.y + Math.cos(state.time * p.s + p.p) * p.dy) * height,
        h: p.h,
        rSq: Math.pow(p.r * Math.max(width, height), 2) * 2,
      }));

      const maxDim = Math.max(width, height);
      const mouseRadiusSq = 2 * 130 * 130;

      let minElev = 999;
      let maxElev = -999;
      let idx = 0;

      for (let gy = 0; gy <= GRID_Y; gy++) {
        const py = gy * cellH;
        for (let gx = 0; gx <= GRID_X; gx++) {
          const px = gx * cellW;

          let elev = 0;
          for (let i = 0; i < currentSummits.length; i++) {
            const s = currentSummits[i];
            if (!s) continue;
            const dx = px - s.x;
            const dy = py - s.y;
            elev += s.h * Math.exp(-(dx * dx + dy * dy) / s.rSq);
          }

          // Ambient noise undulation
          const nx = (px / maxDim) * 3.8;
          const ny = (py / maxDim) * 3.8;
          elev += 0.35 * noise2D(nx + state.time * 0.04, ny + state.time * 0.03);
          elev +=
            0.18 * noise2D(nx * 2.2 - state.time * 0.03, ny * 2.2 + state.time * 0.04);

          // Mouse ripple
          if (m.active > 0.05) {
            const mdx = px - m.x;
            const mdy = py - m.y;
            const mDistSq = mdx * mdx + mdy * mdy;
            if (mDistSq < mouseRadiusSq * 2.5) {
              const mDist = Math.sqrt(mDistSq);
              elev +=
                0.5 *
                Math.exp(-mDistSq / mouseRadiusSq) *
                Math.cos(mDist * 0.055 - state.time * 4.0);
            }
          }

          grid[idx++] = elev;
          if (elev < minElev) minElev = elev;
          if (elev > maxElev) maxElev = elev;
        }
      }

      // 4. Extract & Render Isolines (Zero crossings guaranteed!)
      const range = maxElev - minElev;
      const isoStart = minElev + range * 0.08;
      const isoEnd = maxElev - range * 0.04;
      const step = (isoEnd - isoStart) / (NUM_LEVELS + 1);

      // Glow setting
      const glowBlur =
        state.glowIntensity === "subtle"
          ? 2
          : state.glowIntensity === "normal"
            ? 4.5
            : 7.5;

      for (let l = 1; l <= NUM_LEVELS; l++) {
        const iso = isoStart + l * step;
        const isMaster = l % 4 === 0;

        ctx.beginPath();

        // Stroke styling based on colorMode and hierarchy
        ctx.lineWidth = isMaster ? (state.isDark ? 2.2 : 1.8) : state.isDark ? 1.15 : 0.9;

        if (state.colorMode === "orange") {
          ctx.strokeStyle = isMaster
            ? state.isDark
              ? "#ff6c22"
              : "#ea580c"
            : state.isDark
              ? "#b24212"
              : "#c2410c";
          ctx.shadowColor = isMaster
            ? "rgba(255, 108, 34, 0.45)"
            : "rgba(255, 75, 20, 0.12)";
        } else if (state.colorMode === "cyber") {
          ctx.strokeStyle = isMaster
            ? state.isDark
              ? "#00f5d4"
              : "#0284c7"
            : state.isDark
              ? "#0077b6"
              : "#0369a1";
          ctx.shadowColor = isMaster
            ? "rgba(0, 245, 212, 0.45)"
            : "rgba(0, 187, 249, 0.12)";
        } else if (state.colorMode === "rgb") {
          const hue = (l * 15 + state.time * 20) % 360;
          ctx.strokeStyle = `hsl(${hue}, 95%, ${isMaster ? "65%" : "45%"})`;
          ctx.shadowColor = `hsla(${hue}, 95%, 60%, ${isMaster ? 0.45 : 0.15})`;
        } else {
          // Monochrome OLED
          ctx.strokeStyle = isMaster
            ? state.isDark
              ? "#ffffff"
              : "#0f172a"
            : state.isDark
              ? "#52525b"
              : "#94a3b8";
          ctx.shadowColor = isMaster
            ? state.isDark
              ? "rgba(255, 255, 255, 0.4)"
              : "rgba(0, 0, 0, 0.15)"
            : "transparent";
        }

        ctx.shadowBlur = state.isDark ? (isMaster ? glowBlur : glowBlur * 0.4) : 0;

        for (let gy = 0; gy < GRID_Y; gy++) {
          const row0 = gy * (GRID_X + 1);
          const row1 = (gy + 1) * (GRID_X + 1);
          const y0 = gy * cellH;
          const y1 = (gy + 1) * cellH;

          for (let gx = 0; gx < GRID_X; gx++) {
            const x0 = gx * cellW;
            const x1 = (gx + 1) * cellW;

            const v0 = grid[row0 + gx] ?? 0;
            const v1 = grid[row0 + gx + 1] ?? 0;
            const v2 = grid[row1 + gx + 1] ?? 0;
            const v3 = grid[row1 + gx] ?? 0;

            let mask = 0;
            if (v0 >= iso) mask |= 1;
            if (v1 >= iso) mask |= 2;
            if (v2 >= iso) mask |= 4;
            if (v3 >= iso) mask |= 8;

            if (mask === 0 || mask === 15) continue;

            const segs = EDGE_TABLE[mask];
            if (!segs) continue;
            for (let s = 0; s < segs.length; s++) {
              const seg = segs[s];
              if (!seg) continue;
              const eA = seg[0];
              const eB = seg[1];

              const ptA = getEdgePoint(eA, x0, y0, x1, y1, v0, v1, v2, v3, iso);
              const ptB = getEdgePoint(eB, x0, y0, x1, y1, v0, v1, v2, v3, iso);

              ctx.moveTo(ptA[0], ptA[1]);
              ctx.lineTo(ptB[0], ptB[1]);
            }
          }
        }

        ctx.stroke();
      }

      ctx.shadowBlur = 0;

      // 5. Soft Vignette to protect hero typography
      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.48,
        Math.min(width, height) * 0.22,
        width * 0.5,
        height * 0.48,
        Math.max(width, height) * 0.68,
      );
      if (state.isDark) {
        vignette.addColorStop(0.0, "rgba(6, 6, 8, 0.40)");
        vignette.addColorStop(0.65, "rgba(6, 6, 8, 0.70)");
        vignette.addColorStop(1.0, "rgba(6, 6, 8, 0.90)");
      } else {
        vignette.addColorStop(0.0, "rgba(246, 246, 244, 0.30)");
        vignette.addColorStop(0.65, "rgba(246, 246, 244, 0.60)");
        vignette.addColorStop(1.0, "rgba(246, 246, 244, 0.88)");
      }

      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      state.animationFrameId = requestAnimationFrame(render);
    };

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
                      RGB Dinâmico
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
                ✨ Curvas de nível 100% autênticas a 60 FPS com resposta ao mouse
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
