import Link from "next/link";

import { ImageToPdfTool } from "@/app/tools/image-to-pdf/image-to-pdf-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function ConvertImagesToPdfPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.convertImagesToPdf)} />
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
            <span className="text-foreground">Convert images to PDF</span>
          </nav>
          <h1
            id="hub-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Convert images to PDF
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Marketing drops often arrive as a chaotic mix of vendor logos, hero photos, and UI
              grabs. When the brief says “single attachment,” you need to{" "}
              <strong className="text-foreground">convert images to PDF</strong> without opening
              heavyweight desktop suites. SmartFlexa normalizes that chore: every accepted raster
              becomes a page, order is explicit, and orientation matches the deck you will present
              on a projector.
            </p>
            <p>
              Because processing stays offline in the tab, you can run the conversion on a
              locked-down conference laptop, then hand the PDF to AV staff minutes before a keynote.
              Pair
              this page with{" "}
              <Link
                href="/merge-images-to-pdf"
                className="font-medium text-foreground underline"
              >
                merge images to PDF
              </Link>{" "}
              if teammates search using merge vocabulary, or bookmark{" "}
              <Link
                href="/tools/image-to-pdf"
                className="font-medium text-foreground underline"
              >
                /tools/image-to-pdf
              </Link>{" "}
              for the canonical FAQ-rich route.
            </p>
            <p>
              Remember to crop sensitive metadata out of screenshots before sharing the merged PDF
              externally—pixels still show whatever was on screen.
            </p>
          </article>
          <div className="mt-10">
            <ImageToPdfTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/convert-images-to-pdf" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
