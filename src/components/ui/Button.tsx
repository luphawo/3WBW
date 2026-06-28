"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "gold";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    return (
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className="inline-flex"
      >
        <button
          ref={ref}
          className={cn(
            "relative inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-xl w-full",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            {
              "bg-forest text-ivory hover:bg-forest-light shadow-lg shadow-forest/20": variant === "primary",
              "bg-charcoal text-ivory hover:bg-graphite shadow-lg shadow-black/10": variant === "secondary",
              "bg-transparent text-forest hover:bg-forest/10": variant === "ghost",
              "border-2 border-[#C4952A] text-[#C4952A] hover:bg-[#C4952A]/10": variant === "outline",
              "bg-gradient-to-r from-[#C4952A] to-[#D4A435] text-graphite hover:brightness-110 shadow-lg shadow-[#C4952A]/20": variant === "gold",
            },
            {
              "px-4 py-2 text-sm": size === "sm",
              "px-6 py-3 text-base": size === "md",
              "px-8 py-4 text-lg": size === "lg",
              "px-10 py-5 text-xl": size === "xl",
            },
            className
          )}
          disabled={disabled || loading}
          {...props}
        >
          {loading && (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {children}
        </button>
      </motion.div>
    );
  }
);

Button.displayName = "Button";
export { Button, type ButtonProps };
