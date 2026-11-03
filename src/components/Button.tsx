import * as React from "react";

import { cn } from "@/lib/utils";

export interface ButtonVariantsProps {
  variant?: "primary" | "secondary" | undefined;
  size?: "default" | "sm" | undefined;
  className?: string | undefined;
}

/**
 * Shared styling function for buttons and links acting as buttons.
 * Clean, tactile, and grounded button styles without neon glows.
 */
export const buttonVariants = ({
  variant = "primary",
  size = "default",
  className,
}: ButtonVariantsProps = {}) => {
  const base =
    "inline-flex justify-center items-center gap-2 font-medium transition-colors duration-150 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap rounded-lg";

  const variants = {
    primary:
      "bg-[#141619] dark:bg-[#f3f4f6] text-[#fafaf9] dark:text-[#141619] hover:bg-[#2c2e33] dark:hover:bg-white border border-[#141619] dark:border-transparent shadow-xs",
    secondary:
      "border border-border/80 dark:border-[#2c2e33] bg-white dark:bg-[#1e2023] hover:bg-neutral-100 dark:hover:bg-[#1e2023]/80 dark:hover:border-[#47484c] text-foreground shadow-xs",
  };

  const sizes = {
    default: "px-5 py-2.5 text-sm",
    sm: "px-3.5 py-1.5 text-sm",
  };

  return cn(base, variants[variant], sizes[size], className);
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantsProps {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
