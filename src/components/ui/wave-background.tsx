"use client";

import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useTheme } from "next-themes";

import { createNoise2D } from "simplex-noise";

interface Point {
  x: number;
  y: number;
  wave: { x: number; y: number };
  cursor: { x: number; y: number; vx: number; vy: number };
}

export interface WavesProps {
  className?: string;
  strokeColorLight?: string;
  strokeColorDark?: string;
  backgroundColorLight?: string;
  backgroundColorDark?: string;
  pointerSize?: number;
}

export function Waves({
  className = "",
  strokeColorLight = "#585C7D",
  strokeColorDark = "#9697cf",
  backgroundColorLight = "#F0F1F2",
  backgroundColorDark = "#20202c",
  pointerSize = 0.5,
}: WavesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const { theme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(true);

  // Sync theme with next-themes and document classList
  useEffect(() => {
    const checkDark = () => {
      const isDarkTheme =
        (resolvedTheme || theme) === "dark" ||
        document.documentElement.classList.contains("dark");
      setIsDark(isDarkTheme);
    };

    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [theme, resolvedTheme]);

  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    lx: 0,
    ly: 0,
    sx: 0,
    sy: 0,
    v: 0,
    vs: 0,
    a: 0,
    set: false,
  });

  const pathsRef = useRef<SVGPathElement[]>([]);
  const linesRef = useRef<Point[][]>([]);
  const noiseRef = useRef(createNoise2D());
  const rafRef = useRef<number | null>(null);
  const boundingRef = useRef<DOMRect | null>(null);

  const strokeColor = isDark ? strokeColorDark : strokeColorLight;
  const backgroundColor = isDark ? backgroundColorDark : backgroundColorLight;

  // Update strokeColor on existing paths dynamically without clearing points
  useEffect(() => {
    pathsRef.current.forEach((p) => {
      p.setAttribute("stroke", strokeColor);
    });
  }, [strokeColor]);

  // Dimension measurement with validation
  const setSize = useCallback(() => {
    if (!containerRef.current || !svgRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    boundingRef.current = rect;
    svgRef.current.style.width = `${rect.width}px`;
    svgRef.current.style.height = `${rect.height}px`;
  }, []);

  // Grid initialization
  const setLines = useCallback(() => {
    if (!svgRef.current || !boundingRef.current) return;
    const { width, height } = boundingRef.current;
    if (width <= 0 || height <= 0) return;

    pathsRef.current.forEach((p) => p.remove());
    pathsRef.current = [];
    linesRef.current = [];

    const xGap = 8;
    const yGap = 8;
    const oWidth = width + 200;
    const oHeight = height + 30;
    const totalLines = Math.ceil(oWidth / xGap);
    const totalPoints = Math.ceil(oHeight / yGap);
    const xStart = (width - xGap * totalLines) / 2;
    const yStart = (height - yGap * totalPoints) / 2;

    for (let i = 0; i < totalLines; i++) {
      const points: Point[] = [];
      for (let j = 0; j < totalPoints; j++) {
        points.push({
          x: xStart + xGap * i,
          y: yStart + yGap * j,
          wave: { x: 0, y: 0 },
          cursor: { x: 0, y: 0, vx: 0, vy: 0 },
        });
      }
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", strokeColor);
      path.setAttribute("stroke-width", "1");
      svgRef.current.appendChild(path);
      pathsRef.current.push(path);
      linesRef.current.push(points);
    }
  }, [strokeColor]);

  const onResize = useCallback(() => {
    setSize();
    setLines();
  }, [setSize, setLines]);

  const updateMousePosition = useCallback((x: number, y: number) => {
    const mouse = mouseRef.current;
    mouse.x = x;
    mouse.y = y;
    if (!mouse.set) {
      mouse.sx = x;
      mouse.sy = y;
      mouse.lx = x;
      mouse.ly = y;
      mouse.set = true;
    }
    if (containerRef.current) {
      containerRef.current.style.setProperty("--x", `${mouse.sx}px`);
      containerRef.current.style.setProperty("--y", `${mouse.sy}px`);
    }
  }, []);

  const movePoints = useCallback((time: number) => {
    const noise = noiseRef.current;
    linesRef.current.forEach((points) => {
      points.forEach((p) => {
        const move =
          noise((p.x + time * 0.008) * 0.003, (p.y + time * 0.003) * 0.002) * 8;
        p.wave.x = Math.cos(move) * 12;
        p.wave.y = Math.sin(move) * 6;

        const mouse = mouseRef.current;
        const dx = p.x - mouse.sx;
        const dy = p.y - mouse.sy;
        const d = Math.hypot(dx, dy);
        const l = Math.max(175, mouse.vs);

        if (d < l) {
          const s = 1 - d / l;
          const f = Math.cos(d * 0.001) * s;
          p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.00035;
          p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.00035;
        }

        p.cursor.vx += (0 - p.cursor.x) * 0.01;
        p.cursor.vy += (0 - p.cursor.y) * 0.01;
        p.cursor.vx *= 0.95;
        p.cursor.vy *= 0.95;
        p.cursor.x += p.cursor.vx;
        p.cursor.y += p.cursor.vy;
      });
    });
  }, []);

  const drawLines = useCallback(() => {
    linesRef.current.forEach((points, i) => {
      const path = pathsRef.current[i];
      if (!path) return;
      const first = points[0];
      if (!first) return;

      let d = `M ${first.x} ${first.y}`;
      for (let j = 1; j < points.length; j++) {
        const p = points[j];
        if (!p) continue;
        d += `L ${p.x + p.wave.x + p.cursor.x} ${p.y + p.wave.y + p.cursor.y}`;
      }
      path.setAttribute("d", d);
    });
  }, []);

  const tick = useCallback(
    function loop(time: number) {
      const mouse = mouseRef.current;
      mouse.sx += (mouse.x - mouse.sx) * 0.1;
      mouse.sy += (mouse.y - mouse.sy) * 0.1;
      const dx = mouse.x - mouse.lx;
      const dy = mouse.y - mouse.ly;
      const d = Math.hypot(dx, dy);
      mouse.v = d;
      mouse.vs += (d - mouse.vs) * 0.1;
      mouse.vs = Math.min(55, mouse.vs);
      mouse.lx = mouse.x;
      mouse.ly = mouse.y;
      mouse.a = Math.atan2(dy, dx);

      movePoints(time);
      drawLines();
      rafRef.current = requestAnimationFrame(loop);
    },
    [movePoints, drawLines],
  );

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return;

    setSize();
    setLines();

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      movePoints(0);
      drawLines();
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      updateMousePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) updateMousePosition(t.clientX, t.clientY);
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Handle tab visibility to pause animation loop and save battery/CPU
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      } else {
        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(tick);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [setLines, setSize, onResize, tick, updateMousePosition, movePoints, drawLines]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={
        {
          backgroundColor,
          width: "100%",
          height: "100%",
          "--x": "-0.5rem",
          "--y": "50%",
        } as React.CSSProperties
      }
    >
      <svg ref={svgRef} className="w-full h-full pointer-events-none" />
      <div
        style={{
          position: "absolute",
          width: `${pointerSize}rem`,
          height: `${pointerSize}rem`,
          background: strokeColor,
          borderRadius: "50%",
          transform: "translate3d(calc(var(--x) - 50%), calc(var(--y) - 50%), 0)",
          pointerEvents: "none",
          transition: "background-color 0.2s ease",
        }}
      />
    </div>
  );
}
