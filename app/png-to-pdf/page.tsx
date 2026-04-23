import Link from "next/link";

import { ImageToPdfTool } from "@/app/tools/image-to-pdf/image-to-pdf-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function PngToPdfPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.pngToPdf)} />
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
            <span className="text-foreground">PNG to PDF</span>
          </nav>
          <h1
            id="hub-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            PNG to PDF
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Product and QA teams live in <strong className="text-foreground">PNG</strong>{" "}
              screenshots—transparent backgrounds, crisp UI chrome, and predictable colors. A
              dedicated <strong className="text-foreground">PNG to PDF</strong> workflow bundles
              those captures into a single attachment for release notes or compliance folders while
              preserving the lossless raster data on each page inside the PDF.
            </p>
            <p>
              SmartFlexa centers each image on the sheet with margins so printers do not clip
              rounded corners, and you can rotate the virtual paper to landscape when a wide modal
              dialog needs breathing room. JPEG-heavy shoots still work in the same tool; when your
              batch is almost entirely photos, read the{" "}
              <Link href="/jpg-to-pdf" className="font-medium text-foreground underline">
                JPG to PDF
              </Link>{" "}
              landing copy, then return here for transparency-first language. The full reference
              hub remains{" "}
              <Link
                href="/tools/image-to-pdf"
                className="font-medium text-foreground underline"
              >
                /tools/image-to-pdf
              </Link>
              .
            </p>
            <p>
              After export, compress or split the PDF with SmartFlexa’s PDF utilities if downstream
              systems enforce size caps.
            </p>
          </article>
          <div className="mt-10">
            <ImageToPdfTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/png-to-pdf" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
