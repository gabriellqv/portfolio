/**
 * Props for the shared section header component used across all page sections.
 */
export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

/**
 * Props interface for skill icon components from react-icons/si.
 * Accepts an optional style prop for dynamic hex color overrides.
 */
export interface SkillIconProps {
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
  icon: React.ComponentType<SkillIconProps>;
  hex: string;
}

/**
 * A named group of related skills rendered as a card in the skills section.
 */
export interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  skills: SkillItem[];
}

/**
 * A social media or contact link rendered in the footer and contact section.
 */
export interface SocialLink {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  handle?: string;
}

/**
 * A portfolio project entry shown in the projects section.
 * @property deploy - Set to "#" when the project has no public deployment yet.
 *                    The link component gracefully handles this placeholder value.
 * @property image - Empty string means no screenshot available; a placeholder
 *                   icon and title-based fallback is rendered instead.
 */
export interface Project {
  title: string;
  description: string;
  techs: string[];
  github: string;
  deploy: string;
  image: string;
  status: string;
}
