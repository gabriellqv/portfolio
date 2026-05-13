import { useEffect, useState } from "react";

/**
 * Pixel distance from the top of the page before the scroll-to-top button
 * becomes visible. Tuned to appear roughly after the hero section has been
 * scrolled past on most viewport sizes.
 */
const SCROLL_THRESHOLD = 300;

/**
 * Returns a boolean indicating whether the scroll-to-top button should be
 * visible based on the current scroll position.
 *
 * Uses `requestAnimationFrame` to throttle scroll events and avoid excessive
 * re-renders during rapid scrolling. The scroll listener is registered with
 * `{ passive: true }` so the browser can optimize scrolling performance.
 */
export function useScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const toggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > SCROLL_THRESHOLD);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return isVisible;
}
