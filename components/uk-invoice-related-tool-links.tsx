import Link from "next/link";

export function UkInvoiceRelatedToolLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="uk-invoice-related-heading"
    >
      <h2
        id="uk-invoice-related-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Related tools
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li>
          <Link
            href="/tools/invoice-generator"
            className="font-medium text-foreground underline"
          >
            Invoice Generator
          </Link>{" "}
          — general-purpose invoices in USD.
        </li>
        <li>
          <Link
            href="/tools/percentage-calculator"
            className="font-medium text-foreground underline"
          >
            Percentage Calculator
          </Link>{" "}
          — quick VAT and markup checks.
        </li>
        <li>
          <Link
            href="/tools/discount-calculator"
            className="font-medium text-foreground underline"
          >
            Discount Calculator
          </Link>{" "}
          — line-item savings and final prices.
        </li>
      </ul>
    </section>
  );
}
