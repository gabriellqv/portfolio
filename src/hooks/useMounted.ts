import { useEffect, useState } from "react";

/**
 * Detects whether the component has been mounted (hydrated) on the client.
 *
 * Used to prevent hydration mismatches when rendering theme-dependent content.
 * Components that depend on `useTheme()` from next-themes must gate rendering
 * behind this flag because the server does not know the client's theme preference.
 *
 * The `setState` inside `useEffect` is intentionally suppressed from linting:
 * this is a known, unavoidable pattern when bridging SSR theme state and client
 * hydration. The single extra render on mount is negligible for this use case.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return mounted;
}
