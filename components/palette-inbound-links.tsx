import Link from "next/link";

/**
 * Internal links to the color palette generator from other tool pages.
 */
export function PaletteInboundLinks() {
  return (
    <section
      className="mt-10 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="palette-inbound-heading"
    >
      <h2
        id="palette-inbound-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Color palettes
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Build swatches for UI themes, mood boards, or brand kits—everything runs locally in
        your browser.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>
          <Link
            href="/tools/color-palette-generator"
            className="font-medium text-foreground underline"
          >
            Generate color palette
          </Link>
        </li>
        <li>
          <Link
            href="/tools/color-palette-generator"
            className="font-medium text-foreground underline"
          >
            Extract colors from image
          </Link>
        </li>
      </ul>
    </section>
  );
}
