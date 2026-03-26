import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Calculators & Estimator Tools",
  description:
    "Free interactive calculators to estimate AI ROI, token costs, meeting costs, content production savings, and more. Make data-driven decisions about AI tools.",
  openGraph: {
    title: "Free AI Calculators & Estimator Tools | AI Productivity Hub",
    description:
      "Free interactive calculators to estimate AI ROI, token costs, meeting costs, content production savings, and more.",
    images: [
      {
        url: "/api/og?title=AI+Calculators+%26+Estimator+Tools&type=tools",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
