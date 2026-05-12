import Navbar from "@/components/Navbar";
import {
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/seoConstants";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import Providers from "./providers";
import "./globals.css";

const resolvedBase =
  process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(resolvedBase),
  title: {
    default: SITE_TITLE,
    template: "%s | Future of Marketing",
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: "Future of Marketing" }],
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: "Future of Marketing",
    images: [DEFAULT_OG_IMAGE],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@futureofmktg",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  verification: {
    google: "qbjqt9gSGncjZYZ08s5WILZzI7wOJnoV3W80xS1vvl0",
  },
  icons: {
    icon: "/favicon-white.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/ITC_Avant_Garde_Gothic_Pro-Book.otf"
          as="font"
          type="font/otf"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/ITC_Avant_Garde_Gothic_Pro-Medium.otf"
          as="font"
          type="font/otf"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/ITC_Avant_Garde_Gothic_Pro-Demi.otf"
          as="font"
          type="font/otf"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/images/assets/host-mada.jpg"
          as="image"
          type="image/jpeg"
        />
        <link
          rel="preload"
          href="/images/assets/host-ethan.jpg"
          as="image"
          type="image/jpeg"
        />
        <link
          rel="preload"
          href="/images/assets/host-camille.jpg"
          as="image"
          type="image/jpeg"
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <div className="fixed inset-0 -z-10 bg-[#f4f2ef]" />
          <Navbar />
          {children}
        </Providers>
        <GoogleTagManager gtmId="GTM-KJNFHT58" />
      </body>
    </html>
  );
}
