import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkillsCarousel from "@/components/SkillsCarousel";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <Navbar />
      
      <section className="flex-1 w-full flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 -mt-16">
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
      </section>

      <Footer />
    </main>
  );
}
