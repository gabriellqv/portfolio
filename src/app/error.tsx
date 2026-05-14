"use client";

import { useEffect } from "react";

import Link from "next/link";

import { useDictionary } from "@/i18n";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { dict } = useDictionary();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6 text-center px-4">
        <h1 className="text-4xl font-bold text-foreground">
          {dict.errors.somethingWrong}
        </h1>
        <p className="text-sm text-muted-foreground max-w-md">
          {dict.errors.unexpectedError}
        </p>
        <div className="flex gap-3">
          <button
            onClick={reset}
            className="px-6 py-2.5 rounded-full bg-foreground text-background font-semibold text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all"
          >
            {dict.errors.tryAgain}
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 rounded-full border border-border/50 font-medium text-sm text-foreground hover:bg-neutral-100 dark:hover:bg-white/5 transition-all"
          >
            {dict.errors.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
