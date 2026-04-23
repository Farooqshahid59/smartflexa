import Link from "next/link";

export function TextToImageInboundLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="tti-inbound-heading"
    >
      <h2
        id="tti-inbound-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Turn words into graphics
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Render typography on a canvas in your browser—no signup, no server upload for the render
        step.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>
          <Link
            href="/tools/text-to-image"
            className="font-medium text-foreground underline"
          >
            Create image from text
          </Link>
        </li>
        <li>
          <Link
            href="/tools/text-to-image"
            className="font-medium text-foreground underline"
          >
            Text to image generator
          </Link>
        </li>
      </ul>
    </section>
  );
}
