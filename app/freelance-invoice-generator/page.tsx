import Link from "next/link";

import { InvoiceGeneratorTool } from "@/app/tools/invoice-generator/invoice-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function FreelanceInvoiceGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.freelanceInvoiceGenerator)} />
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
        aria-labelledby="freelance-inv-heading"
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
            <span className="text-foreground">Freelance invoice generator</span>
          </nav>

          <h1
            id="freelance-inv-heading"
            className="print:hidden mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Freelance invoice generator
          </h1>

          <div className="print:hidden mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Freelancers rarely dispute the need for invoices; they dispute the time it steals from
              billable work. A focused{" "}
              <strong className="text-foreground">freelance invoice generator</strong> should let you
              describe each deliverable once, clone rows when a retainer repeats, and prove due dates
              without opening a five-tab accounting suite. SmartFlexa optimizes for that rhythm: fast
              entry, obvious totals, PDF output you can attach before the client forgets the verbal
              yes.
            </p>
            <p>
              Use the line table for whatever you sell—hourly buckets, creative milestones, hosting
              renewals, or reimbursable software. Quantity can represent hours; unit price becomes
              your blended rate. When a project mixes taxable and non-taxable items, split them across
              rows so your own bookkeeper can map GL codes later; our optional tax field applies to
              the subtotal as a whole, which matches many US-style simplified invoices but may need
              manual adjustment for layered VAT scenarios.
            </p>
            <p>
              Documentation, FAQs, and calculator cross-links live on the main{" "}
              <Link href="/tools/invoice-generator" className="font-medium text-foreground underline">
                invoice generator
              </Link>{" "}
              page. Alternate discovery URLs include{" "}
              <Link href="/online-invoice-maker" className="font-medium text-foreground underline">
                online invoice maker
              </Link>{" "}
              and{" "}
              <Link
                href="/invoice-generator-free"
                className="font-medium text-foreground underline"
              >
                invoice generator free
              </Link>
              .
            </p>
          </div>

          <div className="mt-10">
            <InvoiceGeneratorTool />
          </div>

          <div className="print:hidden mt-14">
            <RelatedTools currentPath="/freelance-invoice-generator" heading="More tools" />
          </div>
        </div>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
