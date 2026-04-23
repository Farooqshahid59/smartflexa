import Link from "next/link";

import { OpenGraphPreviewTool } from "@/app/tools/open-graph-preview/open-graph-preview-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function FacebookLinkPreviewPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.facebookLinkPreview)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="hub-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Facebook link preview</span>
          </nav>
          <h1
            id="hub-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Facebook link preview
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              When you paste a URL into Facebook or Messenger, the network scrapes{" "}
              <strong className="text-foreground">Open Graph</strong> metadata to build a{" "}
              <strong className="text-foreground">Facebook link preview</strong>: a thumbnail,
              headline, short description, and hostname. If any piece is missing or points to a
              broken image, the card collapses into a plain text link—fine for chat with friends,
              but costly for launches where every click counts.
            </p>
            <p>
              This SmartFlexa view mirrors the familiar light-gray frame and white inner card so
              you can iterate copy before paying for reach. Paste absolute{" "}
              <code className="rounded bg-muted px-1">og:image</code> URLs, tighten titles for
              mobile cropping, and compare against the full{" "}
              <Link
                href="/tools/open-graph-preview"
                className="font-medium text-foreground underline"
              >
                Open Graph preview tool
              </Link>{" "}
              when you also need the X-style layout. Fetching a live page works only when that
              site allows browser CORS; otherwise pull tags from View Source or your CMS.
            </p>
            <p>
              After you ship, use Meta’s official debugger to refresh cache, and keep images
              optimized so cellular users still see your creative within a second.
            </p>
          </article>
          <div className="mt-10">
            <OpenGraphPreviewTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/facebook-link-preview" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
