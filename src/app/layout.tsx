import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/ThemeProvider";
import { SITE } from "@/constants";

import "./globals.css";

/**
 * Sans-serif font used for body text and UI elements.
 * Registered as a CSS variable (--font-sans) so Tailwind's font-sans
 * utility and the @theme inline declaration pick it up automatically.
 */
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

/**
 * Monospace font used for code blocks and technical labels.
 * Registered as --font-mono for the same CSS variable integration.
 */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

/**
 * Root metadata merged into every page's <head>.
 * OpenGraph and Twitter cards enable rich link previews when the site
 * URL is shared on social platforms and messaging apps.
 */
export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | Portfolio`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "desenvolvedor full stack",
    "react",
    "next.js",
    "nestjs",
    "laravel",
    "portfolio",
    "gabriel queiroz",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    title: `${SITE.name} | Portfolio`,
    description: SITE.description,
    url: SITE.siteUrl,
    siteName: SITE.name,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Portfolio`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(SITE.siteUrl),
};

/**
 * Root layout wrapping the entire application.
 *
 * Injects font variables into the <html> element, applies the base
 * Tailwind classes (scroll-smooth, antialiased), and provides the
 * ThemeProvider for dark/light mode switching.
 *
 * Includes a visually hidden skip-to-content link that becomes visible
 * on keyboard focus, allowing screen reader and keyboard users to
 * bypass the navigation and jump directly to the main content.
 *
 * suppressHydrationWarning is required by next-themes to prevent
 * React hydration errors when the theme class is added by a client-side
 * script before React hydrates.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth antialiased`}
    >
      <body className="bg-background text-foreground font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-foreground focus:text-background focus:text-sm focus:font-semibold"
        >
          Pular para o conteúdo
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
