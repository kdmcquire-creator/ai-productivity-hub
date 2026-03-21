import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools Directory",
  description:
    "Browse and compare the best AI productivity tools across writing, design, marketing, development, project management, and more. Find the perfect tool for your workflow.",
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
