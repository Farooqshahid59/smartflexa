import Link from "next/link";

/**
 * Outbound links from the color palette tool to related SmartFlexa utilities.
 */
export function PaletteRelatedToolLinks() {
  return (
    <section
      className="mt-10 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="palette-related-heading"
    >
      <h2
        id="palette-related-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Related tools
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Pair palettes with picking individual values, or prepare images before you sample
        colors from them.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>
          <Link
            href="/tools/color-picker"
            className="font-medium text-foreground underline"
          >
            Color Picker
          </Link>{" "}
          — HEX and RGB conversion with a native picker.
        </li>
        <li>
          <Link
            href="/tools/image-to-webp"
            className="font-medium text-foreground underline"
          >
            Image to WebP
          </Link>{" "}
          — convert uploads to WebP in the browser.
        </li>
        <li>
          <Link
            href="/tools/image-compressor"
            className="font-medium text-foreground underline"
          >
            Image Compressor
          </Link>{" "}
          — shrink file size before sharing or sampling.
        </li>
      </ul>
    </section>
  );
}
