import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/ThemeProvider";
import { SITE } from "@/constants";

import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

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
