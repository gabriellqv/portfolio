/**
 * Client-side provider composition root.
 *
 * Wraps the component tree with all required context providers.
 * Currently only `LocaleProvider`, but this file serves as the single
 * extension point if additional providers (e.g. theme, auth) are needed.
 * Keeping this separate from `layout.tsx` preserves the root layout
 * as a Server Component.
 */

"use client";

import { LocaleProvider } from "@/i18n/context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <LocaleProvider>{children}</LocaleProvider>;
}
