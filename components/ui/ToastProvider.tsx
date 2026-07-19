"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "white",
          border: "2px solid #1a1a1a",
          borderRadius: "0px",
          fontFamily: "var(--font-manga), sans-serif",
          boxShadow: "4px 4px 0 rgba(26,26,26,0.15)",
        },
        classNames: {
          success: "border-l-4 border-l-emerald-500",
          error: "border-l-4 border-l-red-500",
          info: "border-l-4 border-l-blue-500",
          warning: "border-l-4 border-l-amber-500",
        },
      }}
      closeButton
    />
  );
}
