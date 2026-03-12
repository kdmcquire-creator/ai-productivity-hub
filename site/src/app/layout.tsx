import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";
import Script from 'next/script';

export const metadata: Metadata = {
  alternates: {
    canonical: getSiteUrl(),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-5995172189982724" />
        <Script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5995172189982724" 
          crossOrigin="anonymous\"
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}