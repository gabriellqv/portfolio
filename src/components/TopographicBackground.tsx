"use client";

import { useState } from "react";

import { useTheme } from "next-themes";

import { Sliders, Sparkles, X } from "lucide-react";

import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

/**
 * TopographicBackground component
 * Displays the exact high-contrast topographic wallpaper uploaded by the user,
 * with optional Cyber Aqua or RGB tint modes, smooth dark/light mode inversion,
 * and a subtle readability vignette to maintain crystal clear contrast for text and cards.
 */
export default function TopographicBackground() {
  const { theme, resolvedTheme } = useTheme();
  const isMounted = useMounted();
  const isDark = (resolvedTheme || theme) === "dark";

  // Configuration:
  // - tintMode: 'original' (exact black-and-white from uploaded image), 'cyber' (Cyber Aqua tint), or 'rgb' (Keyboard RGB)
  // - opacityLevel: 'subtle' (0.55), 'balanced' (0.80), 'full' (1.0)
  const [tintMode, setTintMode] = useState<"original" | "cyber" | "rgb">("original");
  const [opacityLevel, setOpacityLevel] = useState<"subtle" | "balanced" | "full">(
    "balanced",
  );
  const [isControlsOpen, setIsControlsOpen] = useState<boolean>(false);

  const opacityValue =
    opacityLevel === "subtle" ? 0.55 : opacityLevel === "balanced" ? 0.8 : 1.0;

  return (
    <>
      {/* Background Container */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 w-full h-full overflow-hidden transition-colors duration-500"
        style={{
          backgroundColor: isDark ? "#0e1215" : "#f5f5f3",
        }}
      >
        {/* Exact Topographic Image */}
        <div
          className="absolute inset-0 w-full h-full transition-all duration-500"
          style={{
            backgroundImage: "url('/topo-background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: isDark
              ? undefined
              : "invert(1) hue-rotate(180deg) brightness(0.96) contrast(1.08)",
            opacity: isDark ? opacityValue : opacityValue * 0.75,
          }}
        />

        {/* Optional Cyber Aqua Tint Overlay */}
        {tintMode === "cyber" && (
          <div
            className="absolute inset-0 w-full h-full mix-blend-screen pointer-events-none transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 245, 212, 0.9) 0%, rgba(0, 187, 249, 0.9) 40%, rgba(0, 119, 182, 0.9) 75%, rgba(58, 134, 255, 0.9) 100%)",
              opacity: isDark ? 0.85 : 0.45,
            }}
          />
        )}

        {/* Optional RGB Keyboard Spectrum Tint Overlay */}
        {tintMode === "rgb" && (
          <div
            className="absolute inset-0 w-full h-full mix-blend-screen pointer-events-none transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(90deg, rgba(255, 69, 0, 0.85) 0%, rgba(255, 179, 0, 0.85) 25%, rgba(0, 230, 118, 0.85) 50%, rgba(0, 229, 255, 0.85) 75%, rgba(217, 70, 239, 0.85) 100%)",
              opacity: isDark ? 0.85 : 0.45,
            }}
          />
        )}

        {/* Soft Vignette Overlay: Keeps central text and cards 100% sharp and readable */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-500"
          style={{
            background: isDark
              ? "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(14, 18, 21, 0.45) 0%, rgba(14, 18, 21, 0.90) 100%)"
              : "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245, 245, 243, 0.35) 0%, rgba(245, 245, 243, 0.88) 100%)",
          }}
        />
      </div>

      {/* Floating Interactive Controls Pill */}
      {isMounted && (
        <div className="fixed bottom-6 left-6 z-40">
          {!isControlsOpen ? (
            <button
              onClick={() => setIsControlsOpen(true)}
              aria-label="Personalizar fundo topográfico"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/15 dark:border-white/10 bg-white/80 dark:bg-black/75 backdrop-blur-xl shadow-lg hover:shadow-cyan-500/20 text-xs font-medium text-foreground transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <span className="size-2 rounded-full bg-cyan-400" />
              <span className="font-mono tracking-tight">Fundo Topo</span>
              <Sliders className="size-3.5 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
            </button>
          ) : (
            <div className="w-72 p-4 rounded-2xl border border-white/20 dark:border-white/10 bg-white/95 dark:bg-black/90 backdrop-blur-2xl shadow-2xl animate-menu-slide text-xs">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-cyan-400" />
                  <span className="font-semibold text-foreground tracking-tight">
                    Fundo Topográfico
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
                {/* Tonalidade */}
                <div>
                  <label className="text-[11px] text-muted-foreground font-medium mb-1.5 block">
                    Tonalidade das Linhas
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      onClick={() => setTintMode("original")}
                      className={cn(
                        "px-2 py-1.5 rounded-lg border text-[11px] font-medium transition-all text-center",
                        tintMode === "original"
                          ? "border-cyan-500/80 bg-cyan-500/10 text-cyan-400 font-semibold"
                          : "border-border/40 hover:bg-muted text-muted-foreground",
                      )}
                    >
                      Original P&B
                    </button>
                    <button
                      onClick={() => setTintMode("cyber")}
                      className={cn(
                        "px-2 py-1.5 rounded-lg border text-[11px] font-medium transition-all text-center",
                        tintMode === "cyber"
                          ? "border-cyan-500/80 bg-cyan-500/10 text-cyan-400 font-semibold"
                          : "border-border/40 hover:bg-muted text-muted-foreground",
                      )}
                    >
                      Cyber Aqua
                    </button>
                    <button
                      onClick={() => setTintMode("rgb")}
                      className={cn(
                        "px-2 py-1.5 rounded-lg border text-[11px] font-medium transition-all text-center",
                        tintMode === "rgb"
                          ? "border-cyan-500/80 bg-cyan-500/10 text-cyan-400 font-semibold"
                          : "border-border/40 hover:bg-muted text-muted-foreground",
                      )}
                    >
                      RGB Teclado
                    </button>
                  </div>
                </div>

                {/* Opacidade */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
                    <Sparkles className="size-3.5" /> Opacidade
                  </span>
                  <div className="flex items-center gap-1">
                    {[
                      { id: "subtle" as const, label: "Sutil" },
                      { id: "balanced" as const, label: "Normal" },
                      { id: "full" as const, label: "100%" },
                    ].map((lvl) => (
                      <button
                        key={lvl.id}
                        onClick={() => setOpacityLevel(lvl.id)}
                        className={cn(
                          "px-2 py-1 rounded-md text-[10px] font-medium transition-all border",
                          opacityLevel === lvl.id
                            ? "border-cyan-500/70 bg-cyan-500/20 text-cyan-400 font-semibold"
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
                ✨ Fundo topográfico de alta resolução em escala total
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
