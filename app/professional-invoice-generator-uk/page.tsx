import Link from "next/link";

import { UkInvoiceGeneratorTool } from "@/app/tools/uk-invoice-generator/uk-invoice-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function ProfessionalInvoiceGeneratorUkPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.professionalInvoiceGeneratorUk)} />
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
        aria-labelledby="pro-inv-uk-heading"
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
            <span className="text-foreground">Professional invoice generator UK</span>
          </nav>

          <h1
            id="pro-inv-uk-heading"
            className="print:hidden mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Professional invoice generator UK
          </h1>

          <div className="print:hidden mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Clients judge professionalism from layout as much as wording. This{" "}
              <strong className="text-foreground">professional invoice generator UK</strong> produces
              clean typography, aligned columns, your company logo, VAT breakdown, and payment
              instructions—without a designer or accounting suite.
            </p>
            <p>
              Ideal for freelancers, contractors, sole traders, and limited companies who need a
              credible PDF attachment for BACS or international transfers. Open the{" "}
              <Link
                href="/tools/uk-invoice-generator"
                className="font-medium text-foreground underline"
              >
                main UK invoice generator
              </Link>{" "}
              for full documentation and FAQs.
            </p>
          </div>

          <div className="mt-10">
            <UkInvoiceGeneratorTool />
          </div>

          <div className="print:hidden mt-14">
            <RelatedTools
              currentPath="/professional-invoice-generator-uk"
              heading="More tools"
            />
          </div>
        </div>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
