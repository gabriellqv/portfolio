import { Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";

import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { SITE } from "@/constants";
import type { SocialLink } from "@/types";

/**
 * Centralized social media and contact link definitions.
 * Both the Footer and the Contact section consume this same array,
 * ensuring link URLs, icons, and labels stay consistent across the site.
 *
 * For `mailto:` links, the `target="_blank"` attribute is conditionally
 * omitted by consumers to avoid opening a blank tab for email clients.
 */
export const socials: SocialLink[] = [
  {
    href: `https://github.com/${SITE.githubUsername}`,
    icon: SiGithub,
    label: "GitHub",
    handle: `@${SITE.githubUsername}`,
  },
  {
    href: `https://www.linkedin.com/in/${SITE.linkedinUsername}/`,
    icon: LinkedinIcon,
    label: "LinkedIn",
    handle: `/in/${SITE.linkedinUsername}`,
  },
  {
    href: `mailto:${SITE.email}`,
    icon: Mail,
    label: "E-mail",
    handle: SITE.email,
  },
];
