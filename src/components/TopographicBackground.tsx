"use client";

import { useState } from "react";

import { useTheme } from "next-themes";

import { Image as ImageIcon, Sliders, Sparkles, X } from "lucide-react";

import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

/**
 * TopographicBackground component
 * Displays high-contrast topographic wallpapers uploaded by the user:
 * - 'orange': Warm neon orange/amber contour lines with subtle dot grid on pure black
 * - 'dark': OLED monochrome black-and-white topographic map with thick master curves
 */
export default function TopographicBackground() {
  const { theme, resolvedTheme } = useTheme();
  const isMounted = useMounted();
  const isDark = (resolvedTheme || theme) === "dark";

  const [activeWallpaper, setActiveWallpaper] = useState<"orange" | "dark">("orange");
  const [opacityLevel, setOpacityLevel] = useState<"subtle" | "balanced" | "full">(
    "balanced",
  );
  const [isControlsOpen, setIsControlsOpen] = useState<boolean>(false);

  const opacityValue =
    opacityLevel === "subtle" ? 0.6 : opacityLevel === "balanced" ? 0.85 : 1.0;

  return (
    <>
      {/* Background Container */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 w-full h-full overflow-hidden transition-colors duration-500"
        style={{
          backgroundColor: isDark ? "#050505" : "#f5f5f3",
        }}
      >
        {/* Active Topographic Image */}
        <div
          className="absolute inset-0 w-full h-full transition-all duration-500"
          style={{
            backgroundImage:
              activeWallpaper === "orange"
                ? "url('/topo-orange.png')"
                : "url('/topo-background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: isDark
              ? undefined
              : "invert(1) hue-rotate(180deg) brightness(0.96) contrast(1.08)",
            opacity: isDark ? opacityValue : opacityValue * 0.75,
          }}
        />

        {/* Soft Vignette Overlay: Keeps central text and cards 100% sharp and readable */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-500"
          style={{
            background: isDark
              ? "radial-gradient(ellipse 75% 65% at 50% 50%, rgba(5, 5, 5, 0.45) 0%, rgba(5, 5, 5, 0.88) 100%)"
              : "radial-gradient(ellipse 75% 65% at 50% 50%, rgba(245, 245, 243, 0.35) 0%, rgba(245, 245, 243, 0.88) 100%)",
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
              className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/15 dark:border-white/10 bg-white/80 dark:bg-black/75 backdrop-blur-xl shadow-lg hover:shadow-orange-500/20 text-xs font-medium text-foreground transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <span className="size-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="font-mono tracking-tight">Topo Orange</span>
              <Sliders className="size-3.5 text-muted-foreground group-hover:text-orange-400 transition-colors" />
            </button>
          ) : (
            <div className="w-72 p-4 rounded-2xl border border-white/20 dark:border-white/10 bg-white/95 dark:bg-black/90 backdrop-blur-2xl shadow-2xl animate-menu-slide text-xs">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-orange-500" />
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
                {/* Wallpaper Selecionado */}
                <div>
                  <label className="text-[11px] text-muted-foreground font-medium mb-1.5 flex items-center gap-1.5">
                    <ImageIcon className="size-3" /> Imagem de Fundo
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => setActiveWallpaper("orange")}
                      className={cn(
                        "px-2 py-1.5 rounded-lg border text-[11px] font-medium transition-all text-center",
                        activeWallpaper === "orange"
                          ? "border-orange-500/80 bg-orange-500/15 text-orange-400 font-semibold"
                          : "border-border/40 hover:bg-muted text-muted-foreground",
                      )}
                    >
                      Laranja Neon
                    </button>
                    <button
                      onClick={() => setActiveWallpaper("dark")}
                      className={cn(
                        "px-2 py-1.5 rounded-lg border text-[11px] font-medium transition-all text-center",
                        activeWallpaper === "dark"
                          ? "border-orange-500/80 bg-orange-500/15 text-orange-400 font-semibold"
                          : "border-border/40 hover:bg-muted text-muted-foreground",
                      )}
                    >
                      OLED P&B
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
                ✨ Fundo topográfico em alta definição
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
