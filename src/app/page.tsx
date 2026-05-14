import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import About from "@/sections/About";
import Contact from "@/sections/Contact";
import Education from "@/sections/Education";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";

/**
 * Single-page home route composing all portfolio sections.
 *
 * The `id="main-content"` on the <main> element is the target of the
 * skip-to-content link in the root layout, enabling keyboard accessibility.
 * Section order here determines both the visual page flow and the logical
 * tab order for navigation.
 */
export default function Home() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col items-center">
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
  );
}
