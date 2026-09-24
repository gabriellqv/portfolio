"use client";

import { useMemo, useState } from "react";

import { useTheme } from "next-themes";

import { Grid, Sliders, Sparkles, X } from "lucide-react";

import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

/**
 * Converts an array of 2D points into a smooth cubic Bézier SVG path
 * using Catmull-Rom spline interpolation.
 */
function catmullRomToSvg(points: [number, number][], closed = true): string {
  if (points.length < 3) return "";
  const first = points[0];
  if (!first) return "";
  const n = points.length;
  const iters = closed ? n : n - 1;
  let d = `M ${first[0].toFixed(1)} ${first[1].toFixed(1)}`;

  for (let i = 0; i < iters; i++) {
    const p0 = points[(i - 1 + n) % n] ?? first;
    const p1 = points[i] ?? first;
    const p2 = points[(i + 1) % n] ?? first;
    const p3 = points[(i + 2) % n] ?? first;

    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;

    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }

  if (closed) d += " Z";
  return d;
}

/**
 * Generates an organic closed topographic contour ring around (cx, cy).
 */
function makeRing(cx: number, cy: number, r: number, seed: number, steps = 36): string {
  const pts: [number, number][] = [];
  for (let i = 0; i < steps; i++) {
    const th = (i / steps) * Math.PI * 2;
    const w =
      1 +
      0.15 * Math.sin(th * 2 + seed) +
      0.11 * Math.cos(th * 3 + seed * 1.7) +
      0.06 * Math.sin(th * 5 + seed * 2.3);
    pts.push([cx + r * w * Math.cos(th), cy + r * w * Math.sin(th) * 0.72]);
  }
  return catmullRomToSvg(pts, true);
}

/**
 * Generates a saddle envelope loop encircling two elevation centers.
 */
function makeDualRing(
  c1: [number, number],
  c2: [number, number],
  r: number,
  seed: number,
  steps = 42,
): string {
  const pts: [number, number][] = [];
  const midX = (c1[0] + c2[0]) / 2;
  const midY = (c1[1] + c2[1]) / 2;
  const dx = c2[0] - c1[0];
  const dy = c2[1] - c1[1];
  const dist = Math.hypot(dx, dy);
  const angleBase = Math.atan2(dy, dx);

  for (let i = 0; i < steps; i++) {
    const th = (i / steps) * Math.PI * 2;
    const wobble =
      1 + 0.1 * Math.sin(th * 2 + seed) + 0.07 * Math.cos(th * 3 + seed * 1.5);
    const rx = (dist / 2 + r) * wobble;
    const ry = r * 0.85 * wobble;
    const px = rx * Math.cos(th);
    const py = ry * Math.sin(th);
    const rotX = px * Math.cos(angleBase) - py * Math.sin(angleBase);
    const rotY = px * Math.sin(angleBase) + py * Math.cos(angleBase);
    pts.push([midX + rotX, midY + rotY]);
  }
  return catmullRomToSvg(pts, true);
}

/**
 * Generates an open sweeping transverse topographic contour line.
 */
function makeTransverse(yBase: number, amp: number, seed: number, steps = 30): string {
  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * 2100 - 90;
    const th = (i / steps) * Math.PI * 3.2;
    const y =
      yBase + amp * (Math.sin(th + seed) * 0.65 + Math.cos(th * 1.6 + seed * 1.8) * 0.35);
    pts.push([x, y]);
  }
  return catmullRomToSvg(pts, false);
}

