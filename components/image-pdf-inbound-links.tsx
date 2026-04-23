import Link from "next/link";

export function ImagePdfInboundLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="image-pdf-inbound-heading"
    >
      <h2
        id="image-pdf-inbound-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Images to PDF
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Turn screenshots and scans into one shareable document—runs locally in your browser.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>
          <Link
            href="/tools/image-to-pdf"
            className="font-medium text-foreground underline"
          >
            Convert images to PDF
          </Link>
        </li>
        <li>
          <Link
            href="/tools/image-to-pdf"
            className="font-medium text-foreground underline"
          >
            JPG to PDF converter
          </Link>
        </li>
      </ul>
    </section>
  );
}
