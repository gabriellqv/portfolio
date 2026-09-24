"use client";

import Link from "next/link";

import { SITE } from "@/constants";
import { useDictionary } from "@/i18n";

/**
 * Minimalist luxury footer matching laschisa.dev 1:1:
 * - Direct seamless transparency over the undulating waves background
 * - Left: Dark circular monogram badge with letter "G"
 * - Center: Wide-tracked uppercase copyright and intentionality tagline
 * - Right: Clean uppercase text links in lavender tone (LinkedIn, Mail, GitHub, Source Code)
 */
export default function Footer() {
  const { dict } = useDictionary();

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
      label: dict.footer.sourceCode ?? "SOURCE CODE",
      href: SITE.repoUrl,
      isExternal: true,
    },
  ];

  return (
    <footer className="w-full mt-auto py-8 sm:py-10 px-6 sm:px-10 lg:px-16 bg-transparent relative z-20">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
        {/* Left: Circular Monogram / Brand Badge */}
        <div className="flex items-center justify-center md:justify-start md:w-1/4">
          <Link
            href="#home"
            aria-label={dict.a11y.backToTop ?? "Voltar ao topo"}
            className="group flex items-center justify-center size-9 sm:size-10 rounded-full bg-[#18181b] border border-white/20 text-white shadow-sm hover:border-white/50 hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <span className="font-sans font-bold text-sm tracking-tight text-white select-none transition-transform duration-300 group-hover:scale-110">
              G
            </span>
          </Link>
        </div>

        {/* Center: Copyright & Intentionality Tagline */}
        <div className="flex items-center justify-center text-center md:w-2/4">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium text-[#988dae] select-none">
            &copy; {new Date().getFullYear()} {SITE.brandDomain} &bull;{" "}
            {dict.footer.builtWith}
          </p>
        </div>

        {/* Right: Text Navigation Links */}
        <div className="flex items-center justify-center md:justify-end gap-6 sm:gap-8 md:w-1/4 flex-wrap">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noreferrer" : undefined}
              className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[#988dae] hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
