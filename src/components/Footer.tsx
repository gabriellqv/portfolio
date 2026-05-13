import { SITE } from "@/constants";
import { socials } from "@/data/socials";

/**
 * Site footer rendered as a Server Component.
 *
 * Displays the brand name, a dynamic copyright year (computed at request/build time),
 * and social media links from the centralized socials data source.
 * mailto links intentionally skip the target="_blank" attribute.
 */
const Footer = () => {
  return (
    <footer className="mt-auto w-full py-12 border-t border-border/40 bg-background">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 md:flex-row">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-lg font-bold tracking-tight text-foreground">
            {SITE.name}
          </span>
          <span className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Todos os direitos reservados.
          </span>
        </div>

        <div className="flex items-center gap-2">
          {socials.map(({ href, icon: Icon, label }) => (
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
