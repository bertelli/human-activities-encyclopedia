import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { HomeSearch } from "./_components/HomeSearch";

export const metadata: Metadata = {
  title: "The Complete Atlas of Doing",
  description:
    "An atlas of human pursuits — tools, glossary, and techniques for every hobby and craft.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const year = 2026;
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
        <footer className="border-t border-black px-6 py-6 mt-12">
          <div className="mb-6">
            <HomeSearch />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-black">
            <span>
              © {year}{" "}
              <Link href="/" className="text-black no-underline hover:underline">
                The Complete Atlas of Doing
              </Link>
              . All rights reserved.
            </span>
            <span className="text-[#757575]">
              <Link href="/log" className="text-[#757575] no-underline hover:underline">
                Fill log
              </Link>
              {" · "}
              An atlas of human pursuits.
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
