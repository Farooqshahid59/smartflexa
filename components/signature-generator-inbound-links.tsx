import Link from "next/link";

/**
 * Links to the Signature Generator from other tool pages (keyword-rich anchors).
 */
export function SignatureGeneratorInboundLinks() {
  return (
    <section
      className="mt-10 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="signature-inbound-heading"
    >
      <h2
        id="signature-inbound-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Need a signature image?
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Draw or type a signature and download a PNG in your browser—no upload to our servers.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>
          <Link
            href="/tools/signature-generator"
            className="font-medium text-foreground underline"
          >
            Create digital signature
          </Link>
        </li>
        <li>
          <Link
            href="/tools/signature-generator"
            className="font-medium text-foreground underline"
          >
            Generate signature online
          </Link>
        </li>
      </ul>
    </section>
  );
}
