import * as React from "react";

import { cn } from "@/lib/utils";

export interface ButtonVariantsProps {
  variant?: "primary" | "secondary" | undefined;
  size?: "default" | "sm" | undefined;
  className?: string | undefined;
}

/**
 * Shared styling function for buttons and links acting as buttons.
 * Eliminates ~120 character long class strings duplicated across the codebase.
 */
export const buttonVariants = ({
  variant = "primary",
  size = "default",
  className,
}: ButtonVariantsProps = {}) => {
  const base =
    "inline-flex justify-center items-center gap-2 font-semibold transition-all hover:scale-[1.02] active:scale-95 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap";

  const variants = {
    primary:
      "bg-[#141619] dark:bg-[#f3f4f6] text-[#fafaf9] dark:text-[#141619] hover:bg-[#2c2e33] dark:hover:bg-white shadow-md shadow-black/10 dark:shadow-[0_0_20px_rgba(243,244,246,0.15)] dark:hover:shadow-[0_0_28px_rgba(243,244,246,0.25)] border border-[#141619] dark:border-transparent",
    secondary:
      "border border-border/80 dark:border-[#2c2e33] bg-white dark:bg-[#1e2023]/70 backdrop-blur-xl hover:bg-neutral-100 dark:hover:bg-[#1e2023] dark:hover:border-[#47484c] text-foreground hover:text-foreground shadow-sm",
  };

  const sizes = {
    default: "px-6 py-3 sm:py-2.5 text-sm",
    sm: "px-4 py-2 text-sm",
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
        className={cn("rounded-full", buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
