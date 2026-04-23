import Link from "next/link";

import { InvoiceGeneratorTool } from "@/app/tools/invoice-generator/invoice-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { InvoiceRelatedToolLinks } from "@/components/invoice-related-tool-links";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

const invoiceFaqJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How to create invoice online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter your business name and client, set dates and invoice number (or use auto-generate), add line items with quantity and unit price, optionally set a tax percentage, then review the live preview. Download a PDF or use Print when you are ready to save or share.",
      },
    },
    {
      "@type": "Question",
      name: "Is this invoice generator free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SmartFlexa’s invoice generator is free to use with no account required. All calculations and PDF creation run in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Can I download invoice as PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Click Download PDF to save a professional PDF file using the same information shown in the preview. Nothing is uploaded to our servers to build the file.",
      },
    },
    {
      "@type": "Question",
      name: "What details should an invoice include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Strong invoices usually list seller and buyer identity, a unique invoice number, invoice date and payment due date, a clear description of goods or services, quantity and unit price per line, subtotal, any tax or discounts, and the total amount due. Your jurisdiction may require additional fields for tax compliance.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need an account to generate an invoice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No account is needed. Open the tool, fill in the form, and download or print. Keep a copy of the PDF for your records.",
      },
    },
  ],
};

export default function InvoiceGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.invoiceGenerator)} />
      <JsonLd data={invoiceFaqJsonLd} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <div className="print:hidden">
        <Header />
      </div>
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="invoice-heading">
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
            <span className="text-foreground">Invoice Generator</span>
          </nav>

          <h1
            id="invoice-heading"
            className="print:hidden mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Free invoice generator online
          </h1>
          <p className="print:hidden mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Create a clean, professional invoice with line items, optional tax, and a live preview.
            Download a PDF or print—everything runs in your browser on{" "}
            <Link href="/" className="font-medium text-foreground underline">
              SmartFlexa
            </Link>
            . For keyword-focused entry points, see{" "}
            <Link
              href="/invoice-generator-free"
              className="font-medium text-foreground underline"
            >
              free invoice generator
            </Link>
            ,{" "}
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
            , and{" "}
            <Link
              href="/freelance-invoice-generator"
              className="font-medium text-foreground underline"
            >
              freelance invoice generator
            </Link>
            .
          </p>

          <div className="mt-10">
            <InvoiceGeneratorTool />
          </div>

          <article
            className="print:hidden mt-16 max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground"
          >
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              What is an invoice?
            </h2>
            <p>
              An invoice is a dated document that tells a buyer how much they owe for products or
              services. Unlike a casual quote, it normally carries a unique reference number,
              payment terms, and a breakdown of charges so both parties can reconcile accounts,
              prove delivery of work, and support tax reporting where applicable. Small businesses,
              freelancers, and agencies issue invoices after milestones, retainers, or full project
              delivery—often before cash actually hits the bank, which makes clarity on due dates
              especially important.
            </p>
            <p>
              Invoices are not one-size-fits-all: a retail wholesaler might attach shipping lines
              and SKU codes, while a consultant might bill hours or fixed phases. What stays
              constant is the need for transparent arithmetic—quantity times unit price per row,
              then subtotal, then adjustments such as tax or early-payment discounts—so the client
              can approve payment without back-and-forth. SmartFlexa’s tool focuses on that core
              structure so you can produce a credible layout in minutes, then refine wording with
              your accountant if you operate across borders or complex VAT regimes.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to create an invoice online
            </h2>
            <p>
              Start with identity: your legal or trade name on the left and the client you are
              billing on the right. Pick an invoice number sequence your books can tolerate—our
              optional auto pattern prefixes <strong className="text-foreground">INV-</strong> with
              the calendar date and a short random suffix so you are less likely to collide with
              yesterday’s file names. Set the invoice date to when you are issuing the document and
              a due date that matches your contract—net 15, net 30, or a calendar deadline for
              retainers.
            </p>
            <p>
              Next, build the line-item table. Each row should describe what the buyer is paying for
              in plain language, followed by quantity and unit price. The preview recalculates
              subtotal in real time; if your region requires sales tax, enter a percentage once and
              we apply it to the subtotal so you can sanity-check the total before exporting. When
              the numbers look right, use <strong className="text-foreground">Download PDF</strong>{" "}
              for a portable file you can email, or <strong className="text-foreground">Print</strong>{" "}
              to send straight to a printer or “Save as PDF” from the system dialog.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Benefits of using an invoice generator
            </h2>
            <p>
              Speed is the first win: you avoid wrestling with desktop word templates every time a
              client asks for paperwork. Consistency is the second—identical typography, spacing,
              and column alignment signal professionalism and reduce disputes over arithmetic errors.
              Because SmartFlexa runs client-side, you also keep sensitive commercial details off a
              shared server until you choose to email the PDF yourself, which matters when line
              items reference unreleased products or confidential rates.
            </p>
            <p>
              Generators also pair naturally with other free calculators on this site. After you
              quote a percent-off promotion, cross-check the discounted unit price with our discount
              tool; when a client asks for installment context, open the EMI calculator to explain
              financing without editing the invoice twice. Together, these utilities shorten the
              path from negotiation to paid invoice while staying easy to audit.
            </p>
            <p>
              Finally, remember that an invoice generator handles presentation and arithmetic, not
              legal advice. Sales tax rules, reverse charges, currency conversion, and e-invoicing
              mandates vary by country and industry—always validate totals with your finance team
              before filing returns. When you only need a polished PDF attachment for a wire
              transfer or a reimbursable expense packet, this workflow keeps you moving without
              waiting on a designer or reinstalling legacy Office templates on a new laptop.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">How to create invoice online?</dt>
                <dd className="mt-2">
                  Fill seller and buyer fields, dates, and optional tax; add rows for each charge;
                  confirm totals in the preview; then download PDF or print. No signup is required.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this invoice generator free?</dt>
                <dd className="mt-2">
                  Yes—use it as often as you like. We do not charge for PDF generation on this page.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Can I download invoice as PDF?</dt>
                <dd className="mt-2">
                  Yes. The Download PDF button builds the file locally in your browser using jsPDF.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  What details should invoice include?
                </dt>
                <dd className="mt-2">
                  Include parties, invoice number, dates, itemized charges, subtotal, tax if
                  applicable, and total due. Add payment instructions or PO numbers if your client
                  expects them.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Do I need account to generate invoice?
                </dt>
                <dd className="mt-2">
                  No account is required. Your data stays in the page until you download or print.
                </dd>
              </div>
            </dl>
          </article>

          <div className="print:hidden mt-14 space-y-10">
            <InvoiceRelatedToolLinks />
            <RelatedTools currentPath="/tools/invoice-generator" heading="More tools" />
          </div>
        </div>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
