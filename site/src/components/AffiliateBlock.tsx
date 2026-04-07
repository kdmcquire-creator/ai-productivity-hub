import Link from "next/link";

interface AffiliateBlockProps {
  placement?: "toolPage" | "directory";
}

export default function AffiliateBlock({ placement = "directory" }: AffiliateBlockProps) {
  return (
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 ${placement === "toolPage" ? "my-8" : "my-4"}`}>
      <p className="text-xs text-gray-400 mb-2">Sponsored</p>
      <h3 className="text-lg font-bold text-gray-900 mb-2">Protect Your Work From Anywhere</h3>
      <p className="text-gray-600 text-sm mb-4">
        NordVPN keeps your data safe on any network — whether you&apos;re at a café, airport, or coworking space. Split tunneling lets you secure what matters while keeping everything else fast.
      </p>
      <a
        href="/go/nordvpn"
        target="_blank"
        rel="nofollow noopener sponsored"
        className="inline-block bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
      >
        Try NordVPN
      </a>
      <p className="text-xs text-gray-400 mt-3">
        <Link href="/affiliate-disclosure/" className="underline hover:text-blue-600">Affiliate disclosure</Link>
      </p>
    </div>
  );
}
