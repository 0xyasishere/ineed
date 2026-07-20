"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-6xl font-manga text-foreground/20">!</p>
            <h1 className="text-xl font-manga text-foreground">Something went wrong</h1>
            <p className="text-sm text-foreground/50">{error.message}</p>
            <button
              onClick={() => reset()}
              className="manga-outline-sm bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary/90 cursor-pointer"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
