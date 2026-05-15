import dynamic from "next/dynamic";

import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import SkipToContent from "@/components/SkipToContent";
import Hero from "@/sections/Hero";

const About = dynamic(() => import("@/sections/About"));
const Contact = dynamic(() => import("@/sections/Contact"));
const Education = dynamic(() => import("@/sections/Education"));
const Projects = dynamic(() => import("@/sections/Projects"));
const Skills = dynamic(() => import("@/sections/Skills"));
const Footer = dynamic(() => import("@/components/Footer"));

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
