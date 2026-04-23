import Link from "next/link";

import { TextToImageTool } from "@/app/tools/text-to-image/text-to-image-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function QuoteImageMakerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.quoteImageMaker)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="quote-maker-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Quote image maker</span>
          </nav>
          <h1
            id="quote-maker-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Quote image maker
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              A dedicated <strong className="text-foreground">quote image maker</strong> should feel
              like stationery design: you choose the words first, then typography and margins do the
              emotional work. SmartFlexa keeps the pipeline deterministic—canvas pixels instead of
              cloud layout servers—so authors, pastors, podcasters, and HR teams can iterate on a
              single sentence until the line breaks feel natural on a square card.
            </p>
            <p>
              Tap <strong className="text-foreground">Quote style</strong> in the widget for a
              serif-forward, high-contrast preset, then nudge padding so ascenders never kiss the
              frame. Center alignment is on by default for pull quotes, but you can disable it when
              you want a left-ragged editorial column look. Export PNG when you need lossless edges
              for slides, or JPG when email size limits dominate.
            </p>
            <p>
              For the canonical URL, metadata bundle, and a longer article on social workflows, see
              the{" "}
              <Link
                href="/tools/text-to-image"
                className="font-medium text-foreground underline"
              >
                Text to image generator
              </Link>{" "}
              page—it embeds this same control surface so you never learn two interfaces.
            </p>
          </article>
          <div className="mt-10">
            <TextToImageTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/quote-image-maker" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
