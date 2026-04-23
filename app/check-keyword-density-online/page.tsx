import Link from "next/link";

import { KeywordDensityCheckerTool } from "@/app/tools/keyword-density-checker/keyword-density-checker-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function CheckKeywordDensityOnlinePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.checkKeywordDensityOnline)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="online-kd-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Check keyword density online</span>
          </nav>
          <h1
            id="online-kd-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Check keyword density online
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              When stakeholders ask to <strong className="text-foreground">check keyword density online</strong>{" "}
              during a live review, latency and privacy matter more than exotic NLP features.
              SmartFlexa evaluates strings entirely inside the browser tab, so refresh cycles stay
              instant even on conference Wi-Fi and NDAs stay off shared queues.
            </p>
            <p>
              Uploading a <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">.txt</code>{" "}
              export from Notion, Google Docs, or your CMS is often faster than pasting rich text
              that carries hidden formatting characters. The analyzer still tokenizes conservatively
              to letters and digits so you see the same numbers your engineering partners expect when
              they talk about &quot;word count&quot; in release notes.
            </p>
            <p>
              Bookmark the flagship URL when you need the full write-up:{" "}
              <Link
                href="/tools/keyword-density-checker"
                className="font-medium text-foreground underline"
              >
                Check keyword density
              </Link>{" "}
              on SmartFlexa bundles FAQs, related SEO utilities, and this identical control surface.
            </p>
          </article>
          <div className="mt-10">
            <KeywordDensityCheckerTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/check-keyword-density-online" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
