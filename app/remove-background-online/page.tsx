import Link from "next/link";

import { RemoveBackgroundTool } from "@/app/tools/remove-background/remove-background-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function RemoveBackgroundOnlinePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.removeBackgroundOnline)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="hub-remove-bg-online-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Remove background online</span>
          </nav>
          <h1
            id="hub-remove-bg-online-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Remove background online
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              When you need to <strong className="text-foreground">remove background online</strong>{" "}
              without sending files through a third-party API, a canvas-based workflow is often
              enough: your browser loads the pixels, applies a deterministic mask, and exports a PNG
              with an alpha channel. That is exactly how this SmartFlexa page behaves—ideal for
              internal screenshots, catalog flats, or quick social crops where privacy and speed
              matter more than hair-level segmentation.
            </p>
            <p>
              Start with the border flood mode when the backdrop is a single tone touching the
              frame; switch to bright threshold for blown-out white walls; use pick color when you
              can click a representative swatch. Tweak tolerance, preview the cutout against the
              checkerboard, then download. For the full guide, FAQs, and long-form tips, open the{" "}
              <Link
                href="/tools/remove-background"
                className="font-medium text-foreground underline"
              >
                main background remover tool
              </Link>{" "}
              page, which shares this same widget under the canonical URL.
            </p>
            <p>
              Because nothing leaves your machine, batching several variants (different tolerance
              or replacement colors) is safe on coffee-shop Wi-Fi. If you later need WebP exports
              or smaller attachments, pair this step with our image compressor once you are happy
              with the matte edges.
            </p>
          </article>
          <div className="mt-10">
            <RemoveBackgroundTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/remove-background-online" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
