"use client";

import Link from "next/link";

import { useDictionary } from "@/i18n";

export default function NotFound() {
  const { dict } = useDictionary();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6 text-center px-4">
        <h1 className="text-7xl font-extrabold text-foreground">404</h1>
        <h2 className="text-xl font-semibold text-foreground">
          {dict.errors.notFoundTitle}
        </h2>
        <p className="text-sm text-muted-foreground max-w-md">
          {dict.errors.notFoundDesc}
        </p>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-full bg-foreground text-background font-semibold text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all"
        >
          {dict.errors.backHome}
        </Link>
      </div>
    </div>
  );
}
