"use client";

import { useEffect } from "react";

import Link from "next/link";

import { Button, buttonVariants } from "@/components/Button";
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
          <Button onClick={reset} className="w-full sm:w-auto">
            {dict.errors.tryAgain}
          </Button>
          <Link
            href="/"
            className={buttonVariants({
              variant: "secondary",
              className: "w-full sm:w-auto",
            })}
          >
            {dict.errors.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
