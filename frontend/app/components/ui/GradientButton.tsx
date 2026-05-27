"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Loader2, type LucideIcon } from "lucide-react";
import { type ReactNode, type ButtonHTMLAttributes } from "react";

interface GradientButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "accent" | "success" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconRight?: LucideIcon;
  loading?: boolean;
  className?: string;
}

const variants = {
  primary:
    "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_4px_28px_rgba(99,102,241,0.45)]",
  accent:
    "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_4px_20px_rgba(34,211,238,0.25)] hover:shadow-[0_4px_28px_rgba(34,211,238,0.4)]",
  success:
    "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_4px_20px_rgba(16,185,129,0.25)] hover:shadow-[0_4px_28px_rgba(16,185,129,0.4)]",
  ghost:
    "bg-transparent border border-[var(--glass-border)] text-[var(--text-secondary)] hover:bg-[rgba(34,211,238,0.06)] hover:text-[var(--text-primary)] hover:border-[rgba(100,180,255,0.2)]",
};

const sizes = {
  sm: "px-4 py-2 text-sm gap-1.5 rounded-[var(--radius-sm)]",
  md: "px-6 py-3 text-sm gap-2 rounded-[var(--radius-md)]",
  lg: "px-8 py-4 text-base gap-2.5 rounded-[var(--radius-lg)]",
};

export default function GradientButton({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconRight: IconRight,
  loading = false,
  className,
  disabled,
  ...props
}: GradientButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      whileHover={isDisabled ? undefined : { scale: 1.02, y: -1 }}
      whileTap={isDisabled ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={twMerge(
        clsx(
          "inline-flex items-center justify-center font-semibold transition-all duration-300 cursor-pointer select-none",
          variants[variant],
          sizes[size],
          isDisabled && "opacity-60 cursor-not-allowed saturate-50"
        ),
        className
      )}
      disabled={isDisabled}
      {...(props as any)}
    >
      {loading ? (
        <Loader2 size={size === "sm" ? 14 : 18} className="animate-spin" />
      ) : Icon ? (
        <Icon size={size === "sm" ? 14 : 18} />
      ) : null}

      {children}

      {IconRight && !loading && (
        <IconRight size={size === "sm" ? 14 : 18} />
      )}
    </motion.button>
  );
}
