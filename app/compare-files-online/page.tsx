import Link from "next/link";

import { TextDiffCheckerTool } from "@/app/tools/text-diff-checker/text-diff-checker-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function CompareFilesOnlinePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.compareFilesOnline)} />
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
            <span className="text-foreground">Compare files online</span>
          </nav>
          <h1
            id="hub-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Compare files online (.txt)
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Teams often ask to <strong className="text-foreground">compare files online</strong>{" "}
              without spinning up a desktop app or granting a SaaS access to a private repo.
              SmartFlexa reads each selected <code className="rounded bg-muted px-1">.txt</code> file
              with the browser’s FileReader API, injects the contents into the original and
              modified fields, and immediately renders the same highlighted table you would get
              from pasted text. Nothing is transmitted to our infrastructure for that read step.
            </p>
            <p>
              Rich formats—Word, PDF, or spreadsheets—should be exported to plain text (or CSV
              saved as .txt) before diffing here so line breaks stay meaningful. After you review
              highlights, use Copy result to attach a unified diff to a ticket, or jump to the{" "}
              <Link
                href="/diff-checker-online"
                className="font-medium text-foreground underline"
              >
                diff checker online
              </Link>{" "}
              landing page if that phrasing matches how your teammates search. The underlying
              widget is identical to{" "}
              <Link
                href="/tools/text-diff-checker"
                className="font-medium text-foreground underline"
              >
                SmartFlexa’s text diff checker
              </Link>
              .
            </p>
            <p>
              For JSON or log files, consider normalizing with the JSON Formatter first so the diff
              emphasizes semantic edits instead of indentation noise.
            </p>
          </article>
          <div className="mt-10">
            <TextDiffCheckerTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/compare-files-online" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
