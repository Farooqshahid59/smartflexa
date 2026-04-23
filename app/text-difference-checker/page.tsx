import Link from "next/link";

import { TextDiffCheckerTool } from "@/app/tools/text-diff-checker/text-diff-checker-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function TextDifferenceCheckerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.textDifferenceChecker)} />
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
            <span className="text-foreground">Text difference checker</span>
          </nav>
          <h1
            id="hub-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Text difference checker
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Editors searching for a dedicated <strong className="text-foreground">text difference checker</strong>{" "}
              usually want more than a boolean “are these equal?”—they need a narrative of what
              moved. Line-level alignment shows whether a paragraph was deleted outright or split
              into two smaller ones, whether bullet order changed, or whether a single word swap
              happened inside an otherwise stable sentence.
            </p>
            <p>
              This SmartFlexa surface pairs a familiar red/green/amber palette with optional
              normalization toggles so cosmetic differences do not hide substantive ones. Export
              plain diff text for audit trails, then cross-link to{" "}
              <Link href="/compare-two-texts" className="font-medium text-foreground underline">
                compare two texts
              </Link>{" "}
              if you prefer that keyword framing, or return to the flagship{" "}
              <Link
                href="/tools/text-diff-checker"
                className="font-medium text-foreground underline"
              >
                /tools/text-diff-checker
              </Link>{" "}
              route for the full guide and FAQ block.
            </p>
            <p>
              Because processing stays client-side, you can diff excerpts from regulated documents
              on a laptop that never joins the corporate VPN—still follow your own data policies
              when pasting sensitive material.
            </p>
          </article>
          <div className="mt-10">
            <TextDiffCheckerTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/text-difference-checker" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
