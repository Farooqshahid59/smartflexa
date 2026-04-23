import Link from "next/link";

export function FakeAddressRelatedToolLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="fake-address-related-heading"
    >
      <h2
        id="fake-address-related-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Related tools
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li>
          <Link
            href="/tools/random-number-generator"
            className="font-medium text-foreground underline"
          >
            Random Number Generator
          </Link>{" "}
          — ranges and batches for test data.
        </li>
        <li>
          <Link href="/tools/uuid-generator" className="font-medium text-foreground underline">
            UUID Generator
          </Link>{" "}
          — unique IDs for rows and API mocks.
        </li>
        <li>
          <Link
            href="/tools/password-generator"
            className="font-medium text-foreground underline"
          >
            Password Generator
          </Link>{" "}
          — strong credentials for sandbox accounts.
        </li>
      </ul>
    </section>
  );
}
