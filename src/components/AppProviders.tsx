"use client";

import type { ReactNode } from "react";

import type { Lang } from "@/i18n";
import { DictionaryProvider } from "@/i18n";

export function AppProviders({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang: Lang;
}) {
  return <DictionaryProvider initialLang={initialLang}>{children}</DictionaryProvider>;
}
