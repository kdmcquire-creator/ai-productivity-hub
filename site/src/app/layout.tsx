import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aiproductivityhub.co"),
  title: {
    template: "%s | AI Productivity Hub",
    default: "AI Productivity Hub - Find the Best AI Tools for Your Productivity",
  },
  description:
    "Discover, compare, and choose the best AI productivity tools for writing, design, marketing, development, and more. In-depth reviews, comparisons, and guides to help you work smarter.",
  verification: {
    other: {
      "google-adsense-account": ["ca-pub-5995172189982724"],
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5995172189982724"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-xl font-bold text-blue-600">
                AI Productivity Hub
              </Link>
              <nav className="flex items-center gap-6">
                <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                  Home
                </Link>
                <Link href="/tools/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                  Tools
                </Link>
                <Link href="/blog/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                  Blog
                </Link>
                <Link href="/about/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                  About
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <Link href="/about/" className="text-sm text-gray-600 hover:text-blue-600 transition">
                About
              </Link>
              <Link href="/privacy/" className="text-sm text-gray-600 hover:text-blue-600 transition">
                Privacy
              </Link>
              <Link href="/contact/" className="text-sm text-gray-600 hover:text-blue-600 transition">
                Contact
              </Link>
              <Link href="/terms/" className="text-sm text-gray-600 hover:text-blue-600 transition">
                Terms
              </Link>
              <Link href="/affiliate-disclosure/" className="text-sm text-gray-600 hover:text-blue-600 transition">
                Affiliate Disclosure
              </Link>
            </div>
            <p className="text-xs text-gray-500 text-center max-w-3xl mx-auto mb-4">
              AI Productivity Hub provides informational content and reviews only. We may earn affiliate commissions from links on this site. All product names, logos, and trademarks are property of their respective owners.
            </p>
            <p className="text-xs text-gray-400 text-center">
              &copy; {new Date().getFullYear()} AI Productivity Hub. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
