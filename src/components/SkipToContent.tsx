"use client";

import { useDictionary } from "@/i18n";

export default function SkipToContent() {
  const { dict } = useDictionary();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-foreground focus:text-background focus:text-sm focus:font-semibold"
    >
      {dict.a11y.skipToContent}
    </a>
  );
}
