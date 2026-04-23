import Link from "next/link";

import { SignatureGeneratorTool } from "@/app/tools/signature-generator/signature-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function DrawSignatureOnlinePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.drawSignatureOnline)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="draw-sig-heading">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Draw signature online</span>
          </nav>

          <h1
            id="draw-sig-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Draw signature online
          </h1>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Sometimes a keyboard cannot capture the looseness of ink on paper. When you
              need to <strong className="text-foreground">draw a signature online</strong>,
              you want a canvas that follows your finger without jitter, respects pen pressure
              on supported devices, and still works on a cheap Android phone in a pinch. Our
              draw mode keeps the pipeline local: strokes stay in memory until you export, so
              you can rehearse a messy loop-de-loop as many times as you like before saving a
              PNG for a PDF or slide deck.
            </p>
            <p>
              Thickness and color sit beside the canvas so you can mimic a fine fountain pen
              or a bold marker without opening Photoshop. If you are preparing a transparent
              overlay, leave the default transparent background on; if your downstream app
              misreads alpha channels, flip in a white mat and download again. When you are done
              sketching, the full{" "}
              <Link href="/tools/signature-generator" className="font-medium text-foreground underline">
                signature generator
              </Link>{" "}
              also offers typed styles if you later need a matching wordmark.
            </p>
            <p>
              This route opens directly in draw mode, but you can still toggle to typing if you
              change your mind mid-project. For typed-only workflows, see{" "}
              <Link href="/type-signature-online" className="font-medium text-foreground underline">
                type signature online
              </Link>{" "}
              or read how image signatures differ from certificates on the{" "}
              <Link
                href="/digital-signature-generator"
                className="font-medium text-foreground underline"
              >
                digital signature generator
              </Link>{" "}
              page.
            </p>
          </div>

          <div className="mt-10">
            <SignatureGeneratorTool initialMode="draw" />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/draw-signature-online" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
