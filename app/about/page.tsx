import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { siteUrl } from "@/lib/site";

const title = "About SmartFlexa | Free Online Tools Platform";
const description = "Learn about SmartFlexa, a free online platform offering tools for PDF, images, developers, and everyday utilities.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/about`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About SmartFlexa",
  description,
  url: `${siteUrl}/about`,
  mainEntity: {
    "@type": "Organization",
    name: "SmartFlexa",
    url: siteUrl,
    description: "Free online platform offering tools for PDF, images, developers, and everyday utilities",
  },
};

const exploreTools = [
  { name: "JSON Formatter", href: "/tools/json-formatter" },
  { name: "Image Compressor", href: "/tools/image-compressor" },
  { name: "Merge PDF", href: "/tools/merge-pdf" },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={aboutJsonLd} />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                About SmartFlexa
              </h1>
            </div>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Introduction</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                SmartFlexa is a free online platform offering a wide range of useful tools 
                designed to simplify everyday tasks. From PDF and image tools to developer 
                utilities and calculators, SmartFlexa aims to provide fast, secure, and 
                easy-to-use solutions for everyone.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Our Mission</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Our mission is to build a simple, reliable, and accessible platform where 
                users can solve common problems without installing software or creating accounts.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">What We Offer</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-foreground">PDF Tools</h3>
                  <p className="text-muted-foreground">
                    Merge, split, compress, and convert PDF documents with ease.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-foreground">Image Tools</h3>
                  <p className="text-muted-foreground">
                    Resize, compress, and convert images in various formats.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-foreground">Developer Tools</h3>
                  <p className="text-muted-foreground">
                    JSON formatter, Base64 encoder/decoder, URL encoder, and more.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-foreground">Utility Tools</h3>
                  <p className="text-muted-foreground">
                    Calculators, generators, converters, and everyday utilities.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Why Choose SmartFlexa</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">100% Free Tools</h3>
                    <p className="text-sm text-muted-foreground">
                      All tools are completely free with no hidden costs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">No Sign-up Required</h3>
                    <p className="text-sm text-muted-foreground">
                      Start using any tool immediately without creating an account.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Fast & User-friendly</h3>
                    <p className="text-sm text-muted-foreground">
                      Intuitive interface designed for speed and ease of use.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Privacy-focused</h3>
                    <p className="text-sm text-muted-foreground">
                      Most tools run in your browser for maximum privacy.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Privacy & Security</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We prioritize user privacy. Most tools process data locally in your browser, 
                and we do not store your files on our servers. Your data stays secure and 
                private throughout the entire process.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Future Vision</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We aim to continuously expand SmartFlexa by adding more useful tools and 
                improving user experience to make it a go-to platform for online utilities. 
                Our goal is to become the most comprehensive and user-friendly collection 
                of web-based tools available.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Explore Tools</h2>
              <p className="text-muted-foreground">
                Ready to try our tools? Here are some popular options to get you started:
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {exploreTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground/20 hover:bg-accent"
                  >
                    <h3 className="font-medium text-foreground group-hover:text-accent-foreground">
                      {tool.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Try this popular tool →
                    </p>
                  </Link>
                ))}
              </div>
              <div className="pt-4 text-center">
                <Link
                  href="/#tools"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  View All Tools
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}