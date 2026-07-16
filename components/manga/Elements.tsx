"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

export function MangaPanel({
  children,
  className = "",
  ...props
}: { children: ReactNode; className?: string } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={`manga-panel bg-white ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SpeechBubble({
  children,
  className = "",
  direction = "left",
}: {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right";
}) {
  return (
    <div
      className={`speech-bubble ${direction === "right" ? "speech-bubble-right" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function SpeedLines({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          style={{
            width: `${60 + Math.random() * 40}%`,
            top: `${5 + (i * 5)}%`,
            left: `${Math.random() * 20}%`,
            transform: `rotate(${-2 + Math.random() * 4}deg)`,
            opacity: 0.15 + Math.random() * 0.15,
          }}
        />
      ))}
    </div>
  );
}

export function FloatingEmoji({
  emoji,
  className = "",
  delay = 0,
}: {
  emoji: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={`absolute text-2xl pointer-events-none select-none ${className}`}
      animate={{
        y: [-10, 10, -10],
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      {emoji}
    </motion.span>
  );
}

export function MangaButton({
  children,
  className = "",
  variant = "primary",
  ...props
}: {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "accent";
} & HTMLMotionProps<"button">) {
  const variants = {
    primary: "bg-primary text-white border-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-white border-foreground hover:bg-secondary/90",
    accent: "bg-accent text-white border-foreground hover:bg-accent/90",
  };

  return (
    <motion.button
      className={`manga-outline-sm font-bold transition-all cursor-pointer ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function PanelExplosion({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
