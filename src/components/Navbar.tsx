"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" } // Triggers when section is roughly in the middle
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <header className="fixed top-6 z-50 w-full max-w-4xl px-4 left-1/2 -translate-x-1/2">
      <nav className={`relative flex items-center justify-between px-6 py-3.5 md:py-4 md:px-8 rounded-full border border-border/40 transition-colors ${isMobileMenuOpen ? 'bg-background' : 'bg-background/50 backdrop-blur-md'}`}>
        <Link href="#home" className="text-sm font-semibold tracking-wide text-foreground z-10">
          <span className="">Gabriellqv</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1 text-sm font-medium text-muted-foreground">
          <Link 
            href="#home" 
            className={`px-3 py-1.5 rounded-full transition-all ${activeSection === 'home' ? 'bg-white/10 text-foreground' : 'hover:bg-white/10 hover:text-foreground'}`}
          >
            Início
          </Link>
          <Link 
            href="#about" 
            className={`px-3 py-1.5 rounded-full transition-all ${activeSection === 'about' ? 'bg-white/10 text-foreground' : 'hover:bg-white/10 hover:text-foreground'}`}
          >
            Sobre
          </Link>
          <Link 
            href="#projects" 
            className={`px-3 py-1.5 rounded-full transition-all ${activeSection === 'projects' ? 'bg-white/10 text-foreground' : 'hover:bg-white/10 hover:text-foreground'}`}
          >
            Projetos
          </Link>
          <Link 
            href="#skills" 
            className={`px-3 py-1.5 rounded-full transition-all ${activeSection === 'skills' ? 'bg-white/10 text-foreground' : 'hover:bg-white/10 hover:text-foreground'}`}
          >
            Habilidades
          </Link>
          <Link 
            href="#education" 
            className={`px-3 py-1.5 rounded-full transition-all ${activeSection === 'education' ? 'bg-white/10 text-foreground' : 'hover:bg-white/10 hover:text-foreground'}`}
          >
            Educação
          </Link>
          <Link 
            href="#contact" 
            className={`px-3 py-1.5 rounded-full transition-all ${activeSection === 'contact' ? 'bg-black/10 dark:bg-white/10 text-foreground' : 'hover:bg-black/10 dark:hover:bg-white/10 hover:text-foreground'}`}
          >
            Contato
          </Link>
          
          <div className="w-px h-4 bg-border/50 mx-1"></div>
          
          {mounted && (
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
          )}
        </div>

        {/* Mobile controls (Theme Toggle + Hamburger) */}
        <div className="flex items-center gap-1 md:hidden z-10">
          {mounted && (
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
          )}

          <button 
            className="p-2 -mr-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-3 p-4 rounded-3xl border border-border/40 bg-background flex flex-col gap-2 shadow-2xl md:hidden">
            {[
              { id: 'home', label: 'Início' },
              { id: 'about', label: 'Sobre' },
              { id: 'projects', label: 'Projetos' },
              { id: 'skills', label: 'Habilidades' },
              { id: 'education', label: 'Educação' },
              { id: 'contact', label: 'Contato' }
            ].map((item) => (
              <Link 
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeSection === item.id ? 'bg-black/10 dark:bg-white/10 text-foreground' : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground'}`}
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
