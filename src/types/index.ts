/**
 * Centralized type definitions for the portfolio application.
 *
 * All shared types live here to enforce a single source of truth
 * and prevent drift between data files and consuming components.
 */

// ---------------------------------------------------------------------------
// Site Config
// ---------------------------------------------------------------------------

export type SiteConfig = {
  name: string;
  handle: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
    linkedin: string;
    email: string;
    /** Display variants omit protocol prefixes for cleaner UI rendering. */
    displayGithub: string;
    displayLinkedin: string;
    displayEmail: string;
  };
};

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  /** Path relative to /public (e.g. "/projects/image.webp"). */
  image?: string;
  tags: string[];
  links: {
    live?: string;
    github?: string;
  };
  /** Featured projects are rendered in the main grid; non-featured are hidden. */
  featured: boolean;
};

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export type SkillItem = {
  name: string;
  /** Path relative to /public (e.g. "/icons/reactIcon.svg"). */
  icon: string;
};
