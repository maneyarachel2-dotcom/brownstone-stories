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
        {/* Simple top nav */}
        <header className="sticky top-0 z-50 border-b border-black/10 bg-[#fbf7f1]/85 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 py-3">
            <Link href="/" className="font-serif text-lg font-semibold text-[#1f1b16]">
              Brownstone
            </Link>

            <nav className="flex items-center gap-4 text-sm text-black/70">
              <Link href="/" className="hover:underline">
                Library
              </Link>
              <Link href="/community" className="hover:underline">
                Community
              </Link>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}