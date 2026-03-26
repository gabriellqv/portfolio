"use client";

import Link from "next/link";
import FadeIn from "@/components/ui/fade-in";
import { useLocale } from "@/i18n/context";

export default function NotFound() {
  const { t } = useLocale();

  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <FadeIn delay={0}>
        <p className="text-fg-secondary mb-4 font-mono text-sm">{t.notFound.label}</p>
      </FadeIn>

      <FadeIn delay={100}>
        <h1 className="text-fg-primary mb-4 text-6xl font-bold sm:text-8xl">{t.notFound.title}</h1>
      </FadeIn>

      <FadeIn delay={200}>
        <h2 className="text-fg-secondary mb-6 text-xl sm:text-2xl">{t.notFound.subtitle}</h2>
      </FadeIn>

      <FadeIn delay={300}>
        <p className="text-fg-tertiary mb-10 max-w-md text-sm">{t.notFound.description}</p>
      </FadeIn>

      <FadeIn delay={400}>
        <Link
          href="/"
          className="border-edge bg-surface-subtle text-fg-secondary hover:border-edge-hover hover:text-fg-primary hover:shadow-glow hover:bg-surface-subtle rounded-xl border px-6 py-3 font-mono text-sm transition-all"
        >
          {t.notFound.backHome}
        </Link>
      </FadeIn>
    </section>
  );
}
