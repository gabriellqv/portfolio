"use client";

import { ArrowUp } from "lucide-react";

import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useDictionary } from "@/i18n";
import { cn } from "@/lib/utils";

export default function ScrollToTop() {
  const isVisible = useScrollToTop();
  const { dict } = useDictionary();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={dict.a11y.backToTop}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center justify-center size-10 rounded-full bg-foreground text-background shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-neutral-800 dark:hover:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none",
      )}
    >
      <ArrowUp className="size-[1.15rem]" strokeWidth={2.5} />
    </button>
  );
}
