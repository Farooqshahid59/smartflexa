import Link from "next/link";

import { UkInvoiceGeneratorTool } from "@/app/tools/uk-invoice-generator/uk-invoice-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function VatInvoiceGeneratorUkPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.vatInvoiceGeneratorUk)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <div className="print:hidden">
        <Header />
      </div>
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="vat-inv-heading">
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
            <span className="text-foreground">VAT invoice generator UK</span>
          </nav>

          <h1
            id="vat-inv-heading"
            className="print:hidden mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            VAT invoice generator UK
          </h1>

          <div className="print:hidden mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              VAT-registered businesses need invoices that show subtotal, VAT rate, VAT amount, and
              total including VAT. This{" "}
              <strong className="text-foreground">VAT invoice generator UK</strong> supports
              standard rates of 0%, 5%, and 20%, plus custom rates when you need them. Toggle VAT
              off entirely for exempt supplies.
            </p>
            <p>
              Add your VAT registration number in the business section—it appears on the invoice
              when filled. Pair with our{" "}
              <Link
                href="/tools/uk-invoice-generator"
                className="font-medium text-foreground underline"
              >
                full UK invoice generator
              </Link>{" "}
              for logo upload, payment details, and PDF export.
            </p>
          </div>

          <div className="mt-10">
            <UkInvoiceGeneratorTool />
          </div>

          <div className="print:hidden mt-14">
            <RelatedTools currentPath="/vat-invoice-generator-uk" heading="More tools" />
          </div>
        </div>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
