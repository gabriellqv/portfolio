"use client";

import { useState, type FormEvent, type ComponentType } from "react";
import { Mail, MapPin, ArrowUpRight, Loader2, CheckCircle2, Send } from "lucide-react";
import { SiGithub } from "react-icons/si";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const contactLinks: {
  href: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  handle: string;
}[] = [
  {
    href: "https://github.com/gabriellqv",
    icon: SiGithub,
    label: "GitHub",
    handle: "@gabriellqv",
  },
  {
    href: "https://www.linkedin.com/in/gabriellqv/",
    icon: LinkedinIcon,
    label: "LinkedIn",
    handle: "/in/gabriellqv",
  },

  {
    href: "mailto:gabriellqv@gmail.com",
    icon: Mail,
    label: "E-mail",
    handle: "gabriellqv@gmail.com",
  },
];

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    // Monta o mailto com os dados do formulário
    const subject = encodeURIComponent(`Contato via Portfolio - ${formData.name}`);
    const body = encodeURIComponent(
      `Nome: ${formData.name}\nE-mail: ${formData.email}\n\n${formData.message}`
    );
    
    setTimeout(() => {
      window.location.href = `mailto:gabriellqv@gmail.com?subject=${subject}&body=${body}`;
      setFormState("sent");
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => setFormState("idle"), 4000);
    }, 600);
  };

  return (
    <section id="contact" className="w-full max-w-5xl mx-auto px-4 py-24">
      <div className="flex flex-col mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
          Contato
        </h2>
        <div className="w-20 h-1 bg-neutral-700 rounded-full"></div>
        <p className="mt-6 text-muted-foreground max-w-2xl leading-relaxed">
          Interessado em trabalhar junto ou tem uma proposta? Fique à vontade para
          entrar em contato, estou sempre aberto a novas oportunidades e conversas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        {/* Informações de contato */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Card de localização */}
          <div className="bg-card border border-border/40 rounded-3xl p-8 shadow-xl hover:shadow-2xl dark:hover:bg-white/[0.04] transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center size-10 rounded-xl bg-neutral-200/80 dark:bg-white/5 border border-border/30">
                <MapPin className="size-5 text-neutral-700 dark:text-neutral-300" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-200">
                  Localização
                </p>
                <p className="text-xs text-muted-foreground">
                  São Paulo, Brasil
                </p>
              </div>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Disponível para trabalho remoto e oportunidades internacionais.
            </p>
          </div>

          {/* Links sociais */}
          <div className="flex-1 bg-card border border-border/40 rounded-3xl p-8 shadow-xl hover:shadow-2xl dark:hover:bg-white/[0.04] transition-all">
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-200 mb-5">
              Onde me encontrar
            </h3>
            <div className="flex flex-col gap-3">
              {contactLinks.map(({ href, icon: Icon, label, handle }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group/link flex items-center gap-3.5 p-3 -mx-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center justify-center size-9 rounded-lg bg-neutral-200/80 dark:bg-white/5 border border-border/30 group-hover/link:border-neutral-400/50 dark:group-hover/link:border-neutral-500/30 transition-colors">
                    <Icon className="size-4 text-neutral-700 dark:text-neutral-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                      {label}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {handle}
                    </p>
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Formulário de contato */}
        <div className="lg:col-span-3 bg-card border border-border/40 rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl dark:hover:bg-white/[0.04] transition-all">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-200 mb-2">
            Envie uma mensagem
          </h3>
          <p className="text-sm text-muted-foreground mb-8">
            Preencha o formulário abaixo e seu cliente de e-mail será aberto com a
            mensagem pronta.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Nome */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-name"
                  className="text-sm font-medium text-neutral-800 dark:text-neutral-300"
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
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-white dark:bg-black/40 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60 transition-all"
                />
              </div>

              {/* E-mail */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-email"
                  className="text-sm font-medium text-neutral-800 dark:text-neutral-300"
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
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-white dark:bg-black/40 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60 transition-all"
                />
              </div>
            </div>

            {/* Mensagem */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-message"
                className="text-sm font-medium text-neutral-800 dark:text-neutral-300"
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
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-xl border border-border/50 bg-white dark:bg-black/40 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60 transition-all resize-none"
              />
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={formState !== "idle"}
              className="group/btn flex items-center justify-center gap-2 w-full sm:w-auto sm:self-end px-6 py-2.5 rounded-xl bg-foreground text-background font-semibold text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:pointer-events-none"
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
