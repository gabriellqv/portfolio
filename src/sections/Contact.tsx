"use client";

import { type FormEvent, useState } from "react";

import { ArrowUpRight, CheckCircle2, Loader2, MapPin, Send } from "lucide-react";

import SectionHeader from "@/components/SectionHeader";
import { SITE } from "@/constants";
import { socials } from "@/data/socials";
import { useDictionary } from "@/i18n";
import { cn } from "@/lib/utils";

export default function Contact() {
  const { dict } = useDictionary();
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    const subject = encodeURIComponent(`${dict.contact.subjectPrefix}${formData.name}`);
    const body = encodeURIComponent(
      `${dict.contact.bodyNameLabel}${formData.name}\n${dict.contact.bodyEmailLabel}${formData.email}\n\n${formData.message}`,
    );

    setTimeout(() => {
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      setFormState("sent");
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => setFormState("idle"), 4000);
    }, 600);
  };

  return (
    <section id="contact" className="section-wrapper">
      <SectionHeader title={dict.contact.title} subtitle={dict.contact.subtitle} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="card-base p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center size-10 rounded-xl bg-neutral-200/80 dark:bg-white/5 border border-border/30">
                <MapPin className="size-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {dict.contact.location}
                </p>
                <p className="text-xs text-muted-foreground">
                  {dict.contact.locationValue}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {dict.contact.locationDesc}
            </p>
          </div>

          <div className="flex-1 card-base p-8">
            <h3 className="text-base font-semibold text-foreground mb-5">
              {dict.contact.findMe}
            </h3>
            <div className="flex flex-col gap-3">
              {socials.map(({ href, icon: Icon, label, handle }) => {
                const translatedLabel = dict.socialLabels[label] ?? label;

                return (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                    className={cn(
                      "group/link flex items-center gap-3.5 p-3 -mx-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors",
                      "focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    )}
                  >
                    <div className="flex items-center justify-center size-9 rounded-lg bg-neutral-200/80 dark:bg-white/5 border border-border/30 group-hover/link:border-neutral-400/50 dark:group-hover/link:border-neutral-500/30 transition-colors">
                      <Icon className="size-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
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

        <div className="lg:col-span-3 card-base p-8 lg:p-10">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {dict.contact.sendMessage}
          </h3>
          <p className="text-sm text-muted-foreground mb-8">
            {dict.contact.sendMessageDesc}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-name"
                  className="text-sm font-medium text-foreground"
                >
                  {dict.contact.name}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder={dict.contact.namePlaceholder}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-white dark:bg-black/40 text-sm text-foreground placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-email"
                  className="text-sm font-medium text-foreground"
                >
                  {dict.contact.email}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder={dict.contact.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-white dark:bg-black/40 text-sm text-foreground placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-message"
                className="text-sm font-medium text-foreground"
              >
                {dict.contact.message}
              </label>
              <textarea
                id="contact-message"
                required
                rows={7}
                placeholder={dict.contact.messagePlaceholder}
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 rounded-xl border border-border/50 bg-white dark:bg-black/40 text-sm text-foreground placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={formState !== "idle"}
              aria-live="polite"
              className={cn(
                "group/btn flex items-center justify-center gap-2 w-full sm:w-auto sm:self-end px-6 py-2.5 rounded-xl bg-foreground text-background font-semibold text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:pointer-events-none",
                "focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              {formState === "idle" && (
                <>
                  {dict.contact.send}
                  <Send className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </>
              )}
              {formState === "sending" && (
                <>
                  {dict.contact.sending}
                  <Loader2 className="size-4 animate-spin" />
                </>
              )}
              {formState === "sent" && (
                <>
                  {dict.contact.sent}
                  <CheckCircle2 className="size-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
