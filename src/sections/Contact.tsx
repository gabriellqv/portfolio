"use client";

import { ArrowUpRight, Mail, MapPin } from "lucide-react";

import { buttonVariants } from "@/components/Button";
import SectionHeader from "@/components/SectionHeader";
import { SITE } from "@/constants";
import { socials } from "@/data/socials";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useDictionary } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * Contact section component.
 * Open editorial layout for direct communication channels and professional networking.
 * Replaces disconnected floating cards with an integrated, high-contrast contact showcase.
 */
export default function Contact() {
  const { dict } = useDictionary();
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="contact" className="section-wrapper">
      <SectionHeader title={dict.contact.title} subtitle={dict.contact.subtitle} />

      <div
        ref={ref}
        className="reveal-fade-up grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
      >
        {/* Left: Direct Call & Action */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            {dict.contact.sendMessage}
          </h3>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg font-normal">
            {dict.contact.locationDesc}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <a
              href={`mailto:${SITE.email}`}
              className={cn(
                buttonVariants({ variant: "primary", size: "default" }),
                "rounded-md justify-center font-medium",
              )}
            >
              <Mail className="size-4 shrink-0" />
              <span>{SITE.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-2.5 pt-4 text-xs sm:text-sm text-muted-foreground">
            <MapPin className="size-4 text-foreground/80 shrink-0" />
            <span>
              {dict.contact.locationValue} — {dict.contact.location}
            </span>
          </div>
        </div>

        {/* Right: Direct Channels & Social Networks */}
        <div className="lg:col-span-6 flex flex-col">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 pb-3 border-b border-border/70">
            {dict.contact.findMe}
          </h4>

          <div className="flex flex-col divide-y divide-border/50">
            {socials.map(({ href, icon: Icon, label, handle }) => {
              const translatedLabel = dict.socialLabels[label] ?? label;

              return (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  aria-label={translatedLabel}
                  className="group flex items-center justify-between py-4 transition-colors hover:text-foreground"
                >
                  <div className="flex items-center gap-3.5">
                    <Icon className="size-4.5 text-foreground/80 group-hover:text-foreground transition-colors" />
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-foreground">
                        {translatedLabel}
                      </p>
                      <p className="text-xs text-muted-foreground">{handle}</p>
                    </div>
                  </div>

                  <ArrowUpRight className="size-4.5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
