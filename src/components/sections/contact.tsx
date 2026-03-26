/**
 * Contact section with channel cards and inline message form.
 *
 * Form state follows a simple state machine:
 * idle -> sending -> success | error -> idle (on toast dismiss).
 *
 * Client-side validation relies on native HTML5 `required`, `type="email"`,
 * and `minLength` attributes. Server-side Zod validation in `route.ts`
 * provides the authoritative check. This dual approach avoids a Zod
 * client bundle for a form with only 3 fields.
 */

"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { useLocale } from "@/i18n/context";
import Toast from "@/components/ui/toast";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Contact channel definitions — drives card rendering via `.map()`. */
const CONTACT_CHANNELS = [
  {
    key: "email" as const,
    href: siteConfig.links.email,
    icon: "/icons/mailIcon.svg",
    displayValue: siteConfig.links.displayEmail,
    external: false,
  },
  {
    key: "linkedin" as const,
    href: siteConfig.links.linkedin,
    icon: "/icons/linkedinIcon.svg",
    displayValue: siteConfig.links.displayLinkedin,
    external: true,
  },
  {
    key: "github" as const,
    href: siteConfig.links.github,
    icon: "/icons/githubIcon.svg",
    displayValue: siteConfig.links.displayGithub,
    external: true,
  },
] as const;

type FormStatus = "idle" | "sending" | "success" | "error";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/** Contact section with channel cards and an inline message form. */
export default function Contact() {
  const { t } = useLocale();
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error();

      setFormStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setFormStatus("error");
    }
  };

  const isSending = formStatus === "sending";

  return (
    <section id="contact" className="py-20">
      <h2 className="mb-2 bg-linear-to-b from-white to-gray-500 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">{t.contact.title}</h2>
      <p className="text-fg-secondary mb-10">{t.contact.subtitle}</p>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Contact channel cards */}
        <div className="flex flex-col gap-4">
          {CONTACT_CHANNELS.map((channel) => (
            <a
              key={channel.key}
              href={channel.href}
              target={channel.external ? "_blank" : undefined}
              rel={channel.external ? "noopener noreferrer" : undefined}
              className="group border-edge bg-surface hover:border-edge-hover hover:shadow-glow flex items-center gap-4 rounded-xl border p-3 backdrop-blur-[2px] transition-all min-[20rem]:p-5"
            >
              <Image
                src={channel.icon}
                alt=""
                width={24}
                height={24}
                className="transition-all duration-200 group-hover:brightness-0 group-hover:invert"
              />
              <div>
                <p className="text-fg-secondary text-sm">
                  {channel.key === "email"
                    ? t.contact.form.email
                    : channel.key === "linkedin"
                      ? "LinkedIn"
                      : "GitHub"}
                </p>
                <p className="text-fg-primary truncate text-sm">{channel.displayValue}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="text-fg-secondary mb-1 block text-sm">
                {t.contact.form.name}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                placeholder={t.contact.form.namePlaceholder}
                disabled={isSending}
                className="border-edge bg-surface text-fg-primary placeholder-fg-tertiary w-full rounded-xl border px-4 py-3 text-sm transition outline-none focus:border-edge-hover disabled:opacity-50"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="text-fg-secondary mb-1 block text-sm">
                {t.contact.form.email}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder={t.contact.form.emailPlaceholder}
                disabled={isSending}
                className="border-edge bg-surface text-fg-primary placeholder-fg-tertiary w-full rounded-xl border px-4 py-3 text-sm transition outline-none focus:border-edge-hover disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-message" className="text-fg-secondary mb-1 block text-sm">
              {t.contact.form.message}
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              minLength={10}
              placeholder={t.contact.form.messagePlaceholder}
              rows={5}
              disabled={isSending}
              className="border-edge bg-surface text-fg-primary placeholder-fg-tertiary w-full resize-none rounded-xl border px-4 py-3 text-sm transition outline-none focus:border-edge-hover disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="border-edge cursor-pointer rounded-xl border bg-white px-6 py-3 font-medium text-black transition-all hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSending ? t.contact.form.sending : t.contact.form.submit}
          </button>
        </form>
      </div>

      {/* Toast notification */}
      {(formStatus === "success" || formStatus === "error") && (
        <Toast
          message={formStatus === "success" ? t.contact.form.success : t.contact.form.error}
          type={formStatus}
          onClose={() => setFormStatus("idle")}
        />
      )}
    </section>
  );
}
