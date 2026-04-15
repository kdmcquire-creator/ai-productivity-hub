import Link from "next/link";
import Image from "next/image";
import SubscribeForm from "@/components/SubscribeForm";
import SubscribeModal from "@/components/SubscribeModal";

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
    <>
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Newsletter */}
        <div className="max-w-md mx-auto mb-10">
          <p className="text-sm font-medium text-gray-700 text-center mb-1">
            Get weekly AI tool picks in your inbox
          </p>
          <p className="text-xs text-gray-500 text-center mb-3">
            Get AI productivity tool reviews + workflow guides. Weekly-ish. No spam.
          </p>
          <SubscribeForm source="footer" variant="inline" />
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
        {/* Network links */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <p className="text-xs text-gray-400 text-center uppercase tracking-wider mb-3 font-medium">
            More AI Resources
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <a href="https://aifinancehub.ai" target="_blank" rel="noopener" className="text-sm text-gray-500 hover:text-blue-600 transition">AI Finance Hub</a>
            <a href="https://clarity-engine.ai" target="_blank" rel="noopener" className="text-sm text-gray-500 hover:text-blue-600 transition">Free SEO Tools</a>
            <a href="https://legaltech-ai-hub.com" target="_blank" rel="noopener" className="text-sm text-gray-500 hover:text-blue-600 transition">Legal AI Hub</a>
          </div>
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
        <p className="text-xs text-gray-400 text-center mb-4">
          &copy; {new Date().getFullYear()} AI Productivity Hub. All rights
          reserved.
        </p>
        {/* Published by Moonsmoke LLC */}
        <div className="border-t border-gray-200 pt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
          <Image
            src="/moonsmoke/logo.png"
            alt="Moonsmoke LLC"
            width={24}
            height={24}
            className="rounded"
          />
          <span>
            Published by Moonsmoke LLC &bull; Austin, Texas &bull;{" "}
            <Link
              href="/about/editorial-team/"
              className="hover:text-blue-600 transition underline"
            >
              Editorial Team
            </Link>
          </span>
        </div>
      </div>
    </footer>
    <SubscribeModal
      heading="Stay ahead of the AI curve"
      description="Get AI productivity tool reviews + workflow guides. Weekly-ish. No spam."
      source="modal_scroll"
    />
    </>
  );
}
