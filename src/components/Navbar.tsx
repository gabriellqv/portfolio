"use client";

import { useState } from "react";

import { useTheme } from "next-themes";
import Link from "next/link";

import { Globe, Menu, Moon, Sun, X } from "lucide-react";

import { SECTION_IDS } from "@/constants";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useMounted } from "@/hooks/useMounted";
import { useDictionary } from "@/i18n";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection([...SECTION_IDS]);

  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const { dict, lang, setLang } = useDictionary();

  const navItems = [
    { id: "home", label: dict.nav.home },
    { id: "about", label: dict.nav.about },
    { id: "projects", label: dict.nav.projects },
    { id: "skills", label: dict.nav.skills },
    { id: "education", label: dict.nav.education },
    { id: "contact", label: dict.nav.contact },
  ] as const;

  return (
    <header className="fixed top-6 z-50 w-full max-w-5xl px-4 left-1/2 -translate-x-1/2">
      <nav
        className={cn(
          "relative flex items-center justify-between px-6 py-3.5 md:py-4 md:px-8 rounded-full border border-border/40 transition-colors",
          isMobileMenuOpen ? "bg-background" : "bg-background/50 backdrop-blur-md",
        )}
      >
        <Link
          href="/#home"
          className="text-sm font-semibold tracking-wide text-foreground z-10"
        >
          Gabriellqv
        </Link>

        <div className="hidden md:flex items-center gap-1 text-sm font-medium text-muted-foreground">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              className={cn(
                "px-3 py-1.5 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-accent/40",
                activeSection === item.id
                  ? "bg-black/5 dark:bg-white/10 text-foreground"
                  : "hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground",
              )}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}

          {mounted && (
            <>
              <button
                onClick={() => setLang(lang === "pt" ? "en" : "pt")}
                className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent/40"
                aria-label={
                  lang === "pt" ? dict.a11y.switchLangEn : dict.a11y.switchLangPt
                }
              >
                <Globe className="size-4" />
              </button>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent/40"
                aria-label={dict.a11y.toggleTheme}
              >
                {theme === "dark" ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )}
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 md:hidden z-10">
          {mounted && (
            <>
              <button
                onClick={() => setLang(lang === "pt" ? "en" : "pt")}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
                aria-label={
                  lang === "pt" ? dict.a11y.switchLangEn : dict.a11y.switchLangPt
                }
              >
                <Globe className="size-5" />
              </button>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
                aria-label={dict.a11y.toggleTheme}
              >
                {theme === "dark" ? (
                  <Sun className="size-5" />
                ) : (
                  <Moon className="size-5" />
                )}
              </button>
            </>
          )}

          <button
            className="p-2 -mr-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? dict.a11y.closeMenu : dict.a11y.openMenu}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-3 p-4 rounded-3xl border border-border/40 bg-background flex flex-col gap-2 shadow-2xl md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-xl transition-all font-medium text-sm",
                  activeSection === item.id
                    ? "bg-black/5 dark:bg-white/10 text-foreground"
                    : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
