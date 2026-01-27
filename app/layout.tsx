import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brownstone Stories",
  description: "Read stories. Share your thoughts. Join the writing community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* TOP-RIGHT ONLY: Writing Community */}
        <div className="pointer-events-none fixed top-4 right-6 z-50">
          <Link
            href="/community"
            className="pointer-events-auto rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black/70 shadow-sm hover:bg-black/5"
          >
            Writing Community
          </Link>
        </div>

        {children}
      </body>
    </html>
  );
}