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

export function SpeedLines({ className = "", count = 20 }: { className?: string; count?: number }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          style={{
            width: `${60 + Math.random() * 40}%`,
            top: `${5 + (i * (100 / count))}%`,
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

export function SFXText({
  text,
  className = "",
  color = "text-primary",
}: {
  text: string;
  className?: string;
  color?: string;
}) {
  return (
    <motion.span
      className={`sfx-text absolute pointer-events-none select-none font-manga text-4xl sm:text-5xl opacity-20 ${color} ${className}`}
      animate={{ rotate: [-8, -4, -8], scale: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {text}
    </motion.span>
  );
}

export function Starburst({
  className = "",
  size = 120,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 120 120" className="w-full h-full opacity-10">
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 60 + Math.cos(angle) * 10;
          const y1 = 60 + Math.sin(angle) * 10;
          const x2 = 60 + Math.cos(angle) * 55;
          const y2 = 60 + Math.sin(angle) * 55;
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="currentColor"
              strokeWidth={i % 3 === 0 ? 3 : 1.5}
              className="text-primary"
            />
          );
        })}
      </svg>
    </div>
  );
}

export function HalftoneOverlay({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none halftone ${className}`} />
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
