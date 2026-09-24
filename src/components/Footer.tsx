"use client";

import { SITE } from "@/constants";
import { useDictionary } from "@/i18n";

/**
 * Minimalist footer consistent with the project's design system:
 * - Completely logo-free: clean two-column layout (copyright on left, links on right)
 * - Semantic theme colors: text-muted-foreground transitioning to text-foreground/white on hover
 * - Seamless transparent overlay directly across the waves background
 */
export default function Footer() {
  const { dict } = useDictionary();

  const footerLinks = [
    {
      label: "LINKEDIN",
      href: `https://www.linkedin.com/in/${SITE.linkedinUsername}`,
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
    <footer className="w-full flex items-center px-4 lg:px-16 min-h-[5rem] py-6 bg-transparent relative z-20">
      <div className="w-full max-w-6xl mx-auto flex flex-col-reverse sm:flex-row items-center justify-between gap-4 sm:gap-0">
        <div className="text-muted-foreground text-xs font-semibold tracking-wider select-none">
          &copy; {new Date().getFullYear()} {SITE.githubUsername}
        </div>

        <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              className="px-3 py-1.5 uppercase tracking-wider text-muted-foreground hover:text-foreground dark:hover:text-white text-xs font-semibold transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
