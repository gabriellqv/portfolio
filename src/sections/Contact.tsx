"use client";

import { type FormEvent, useState } from "react";

import { ArrowUpRight, CheckCircle2, Loader2, MapPin, Send } from "lucide-react";

import SectionHeader from "@/components/SectionHeader";
import { SITE } from "@/constants";
import { socials } from "@/data/socials";
import { cn } from "@/lib/utils";

/**
 * Contact section with social links and a client-side email form.
 *
 * Form submission uses a `mailto:` link strategy: on submit, the user's
 * default email client opens with a pre-filled subject and body. A 600ms
 * artificial delay provides visual feedback (sending state) before the
 * browser navigates to the mailto handler.
 *
 * After the mailto opens, the form resets with a "sent" success badge
 * that auto-clears after 4 seconds, returning to the idle state.
 *
 * Social links reuse the centralized `socials` data array shared with
 * the Footer, ensuring URL consistency across the site.
 */
export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    const subject = encodeURIComponent(`Contato via Portfolio - ${formData.name}`);
    const body = encodeURIComponent(
      `Nome: ${formData.name}\nE-mail: ${formData.email}\n\n${formData.message}`,
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
      <SectionHeader
        title="Contato"
        subtitle="Interessado em trabalhar junto ou tem uma proposta? Fique à vontade para entrar em contato, estou sempre aberto a novas oportunidades e conversas."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="card-base p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center size-10 rounded-xl bg-neutral-200/80 dark:bg-white/5 border border-border/30">
                <MapPin className="size-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Localização</p>
                <p className="text-xs text-muted-foreground">{SITE.location}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Disponível para trabalho remoto e oportunidades internacionais.
            </p>
          </div>

          <div className="flex-1 card-base p-8">
            <h3 className="text-base font-semibold text-foreground mb-5">
              Onde me encontrar
            </h3>
            <div className="flex flex-col gap-3">
              {socials.map(({ href, icon: Icon, label, handle }) => (
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
                    <p className="text-sm font-medium text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground truncate">{handle}</p>
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 card-base p-8 lg:p-10">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Envie uma mensagem
          </h3>
          <p className="text-sm text-muted-foreground mb-8">
            Preencha o formulário abaixo e seu cliente de e-mail será aberto com a
            mensagem pronta.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-name"
                  className="text-sm font-medium text-foreground"
                >
                  Nome
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Seu nome"
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
                  E-mail
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="seu@email.com"
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
                Mensagem
              </label>
              <textarea
                id="contact-message"
                required
                rows={7}
                placeholder="Descreva seu projeto ou proposta..."
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
                  Enviar Mensagem
                  <Send className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </>
              )}
              {formState === "sending" && (
                <>
                  Enviando...
                  <Loader2 className="size-4 animate-spin" />
                </>
              )}
              {formState === "sent" && (
                <>
                  Mensagem Pronta!
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
