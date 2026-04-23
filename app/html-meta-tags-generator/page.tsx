import Link from "next/link";

import { MetaTagGeneratorTool } from "@/app/tools/meta-tag-generator/meta-tag-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function HtmlMetaTagsGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.htmlMetaTagsGenerator)} />
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
        aria-labelledby="html-meta-heading"
      >
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">HTML meta tags generator</span>
          </nav>

          <h1
            id="html-meta-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            HTML meta tags generator
          </h1>

          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Static site generators, legacy PHP themes, and hand-rolled marketing landers all share
              one chore: someone must type the <strong className="text-foreground">HTML meta tags</strong>{" "}
              that wrap the <code className="rounded bg-muted px-1">&lt;head&gt;</code> section. This{" "}
              <strong className="text-foreground">HTML meta tags generator</strong> page speaks to
              that audience explicitly—producing escaped attribute values you can paste into a
              partial template without waiting on a React metadata migration. The preview column
              still mirrors how Google might render the title and description so writers do not ship
              blind.
            </p>
            <p>
              Because output is plain text, diff it in Git, email it to an agency, or drop it beside
              charset and link tags you already maintain. When you graduate to a component model,
              the same strings usually map one-to-one into props or CMS fields—so the time spent
              here is rarely wasted.
            </p>
            <p>
              Explore social-specific angles via{" "}
              <Link href="/open-graph-generator" className="font-medium text-foreground underline">
                Open Graph generator
              </Link>{" "}
              and{" "}
              <Link href="/twitter-card-generator" className="font-medium text-foreground underline">
                Twitter card generator
              </Link>
              , or read the long-form FAQ on the main{" "}
              <Link href="/tools/meta-tag-generator" className="font-medium text-foreground underline">
                SmartFlexa meta tag generator
              </Link>
              .
            </p>
          </div>

          <div className="mt-10">
            <MetaTagGeneratorTool />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/html-meta-tags-generator" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
