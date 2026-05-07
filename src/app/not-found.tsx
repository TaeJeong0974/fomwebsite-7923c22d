import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | FOM Podcast" },
  description: "The page you're looking for doesn't exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center container-padding">
        <h1 className="text-display-xl font-bold text-foreground mb-4">404</h1>
        <p className="text-lg text-foreground mb-8">Oops! Page not found</p>
        <Link href="/" className="btn-base btn-glass btn-lg">
          Return Home
        </Link>
      </div>
    </div>
  );
}
