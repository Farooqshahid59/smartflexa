import Link from "next/link";

import { InvoiceGeneratorTool } from "@/app/tools/invoice-generator/invoice-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function OnlineInvoiceMakerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.onlineInvoiceMaker)} />
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
        aria-labelledby="online-maker-heading"
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
            <span className="text-foreground">Online invoice maker</span>
          </nav>

          <h1
            id="online-maker-heading"
            className="print:hidden mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Online invoice maker
          </h1>

          <div className="print:hidden mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              The phrase <strong className="text-foreground">online invoice maker</strong>{" "}
              usually implies a hosted workflow where sensitive client names bounce through a queue
              before you ever see a PDF. SmartFlexa takes a different approach: the maker runs
              entirely inside your browser tab, which means you can draft on a Chromebook, polish on
              a phone, and still never upload proprietary rate cards to a third-party API you have
              not reviewed with legal.
            </p>
            <p>
              Practically, you still get the niceties people expect from cloud tools—live totals,
              optional tax, duplicate line rows, and a print stylesheet that hides navigation
              chrome when you send the document to paper or “Save as PDF.” The preview column
              mirrors the export so finance reviewers see the same typography you approved before
              hitting download. That parity matters when approvers are remote and screenshots are
              flying in Slack threads.
            </p>
            <p>
              When you are ready for the long-form explanation, bookmark the{" "}
              <Link href="/tools/invoice-generator" className="font-medium text-foreground underline">
                SmartFlexa invoice generator hub
              </Link>
              . Related keyword pages include{" "}
              <Link
                href="/invoice-generator-free"
                className="font-medium text-foreground underline"
              >
                invoice generator free
              </Link>{" "}
              and{" "}
              <Link
                href="/simple-invoice-generator"
                className="font-medium text-foreground underline"
              >
                simple invoice generator
              </Link>
              .
            </p>
          </div>

          <div className="mt-10">
            <InvoiceGeneratorTool />
          </div>

          <div className="print:hidden mt-14">
            <RelatedTools currentPath="/online-invoice-maker" heading="More tools" />
          </div>
        </div>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
