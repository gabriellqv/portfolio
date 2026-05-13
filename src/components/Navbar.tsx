"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");

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
      <nav className="flex items-center justify-between px-8 py-4 rounded-full border border-border/40 bg-background/50 backdrop-blur-md">
        <Link href="#home" className="text-sm font-semibold tracking-wide text-foreground">
          <span className="">Gabriellqv</span>
        </Link>

        <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
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
          {/* O Contato ainda não existe, então o spy não vai pegar ele por enquanto */}
          <Link 
            href="#contact" 
            className={`px-3 py-1.5 rounded-full transition-all ${activeSection === 'contact' ? 'bg-white/10 text-foreground' : 'hover:bg-white/10 hover:text-foreground'}`}
          >
            Contato
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