export default function TopographicBackground() {
  const { theme, resolvedTheme } = useTheme();
  const isMounted = useMounted();
  const isDark = (resolvedTheme || theme) === "dark";

  // Configuration tuned to user feedback:
  // - Default color: Cyber Aqua
  // - No animation / waving: completely static, calm and crisp
  // - Glow level: Minimo (much less than S, razor-sharp vector line with ultra-subtle sheen)
  const [colorPalette, setColorPalette] = useState<"cyber" | "rgb" | "sunset">("cyber");
  const [glowLevel, setGlowLevel] = useState<"none" | "minimal" | "subtle">("minimal");
  const [keycapGrid, setKeycapGrid] = useState<boolean>(false);
  const [isControlsOpen, setIsControlsOpen] = useState<boolean>(false);

  // Pre-generate mathematically smooth topographic contour vector paths
  const topoPaths = useMemo(() => {
    const paths: string[] = [];

    // 5 Elevation Centers (Mountains / Knolls)
    const centers: { cx: number; cy: number; rings: number[]; seed: number }[] = [
      { cx: 380, cy: 260, rings: [35, 75, 120, 175, 235, 305, 385], seed: 1.2 },
      { cx: 1480, cy: 340, rings: [40, 85, 135, 195, 265, 345, 435], seed: 2.5 },
      { cx: 240, cy: 820, rings: [30, 70, 115, 170, 235, 315], seed: 3.8 },
      { cx: 1120, cy: 780, rings: [35, 80, 130, 190, 260, 340], seed: 4.4 },
      { cx: 1780, cy: 760, rings: [30, 75, 125, 185, 255], seed: 5.1 },
    ];

    centers.forEach((c) => {
      c.rings.forEach((r, idx) => {
        paths.push(makeRing(c.cx, c.cy, r, c.seed + idx * 0.32));
      });
    });

    // Saddle / Envelope contours connecting neighboring peaks
    paths.push(makeDualRing([380, 260], [1480, 340], 190, 1.7));
    paths.push(makeDualRing([380, 260], [1480, 340], 290, 2.1));
    paths.push(makeDualRing([240, 820], [1120, 780], 170, 3.2));
    paths.push(makeDualRing([1120, 780], [1780, 760], 160, 4.1));
    paths.push(makeDualRing([380, 260], [240, 820], 150, 2.8));

    // Sweeping transverse contour lines across the canvas
    [70, 200, 360, 520, 680, 840, 970].forEach((y, i) => {
      paths.push(makeTransverse(y, 45 + i * 6, i * 1.3));
    });

    return paths;
  }, []);

  // Stroke and glow filter styling based on selected options
  const filterStyle = useMemo(() => {
    if (glowLevel === "none") return undefined;
    if (glowLevel === "minimal") {
      return colorPalette === "cyber"
        ? "drop-shadow(0 0 1px rgba(0, 245, 212, 0.35))"
        : colorPalette === "rgb"
          ? "drop-shadow(0 0 1px rgba(0, 229, 255, 0.35))"
          : "drop-shadow(0 0 1px rgba(255, 0, 127, 0.35))";
    }
    // "subtle"
    return colorPalette === "cyber"
      ? "drop-shadow(0 0 1.8px rgba(0, 245, 212, 0.5))"
      : colorPalette === "rgb"
        ? "drop-shadow(0 0 1.8px rgba(0, 229, 255, 0.5))"
        : "drop-shadow(0 0 1.8px rgba(255, 0, 127, 0.5))";
  }, [glowLevel, colorPalette]);

  return (
    <>
      {/* Background SVG: Crisp, perfectly anti-aliased vector topographic isolines */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 w-full h-full overflow-hidden transition-colors duration-500"
        style={{
          backgroundColor: isDark ? "#060608" : "#f8f8f6",
        }}
      >
        <svg
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full object-cover"
          style={{ filter: filterStyle }}
        >
          <defs>
            {/* Cyber Aqua: Sleek neon aqua to electric cyan and azure */}
            <linearGradient id="topo-cyber-aqua" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f5d4" />
              <stop offset="35%" stopColor="#00bbf9" />
              <stop offset="70%" stopColor="#0077b6" />
              <stop offset="100%" stopColor="#3a86ff" />
            </linearGradient>

            {/* RGB Teclado: Horizontal spectrum from photo */}
            <linearGradient id="topo-rgb" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff4500" />
              <stop offset="22%" stopColor="#ffb300" />
              <stop offset="45%" stopColor="#00e676" />
              <stop offset="70%" stopColor="#00e5ff" />
              <stop offset="88%" stopColor="#2979ff" />
              <stop offset="100%" stopColor="#e040fb" />
            </linearGradient>

            {/* Sunset Neon */}
            <linearGradient id="topo-sunset" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff007f" />
              <stop offset="50%" stopColor="#ff5400" />
              <stop offset="100%" stopColor="#7928ca" />
            </linearGradient>

            {/* Light mode gradient */}
            <linearGradient id="topo-light-mode" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>

          {/* Optional Mechanical Keycap Grid */}
          {keycapGrid && (
            <g
              stroke={isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)"}
              strokeWidth="1"
              fill="none"
            >
              {Array.from({ length: 6 }).map((_, row) =>
                Array.from({ length: 15 }).map((__, col) => {
                  const stagger = row % 2 === 1 ? 40 : 0;
                  const x = 70 + col * 118 + stagger;
                  const y = 80 + row * 155;
                  return (
                    <rect
                      key={`${row}-${col}`}
                      x={x}
                      y={y}
                      width={106}
                      height={140}
                      rx={12}
                    />
                  );
                }),
              )}
            </g>
          )}

          {/* Topographic Contour Paths: Crisp 1.2px vector precision */}
          <g
            fill="none"
            stroke={
              !isDark
                ? "url(#topo-light-mode)"
                : colorPalette === "cyber"
                  ? "url(#topo-cyber-aqua)"
                  : colorPalette === "rgb"
                    ? "url(#topo-rgb)"
                    : "url(#topo-sunset)"
            }
            strokeWidth="1.25"
            strokeOpacity={isDark ? 0.72 : 0.45}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {topoPaths.map((d, index) => (
              <path key={index} d={d} />
            ))}
          </g>
        </svg>

        {/* Soft vignette to maintain 100% contrast and legibility for text & cards */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? "radial-gradient(ellipse 65% 55% at 50% 48%, rgba(6, 6, 8, 0.55) 0%, rgba(6, 6, 8, 0.92) 100%)"
              : "radial-gradient(ellipse 65% 55% at 50% 48%, rgba(248, 248, 246, 0.4) 0%, rgba(248, 248, 246, 0.88) 100%)",
          }}
        />
      </div>

      {/* Floating Interactive Controls Pill */}
      {isMounted && (
        <div className="fixed bottom-6 left-6 z-40">
          {!isControlsOpen ? (
            <button
              onClick={() => setIsControlsOpen(true)}
              aria-label="Personalizar efeito Topo Cyber Aqua"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/15 dark:border-white/10 bg-white/80 dark:bg-black/75 backdrop-blur-xl shadow-lg hover:shadow-cyan-500/20 text-xs font-medium text-foreground transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <span className="size-2 rounded-full bg-cyan-400" />
              <span className="font-mono tracking-tight">Topo Cyber Aqua</span>
              <Sliders className="size-3.5 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
            </button>
          ) : (
            <div className="w-72 p-4 rounded-2xl border border-white/20 dark:border-white/10 bg-white/95 dark:bg-black/90 backdrop-blur-2xl shadow-2xl animate-menu-slide text-xs">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-cyan-400" />
                  <span className="font-semibold text-foreground tracking-tight">
                    Relevo Topográfico
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
                {/* Palette */}
                <div>
                  <label className="text-[11px] text-muted-foreground font-medium mb-1.5 block">
                    Paleta de Cores
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      onClick={() => setColorPalette("cyber")}
                      className={cn(
                        "px-2 py-1.5 rounded-lg border text-[11px] font-medium transition-all text-center",
                        colorPalette === "cyber"
                          ? "border-cyan-500/80 bg-cyan-500/10 text-cyan-400 font-semibold"
                          : "border-border/40 hover:bg-muted text-muted-foreground",
                      )}
                    >
                      Cyber Aqua
                    </button>
                    <button
                      onClick={() => setColorPalette("rgb")}
                      className={cn(
                        "px-2 py-1.5 rounded-lg border text-[11px] font-medium transition-all text-center",
                        colorPalette === "rgb"
                          ? "border-cyan-500/80 bg-cyan-500/10 text-cyan-400 font-semibold"
                          : "border-border/40 hover:bg-muted text-muted-foreground",
                      )}
                    >
                      RGB Teclado
                    </button>
                    <button
                      onClick={() => setColorPalette("sunset")}
                      className={cn(
                        "px-2 py-1.5 rounded-lg border text-[11px] font-medium transition-all text-center",
                        colorPalette === "sunset"
                          ? "border-cyan-500/80 bg-cyan-500/10 text-cyan-400 font-semibold"
                          : "border-border/40 hover:bg-muted text-muted-foreground",
                      )}
                    >
                      Sunset
                    </button>
                  </div>
                </div>

                {/* Glow Level */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
                    <Sparkles className="size-3.5" /> Brilho
                  </span>
                  <div className="flex items-center gap-1">
                    {[
                      { id: "none" as const, label: "Zero" },
                      { id: "minimal" as const, label: "Mínimo" },
                      { id: "subtle" as const, label: "Sutil" },
                    ].map((lvl) => (
                      <button
                        key={lvl.id}
                        onClick={() => setGlowLevel(lvl.id)}
                        className={cn(
                          "px-2 py-1 rounded-md text-[10px] font-medium transition-all border",
                          glowLevel === lvl.id
                            ? "border-cyan-500/70 bg-cyan-500/20 text-cyan-400 font-semibold"
                            : "border-border/40 text-muted-foreground hover:bg-muted",
                        )}
                      >
                        {lvl.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Keycap grid toggle */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
                    <Grid className="size-3.5" /> Grade de Teclas
                  </span>
                  <button
                    onClick={() => setKeycapGrid(!keycapGrid)}
                    className={cn(
                      "px-2.5 py-1 rounded-full text-[11px] font-medium transition-all border",
                      keycapGrid
                        ? "border-cyan-500/50 bg-cyan-500/15 text-cyan-400"
                        : "border-border/40 bg-muted/50 text-muted-foreground",
                    )}
                  >
                    {keycapGrid ? "Ativada" : "Desativada"}
                  </button>
                </div>
              </div>

              {/* Status info */}
              <p className="mt-3 pt-2 text-[10px] text-muted-foreground/75 border-t border-border/40 text-center">
                ✨ Linhas vetoriais nítidas em alta definição e estáticas
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
