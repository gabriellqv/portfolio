"use client";

import { type FormEvent, useRef, useState } from "react";

import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Send,
  Text,
  User,
} from "lucide-react";

import { Button } from "@/components/Button";
import SectionHeader from "@/components/SectionHeader";
import { SITE } from "@/constants";
import { socials } from "@/data/socials";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useDictionary } from "@/i18n";
import { cn } from "@/lib/utils";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

/**
 * Contact section component.
 * Renders an interactive contact form and social media links.
 * Requires client-side hydration for form state management and submission logic.
 */
export default function Contact() {
  const { dict } = useDictionary();
  const ref = useScrollReveal<HTMLDivElement>();
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = dict.contact.errors.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = dict.contact.errors.emailRequired;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = dict.contact.errors.emailInvalid;
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = dict.contact.errors.messageRequired;
    }

    setErrors(newErrors);

    if (newErrors.name) {
      nameRef.current?.focus();
    } else if (newErrors.email) {
      emailRef.current?.focus();
    } else if (newErrors.message) {
      messageRef.current?.focus();
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState("sending");

    const subject = encodeURIComponent(`${dict.contact.subjectPrefix}${formData.name}`);
    const body = encodeURIComponent(
      `${dict.contact.bodyNameLabel}${formData.name}\n${dict.contact.bodyEmailLabel}${formData.email}\n\n${formData.message}`,
    );

    setTimeout(() => {
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      setFormState("sent");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});

      setTimeout(() => setFormState("idle"), 4000);
    }, 600);
  };

  return (
    <section id="contact" className="section-wrapper">
      <SectionHeader title={dict.contact.title} subtitle={dict.contact.subtitle} />

      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div
            className="card-base p-8 reveal-fade-up"
            style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
          >
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

          <div
            className="flex-1 card-base p-8 reveal-fade-up"
            style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
          >
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
                    aria-label={translatedLabel}
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

        <div
          className="lg:col-span-3 card-base p-8 lg:p-10 reveal-fade-up"
          style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
        >
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {dict.contact.sendMessage}
          </h3>
          <p className="text-sm text-muted-foreground mb-8">
            {dict.contact.sendMessageDesc}
          </p>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-name"
                  className="text-sm font-medium text-foreground"
                >
                  {dict.contact.name}
                </label>
                <div className="group relative flex items-center">
                  <User
                    className={cn(
                      "absolute left-3.5 size-4 pointer-events-none transition-colors",
                      errors.name
                        ? "text-red-500/80 dark:text-red-400"
                        : "text-muted-foreground group-hover:text-black dark:group-hover:text-white group-focus-within:text-black dark:group-focus-within:text-white",
                    )}
                  />
                  <input
                    ref={nameRef}
                    id="contact-name"
                    type="text"
                    placeholder={dict.contact.namePlaceholder}
                    value={formData.name}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }));
                      if (errors.name) clearError("name");
                    }}
                    className={cn(
                      "form-input pl-10 transition-colors",
                      errors.name &&
                        "border-red-500/70 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/60 dark:focus:ring-red-500/20",
                    )}
                  />
                </div>
                {errors.name && (
                  <div
                    id="contact-name-error"
                    role="alert"
                    className="flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400 animate-in fade-in duration-200"
                  >
                    <AlertCircle className="size-3.5 flex-shrink-0" />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-email"
                  className="text-sm font-medium text-foreground"
                >
                  {dict.contact.email}
                </label>
                <div className="group relative flex items-center">
                  <Mail
                    className={cn(
                      "absolute left-3.5 size-4 pointer-events-none transition-colors",
                      errors.email
                        ? "text-red-500/80 dark:text-red-400"
                        : "text-muted-foreground group-hover:text-black dark:group-hover:text-white group-focus-within:text-black dark:group-focus-within:text-white",
                    )}
                  />
                  <input
                    ref={emailRef}
                    id="contact-email"
                    type="email"
                    placeholder={dict.contact.emailPlaceholder}
                    value={formData.email}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }));
                      if (errors.email) clearError("email");
                    }}
                    className={cn(
                      "form-input pl-10 transition-colors",
                      errors.email &&
                        "border-red-500/70 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/60 dark:focus:ring-red-500/20",
                    )}
                  />
                </div>
                {errors.email && (
                  <div
                    id="contact-email-error"
                    role="alert"
                    className="flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400 animate-in fade-in duration-200"
                  >
                    <AlertCircle className="size-3.5 flex-shrink-0" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-message"
                className="text-sm font-medium text-foreground"
              >
                {dict.contact.message}
              </label>
              <div className="group relative flex items-start">
                <Text
                  className={cn(
                    "absolute left-3.5 top-3.5 size-4 pointer-events-none transition-colors",
                    errors.message
                      ? "text-red-500/80 dark:text-red-400"
                      : "text-muted-foreground group-hover:text-black dark:group-hover:text-white group-focus-within:text-black dark:group-focus-within:text-white",
                  )}
                />
                <textarea
                  ref={messageRef}
                  id="contact-message"
                  rows={7}
                  placeholder={dict.contact.messagePlaceholder}
                  value={formData.message}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }));
                    if (errors.message) clearError("message");
                  }}
                  className={cn(
                    "form-input pl-10 resize-none transition-colors",
                    errors.message &&
                      "border-red-500/70 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/60 dark:focus:ring-red-500/20",
                  )}
                />
              </div>
              {errors.message && (
                <div
                  id="contact-message-error"
                  role="alert"
                  className="flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400 animate-in fade-in duration-200"
                >
                  <AlertCircle className="size-3.5 flex-shrink-0" />
                  <span>{errors.message}</span>
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={formState !== "idle"}
              aria-live="polite"
              className="w-full sm:w-auto sm:self-end rounded-xl group/btn"
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
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
