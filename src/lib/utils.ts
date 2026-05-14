import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and deduplicates Tailwind CSS class names.
 * Uses clsx for conditional class joining and tailwind-merge to resolve
 * conflicting utilities (e.g. `px-4 px-6` keeps only the last one).
 *
 * This is the standard utility pattern used across the project for any
 * component that has conditional or composed class strings.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
