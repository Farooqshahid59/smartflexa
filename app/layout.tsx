import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { siteUrl } from "@/lib/site";

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
  metadataBase: new URL(siteUrl),
  title: {
    default: "SmartFlexa — Smart tools that simplify your work",
    template: "%s | SmartFlexa",
  },
  description:
    "Free online tools for developers, creators, and everyday users. JSON formatter, image compressor, PDF tools, and more.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "SmartFlexa",
    title: "SmartFlexa — Smart tools that simplify your work",
    description:
      "Free online tools for developers, creators, and everyday users. JSON formatter, image compressor, PDF tools, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
