import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import SkipToContent from "@/components/SkipToContent";
import About from "@/sections/About";
import Contact from "@/sections/Contact";
import Education from "@/sections/Education";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";

/**
 * Primary landing page of the application.
 * Assembles all layout sections (Hero, About, Skills, etc.) into a cohesive,
 * sequentially animated single-page experience.
 */
export default function Home() {
  return (
    <>
      <SkipToContent />
      <main
        id="main-content"
        className="min-h-screen flex flex-col items-center w-full overflow-x-clip"
      >
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Education />
        <Contact />
        <Footer />
        <ScrollToTop />
      </main>
    </>
  );
}
