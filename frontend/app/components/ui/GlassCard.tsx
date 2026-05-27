"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type ReactNode } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hoverable?: boolean;
  noPadding?: boolean;
}

export default function GlassCard({
  children,
  className,
  glow = false,
  hoverable = false,
  noPadding = false,
  ...motionProps
}: GlassCardProps) {
  return (
    <motion.div
      className={twMerge(
        clsx(
          "glass rounded-[var(--radius-lg)]",
          !noPadding && "p-6",
          glow && "glow-cyan",
          hoverable &&
            "cursor-pointer hover:border-[rgba(100,180,255,0.2)] hover:shadow-[0_0_24px_rgba(34,211,238,0.08)] transition-all duration-300"
        ),
        className
      )}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
