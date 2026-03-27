import Link from "next/link";
import NewsletterSignup from "@/components/NewsletterSignup";

const footerLinks = [
  { href: "/about/", label: "About" },
  { href: "/compare/", label: "Compare" },
  { href: "/privacy/", label: "Privacy" },
  { href: "/contact/", label: "Contact" },
  { href: "/terms/", label: "Terms" },
  { href: "/disclaimer/", label: "Disclaimer" },
  { href: "/affiliate-disclosure/", label: "Affiliate Disclosure" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Newsletter */}
        <div className="max-w-md mx-auto mb-10">
          <p className="text-sm font-medium text-gray-700 text-center mb-3">
            Get weekly AI tool picks in your inbox
          </p>
          <NewsletterSignup source="footer" variant="inline" />
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-600 hover:text-blue-600 transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="text-xs text-gray-500 text-center max-w-3xl mx-auto mb-4">
          AI Productivity Hub provides informational content and reviews only. We
          may earn affiliate commissions from links on this site. All product
          names, logos, and trademarks are property of their respective owners.
        </p>
        <p className="text-xs text-gray-400 text-center mb-3">
          <a
            href="/go/amazon/"
            target="_blank"
            rel="nofollow noopener sponsored"
            className="hover:text-blue-600 transition"
          >
            🛒 Amazon Associate
          </a>
          {" "}· As an Amazon Associate I earn from qualifying purchases.
        </p>
        <p className="text-xs text-gray-400 text-center">
          &copy; {new Date().getFullYear()} AI Productivity Hub. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
