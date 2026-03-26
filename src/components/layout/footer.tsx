"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "./container";
import { NAV_ITEMS, SOCIAL_LINKS } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { useLocale } from "@/i18n/context";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/** Site footer with identity, navigation, social links, and copyright. */
export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="border-edge bg-surface mt-20 border-t py-6 backdrop-blur-[2px]">
      <Container>
        {/* Three-column layout: identity / nav / social */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand identity */}
          <div>
            <p className="text-fg-secondary mb-2 font-mono text-xl">{siteConfig.handle}</p>
            <p className="text-fg-secondary text-sm">{t.hero.role}</p>
          </div>

          <nav className="flex flex-col gap-2 text-sm">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-fg-secondary hover:text-fg-primary transition"
              >
                {t.nav[item.key]}
              </Link>
            ))}
          </nav>

          <div className="md:text-right">
            <p className="text-fg-secondary mb-3 text-sm font-semibold">{t.footer.social}</p>
            <div className="flex gap-4 md:justify-end">
              {SOCIAL_LINKS.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  className="group"
                >
                  <Image
                    src={icon}
                    alt={label}
                    width={label === "Email" ? 24 : 20}
                    height={label === "Email" ? 24 : 20}
                    className="transition-all duration-200 group-hover:brightness-0 group-hover:invert"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-surface-subtle pt-4 text-center">
          <p className="text-fg-tertiary text-xs">
            &copy; {new Date().getFullYear()} {siteConfig.name}. {t.footer.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
