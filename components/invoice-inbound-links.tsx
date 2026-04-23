import Link from "next/link";

export function InvoiceInboundLinks() {
  return (
    <section
      className="mt-10 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="invoice-inbound-heading"
    >
      <h2
        id="invoice-inbound-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Invoices & billing
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Build a branded PDF invoice in your browser—totals and tax stay on your device until you
        download or print.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>
          <Link
            href="/tools/invoice-generator"
            className="font-medium text-foreground underline"
          >
            Create invoice online
          </Link>
        </li>
        <li>
          <Link
            href="/tools/invoice-generator"
            className="font-medium text-foreground underline"
          >
            Free invoice generator
          </Link>
        </li>
      </ul>
    </section>
  );
}
