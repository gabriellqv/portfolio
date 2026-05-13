export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export interface SkillIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export interface SkillItem {
  name: string;
  icon: React.ComponentType<SkillIconProps>;
  hex: string;
}

export interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  skills: SkillItem[];
}

export interface SocialLink {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  handle?: string;
}

export interface Project {
  title: string;
  description: string;
  techs: string[];
  github: string;
  deploy: string;
  image: string;
  status: string;
}
