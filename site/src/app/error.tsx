"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">500</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Something went wrong
      </h2>
      <p className="text-gray-500 text-center max-w-md mb-8">
        We encountered an unexpected error. Please try again or head back to the
        homepage.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Try Again
        </button>
        <a
          href="/"
          className="bg-white text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-300 hover:border-blue-400 hover:text-blue-600 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
