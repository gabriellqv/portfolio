"use client";

import { useEffect, useRef, useState } from "react";

import { useTheme } from "next-themes";

import { Grid, Pause, Play, Sliders, Sparkles, X } from "lucide-react";

import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

// WebGL 1.0 Shaders
const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
    v_uv = (a_position + 1.0) * 0.5;
    // Align coordinates so (0,0) is top-left
    v_uv.y = 1.0 - v_uv.y;
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;
varying vec2 v_uv;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_mouse_active;
uniform float u_keycap_grid;
uniform float u_glow_intensity;
uniform float u_speed;
uniform float u_density;
uniform int u_color_palette;
uniform float u_dark_mode;

// Simplex noise by Stefan Gustavson
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,
                      0.366025403784439,
                     -0.577350269189626,
                      0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// 4-octave Fractional Brownian Motion for natural topographic relief
float fbm(vec2 p) {
    float total = 0.0;
    float amp = 0.54;
    float freq = 1.0;
    for (int i = 0; i < 4; i++) {
        total += snoise(p * freq) * amp;
        freq *= 2.04;
        amp *= 0.48;
    }
    return total;
}

// Exact RGB spectrum matching the topographic backlit mechanical keyboard
vec3 getKeyboardRGB(float t) {
    t = clamp(t, 0.0, 1.0);
    vec3 cOrange  = vec3(1.0, 0.32, 0.02);  // Fiery Orange
    vec3 cAmber   = vec3(1.0, 0.72, 0.0);   // Golden Amber
    vec3 cLime    = vec3(0.38, 0.88, 0.15); // Vibrant Lime Green
    vec3 cCyan    = vec3(0.0, 0.86, 0.96);  // Electric Aqua/Cyan
    vec3 cBlue    = vec3(0.20, 0.46, 1.0);  // Royal Blue
    vec3 cMagenta = vec3(0.88, 0.18, 0.94); // Neon Magenta

    if (t < 0.20) {
        return mix(cOrange, cAmber, t / 0.20);
    } else if (t < 0.40) {
        return mix(cAmber, cLime, (t - 0.20) / 0.20);
    } else if (t < 0.60) {
        return mix(cLime, cCyan, (t - 0.40) / 0.20);
    } else if (t < 0.80) {
        return mix(cCyan, cBlue, (t - 0.60) / 0.20);
    } else {
        return mix(cBlue, cMagenta, (t - 0.80) / 0.20);
    }
}

vec3 getCyberCyan(float t) {
    vec3 c0 = vec3(0.0, 0.95, 0.85);
    vec3 c1 = vec3(0.05, 0.55, 1.0);
    vec3 c2 = vec3(0.45, 0.15, 0.95);
    return mix(mix(c0, c1, t), c2, t * t);
}

vec3 getSunset(float t) {
    vec3 c0 = vec3(1.0, 0.25, 0.4);
    vec3 c1 = vec3(1.0, 0.65, 0.1);
    vec3 c2 = vec3(0.65, 0.1, 0.85);
    return mix(mix(c0, c1, t), c2, t * t);
}

