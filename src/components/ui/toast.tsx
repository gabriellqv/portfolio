/**
 * Auto-dismissing toast notification with slide-in/out animation.
 *
 * Lifecycle: the entrance animation is triggered on the next animation frame
 * after mount (via `requestAnimationFrame`) to ensure the initial "off-screen"
 * state is painted before transitioning. After `TOAST_DURATION_MS`, the exit
 * animation fires, followed by a 300ms delay for the CSS transition to
 * complete before `onClose` unmounts the component.
 *
 * The `onClose` callback is included in the `useEffect` dependency array,
 * so callers must ensure it is referentially stable (e.g. via `useCallback`
 * or by passing a setState function directly).
 */

"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const TOAST_DURATION_MS = 4000;

export default function Toast({ message, type, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation on next frame
    requestAnimationFrame(() => setIsVisible(true));

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for exit animation
    }, TOAST_DURATION_MS);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed right-6 bottom-24 z-50 flex items-center gap-3 rounded-xl border px-5 py-3 shadow-lg backdrop-blur-sm transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
      } ${
        type === "success"
          ? "border-green-500/20 bg-green-950/80 text-green-300"
          : "border-red-500/20 bg-red-950/80 text-red-300"
      }`}
      role="alert"
    >
      <span className="text-lg">{type === "success" ? "✓" : "✕"}</span>
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="ml-2 cursor-pointer text-current opacity-50 transition-opacity hover:opacity-100"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
}
