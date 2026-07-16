import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ineed – Whatever you need, we've got the talent.",
  description:
    "Connect with skilled professionals for web development, design, marketing, and more.",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
