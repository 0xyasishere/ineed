"use client";

export default function Loading() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center space-y-4">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" />
        <p className="text-sm text-foreground/50 font-bold">Loading...</p>
      </div>
    </div>
  );
}
