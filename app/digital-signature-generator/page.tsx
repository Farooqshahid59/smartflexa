import Link from "next/link";

import { SignatureGeneratorTool } from "@/app/tools/signature-generator/signature-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function DigitalSignatureGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.digitalSignatureGenerator)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main
        id="main-content"
        className="flex-1 bg-background"
        aria-labelledby="digital-sig-heading"
      >
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Digital signature generator</span>
          </nav>

          <h1
            id="digital-sig-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Digital signature generator
          </h1>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Search engines bundle many intents behind &quot;digital signature.&quot; Lawyers
              may mean a PKI-backed hash, while a teacher emailing permission slips only needs
              a tidy picture of handwriting. This SmartFlexa page targets the{" "}
              <strong className="text-foreground">image workflow</strong>: you still get a
              trustworthy export (PNG with optional transparency) but you are not minting
              certificates or storing private keys. Treat the output like any other graphic:
              insert it where your PDF editor allows images, and keep a copy in brand folders
              for reuse.
            </p>
            <p>
              Because both meanings collide in support tickets, we expose the same dual-mode
              editor here—draw when authenticity matters, type when legibility wins—then let
              you download immediately. Nothing uploads to our infrastructure; the canvas and
              font rasterization stay inside your tab. If your compliance officer later asks
              for DocuSign, Adobe Sign, or another audited provider, you will already have a
              reference image to match when you rebuild the flow there.
            </p>
            <p>
              Prefer a single landing page with FAQs and related utilities? Bookmark the{" "}
              <Link href="/tools/signature-generator" className="font-medium text-foreground underline">
                full signature generator
              </Link>
              . If you already know you only need ink simulation, jump to{" "}
              <Link href="/draw-signature-online" className="font-medium text-foreground underline">
                draw signature online
              </Link>{" "}
              or{" "}
              <Link href="/type-signature-online" className="font-medium text-foreground underline">
                type signature online
              </Link>{" "}
              for shorter intros tailored to each habit.
            </p>
          </div>

          <div className="mt-10">
            <SignatureGeneratorTool initialMode="draw" />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/digital-signature-generator" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
