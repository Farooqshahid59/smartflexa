import Link from "next/link";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ImagePdfRelatedToolLinks } from "@/components/image-pdf-related-tool-links";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

import { ImageToPdfTool } from "./image-to-pdf-tool";

const imageToPdfFaqJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I convert JPG to PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload one or more JPG files (drag-and-drop or Choose images), arrange the order, pick A4 or Letter and portrait or landscape, then click Download PDF. SmartFlexa builds the file in your browser with jsPDF—no server upload required.",
      },
    },
    {
      "@type": "Question",
      name: "Can I merge images into a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Add multiple JPG, PNG, or WebP images; each becomes its own page in a single PDF in the order shown. Reorder thumbnails by dragging cards or using the arrow buttons, then download.",
      },
    },
    {
      "@type": "Question",
      name: "Is this tool free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The SmartFlexa image to PDF converter is free to use. Processing happens locally in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "What formats are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JPEG (.jpg, .jpeg), PNG, and WebP images are accepted. Export is always a standard PDF file.",
      },
    },
    {
      "@type": "Question",
      name: "Does it reduce image quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Images are embedded at high quality: PNG pages stay as PNG; JPEG and WebP are re-encoded as JPEG for the PDF at about 92% quality to balance size and clarity. For maximum fidelity, prefer PNG sources when possible.",
      },
    },
  ],
};

export default function ImageToPdfPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.imageToPdfConverter)} />
      <JsonLd data={imageToPdfFaqJsonLd} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main
        id="main-content"
        className="flex-1 bg-background"
        aria-labelledby="image-to-pdf-heading"
      >
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span>Tools</span>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Image to PDF</span>
          </nav>

          <h1
            id="image-to-pdf-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Image to PDF Converter Free (JPG, PNG to PDF Online)
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Combine JPG, PNG, and WebP files into one printable PDF. Reorder pages, choose{" "}
            <strong className="text-foreground">A4</strong> or{" "}
            <strong className="text-foreground">US Letter</strong>, pick portrait or landscape, preview
            thumbnails, then download—everything runs locally in your browser.
          </p>

          <div className="mt-10">
            <ImageToPdfTool />
          </div>

          <article className="mt-16 max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              What is image to PDF conversion?
            </h2>
            <p>
              <strong className="text-foreground">Image to PDF conversion</strong> wraps raster
              graphics—pixels from a camera, screenshot, or design export—inside a portable document
              that any PDF reader can open. Unlike loose folders of attachments, a single PDF keeps
              page order explicit, prints predictably on office printers, and attaches cleanly to
              email threads. Each image typically becomes one page, though desktop tools sometimes
              offer multi-image collages; SmartFlexa focuses on the common case: one photo per page,
              centered with margins so nothing touches the physical edge after trimming.
            </p>
            <p>
              The PDF container also stores metadata such as creation date and page dimensions in
              millimetres or inches. That matters when you choose A4 for international teams or
              Letter for US workflows—paper trays and digital signatures expect the declared size to
              match reality. Because this converter runs with jsPDF on your device, you can iterate
              on exports before uploading the final file to a cloud drive or e-signature provider.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to convert images to PDF
            </h2>
            <p>
              Start by collecting source files in supported formats. Drag them into the drop zone or
              use the file picker; previews appear immediately so you can catch wrong crops before
              building the document. Drag thumbnails to match the story you want—cover page first,
              appendix screenshots last—or tap the chevrons on mobile where drag-and-drop is
              awkward. Select page size and orientation to match your printer or template, then press{" "}
              <strong className="text-foreground">Download PDF</strong>. If the result is too large
              for email, follow up with SmartFlexa’s{" "}
              <Link href="/tools/compress-pdf" className="font-medium text-foreground underline">
                Compress PDF
              </Link>{" "}
              tool on the merged file.
            </p>
            <p>
              For archival scans, prefer PNG when text edges must stay crisp; JPEG is efficient for
              photos with gradients. WebP uploads are rasterized into the PDF pipeline with the same
              care as JPEGs. Always keep originals elsewhere—PDF is a delivery format, not always the
              best master for re-editing lossy photos.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Benefits of the PDF format
            </h2>
            <p>
              PDFs preserve layout across operating systems: fonts, spacing, and page breaks look
              the same on Windows, macOS, and mobile viewers when fonts are embedded or when pages
              are pure images as here. That stability reduces support tickets when you share invoices,
              boarding passes, or design sign-offs. PDF is also the lingua franca of print shops and
              many government portals—exporting screenshots as PDF often satisfies “single file
              upload” constraints better than a ZIP of PNGs.
            </p>
            <p>
              Security workflows appreciate that you can password-protect or redact PDFs in other
              tools after creation. For merging vector PDFs with these raster pages, use{" "}
              <Link href="/tools/merge-pdf" className="font-medium text-foreground underline">
                Merge PDF
              </Link>{" "}
              once both assets are ready, and{" "}
              <Link href="/tools/split-pdf" className="font-medium text-foreground underline">
                Split PDF
              </Link>{" "}
              if you later need to extract individual pages again. Together the SmartFlexa PDF suite
              covers the lifecycle from camera roll to compressed attachment.
            </p>
            <p>
              Finally, remember bandwidth: high-resolution phone photos produce large PDFs. Crop in
              your gallery app first when the document is destined for mobile-only reading, and
              re-run conversion with fewer pages if you only need a subset.
            </p>
          </article>

          <section className="mt-14 max-w-3xl" aria-labelledby="image-to-pdf-faq-heading">
            <h2
              id="image-to-pdf-faq-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Frequently asked questions
            </h2>
            <dl className="mt-6 space-y-8 text-base">
              <div>
                <dt className="font-semibold text-foreground">How do I convert JPG to PDF?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Upload your JPGs, confirm order and page settings, then download the generated PDF.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Can I merge images into a PDF?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Yes—multiple images become multiple pages in one file, in the order you arrange.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool free?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Yes, with no signup required for basic conversion on this page.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">What formats are supported?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  JPG, PNG, and WebP inputs; output is always PDF.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Does it reduce image quality?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  PNG stays lossless in the PDF; JPEG and WebP use a high-quality re-encode so file
                  size stays reasonable without obvious artifacts for typical photos.
                </dd>
              </div>
            </dl>
          </section>

          <div className="mt-14 space-y-10">
            <ImagePdfRelatedToolLinks />
            <RelatedTools currentPath="/tools/image-to-pdf" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
