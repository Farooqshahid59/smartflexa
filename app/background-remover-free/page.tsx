import Link from "next/link";

import { RemoveBackgroundTool } from "@/app/tools/remove-background/remove-background-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function BackgroundRemoverFreePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.backgroundRemoverFree)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="hub-bg-free-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Background remover free</span>
          </nav>
          <h1 id="hub-bg-free-h1" className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Free background remover for everyday photos
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              A <strong className="text-foreground">background remover free</strong> of subscriptions
              still has to be honest about limits: this build skips heavyweight neural nets and
              instead targets predictable scenes—think e-commerce packshots on gray paper, scanned
              receipts, or presentation icons with flat fills. You trade Hollywood-grade hair
              detail for instant feedback, zero queue, and a bill that never arrives.
            </p>
            <p>
              Toggle a solid replacement color when you need a placeholder for print layouts, or
              leave transparency on for layered decks. The side-by-side preview answers the
              question every stakeholder asks: did we clip into the product? Iterate tolerance in
              seconds, then hand off the PNG. Documentation, schema, and FAQ copy live on the{" "}
              <Link
                href="/tools/remove-background"
                className="font-medium text-foreground underline"
              >
                Background remover tool
              </Link>{" "}
              hub while this URL highlights the no-cost positioning for searchers comparing vendors.
            </p>
            <p>
              Pair the export with our resize utility when marketplaces enforce exact pixel bounds,
              or run the WebP converter if your CDN prefers modern codecs after you flatten alpha
              elsewhere in your pipeline.
            </p>
          </article>
          <div className="mt-10">
            <RemoveBackgroundTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/background-remover-free" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
