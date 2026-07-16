import { type SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

const defaults = {
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ─── SHIELD / VERIFIED ─── */
export function ShieldIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...defaults} {...props}>
      <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/* ─── SHIELD CHECK (verified badge) ─── */
export function ShieldCheckIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...defaults} {...props}>
      <path d="M12 2l7 3.5v5.5c0 4.5-3 7.5-7 8.5-4-1-7-4-7-8.5V5.5L12 2z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/* ─── CLOCK / DELIVERY TIME ─── */
export function ClockIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...defaults} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

/* ─── STAR / RATING ─── */
export function StarIcon({ size = 24, className, ...props }: IconProps) {
  const isFilled = className?.includes("fill-");
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={isFilled ? "currentColor" : "none"} stroke="currentColor" {...defaults} {...props}>
      <path d="M12 2l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17l-5.8 3-1.1-6.5L.4 8.8l6.5-1L12 2z" />
    </svg>
  );
}

/* ─── HEADPHONES / SUPPORT ─── */
export function HeadphonesIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...defaults} {...props}>
      <path d="M3 18v-6a9 9 0 0118 0v6" />
      <rect x="1" y="15" width="4" height="6" rx="1" />
      <rect x="19" y="15" width="4" height="6" rx="1" />
    </svg>
  );
}

/* ─── CHECK CIRCLE ─── */
export function CheckCircleIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...defaults} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/* ─── SPARKLE / FEATURED ─── */
export function SparkleIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...defaults} {...props}>
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
      <path d="M19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15z" />
      <path d="M5 17l.5 1.5L7 19l-1.5.5L5 21l-.5-1.5L3 19l1.5-.5L5 17z" />
    </svg>
  );
}

/* ─── ZAP / FAST ─── */
export function ZapIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...defaults} {...props}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

/* ─── FIRE / TRENDING ─── */
export function FireIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...defaults} {...props}>
      <path d="M12 23c-4.97 0-7-3.58-7-7 0-3.07 2.25-5.37 3.5-6.5C10 8.12 12 5 12 2c0 4 2 6 3.5 7.5.5.5 1 1.2 1.5 2 .5-1.5 1-3 2-4.5 0 3 1.5 5 2 6.5 1 2.5 0 5-2 7" />
      <path d="M12 23c-2 0-3-2-3-4.5S10 14 12 14s3 2 3 4.5S14 23 12 23z" />
    </svg>
  );
}

/* ─── DIAMOND / PREMIUM ─── */
export function DiamondIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...defaults} {...props}>
      <path d="M6 3h12l4 6-10 13L2 9z" />
      <path d="M2 9h20" />
      <path d="M10 3l-4 6 6 13 6-13-4-6" />
    </svg>
  );
}

/* ─── TARGET / GOAL ─── */
export function TargetIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...defaults} {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}

/* ─── ROCKET / LAUNCH ─── */
export function RocketIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...defaults} {...props}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

/* ─── BRIEFCASE / JOB ─── */
export function BriefcaseIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...defaults} {...props}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      <path d="M12 12v1" />
      <path d="M2 12h20" />
    </svg>
  );
}
