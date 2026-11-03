"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import Link from "next/link";

import { Languages, Menu, Moon, Sun, X } from "lucide-react";

import { SECTION_IDS } from "@/constants";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useMounted } from "@/hooks/useMounted";
import { useDictionary } from "@/i18n";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS, isMobileMenuOpen);

  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const { dict, lang, setLang } = useDictionary();

  const handleLangToggle = () => {
    setLang(lang === "pt" ? "en" : "pt");
  };

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navItems = [
    { id: "home", label: dict.nav.home },
    { id: "about", label: dict.nav.about },
    { id: "projects", label: dict.nav.projects },
    { id: "skills", label: dict.nav.skills },
    { id: "education", label: dict.nav.education },
    { id: "contact", label: dict.nav.contact },
  ] as const;

  // Track scroll position to toggle the bottom border only when scrolled
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
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

  // Close mobile menu automatically when window resizes to desktop breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 w-full bg-background/90 backdrop-blur-md transition-colors duration-200 border-b",
        isScrolled || isMobileMenuOpen
          ? "border-border/70 dark:border-[#2c2e33]"
          : "border-transparent",
      )}
    >
      <nav className="max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="#home"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-base font-bold tracking-tight text-foreground z-10"
        >
          Gabriellqv
        </Link>

        <div
          id="desktop-nav"
          className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={`#${item.id}`}
                data-nav-link
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative px-3 py-1.5 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-accent/40",
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span data-nav-label>{item.label}</span>
              </Link>
            );
          })}

          <div
            className={cn(
              "flex items-center gap-2 ml-4 pl-4 border-l border-border/60 dark:border-[#2c2e33]",
              !mounted && "opacity-0",
            )}
          >
            <button
              onClick={handleLangToggle}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-[#1e2023] transition-colors focus-visible:ring-2 focus-visible:ring-accent/40 select-none"
              aria-label={lang === "pt" ? dict.a11y.switchLangEn : dict.a11y.switchLangPt}
            >
              <Languages className="size-3.5" />
              <span>{lang.toUpperCase()}</span>
            </button>
            <button
              onClick={handleThemeToggle}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-[#1e2023] transition-colors focus-visible:ring-2 focus-visible:ring-accent/40"
              aria-label={dict.a11y.toggleTheme}
            >
              {mounted && theme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 md:hidden z-10">
          <div className={cn("flex items-center gap-1", !mounted && "opacity-0")}>
            <button
              onClick={handleLangToggle}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-[#1e2023] transition-colors"
              aria-label={lang === "pt" ? dict.a11y.switchLangEn : dict.a11y.switchLangPt}
            >
              <Languages className="size-3.5" />
              <span>{lang.toUpperCase()}</span>
            </button>
            <button
              onClick={handleThemeToggle}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-[#1e2023] transition-colors"
              aria-label={dict.a11y.toggleTheme}
            >
              {mounted && theme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
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
          <div className="absolute top-full left-0 right-0 h-[calc(100vh-64px)] bg-background flex flex-col px-6 sm:px-8 pt-8 pb-8 md:hidden overflow-y-auto border-t border-border/60">
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-2xl font-bold tracking-tight transition-colors",
                    activeSection === item.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
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
