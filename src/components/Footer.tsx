"use client";

import { SITE } from "@/constants";

/**
 * Minimalist footer with natural typography and clean layout.
 */
export default function Footer() {
  const footerLinks = [
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/in/${SITE.linkedinUsername}`,
      isExternal: true,
    },
    {
      label: "Email",
      href: `mailto:${SITE.email}`,
      isExternal: false,
    },
    {
      label: "GitHub",
      href: `https://github.com/${SITE.githubUsername}`,
      isExternal: true,
    },
  ];

  return (
    <footer className="w-full flex items-center px-4 sm:px-6 md:px-8 min-h-[4.5rem] sm:min-h-[5rem] py-6 sm:py-8 bg-transparent relative z-20">
      <div className="w-full max-w-5xl lg:max-w-6xl mx-auto flex flex-col-reverse sm:flex-row items-center justify-between gap-4 sm:gap-0">
        <div className="text-muted-foreground text-xs sm:text-sm select-none text-center sm:text-left">
          &copy; {new Date().getFullYear()} {SITE.name}
        </div>

        <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              className="text-xs sm:text-sm text-muted-foreground hover:text-foreground font-medium transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
