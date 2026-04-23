import Link from "next/link";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { DiffRelatedToolLinks } from "@/components/diff-related-tool-links";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

import { TextDiffCheckerTool } from "./text-diff-checker-tool";

const textDiffFaqJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I compare two texts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste the original version in the left field and the revised version in the right field. The table below updates live with red for removed lines, green for added lines, and yellow when a line was replaced. Use Ignore case or Ignore whitespace to tune matching, upload .txt files if you prefer, then Copy result for a plain unified diff.",
      },
    },
    {
      "@type": "Question",
      name: "What is a diff checker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A diff checker is a program that aligns two sequences—here, lines of text—and highlights what changed between them. Developers use diffs for code review; editors use them for document revisions. SmartFlexa runs the comparison entirely in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "How do I find differences in text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use side-by-side highlighting: unchanged lines appear with neutral shading, deletions on the original column, additions on the modified column, and paired substitutions in yellow on both sides. For long files, scroll horizontally on small screens or narrow the window to focus one column at a time.",
      },
    },
    {
      "@type": "Question",
      name: "Can I compare files online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Choose a .txt file (or plain text MIME type) for each side and the tool reads it locally with the FileReader API—nothing is uploaded to SmartFlexa servers. For Word or PDF content, export to text first, then compare here.",
      },
    },
    {
      "@type": "Question",
      name: "How do I compare code changes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste the before and after snippets from your editor or Git. Line-level diff is ideal for config, prose, and smaller functions. Pair with SmartFlexa’s JSON Formatter when you want to normalize JSON whitespace before diffing so structural edits stand out.",
      },
    },
  ],
};

export default function TextDiffCheckerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.textDiffChecker)} />
      <JsonLd data={textDiffFaqJsonLd} />
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
        aria-labelledby="text-diff-heading"
      >
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span>Tools</span>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Text Diff Checker</span>
          </nav>

          <h1
            id="text-diff-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Text Diff Checker Online (Compare Two Texts Instantly)
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Paste two versions, upload <strong className="text-foreground">.txt</strong> files, or
            mix both. See a <strong className="text-foreground">side-by-side</strong> table with
            color highlights, optional ignore-case and ignore-whitespace matching, plus one-click
            copy of a unified diff—all client-side on SmartFlexa.
          </p>

          <div className="mt-10">
            <TextDiffCheckerTool />
          </div>

          <article className="mt-16 max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              What is text comparison?
            </h2>
            <p>
              <strong className="text-foreground">Text comparison</strong> is the process of
              deciding how two documents line up: which sentences stayed the same, which moved,
              which disappeared, and which are brand new. Humans can eyeball small paragraphs, but
              once revisions span pages—or once legal and engineering teams both edit the same
              policy—software alignment becomes essential. Line-based comparison is the most
              readable default for prose, release notes, and configuration files because it maps
              directly to how authors think about drafts.
            </p>
            <p>
              Comparison is not the same as equality checking. Two files can contain identical
              words in a different order and still be “different” for compliance purposes. Diff tools
              therefore expose structure: they show you <em>where</em> divergence begins so you can
              decide whether it is intentional. SmartFlexa keeps the heavy lifting local so
              sensitive drafts never leave your device unless you choose to copy them elsewhere.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How a diff checker works
            </h2>
            <p>
              This checker splits each input into an array of lines, optionally normalizes them
              when you toggle <strong className="text-foreground">Ignore case</strong> or{" "}
              <strong className="text-foreground">Ignore whitespace</strong>, then aligns the
              sequences using a classic longest-common-subsequence strategy. Matched lines render
              with neutral shading. Lines only on the left are treated as removals (red). Lines
              only on the right are additions (green). When a deletion is immediately followed by
              an insertion, the pair is shown as a single <strong className="text-foreground">change</strong>{" "}
              row with amber highlighting on both sides so substitutions read as one conceptual
              edit instead of two unrelated events.
            </p>
            <p>
              Very large inputs hit a safety ceiling: beyond roughly a few thousand lines per
              side, building the full alignment table would cost too much memory for a tab in
              Chrome or Safari. If you reach that limit, split chapters or services into smaller
              files, compare them separately, and merge conclusions in your issue tracker.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Use cases in coding and writing
            </h2>
            <p>
              <strong className="text-foreground">Developers</strong> paste JSON, YAML, or .env
              snippets before and after a refactor to confirm only intended keys moved. Because the
              view is line-based, it complements Git’s own diff: you can still paste two versions
              from Slack or a ticket when you do not have repository access on the machine you are
              using. Pair this page with the{" "}
              <Link href="/tools/json-formatter" className="font-medium text-foreground underline">
                JSON Formatter
              </Link>{" "}
              when you want consistent indentation before comparing, so whitespace noise does not
              drown out semantic edits.
            </p>
            <p>
              <strong className="text-foreground">Writers and editors</strong> compare policy
              drafts, marketing copy, or translated strings. Ignore-whitespace mode helps when
              CMS exports add trailing spaces, while ignore-case helps compare headings that only
              changed capitalization. For HTML-heavy sources, run content through{" "}
              <Link href="/tools/html-to-text" className="font-medium text-foreground underline">
                HTML to Text
              </Link>{" "}
              first so the diff focuses on words readers actually see.
            </p>
            <p>
              Operations teams diff firewall exports or CSV headers after migrations; educators
              diff quiz keys. Whenever the question is “what changed between version A and B?” a
              focused diff beats scrolling two windows manually. Use <strong>Copy result</strong>{" "}
              to attach a plain unified diff to tickets, then archive the before/after text in
              version control when the change graduates from discussion to code.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Workflow tips
            </h2>
            <p>
              Start with strict matching (both toggles off) to see the honest editorial delta. If
              the table is noisy, enable ignore options one at a time so you understand what each
              filter hides. After a big merge, re-run the diff with toggles off again before you
              publish—automatic normalization is a lens, not a substitute for final proofreading.
            </p>
            <p>
              For lists where order does not matter, deduplicate first using{" "}
              <Link
                href="/tools/remove-duplicate-lines"
                className="font-medium text-foreground underline"
              >
                Remove Duplicate Lines
              </Link>{" "}
              so the diff highlights only unique semantic rows. Together these SmartFlexa tools
              shorten review cycles without shipping proprietary text to a third-party API.
            </p>
          </article>

          <section className="mt-14 max-w-3xl" aria-labelledby="text-diff-faq-heading">
            <h2
              id="text-diff-faq-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Frequently asked questions
            </h2>
            <dl className="mt-6 space-y-8 text-base">
              <div>
                <dt className="font-semibold text-foreground">How do I compare two texts?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Paste original and modified content into the two areas (or upload .txt files).
                  Scroll the comparison table for highlights; use Copy result to export a unified
                  diff string.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">What is a diff checker?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Software that aligns two texts and marks additions, removals, and substitutions so
                  reviewers can scan changes quickly.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">How do I find differences in text?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Read the side-by-side table: red for removed lines, green for new lines, amber
                  when both sides of a row represent a replacement.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Can I compare files online?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Yes—use the file pickers for plain text. Reading happens in your browser; files
                  are not uploaded to SmartFlexa.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">How do I compare code changes?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Paste snippets from your editor or diff two saved versions. For JSON, consider
                  formatting both sides first so structural edits stand out.
                </dd>
              </div>
            </dl>
          </section>

          <div className="mt-14 space-y-10">
            <DiffRelatedToolLinks />
            <RelatedTools currentPath="/tools/text-diff-checker" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
