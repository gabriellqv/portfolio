"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { useLocale } from "@/i18n/context";

/** Minimum scroll distance (px) before the button becomes visible. */
const SCROLL_THRESHOLD = 400;

/**
 * Floating "back to top" button that appears after scrolling past
 * a defined threshold. Uses smooth scrolling for the return animation.
 */
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLocale();

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      aria-label={t.a11y.backToTop}
      className={`border-edge bg-surface text-fg-secondary hover:border-edge-hover hover:text-fg-primary hover:shadow-glow-strong fixed right-4 bottom-4 z-50 cursor-pointer rounded-full border p-2.5 backdrop-blur-[2px] transition-all sm:right-6 sm:bottom-6 sm:p-3 ${
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
