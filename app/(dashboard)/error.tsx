"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-6xl font-manga text-foreground/20">!</p>
        <h1 className="text-xl font-manga text-foreground">Something went wrong</h1>
        <p className="text-sm text-foreground/50">{error.message}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="manga-outline-sm bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary/90 cursor-pointer"
          >
            Try again
          </button>
          <Link
            href="/"
            className="manga-outline-sm bg-muted px-6 py-2.5 text-sm font-bold text-foreground transition-all hover:bg-muted/80"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
