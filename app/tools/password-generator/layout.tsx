import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Strong Password Generator Online Free";
const description =
  "Generate secure and strong passwords instantly. Free random password generator with strength checker.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/password-generator",
  },
  keywords: [
    "password generator",
    "random password",
    "strong password",
    "secure password",
    "SmartFlexa",
  ],
  openGraph: {
    title: `${title} | SmartFlexa`,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "/tools/password-generator",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | SmartFlexa`,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PasswordGeneratorLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
