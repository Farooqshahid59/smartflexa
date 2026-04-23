import Link from "next/link";

/**
 * Outbound related tools from the Signature Generator page.
 */
export function SignatureRelatedToolLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="signature-related-tools-heading"
    >
      <h2
        id="signature-related-tools-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Related tools
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li>
          <Link
            href="/tools/password-generator"
            className="font-medium text-foreground underline"
          >
            Password Generator
          </Link>{" "}
          — strong passwords for accounts where you upload documents.
        </li>
        <li>
          <Link
            href="/tools/text-case-converter"
            className="font-medium text-foreground underline"
          >
            Text Case Converter
          </Link>{" "}
          — clean up names and titles before placing them in a signature.
        </li>
        <li>
          <Link
            href="/tools/lorem-ipsum-generator"
            className="font-medium text-foreground underline"
          >
            Lorem Ipsum Generator
          </Link>{" "}
          — placeholder text for layout drafts next to your signature block.
        </li>
      </ul>
    </section>
  );
}
