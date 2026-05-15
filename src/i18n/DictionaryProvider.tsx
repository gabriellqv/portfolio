"use client";

import { type ReactNode, createContext, useCallback, useContext, useState } from "react";

import en from "@/i18n/en";
import pt from "@/i18n/pt";
import type { Dictionary, Lang } from "@/i18n/types";

const STORAGE_KEY = "lang";

const dictionaries: Record<Lang, Dictionary> = { pt, en };

type DictionaryContextValue = {
  lang: Lang;
  dict: Dictionary;
  setLang: (lang: Lang) => void;
};

const DictionaryContext = createContext<DictionaryContextValue | null>(null);

/**
 * Reads the saved language preference from the browser cookie.
 * Returns the stored Lang or undefined if no valid cookie exists.
 */
function getSavedLang(): Lang | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${STORAGE_KEY}=([^;]*)`));
  const value = match?.[1];
  return value === "en" || value === "pt" ? value : undefined;
}

export function DictionaryProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang: Lang;
}) {
  /**
   * Lazy initializer reads the saved cookie on mount so static pages
   * (which always render with initialLang "pt") can restore the user's
   * preference without an extra render cycle.
   */
  const [lang, setLangState] = useState<Lang>(() => getSavedLang() ?? initialLang);

  const dict = dictionaries[lang];

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    document.cookie = `${STORAGE_KEY}=${l}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.lang = l === "pt" ? "pt-BR" : "en";
  }, []);

  return (
    <DictionaryContext.Provider value={{ lang, dict, setLang }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  const ctx = useContext(DictionaryContext);
  if (!ctx) throw new Error("useDictionary must be used within DictionaryProvider");
  return ctx;
}
