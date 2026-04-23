import Link from "next/link";

export function FakeAddressInboundLinks() {
  return (
    <section
      className="mt-10 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="fake-address-inbound-heading"
    >
      <h2
        id="fake-address-inbound-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Test data for forms
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Generate plausible street lines, postal codes, and phone patterns in your browser—no
        upload to our servers.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>
          <Link
            href="/tools/fake-address-generator"
            className="font-medium text-foreground underline"
          >
            Generate random address
          </Link>
        </li>
        <li>
          <Link
            href="/tools/fake-address-generator"
            className="font-medium text-foreground underline"
          >
            Fake address generator online
          </Link>
        </li>
      </ul>
    </section>
  );
}
