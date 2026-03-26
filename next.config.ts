/**
 * Next.js configuration with security headers and React Compiler.
 *
 * Security headers are applied to all routes via the `headers()` function.
 * CSP uses `unsafe-inline` and `unsafe-eval` for `script-src` because
 * Next.js injects inline scripts for hydration and chunk loading.
 * A nonce-based CSP would be more restrictive but requires middleware
 * integration that is not warranted for a static portfolio.
 *
 * `reactCompiler: true` enables the React 19 automatic memoization
 * compiler, eliminating the need for manual `useMemo`/`useCallback`
 * in most cases.
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-ancestors 'none';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
