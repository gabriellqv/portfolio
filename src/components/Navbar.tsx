"use client";

import { useEffect, useState } from "react";

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
  const activeSection = useActiveSection(SECTION_IDS, isMobileMenuOpen);

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

  // Prevent background scrolling to ensure focus remains trapped within the mobile drawer
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.classList.add("menu-open");
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed z-50 w-full inset-x-0 mx-auto transition-all duration-150 animate-navbar-drop",
        isMobileMenuOpen
          ? "top-0 px-0 max-w-none h-screen md:h-auto md:top-6 md:px-4 md:max-w-5xl"
          : "top-6 px-4 max-w-5xl",
      )}
    >
      <nav
        className={cn(
          "relative flex items-center justify-between transition-all duration-150",
          isMobileMenuOpen
            ? "px-6 py-4 md:py-4 md:px-8 bg-white dark:bg-background border-b border-black/10 dark:border-white/10 rounded-none md:rounded-[32px] md:border md:border-black/15 md:dark:border-white/10"
            : "px-6 py-3.5 md:py-4 md:px-8 rounded-[32px] border border-black/15 dark:border-white/10 bg-white/90 dark:bg-background/70 backdrop-blur-2xl saturate-200",
        )}
      >
        <Link
          href="#home"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-sm font-semibold tracking-wide text-foreground z-10"
        >
          Gabriellqv
        </Link>

        <div className="hidden md:flex items-center gap-1 text-sm font-medium text-muted-foreground">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
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

          <div className={cn("flex items-center gap-1", !mounted && "opacity-0")}>
            <button
              onClick={() => setLang(lang === "pt" ? "en" : "pt")}
              className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent/40"
              aria-label={lang === "pt" ? dict.a11y.switchLangEn : dict.a11y.switchLangPt}
            >
              <Globe className="size-4" />
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent/40"
              aria-label={dict.a11y.toggleTheme}
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )
              ) : (
                <div className="size-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 md:hidden z-10">
          <div className={cn("flex items-center gap-1", !mounted && "opacity-0")}>
            <button
              onClick={() => setLang(lang === "pt" ? "en" : "pt")}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
              aria-label={lang === "pt" ? dict.a11y.switchLangEn : dict.a11y.switchLangPt}
            >
              <Globe className="size-5" />
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
              aria-label={dict.a11y.toggleTheme}
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="size-5" />
                ) : (
                  <Moon className="size-5" />
                )
              ) : (
                <div className="size-5" />
              )}
            </button>
          </div>

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
          <div className="absolute top-full left-0 right-0 h-[calc(100vh-60px)] bg-white dark:bg-background flex flex-col px-8 pt-12 pb-8 md:hidden overflow-y-auto animate-menu-slide border-t border-black/5 dark:border-white/5 shadow-2xl">
            <div className="flex flex-col gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "relative flex items-center text-4xl font-black tracking-tighter transition-colors duration-300",
                    activeSection === item.id
                      ? "text-foreground"
                      : "text-neutral-400 dark:text-neutral-600 hover:text-foreground",
                  )}
                >
                  {activeSection === item.id && (
                    <span className="absolute -left-5 w-2 h-2 rounded-full bg-foreground" />
                  )}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
