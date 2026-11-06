/**
 * Props for the shared section header component used across all page sections.
 */
export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

/**
 * Base props accepted by all icon components (Lucide, react-icons, custom SVGs).
 * Every icon reference throughout the app should use this type to ensure a
 * consistent prop surface.
 */
export interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Represents a single technology skill displayed in the skills grid and carousel.
 * @property hex - Brand color hex used for both icon fill and background tint.
 *                 When set to "#FFFFFF", a special neutral fallback styling is applied.
 */
export interface SkillItem {
  name: string;
  icon: React.ComponentType<IconProps>;
  hex: string;
}

/**
 * A named group of related skills rendered as a card in the skills section.
 */
export interface SkillCategory {
  title: string;
  icon: React.ComponentType<IconProps>;
  skills: SkillItem[];
}

/**
 * A social media or contact link rendered in the footer and contact section.
 */
export interface SocialLink {
  href: string;
  icon: React.ComponentType<IconProps>;
  label: string;
  handle?: string;
}

export type ProjectCategory = "professional" | "personal";

/**
 * A portfolio project entry shown in the projects section.
 * @property category - Distinguishes between professional client work and personal open-source projects.
 * @property company - Optional client or company name.
 * @property role - Optional developer role for client work.
 * @property github - Optional link to source code; omitted for private client code.
 * @property deploy - Set to "#" when the project has no public deployment yet.
 *                    The link component gracefully handles this placeholder value.
 * @property image - Empty string means no screenshot available; a placeholder
 *                   icon and title-based fallback is rendered instead.
 */
export interface Project {
  title: string;
  subtitle?: string;
  description: string;
  techs: string[];
  highlights?: string[];
  category: ProjectCategory;
  company?: string;
  role?: string;
  github?: string;
  deploy: string;
  image: string;
  status: string;
}

/**
 * A published landing page or institutional site showcased in the Projects section.
 * @property kind - Distinguishes client work from published GS7Tech templates.
 * @property location - Client city/state, rendered as supporting metadata.
 * @property url - Live site opened in a new tab.
 * @property image - Hero screenshot used as the card preview.
 */
export interface LandingSite {
  title: string;
  location: string;
  url: string;
  image: string;
  kind: "client" | "template";
  techs: string[];
}
