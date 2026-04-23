import Link from "next/link";

import { ImageToPdfTool } from "@/app/tools/image-to-pdf/image-to-pdf-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function MergeImagesToPdfPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.mergeImagesToPdf)} />
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
            <span className="text-foreground">Merge images to PDF</span>
          </nav>
          <h1
            id="hub-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Merge images to PDF
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Insurance adjusters, teachers, and field engineers all describe the same outcome:{" "}
              <strong className="text-foreground">merge images to PDF</strong> so evidence, whiteboard
              photos, and serial-number plates ship as one numbered document. SmartFlexa mirrors that
              mental model—each thumbnail is a future page, drag-and-drop encodes priority, and the
              download button finalizes the bundle without a server round trip.
            </p>
            <p>
              After raster pages exist, you can still combine them with native PDFs using{" "}
              <Link href="/tools/merge-pdf" className="font-medium text-foreground underline">
                Merge PDF
              </Link>{" "}
              if your workflow mixes scanned pages with vector forms. If you only need vocabulary
              around “convert” instead of “merge,” see{" "}
              <Link
                href="/convert-images-to-pdf"
                className="font-medium text-foreground underline"
              >
                convert images to PDF
              </Link>
              . Technical documentation for limits and formats lives on{" "}
              <Link
                href="/tools/image-to-pdf"
                className="font-medium text-foreground underline"
              >
                /tools/image-to-pdf
              </Link>
              .
            </p>
            <p>
              Large batches may stress mobile RAM—desktop Chrome typically provides the smoothest
              experience when previews exceed a dozen high-megapixel files.
            </p>
          </article>
          <div className="mt-10">
            <ImageToPdfTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/merge-images-to-pdf" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
