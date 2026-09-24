"use client";

import Link from "next/link";

import { SITE } from "@/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useDictionary } from "@/i18n";

/**
 * Modern luxury footer matching the laschisa minimal aesthetic:
 * - Left: Sleek dark circular monogram badge (anchors smoothly to #home)
 * - Center: High-end spaced uppercase copyright and intentionality tagline
 * - Right: Minimalist uppercase text links (LinkedIn, Mail, GitHub, Source Code)
 * - Backdrop: Frosted glass bar revealing the undulating waves background beneath
 */
export default function Footer() {
  const { dict } = useDictionary();
  const ref = useScrollReveal<HTMLElement>();

  const footerLinks = [
    {
      label: "LINKEDIN",
      href: `https://www.linkedin.com/in/${SITE.linkedinUsername}/`,
      isExternal: true,
    },
    {
      label: "MAIL",
      href: `mailto:${SITE.email}`,
      isExternal: false,
    },
    {
      label: "GITHUB",
      href: `https://github.com/${SITE.githubUsername}`,
      isExternal: true,
    },
    {
      label: dict.footer.sourceCode,
      href: SITE.repoUrl,
      isExternal: true,
    },
  ];

  return (
    <footer
      ref={ref}
      className="mt-auto w-full border-t border-black/10 dark:border-white/10 bg-white/40 dark:bg-[#050505]/60 backdrop-blur-md reveal-fade-up"
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6 sm:py-7 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-0">
        {/* Left: Circular Monogram / Brand Badge */}
        <div className="flex items-center justify-center md:justify-start md:w-1/4">
          <Link
            href="#home"
            aria-label={dict.a11y.backToTop ?? "Voltar ao topo"}
            className="group/avatar relative flex items-center justify-center size-9 sm:size-10 rounded-full bg-[#18181b] border border-white/20 text-white shadow-sm hover:border-white/40 hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <span className="font-sans font-bold text-sm tracking-tight select-none transition-transform duration-300 group-hover/avatar:scale-110">
              G
            </span>
          </Link>
        </div>

        {/* Center: Copyright & Intentionality Tagline */}
        <div className="flex items-center justify-center text-center md:w-2/4">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.18em] font-medium text-neutral-500 dark:text-[#9e9cb0]">
            &copy; {new Date().getFullYear()} {SITE.brandDomain} &bull;{" "}
            {dict.footer.builtWith}
          </p>
        </div>

        {/* Right: Text Navigation Links */}
        <div className="flex items-center justify-center md:justify-end gap-5 sm:gap-7 md:gap-8 md:w-1/4 flex-wrap">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noreferrer" : undefined}
              className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500 dark:text-[#9e9cb0] hover:text-foreground dark:hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
