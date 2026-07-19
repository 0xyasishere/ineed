"use client";

import { Component, type ReactNode } from "react";
import { motion } from "framer-motion";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="manga-panel bg-white p-8 text-center max-w-md"
          >
            <span className="text-5xl mb-4 block">💥</span>
            <h2 className="text-xl font-manga tracking-wide text-foreground">
              Something went wrong!
            </h2>
            <p className="mt-2 text-sm text-foreground/50">
              An unexpected error occurred. Please try again.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="mt-6 manga-outline-sm bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary/90 cursor-pointer"
            >
              Try Again
            </button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
