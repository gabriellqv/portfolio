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

function getStoredLang(initialLang: Lang): Lang {
  if (typeof window === "undefined") return initialLang;
  const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
  return stored ?? initialLang;
}

export function DictionaryProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(() => getStoredLang(initialLang));

  const dict = dictionaries[lang];

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
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
