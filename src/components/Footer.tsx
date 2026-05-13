"use client";

import { Mail } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";

const socialLinks = [
  {
    href: "https://github.com/gabriellqv",
    icon: FiGithub,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/gabriellqv/",
    icon: FiLinkedin,
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
            © {new Date().getFullYear()} Todos os direitos reservados.
          </span>
        </div>

        {/* Social Links & Back to Top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                aria-label={label}
                className="flex items-center justify-center size-10 rounded-full border border-border/30 bg-neutral-200/80 dark:bg-white/5 text-muted-foreground transition-all hover:bg-neutral-300/80 hover:text-foreground dark:hover:bg-white/[0.08] hover:scale-105 active:scale-95"
              >
                <Icon className="size-[1.15rem]" strokeWidth={2} />
              </a>
            ))}
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
