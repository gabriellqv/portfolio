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
      "bg-foreground text-background hover:bg-neutral-800 dark:hover:bg-neutral-200",
    secondary:
      "border border-border/50 bg-white dark:bg-transparent hover:bg-neutral-100 dark:hover:bg-white/5 text-foreground hover:text-foreground",
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
