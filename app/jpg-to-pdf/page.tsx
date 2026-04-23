import Link from "next/link";

import { ImageToPdfTool } from "@/app/tools/image-to-pdf/image-to-pdf-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function JpgToPdfPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.jpgToPdf)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="hub-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">JPG to PDF</span>
          </nav>
          <h1
            id="hub-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            JPG to PDF converter
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              JPEG remains the default for phone cameras and many CMS exports, so teams constantly
              need a reliable <strong className="text-foreground">JPG to PDF</strong> path for
              receipts, field photos, and slide decks. SmartFlexa keeps every conversion step in
              the browser: pick files, drag thumbnails until the narrative order matches your
              report, choose paper size, then download a single PDF your finance or legal team can
              annotate without chasing ten separate attachments.
            </p>
            <p>
              The same widget also accepts PNG and WebP when mixed albums arrive—use the main{" "}
              <Link
                href="/tools/image-to-pdf"
                className="font-medium text-foreground underline"
              >
                image to PDF converter
              </Link>{" "}
              documentation for FAQs, or jump to{" "}
              <Link href="/png-to-pdf" className="font-medium text-foreground underline">
                PNG to PDF
              </Link>{" "}
              when screenshots dominate your upload batch.
            </p>
            <p>
              Prefer lossless pages for diagrams? Export those slides as PNG first, then merge here
              so text edges stay crisp after printing.
            </p>
          </article>
          <div className="mt-10">
            <ImageToPdfTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/jpg-to-pdf" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
