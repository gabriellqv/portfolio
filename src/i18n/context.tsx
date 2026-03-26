/**
 * Client-side i18n provider using React 18's `useSyncExternalStore`.
 *
 * The locale state is managed as a module-level variable outside of React.
 * This avoids the pattern of initializing state in `useEffect` (which causes
 * a visible flash on hydration) and satisfies the React Compiler's constraint
 * against calling `setState` during render or inside `useEffect` on mount.
 *
 * The SSR snapshot always returns "pt" because the server has no access to
 * `localStorage` or `navigator.language`. This means English-preferring users
 * will see a brief Portuguese flash until client hydration completes.
 * This is an acceptable tradeoff given that the primary audience is Brazilian.
 */

"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  useCallback,
  type ReactNode,
} from "react";
import { pt, en, type Locale, type Translations } from "./locales";

// ---------------------------------------------------------------------------
// Internal store
// ---------------------------------------------------------------------------

const locales: Record<Locale, Translations> = { pt, en };

/**
 * Resolves the initial locale from persisted preference or browser language.
 *
 * Priority order:
 * 1. `localStorage("locale")` if it contains a valid locale.
 * 2. `navigator.language` prefix matching ("pt" -> Portuguese).
 * 3. Fallback to "pt" on SSR or when detection fails.
 */
function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "pt";

  const saved = localStorage.getItem("locale") as Locale | null;
  if (saved === "pt" || saved === "en") return saved;

  const browserLang = navigator.language?.toLowerCase() ?? "";
  return browserLang.startsWith("pt") ? "pt" : "en";
}

/**
 * Module-level state managed outside React to satisfy `useSyncExternalStore`.
 * Mutated only by `toggleLocale`; all subscribers are notified synchronously.
 */
let currentLocale: Locale = "pt";
const listeners = new Set<() => void>();

// Eager initialization on first client-side module import.
if (typeof window !== "undefined") {
  currentLocale = getInitialLocale();
  document.documentElement.lang = currentLocale === "pt" ? "pt-BR" : "en-US";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return currentLocale;
}

/** SSR always renders Portuguese to match the server-rendered `lang="pt-BR"`. */
function getServerSnapshot() {
  return "pt" as Locale;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

type LocaleContextType = {
  locale: Locale;
  t: Translations;
  toggleLocale: () => void;
};

const LocaleContext = createContext<LocaleContextType>({
  locale: "pt",
  t: pt,
  toggleLocale: () => {},
});

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleLocale = useCallback(() => {
    currentLocale = currentLocale === "pt" ? "en" : "pt";
    localStorage.setItem("locale", currentLocale);
    document.documentElement.lang = currentLocale === "pt" ? "pt-BR" : "en-US";
    listeners.forEach((l) => l());
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, t: locales[locale], toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useLocale() {
  return useContext(LocaleContext);
}
