/**
 * Fixed site header with responsive navigation and locale toggle.
 *
 * Mobile menu renders a fullscreen overlay (`fixed inset-0`) outside
 * the `<header>` element to avoid nested fixed-positioning bugs on
 * mobile browsers. Body scroll is locked via `position: fixed` on
 * the body element, with scroll position saved/restored via a ref.
 *
 * Active section detection uses `IntersectionObserver` with asymmetric
 * margins (`-40% 0px -55% 0px`) that bias the trigger point toward the
 * upper third of the viewport, matching natural reading position.
 */

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Container from "./container";
import { Github, Linkedin, Mail, X, Menu } from "lucide-react";
import { NAV_ITEMS, SOCIAL_LINKS } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { useLocale } from "@/i18n/context";
import type { ElementType } from "react";

const SOCIAL_ICONS: Record<string, ElementType> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

/**
 * Tracks which section is currently in viewport using IntersectionObserver.
 * Returns the `id` of the most visible section, used for active nav styling.
 */
function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id === "hero" ? "" : entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    const elementsToObserve = [...NAV_ITEMS.map((item) => item.sectionId), "hero"];
    for (const id of elementsToObserve) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return activeSection;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Fixed site header with responsive navigation and locale toggle.
 *
 * Desktop: horizontal nav links + bordered language button.
 * Mobile: compact toggle + hamburger with fullscreen overlay menu.
 * Body scroll is locked when the menu is open.
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { locale, t, toggleLocale } = useLocale();
  const activeSection = useActiveSection();

  const scrollYRef = useRef(0);

  useEffect(() => {
    if (isMenuOpen) {
      scrollYRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollYRef.current);
    }
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`border-edge fixed top-0 z-50 w-full border-b ${isMenuOpen ? "bg-black backdrop-blur-xl" : "bg-surface backdrop-blur-[2px]"}`}
      >
        <Container className="text-fg-primary flex items-center justify-between py-4">
          {/* Brand */}
          <Link
            href="/"
            className="text-fg-secondary hover:text-fg-primary font-mono text-base transition min-[20rem]:text-xl"
          >
            {siteConfig.handle}
          </Link>

          {/* Desktop nav + locale toggle */}
          <div className="hidden items-center gap-6 md:flex">
            <nav className="flex items-center space-x-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition ${
                    activeSection === item.sectionId
                      ? "text-fg-primary"
                      : "text-fg-secondary hover:text-fg-primary"
                  }`}
                >
                  {t.nav[item.key]}
                </Link>
              ))}
            </nav>
            <button
              onClick={toggleLocale}
              className="border-edge text-fg-secondary hover:border-edge-hover hover:text-fg-primary cursor-pointer rounded-lg border px-2.5 py-1 font-mono text-xs transition-all"
              aria-label={locale === "pt" ? "Switch to English" : "Trocar para Português"}
            >
              {locale === "pt" ? "EN" : "PT"}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={toggleLocale}
              className="text-fg-tertiary hover:text-fg-primary cursor-pointer px-2 py-1 font-mono text-xs transition-colors"
              aria-label={locale === "pt" ? "Switch to English" : "Trocar para Português"}
            >
              {locale === "pt" ? "EN" : "PT"}
            </button>
            <button
              className="text-fg-secondary hover:text-fg-primary flex h-11 w-11 items-center justify-center transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </Container>
      </header>

      {/* Fullscreen mobile menu overlay — rendered outside header to avoid nested fixed issues */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-(--header-h) z-40 touch-none overflow-hidden overscroll-none bg-black backdrop-blur-xl md:hidden">
          <nav className="flex flex-col space-y-4 p-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-11 items-center transition ${
                  activeSection === item.sectionId
                    ? "text-fg-primary"
                    : "text-fg-secondary hover:text-fg-primary"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav[item.key]}
              </Link>
            ))}
            <div className="mt-2 flex space-x-2">
              {SOCIAL_LINKS.map(({ href, label }) => {
                const Icon = SOCIAL_ICONS[label];
                return Icon ? (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    aria-label={label}
                    className="text-fg-secondary hover:text-fg-primary flex h-11 w-11 items-center justify-center rounded-lg transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ) : null;
              })}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
