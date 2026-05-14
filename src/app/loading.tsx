"use client";

import { useDictionary } from "@/i18n";

export default function Loading() {
  const { dict } = useDictionary();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="size-8 border-2 border-border border-t-accent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">{dict.errors.loading}</p>
      </div>
    </div>
  );
}