void main() {
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 st = (v_uv - 0.5) * aspect;
    
    // Organic slow drift over time
    float time = u_time * u_speed;
    vec2 drift = vec2(sin(time * 0.12) * 0.25, cos(time * 0.10) * 0.25);
    
    // Topographic space
    vec2 p = st * (u_density * 2.3) + drift;
    
    // Interactive mouse distortion & ripples
    if (u_mouse_active > 0.0) {
        vec2 mouseSt = (u_mouse - 0.5) * aspect;
        float dMouse = length(st - mouseSt);
        float mouseWave = exp(-dMouse * 3.2) * sin(dMouse * 16.0 - time * 2.5);
        p += normalize(st - mouseSt + 0.0001) * mouseWave * 0.25 * u_mouse_active;
    }
    
    // Elevation field via FBM
    float elevation = fbm(p);
    
    // Topographic contour lines
    float numLevels = 17.0;
    float level = elevation * numLevels;
    float fracLevel = fract(level);
    float distToLine = abs(fracLevel - 0.5);
    
    // Crisp contour line profile
    float lineThickness = 0.048;
    float line = smoothstep(lineThickness, 0.0, distToLine);
    
    // Diffused neon glow emanating from the contour lines
    float glow = exp(-distToLine * 13.0) * (0.65 * u_glow_intensity);
    
    // Horizontal RGB spectrum with subtle organic curvature
    float colorCoord = v_uv.x + sin(v_uv.y * 3.14159 + time * 0.2) * 0.05;
    vec3 lineColor;
    if (u_color_palette == 1) {
        lineColor = getCyberCyan(colorCoord);
    } else if (u_color_palette == 2) {
        lineColor = getSunset(colorCoord);
    } else {
        lineColor = getKeyboardRGB(colorCoord);
    }
    
    // Mechanical Keycap Grid (resembling the keyboard's physical keys)
    float keycapMask = 1.0;
    float keycapBezel = 0.0;
    if (u_keycap_grid > 0.01) {
        // Standard 65% keyboard ratio: ~15 columns by 5 rows
        vec2 keyUV = v_uv * vec2(15.0, 5.5);
        float row = floor(keyUV.y);
        float stagger = mod(row, 2.0) == 1.0 ? 0.35 : 0.0;
        keyUV.x += stagger;
        
        vec2 cell = fract(keyUV) - 0.5;
        vec2 d = abs(cell) - vec2(0.42, 0.40);
        float distBox = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - 0.04;
        
        // Faint keycap border highlight
        keycapBezel = smoothstep(0.025, 0.0, abs(distBox)) * 0.18 * u_keycap_grid;
        // Key gap slight depth
        float keyGap = smoothstep(0.0, 0.04, distBox);
        keycapMask = mix(1.0, 0.78, keyGap * u_keycap_grid);
    }
    
    // Base dark plastic color (like matte PBT keycaps)
    vec3 baseColor = u_dark_mode > 0.5 
        ? vec3(0.035, 0.035, 0.042) 
        : vec3(0.96, 0.96, 0.95);
        
    // Interactive mouse cursor backlight glow
    float mouseSpot = 0.0;
    if (u_mouse_active > 0.0) {
        vec2 mouseSt = (u_mouse - 0.5) * aspect;
        float dMouse = length(st - mouseSt);
        mouseSpot = exp(-dMouse * 2.5) * 0.22;
    }
    
    // Core line highlight for razor-sharp neon appearance
    vec3 coreColor = mix(lineColor, vec3(1.0, 1.0, 1.0), 0.45);
    vec3 finalGlow = coreColor * line + lineColor * glow;
    
    vec3 color;
    if (u_dark_mode > 0.5) {
        color = baseColor * keycapMask;
        color += finalGlow * keycapMask;
        color += lineColor * keycapBezel;
        color += lineColor * mouseSpot;
        
        // Soft vignette to keep central text crystal clear
        float vignette = length((v_uv - 0.5) * vec2(1.15, 0.95));
        vignette = smoothstep(0.2, 0.9, vignette);
        color = mix(color, color * 0.75, 1.0 - vignette * 0.4);
    } else {
        // Light mode adaptation: soft contrast topo lines with iridescent rainbow accents
        vec3 darkContour = mix(vec3(0.3, 0.35, 0.42), lineColor, 0.5);
        color = baseColor;
        color = mix(color, darkContour, line * 0.65);
        color = mix(color, lineColor, glow * 0.25);
    }
    
    gl_FragColor = vec4(color, 1.0);
}
`;

/**
 * TopographicBackground component
 * Recreates the exact RGB backlit topographic mechanical keyboard effect as a 60fps
 * full-viewport responsive background with interactive lighting and controls.
 */
interface UniformLocations {
  u_resolution: WebGLUniformLocation | null;
  u_time: WebGLUniformLocation | null;
  u_mouse: WebGLUniformLocation | null;
  u_mouse_active: WebGLUniformLocation | null;
  u_keycap_grid: WebGLUniformLocation | null;
  u_glow_intensity: WebGLUniformLocation | null;
  u_speed: WebGLUniformLocation | null;
  u_density: WebGLUniformLocation | null;
  u_color_palette: WebGLUniformLocation | null;
  u_dark_mode: WebGLUniformLocation | null;
}

// 2D Canvas Fallback in case WebGL is unavailable
function initCanvas2DFallback(canvas: HTMLCanvasElement, getIsDarkMode: () => number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  let animId = 0;
  let t = 0;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  const draw = () => {
    t += 0.005;
    const w = canvas.width;
    const h = canvas.height;

    ctx.fillStyle = getIsDarkMode() > 0.5 ? "#08080a" : "#f8f8f6";
    ctx.fillRect(0, 0, w, h);

    // Rainbow horizontal gradient matching keyboard
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0.0, "#ff4500");
    grad.addColorStop(0.2, "#ffb300");
    grad.addColorStop(0.4, "#00e676");
    grad.addColorStop(0.6, "#00e5ff");
    grad.addColorStop(0.8, "#2979ff");
    grad.addColorStop(1.0, "#e040fb");

    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.6;
    ctx.shadowColor = "#00e5ff";
    ctx.shadowBlur = 6;

    const numLines = 16;
    for (let i = 0; i < numLines; i++) {
      ctx.beginPath();
      const yOffset = (h / numLines) * i;
      for (let x = 0; x <= w; x += 15) {
        const y =
          yOffset +
          Math.sin(x * 0.004 + t + i * 0.4) * 35 +
          Math.cos(x * 0.008 - t * 0.8) * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    animId = requestAnimationFrame(draw);
  };

  animId = requestAnimationFrame(draw);
  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener("resize", resize);
  };
}

export default function TopographicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme, resolvedTheme } = useTheme();
  const isMounted = useMounted();

  // Background visual configuration
  const [keycapGrid, setKeycapGrid] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [colorPalette, setColorPalette] = useState<number>(0); // 0: Keyboard RGB, 1: Cyber Cyan, 2: Sunset
  const [glowIntensity, setGlowIntensity] = useState<number>(1.0);
  const [isControlsOpen, setIsControlsOpen] = useState<boolean>(false);

  // Animation & WebGL state refs
  const stateRef = useRef({
    gl: null as WebGLRenderingContext | null,
    program: null as WebGLProgram | null,
    uniforms: {
      u_resolution: null,
      u_time: null,
      u_mouse: null,
      u_mouse_active: null,
      u_keycap_grid: null,
      u_glow_intensity: null,
      u_speed: null,
      u_density: null,
      u_color_palette: null,
      u_dark_mode: null,
    } as UniformLocations,
    startTime: 0,
    lastFrameTime: 0,
    elapsedTime: 0,
    mouse: { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, active: 0 },
    animationFrameId: 0,
    isPlaying: true,
    keycapGrid: 0.7,
    glowIntensity: 1.0,
    colorPalette: 0,
    isDarkMode: 1.0,
  });

  // Sync theme changes with shader uniform
  useEffect(() => {
    const isDark = (resolvedTheme || theme) === "dark";
    stateRef.current.isDarkMode = isDark ? 1.0 : 0.0;
  }, [theme, resolvedTheme]);

  // Sync control states with animation ref
  useEffect(() => {
    stateRef.current.keycapGrid = keycapGrid ? 0.75 : 0.0;
  }, [keycapGrid]);

  useEffect(() => {
    stateRef.current.isPlaying = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    stateRef.current.colorPalette = colorPalette;
  }, [colorPalette]);

  useEffect(() => {
    stateRef.current.glowIntensity = glowIntensity;
  }, [glowIntensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const state = stateRef.current;
    state.startTime = performance.now();
    state.lastFrameTime = performance.now();

    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      state.isPlaying = false;
    }

    // Try initializing WebGL
    const gl =
      canvas.getContext("webgl", {
        powerPreference: "high-performance",
        alpha: false,
        antialias: true,
      }) || (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      console.warn("WebGL not supported; falling back to 2D canvas.");
      const cleanupFallback = initCanvas2DFallback(canvas, () => state.isDarkMode);
      return () => {
        cleanupFallback();
      };
    }

    state.gl = gl;

    // Compile shaders
    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

    if (!vertShader || !fragShader) {
      const cleanupFallback = initCanvas2DFallback(canvas, () => state.isDarkMode);
      return () => {
        cleanupFallback();
      };
    }

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      const cleanupFallback = initCanvas2DFallback(canvas, () => state.isDarkMode);
      return () => {
        cleanupFallback();
      };
    }

    state.program = program;
    gl.useProgram(program);

    // Fullscreen quad buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const aPosition = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    state.uniforms = {
      u_resolution: gl.getUniformLocation(program, "u_resolution"),
      u_time: gl.getUniformLocation(program, "u_time"),
      u_mouse: gl.getUniformLocation(program, "u_mouse"),
      u_mouse_active: gl.getUniformLocation(program, "u_mouse_active"),
      u_keycap_grid: gl.getUniformLocation(program, "u_keycap_grid"),
      u_glow_intensity: gl.getUniformLocation(program, "u_glow_intensity"),
      u_speed: gl.getUniformLocation(program, "u_speed"),
      u_density: gl.getUniformLocation(program, "u_density"),
      u_color_palette: gl.getUniformLocation(program, "u_color_palette"),
      u_dark_mode: gl.getUniformLocation(program, "u_dark_mode"),
    };

    // Resize handler
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // Interactive mouse listeners
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      state.mouse.targetX = x;
      state.mouse.targetY = y;
      state.mouse.active = 1.0;
    };

    const handleMouseLeave = () => {
      state.mouse.active = 0.0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        const x = touch.clientX / window.innerWidth;
        const y = touch.clientY / window.innerHeight;
        state.mouse.targetX = x;
        state.mouse.targetY = y;
        state.mouse.active = 1.0;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Render loop
    let lastTime = performance.now();
    const render = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (state.isPlaying) {
        state.elapsedTime += delta;
      }

      // Smooth mouse interpolation
      const m = state.mouse;
      m.x += (m.targetX - m.x) * 0.08;
      m.y += (m.targetY - m.y) * 0.08;

      const { uniforms, program: curProgram } = state;
      if (curProgram && gl) {
        gl.useProgram(curProgram);

        gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
        gl.uniform1f(uniforms.u_time, state.elapsedTime);
        gl.uniform2f(uniforms.u_mouse, m.x, m.y);
        gl.uniform1f(uniforms.u_mouse_active, m.active);
        gl.uniform1f(uniforms.u_keycap_grid, state.keycapGrid);
        gl.uniform1f(uniforms.u_glow_intensity, state.glowIntensity);
        gl.uniform1f(uniforms.u_speed, 0.4);
        gl.uniform1f(uniforms.u_density, 1.25);
        gl.uniform1i(uniforms.u_color_palette, state.colorPalette);
        gl.uniform1f(uniforms.u_dark_mode, state.isDarkMode);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      state.animationFrameId = requestAnimationFrame(render);
    };

    // Pause rendering when tab is hidden to save battery & GPU
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

      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
        gl.deleteBuffer(positionBuffer);
      }
    };
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 w-full h-full object-cover transition-opacity duration-700"
      />

      {/* Floating Interactive Controls Pill for the Keyboard Effect */}
      <div className="fixed bottom-6 left-6 z-40">
        {!isControlsOpen ? (
          <button
            onClick={() => setIsControlsOpen(true)}
            aria-label="Personalizar efeito Topo RGB do teclado"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/15 dark:border-white/10 bg-white/80 dark:bg-black/75 backdrop-blur-xl shadow-lg hover:shadow-cyan-500/20 text-xs font-medium text-foreground transition-all duration-300 hover:scale-105 active:scale-95 group"
          >
            <span className="size-2 rounded-full bg-gradient-to-r from-orange-500 via-cyan-400 to-fuchsia-500 animate-pulse" />
            <span className="font-mono tracking-tight">Topo RGB v2</span>
            <Sliders className="size-3.5 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
          </button>
        ) : (
          <div className="w-72 p-4 rounded-2xl border border-white/20 dark:border-white/10 bg-white/95 dark:bg-black/90 backdrop-blur-2xl shadow-2xl animate-menu-slide text-xs">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border/50">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-gradient-to-r from-orange-500 via-cyan-400 to-fuchsia-500" />
                <span className="font-semibold text-foreground tracking-tight">
                  Efeito Teclado Topo RGB
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
                    onClick={() => setColorPalette(0)}
                    className={cn(
                      "px-2 py-1.5 rounded-lg border text-[11px] font-medium transition-all text-center",
                      colorPalette === 0
                        ? "border-cyan-500/80 bg-cyan-500/10 text-cyan-400 font-semibold"
                        : "border-border/40 hover:bg-muted text-muted-foreground",
                    )}
                  >
                    RGB Teclado
                  </button>
                  <button
                    onClick={() => setColorPalette(1)}
                    className={cn(
                      "px-2 py-1.5 rounded-lg border text-[11px] font-medium transition-all text-center",
                      colorPalette === 1
                        ? "border-cyan-500/80 bg-cyan-500/10 text-cyan-400 font-semibold"
                        : "border-border/40 hover:bg-muted text-muted-foreground",
                    )}
                  >
                    Cyber Aqua
                  </button>
                  <button
                    onClick={() => setColorPalette(2)}
                    className={cn(
                      "px-2 py-1.5 rounded-lg border text-[11px] font-medium transition-all text-center",
                      colorPalette === 2
                        ? "border-cyan-500/80 bg-cyan-500/10 text-cyan-400 font-semibold"
                        : "border-border/40 hover:bg-muted text-muted-foreground",
                    )}
                  >
                    Sunset
                  </button>
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

              {/* Glow intensity */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
                  <Sparkles className="size-3.5" /> Brilho Neon
                </span>
                <div className="flex items-center gap-1">
                  {[0.5, 1.0, 1.6].map((level, idx) => (
                    <button
                      key={level}
                      onClick={() => setGlowIntensity(level)}
                      className={cn(
                        "size-6 rounded-md text-[10px] font-medium transition-all border flex items-center justify-center",
                        glowIntensity === level
                          ? "border-cyan-500/70 bg-cyan-500/20 text-cyan-400"
                          : "border-border/40 text-muted-foreground hover:bg-muted",
                      )}
                    >
                      {idx === 0 ? "S" : idx === 1 ? "M" : "L"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Play / Pause Animation */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
                  {isPlaying ? (
                    <Play className="size-3.5" />
                  ) : (
                    <Pause className="size-3.5" />
                  )}{" "}
                  Animação
                </span>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={cn(
                    "px-2.5 py-1 rounded-full text-[11px] font-medium transition-all border",
                    isPlaying
                      ? "border-cyan-500/50 bg-cyan-500/15 text-cyan-400"
                      : "border-border/40 bg-muted/50 text-muted-foreground",
                  )}
                >
                  {isPlaying ? "Ondulação Ativa" : "Pausada"}
                </button>
              </div>
            </div>

            {/* Footer tip */}
            <p className="mt-3 pt-2 text-[10px] text-muted-foreground/75 border-t border-border/40 text-center">
              💡 Mova o mouse na tela para interagir com o relevo topográfico!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
