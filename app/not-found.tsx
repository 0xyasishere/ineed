"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-6xl font-manga text-foreground/20">404</p>
        <h1 className="text-xl font-manga text-foreground">Page Not Found</h1>
        <p className="text-sm text-foreground/50">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="inline-block manga-outline-sm bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary/90"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
