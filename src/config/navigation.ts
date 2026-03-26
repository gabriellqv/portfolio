/**
 * Shared navigation data consumed by both the header and footer.
 *
 * Centralizing these arrays prevents the common bug where a nav link is
 * added to the header but forgotten in the footer (or vice versa).
 * The `key` field maps to `t.nav[key]` in the i18n system.
 */

import { siteConfig } from "./site";

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const NAV_ITEMS = [
  { key: "about", href: "#about", sectionId: "about" },
  { key: "projects", href: "#projects", sectionId: "projects" },
  { key: "skills", href: "#skills", sectionId: "skills" },
  { key: "contact", href: "#contact", sectionId: "contact" },
] as const;

// ---------------------------------------------------------------------------
// Social Links
// ---------------------------------------------------------------------------

export const SOCIAL_LINKS = [
  { href: siteConfig.links.github, label: "GitHub", icon: "/icons/githubIcon.svg" },
  { href: siteConfig.links.linkedin, label: "LinkedIn", icon: "/icons/linkedinIcon.svg" },
  { href: siteConfig.links.email, label: "Email", icon: "/icons/mailIcon.svg" },
] as const;
