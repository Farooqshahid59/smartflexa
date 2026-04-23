import Link from "next/link";

export function ImagePdfRelatedToolLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="image-pdf-related-heading"
    >
      <h2
        id="image-pdf-related-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Related tools
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li>
          <Link href="/tools/merge-pdf" className="font-medium text-foreground underline">
            Merge PDF
          </Link>{" "}
          — combine existing PDFs after you rasterize or export pages.
        </li>
        <li>
          <Link href="/tools/split-pdf" className="font-medium text-foreground underline">
            Split PDF
          </Link>{" "}
          — extract page ranges when you need individual files again.
        </li>
        <li>
          <Link href="/tools/compress-pdf" className="font-medium text-foreground underline">
            Compress PDF
          </Link>{" "}
          — shrink the merged PDF before email or upload limits.
        </li>
      </ul>
    </section>
  );
}
