import type { Metadata } from "next";
import Script from "next/script";
import { headers } from "next/headers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import "./globals.css";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://aiproductivityhub.co"),
  title: {
    template: "%s | AI Productivity Hub",
    default:
      "AI Productivity Hub - Find the Best AI Tools for Your Productivity",
  },
  description:
    "Discover, compare, and choose the best AI productivity tools for writing, design, marketing, development, and more. In-depth reviews, comparisons, and guides to help you work smarter.",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AI Productivity Hub",
    images: [
      {
        url: "/api/og?title=AI+Productivity+Hub&type=home",
        width: 1200,
        height: 630,
        alt: "AI Productivity Hub - Find the Best AI Tools for Your Productivity",
      },
    ],
  },
  verification: {
    other: {
      "google-adsense-account": ["ca-pub-5995172189982724"],
    },
  },
};

const SITE_URL = "https://aiproductivityhub.co";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read the pathname stamped by middleware so we can build an accurate
  // canonical URL without a client-side hook.
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "/";
  // next.config.js has trailingSlash: true — ensure the canonical always ends
  // with "/" (the pathname from middleware already does for page routes).
  const canonicalUrl = `${SITE_URL}${pathname.endsWith("/") ? pathname : `${pathname}/`}`;

  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={canonicalUrl} />
        {/* Google Tag Manager */}
        {GTM_ID && (
          <Script id="gtm-head" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
        {/* AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5995172189982724"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        {/* GTM noscript fallback */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
