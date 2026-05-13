import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkillsCarousel from "@/components/SkillsCarousel";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Education from "@/sections/Education";
import Projects from "@/sections/Projects";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <Navbar />
      
      <section className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 pt-20 pb-10">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-0 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 pb-2">
          Gabriel Queiroz
        </h1>
        
        <h2 className="text-xl md:text-3xl font-medium tracking-tight mb-4">
          <span className="text-neutral-400">Desenvolvedor </span>
          <span className="text-neutral-600">Full Stack</span>
        </h2>

        <p className="max-w-[600px] text-sm md:text-base text-muted-foreground leading-relaxed">
          Desenvolvedor Full Stack especializado em React, Next.js, Vue.js, NestJS e Laravel
        </p>

        <SkillsCarousel />

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <Link 
            href="#projects" 
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm bg-foreground text-background font-semibold hover:bg-neutral-200 transition-all hover:scale-[1.02] active:scale-95"
          >
            Ver Projetos <ArrowRight className="size-4" />
          </Link>
          <a 
            href="/Curriculo_Gabriel_Queiroz.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm border border-border/50 bg-transparent hover:bg-white/5 transition-all text-neutral-300 hover:text-white font-medium hover:scale-[1.02] active:scale-95"
          >
            <Download className="size-4" /> Baixar CV
          </a>
        </div>
      </section>

      <About />
      <Skills />
      <Education />
      <Projects />

      <Footer />
    </main>
  );
}
