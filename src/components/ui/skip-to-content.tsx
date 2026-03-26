/**
 * WCAG 2.1 skip-navigation link. Visually hidden until focused via
 * keyboard Tab, then positioned as a fixed overlay. Targets `#main-content`
 * defined in `layout.tsx` to bypass the header and starfield for
 * keyboard and screen reader users.
 */

"use client";

import { useLocale } from "@/i18n/context";

export default function SkipToContent() {
  const { t } = useLocale();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-black"
    >
      {t.a11y.skipToContent}
    </a>
  );
}
