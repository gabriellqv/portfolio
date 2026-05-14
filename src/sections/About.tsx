"use client";

import SectionHeader from "@/components/SectionHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useDictionary } from "@/i18n";

export default function About() {
  const { dict } = useDictionary();
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="about" className="section-wrapper">
      <SectionHeader title={dict.about.title} />

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <div
          className="flex flex-col space-y-6 card-base p-8 lg:p-10 reveal-fade-up"
          style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
        >
          <h3 className="text-xl font-semibold text-foreground">{dict.about.whoIAm}</h3>
          <p className="text-muted-foreground leading-relaxed">{dict.about.whoIAmP1}</p>
          <p className="text-muted-foreground leading-relaxed">{dict.about.whoIAmP2}</p>
        </div>

        <div
          className="flex flex-col space-y-6 card-base p-8 lg:p-10 reveal-fade-up"
          style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
        >
          <h3 className="text-xl font-semibold text-foreground">
            {dict.about.myJourney}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {dict.about.myJourneyP1}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {dict.about.myJourneyP2Start}
            <em>deploy</em>
            {dict.about.myJourneyP2End}
          </p>
        </div>
      </div>
    </section>
  );
}
