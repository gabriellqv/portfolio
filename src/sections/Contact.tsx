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
 * Direct channels for collaboration, professional inquiries, and networking.
 * Interactive form deactivated in favor of direct communication channels.
 */
export default function Contact() {
  const { dict } = useDictionary();
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="contact" className="section-wrapper">
      <SectionHeader title={dict.contact.title} subtitle={dict.contact.subtitle} />

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* Direct Email Card */}
        <div className="card-base p-6 sm:p-8 flex flex-col justify-between reveal-fade-up">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center size-10 rounded-lg bg-neutral-100 dark:bg-[#141619] border border-border/70 dark:border-[#2c2e33]">
                <Mail className="size-5 text-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {dict.contact.sendMessage}
                </h3>
                <p className="text-xs text-muted-foreground">{SITE.email}</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-normal">
              {dict.contact.subtitle}
            </p>
          </div>

          <div className="pt-4 border-t border-border/40 dark:border-[#2c2e33]/60 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={`mailto:${SITE.email}`}
              className={cn(
                buttonVariants({ variant: "primary", size: "default" }),
                "w-full sm:w-auto font-medium justify-center",
              )}
            >
              <Mail className="size-4 shrink-0" />
              <span>{dict.contact.send}</span>
            </a>
          </div>
        </div>

        {/* Location & Social Networks */}
        <div className="flex flex-col gap-6">
          {/* Location */}
          <div className="card-base p-6 sm:p-7 reveal-fade-up">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center size-10 rounded-lg bg-neutral-100 dark:bg-[#141619] border border-border/70 dark:border-[#2c2e33]">
                <MapPin className="size-5 text-foreground" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">
                  {dict.contact.location}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {dict.contact.locationValue}
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {dict.contact.locationDesc}
            </p>
          </div>

          {/* Social Links */}
          <div className="card-base p-6 sm:p-7 flex-1 reveal-fade-up">
            <h4 className="text-sm font-semibold text-foreground mb-4">
              {dict.contact.findMe}
            </h4>
            <div className="flex flex-col gap-2">
              {socials.map(({ href, icon: Icon, label, handle }) => {
                const translatedLabel = dict.socialLabels[label] ?? label;

                return (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={translatedLabel}
                    className={cn(
                      "group/link flex items-center gap-3.5 p-2.5 -mx-2.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-[#141619] transition-colors",
                      "focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    )}
                  >
                    <div className="flex items-center justify-center size-8 rounded-md bg-neutral-100 dark:bg-[#141619] border border-border/70 dark:border-[#2c2e33]">
                      <Icon className="size-4 text-foreground/80 dark:text-[#f3f4f6]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-foreground">
                        {translatedLabel}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{handle}</p>
                    </div>
                    <ArrowUpRight className="size-4 text-muted-foreground opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
