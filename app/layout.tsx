import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ineed – Whatever you need, we've got the talent.",
  description:
    "Connect with skilled professionals for web development, design, marketing, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
