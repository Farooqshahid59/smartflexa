import Link from "next/link";

import { InvoiceGeneratorTool } from "@/app/tools/invoice-generator/invoice-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function SimpleInvoiceGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.simpleInvoiceGenerator)} />
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
        aria-labelledby="simple-inv-heading"
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
            <span className="text-foreground">Simple invoice generator</span>
          </nav>

          <h1
            id="simple-inv-heading"
            className="print:hidden mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Simple invoice generator
          </h1>

          <div className="print:hidden mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Complexity is the enemy when you are standing in a coffee shop answering “Can you
              invoice today?” A <strong className="text-foreground">simple invoice generator</strong>{" "}
              should expose only the fields that matter: who is billing whom, which services shipped
              this cycle, and what total is due. Everything else—corporate letterhead, multi-currency
              ledgers, purchase-order portals—can wait for your accounting system once the client
              actually pays.
            </p>
            <p>
              SmartFlexa keeps the form on one screen: two identity blocks, invoice metadata, a
              flexible line table, and a live preview that updates as you tab through quantity and
              price cells. Optional tax stays tucked in a single percentage box so you are not forced
              into VAT workflows when you only need a US-style subtotal. When the layout looks
              right, export a PDF or print without leaving the browser tab that already holds your
              project notes.
            </p>
            <p>
              Prefer the canonical guide and FAQs? Open the{" "}
              <Link href="/tools/invoice-generator" className="font-medium text-foreground underline">
                full invoice generator
              </Link>
              . For positioning around “free” positioning or freelance retainers, see{" "}
              <Link
                href="/invoice-generator-free"
                className="font-medium text-foreground underline"
              >
                invoice generator free
              </Link>{" "}
              and{" "}
              <Link
                href="/freelance-invoice-generator"
                className="font-medium text-foreground underline"
              >
                freelance invoice generator
              </Link>
              .
            </p>
          </div>

          <div className="mt-10">
            <InvoiceGeneratorTool />
          </div>

          <div className="print:hidden mt-14">
            <RelatedTools currentPath="/simple-invoice-generator" heading="More tools" />
          </div>
        </div>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
