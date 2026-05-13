"use client";

import { Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const socialLinks = [
  {
    href: "https://github.com/gabriellqv",
    icon: SiGithub,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/gabriellqv/",
    icon: LinkedinIcon,
    label: "LinkedIn",
  },
  {
    href: "mailto:gabriellqv@gmail.com",
    icon: Mail,
    label: "Email",
  },
] as const;

const Footer = () => {
  return (
    <footer className="mt-auto w-full py-12 border-t border-border/40 bg-background">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 md:flex-row">
        
        {/* Brand / Copyright */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-lg font-bold tracking-tight text-foreground">
            Gabriel Queiroz
          </span>
          <span className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Todos os direitos reservados.
          </span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-2">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={label}
              className="flex items-center justify-center size-10 rounded-full border border-border/30 bg-neutral-200/80 dark:bg-white/5 text-muted-foreground transition-all hover:bg-neutral-300/80 hover:text-foreground dark:hover:bg-white/[0.08] hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Icon className="size-[1.1rem]" />
            </a>
          ))}
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
