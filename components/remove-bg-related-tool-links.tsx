import Link from "next/link";

export function RemoveBgRelatedToolLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="remove-bg-related-heading"
    >
      <h2
        id="remove-bg-related-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Related tools
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li>
          <Link
            href="/tools/image-compressor"
            className="font-medium text-foreground underline"
          >
            Image Compressor
          </Link>{" "}
          — shrink PNG exports before you attach them to email or CMS.
        </li>
        <li>
          <Link href="/tools/resize-image" className="font-medium text-foreground underline">
            Resize Image
          </Link>{" "}
          — match pixel dimensions to marketplace or social requirements.
        </li>
        <li>
          <Link href="/tools/image-to-webp" className="font-medium text-foreground underline">
            Image to WebP
          </Link>{" "}
          — convert cutouts to WebP after you flatten transparency if needed.
        </li>
      </ul>
    </section>
  );
}
