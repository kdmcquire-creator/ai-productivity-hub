import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-500 text-center max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Try browsing our tools directory or reading the latest from our blog.
      </p>
      <div className="flex gap-4">
        <Link
          href="/tools/"
          className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Browse Tools
        </Link>
        <Link
          href="/"
          className="bg-white text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-300 hover:border-blue-400 hover:text-blue-600 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
