"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Thin wrapper around next-themes ThemeProvider.
 *
 * Extracted as its own component so consumers in layout.tsx don't need to
 * import next-themes directly, and to isolate the "use client" directive
 * to this boundary. Passes through all props to the underlying provider.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
