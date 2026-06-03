import Link from "next/link";

import { UkInvoiceGeneratorTool } from "@/app/tools/uk-invoice-generator/uk-invoice-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { UkInvoiceRelatedToolLinks } from "@/components/uk-invoice-related-tool-links";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

const ukInvoiceFaqJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I create a UK invoice online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter your UK business details, VAT registration number if applicable, and client information. Add line items in GBP, choose a VAT rate (0%, 5%, 20%, or custom), optionally upload your logo and bank details, then download a PDF or print. Your business settings are saved locally for next time.",
      },
    },
    {
      "@type": "Question",
      name: "Is this UK invoice generator free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SmartFlexa's UK invoice generator is free with no account required. All calculations, VAT, and PDF creation run in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Does it support UK VAT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Toggle VAT on or off and select standard UK rates of 0%, 5%, or 20%, or enter a custom rate. The invoice shows subtotal, VAT rate, VAT amount, grand total, and amount due.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add my company logo to the invoice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Upload a PNG, JPG, JPEG, or SVG logo from your device. It appears in the live preview, printed invoice, and downloaded PDF. You can replace or remove it at any time.",
      },
    },
    {
      "@type": "Question",
      name: "What UK business fields can I include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Optional fields include VAT registration number, company registration number, business website, and payment details such as bank name, sort code, account number, IBAN, and payment reference. Fields only appear on the invoice when you fill them in.",
      },
    },
  ],
};

export default function UkInvoiceGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.ukInvoiceGenerator)} />
      <JsonLd data={ukInvoiceFaqJsonLd} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <div className="print:hidden">
        <Header />
      </div>
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="uk-invoice-heading">
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
            <span className="text-foreground">UK Invoice Generator</span>
          </nav>

          <h1
            id="uk-invoice-heading"
            className="print:hidden mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            UK invoice generator — free VAT invoices in GBP
          </h1>
          <p className="print:hidden mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Create a professional UK invoice with VAT support, British Pound (£) formatting, company
            logo upload, and payment details. Download a PDF or print—everything runs in your browser
            on{" "}
            <Link href="/" className="font-medium text-foreground underline">
              SmartFlexa
            </Link>
            . Also try our{" "}
            <Link href="/vat-invoice-generator-uk" className="font-medium text-foreground underline">
              VAT invoice generator UK
            </Link>
            ,{" "}
            <Link
              href="/free-invoice-generator-uk"
              className="font-medium text-foreground underline"
            >
              free invoice generator UK
            </Link>
            ,{" "}
            <Link
              href="/create-invoice-online-uk"
              className="font-medium text-foreground underline"
            >
              create invoice online UK
            </Link>
            , and{" "}
            <Link
              href="/professional-invoice-generator-uk"
              className="font-medium text-foreground underline"
            >
              professional invoice generator UK
            </Link>{" "}
            pages.
          </p>

          <div className="mt-10">
            <UkInvoiceGeneratorTool />
          </div>

          <article className="print:hidden mt-16 max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              What makes a UK invoice different?
            </h2>
            <p>
              UK businesses typically invoice in British Pounds, show VAT separately when registered,
              and include identifiers such as a VAT registration number or company registration
              number for limited companies. Payment instructions often list a sort code and account
              number for BACS transfers, or an IBAN for international payments. SmartFlexa&apos;s UK
              invoice generator follows these conventions while keeping the same clean layout as our
              general invoice tool.
            </p>
            <p>
              Whether you are a sole trader, freelancer, contractor, or limited company, you can
              produce a credible document in minutes. Business details, VAT settings, logo, and
              payment information are saved in your browser so you do not need to re-enter them on
              every visit—only the client and line items change per invoice.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to create an invoice online in the UK
            </h2>
            <p>
              Start with your business name and optional UK identifiers. Upload a logo if you have
              one. Enter the client you are billing, set invoice and due dates, and add line items
              with quantities and unit prices in GBP. Enable VAT and pick 0%, 5%, 20%, or a custom
              rate—the preview updates subtotal, VAT amount, grand total, and amount due instantly.
              Add bank details in the payment section when you want them printed on the invoice.
            </p>
            <p>
              When the preview looks right, click <strong className="text-foreground">Download PDF</strong>{" "}
              for a portable file or <strong className="text-foreground">Print</strong> to send to
              your printer or save as PDF from the system dialog. Nothing is uploaded to our servers.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  How do I create a UK invoice online?
                </dt>
                <dd className="mt-2">
                  Fill in business and client details, add GBP line items, set VAT if needed, then
                  download PDF or print. Business settings are saved locally for next time.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is this UK invoice generator free?
                </dt>
                <dd className="mt-2">
                  Yes—use it as often as you like with no signup. PDF generation runs locally in
                  your browser.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Does it support UK VAT?</dt>
                <dd className="mt-2">
                  Yes. Toggle VAT on or off and choose 0%, 5%, 20%, or a custom rate. Totals show
                  subtotal, VAT rate, VAT amount, grand total, and amount due.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Can I add my company logo?</dt>
                <dd className="mt-2">
                  Yes. Upload PNG, JPG, JPEG, or SVG. The logo appears in preview, print, and PDF.
                </dd>
              </div>
            </dl>
          </article>

          <div className="print:hidden mt-14 space-y-10">
            <UkInvoiceRelatedToolLinks />
            <RelatedTools currentPath="/tools/uk-invoice-generator" heading="More tools" />
          </div>
        </div>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
