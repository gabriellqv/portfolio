/**
 * Landing page: assembles all portfolio sections.
 *
 * This is a Server Component. HTML is rendered on the server for instant
 * FCP/LCP. Each child section manages its own client-side interactivity
 * via "use client" at the component boundary.
 */

import Container from "@/components/layout/container";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import Contact from "@/components/sections/contact";
import FadeIn from "@/components/ui/fade-in";

const Divider = () => (
  <div className="mx-auto h-px w-full max-w-4xl bg-linear-to-r from-transparent via-white/10 to-transparent" />
);
export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      {/* Hero */}
      <Container>
        <Hero />
      </Container>

      {/* About */}
      <Container>
        <FadeIn>
          <About />
        </FadeIn>
      </Container>
      
      <Divider />

      {/* Projects */}
      <Container>
        <FadeIn>
          <Projects />
        </FadeIn>
      </Container>
      
      <Divider />

      {/* Skills */}
      <Container>
        <FadeIn>
          <Skills />
        </FadeIn>
      </Container>
      
      <Divider />

      {/* Contact */}
      <Container>
        <FadeIn>
          <Contact />
        </FadeIn>
      </Container>
    </div>
  );
}
