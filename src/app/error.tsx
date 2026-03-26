"use client";

import { useLocale } from "@/i18n/context";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  const { locale } = useLocale();

  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <p className="mb-4 font-mono text-sm text-red-400">Oops!</p>
      <h1 className="text-fg-primary mb-4 text-4xl font-bold sm:text-6xl">
        {locale === "pt" ? "Algo deu errado" : "Something went wrong"}
      </h1>
      <p className="text-fg-tertiary mb-10 max-w-md text-sm">
        {locale === "pt"
          ? "Ocorreu um erro inesperado. Tente recarregar a página."
          : "An unexpected error occurred. Try reloading the page."}
      </p>
      <button
        onClick={reset}
        className="border-edge bg-surface-subtle text-fg-secondary hover:border-edge-hover hover:text-fg-primary hover:shadow-glow cursor-pointer rounded-xl border px-6 py-3 font-mono text-sm transition-all hover:bg-surface-subtle"
      >
        {locale === "pt" ? ">_ tentar novamente" : ">_ try again"}
      </button>
    </section>
  );
}
