import Link from "next/link";

import { TextDiffCheckerTool } from "@/app/tools/text-diff-checker/text-diff-checker-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function DiffCheckerOnlinePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.diffCheckerOnline)} />
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
            <span className="text-foreground">Diff checker online</span>
          </nav>
          <h1
            id="hub-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Diff checker online
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Searching for a <strong className="text-foreground">diff checker online</strong>{" "}
              usually means you need answers in the next five minutes: a support agent comparing
              config dumps, a student verifying an essay rewrite, or a developer sanity-checking
              a hotfix before merge. Browser-based tools win on latency—no installer, no account—
              as long as they remain honest about limits such as file size and memory.
            </p>
            <p>
              SmartFlexa pairs instant recalculation with controls power users expect: ignore case
              for noisy logs, ignore whitespace when formatting drifted, and a Copy result action
              that emits a simple unified diff you can drop into Slack. If your workflow centers on
              uploads instead of paste, read the{" "}
              <Link
                href="/compare-files-online"
                className="font-medium text-foreground underline"
              >
                compare files online
              </Link>{" "}
              guide for the same engine with file-first language. Everyone converges on{" "}
              <Link
                href="/tools/text-diff-checker"
                className="font-medium text-foreground underline"
              >
                /tools/text-diff-checker
              </Link>{" "}
              for documentation depth.
            </p>
            <p>
              Stay mindful of sensitive data: online does not have to mean “uploaded to a server,”
              and here it does not—but your clipboard and screen sharing still carry risk.
            </p>
          </article>
          <div className="mt-10">
            <TextDiffCheckerTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/diff-checker-online" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
