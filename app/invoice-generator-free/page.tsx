import Link from "next/link";

import { InvoiceGeneratorTool } from "@/app/tools/invoice-generator/invoice-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function InvoiceGeneratorFreePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.invoiceGeneratorFree)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <div className="print:hidden">
        <Header />
      </div>
      <main
        id="main-content"
        className="flex-1 bg-background"
        aria-labelledby="inv-free-heading"
      >
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="print:hidden text-sm font-medium text-muted-foreground"
          >
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Invoice generator free</span>
          </nav>

          <h1
            id="inv-free-heading"
            className="print:hidden mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Invoice generator free
          </h1>

          <div className="print:hidden mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              “Free” should mean more than a teaser watermark. This landing page targets teams that
              need a dependable <strong className="text-foreground">invoice generator free</strong>{" "}
              of subscriptions: you still get auto-numbering, dated totals, optional sales tax, and
              a PDF you can attach to email—without creating another SaaS login you will forget next
              quarter.
            </p>
            <p>
              The editor mirrors our flagship{" "}
              <Link href="/tools/invoice-generator" className="font-medium text-foreground underline">
                invoice generator
              </Link>{" "}
              so you are not learning a stripped-down toy. Numbers stay in your tab until you click
              download, which helps when line items reference confidential rates. Pair the output
              with your own payment links or bank instructions in the email body; the PDF focuses on
              the arithmetic clients expect to see before they approve a transfer.
            </p>
            <p>
              If you are comparing entry points, browse the{" "}
              <Link
                href="/simple-invoice-generator"
                className="font-medium text-foreground underline"
              >
                simple invoice generator
              </Link>
              ,{" "}
              <Link href="/online-invoice-maker" className="font-medium text-foreground underline">
                online invoice maker
              </Link>
              , or{" "}
              <Link
                href="/freelance-invoice-generator"
                className="font-medium text-foreground underline"
              >
                freelance invoice generator
              </Link>{" "}
              pages—each explains a different workflow, but the same SmartFlexa tool loads beneath
              the copy.
            </p>
          </div>

          <div className="mt-10">
            <InvoiceGeneratorTool />
          </div>

          <div className="print:hidden mt-14">
            <RelatedTools currentPath="/invoice-generator-free" heading="More tools" />
          </div>
        </div>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
