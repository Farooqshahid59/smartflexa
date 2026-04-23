import Link from "next/link";

export function TextToImageRelatedToolLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="tti-related-heading"
    >
      <h2
        id="tti-related-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Related tools
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li>
          <Link href="/tools/resize-image" className="font-medium text-foreground underline">
            Resize Image
          </Link>{" "}
          — match Instagram, Stories, or marketplace pixel sizes after exporting.
        </li>
        <li>
          <Link
            href="/tools/image-compressor"
            className="font-medium text-foreground underline"
          >
            Image Compressor
          </Link>{" "}
          — shrink large PNG or JPG quote cards before sharing on slow networks.
        </li>
        <li>
          <Link
            href="/tools/color-palette-generator"
            className="font-medium text-foreground underline"
          >
            Color Palette Generator
          </Link>{" "}
          — pick harmonious text and background colors for your next graphic.
        </li>
      </ul>
    </section>
  );
}
