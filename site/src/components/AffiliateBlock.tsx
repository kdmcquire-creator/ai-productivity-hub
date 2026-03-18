import Link from "next/link";

interface AffiliateBlockProps {
  placement?: "toolPage" | "directory";
}

export default function AffiliateBlock({ placement = "directory" }: AffiliateBlockProps) {
  return (
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 ${placement === "toolPage" ? "my-8" : "my-4"}`}>
      <p className="text-xs text-gray-400 mb-2">Sponsored</p>
      <h3 className="text-lg font-bold text-gray-900 mb-2">Streamline Your Business Finances</h3>
      <p className="text-gray-600 text-sm mb-4">
        FreshBooks makes invoicing, expense tracking, and time management effortless for freelancers and small businesses.
      </p>
      <a
        href="https://freshbooks.pxf.io/c/1234567/1064077/13524"
        target="_blank"
        rel="nofollow noopener"
        className="inline-block bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
      >
        Try FreshBooks Free
      </a>
      <p className="text-xs text-gray-400 mt-3">
        <Link href="/affiliate-disclosure/" className="underline hover:text-blue-600">Affiliate disclosure</Link>
      </p>
    </div>
  );
}
