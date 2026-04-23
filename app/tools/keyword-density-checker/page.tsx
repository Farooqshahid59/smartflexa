import Link from "next/link";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { KeywordDensityRelatedToolLinks } from "@/components/keyword-density-related-tool-links";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

import { KeywordDensityCheckerTool } from "./keyword-density-checker-tool";

const keywordDensityFaqJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is keyword density?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keyword density is the percentage of all words in a piece of text that are a specific term. SmartFlexa divides a token’s count by total word count and multiplies by 100 so you can compare phrases side by side in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "How do you calculate keyword density?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Count how many times the keyword appears, divide by the total number of words in the document, and multiply by 100. This tool tokenizes lowercase letter-and-number runs, then applies that formula per unique token.",
      },
    },
    {
      "@type": "Question",
      name: "What is ideal keyword density?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Modern search engines do not publish a single ideal percentage. Use density as a sanity check—avoid stuffing and focus on natural language, headings, and intent match rather than chasing an arbitrary threshold.",
      },
    },
    {
      "@type": "Question",
      name: "Does keyword density matter for SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It is a minor signal compared with relevance, structure, links, and experience metrics. It can still help editors notice accidental repetition or missing primary terms before publication.",
      },
    },
    {
      "@type": "Question",
      name: "How can I improve SEO content?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Research intent, write clear headings, add helpful examples, earn quality links, and ship fast pages. Pair this analyzer with SmartFlexa meta tag and sitemap tools so discovery and snippets align with your copy.",
      },
    },
  ],
};

export default function KeywordDensityCheckerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.keywordDensityChecker)} />
      <JsonLd data={keywordDensityFaqJsonLd} />
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
        aria-labelledby="kdc-heading"
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
            <span className="text-foreground">Keyword Density Checker</span>
          </nav>

          <h1
            id="kdc-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Keyword Density Checker Free (SEO Keyword Analyzer)
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Paste draft copy or upload a <strong className="text-foreground">.txt</strong> file to
            see total words, vocabulary size, a sortable <strong className="text-foreground">keyword</strong>{" "}
            table with <strong className="text-foreground">count</strong> and{" "}
            <strong className="text-foreground">density %</strong>, optional{" "}
            <strong className="text-foreground">stop-word filtering</strong>, and a highlighted
            preview—<strong className="text-foreground">client-side</strong> on SmartFlexa.
          </p>

          <div className="mt-10">
            <KeywordDensityCheckerTool />
          </div>

          <article className="mt-16 max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              What is keyword density?
            </h2>
            <p>
              <strong className="text-foreground">Keyword density</strong> measures how often a
              chosen term appears relative to every other word in the same document. Early search
              engines were more literal, so SEO guides obsessed over narrow percentage bands. Today
              the metric is better understood as an editorial diagnostic: it answers whether you
              forgot to mention a product name entirely, or whether one paragraph repeats the same
              noun so often that readers—and algorithms—perceive spam.
            </p>
            <p>
              SmartFlexa tokenizes text into lowercase alphanumeric runs, counts each type, and
              divides by total tokens so percentages reflect each token&apos;s share of the whole
              document. Summed across every vocabulary row they equal one hundred; when you hide stop
              words the visible rows may sum to less because the denominator still includes those
              tokens. Optional stop-word filtering
              removes high-frequency function words such as &quot;the&quot; and &quot;and&quot; so
              the table foregrounds content-bearing terms your stakeholders actually care about.
            </p>
            <p>
              Because density is a ratio, short tweets behave differently from four-thousand-word
              guides: a single repeated slogan can dominate percentages in a micro-post while barely
              registering in a pillar article. Treat totals in the summary cards as context—pair
              them with the sortable table to see whether a spike comes from one paragraph or from
              sitewide chrome such as navigation labels pasted into the sample by mistake.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why keyword density still matters for SEO
            </h2>
            <p>
              Ranking systems now blend hundreds of features, so no responsible consultant promises
              rankings from a density tweak alone. That said, teams still ship better pages when
              they balance <strong className="text-foreground">semantic coverage</strong> with
              readable prose. A lightweight checker exposes accidental gaps—missing the primary
              entity in the introduction, overusing a competitor&apos;s brand in a comparison chart,
              or repeating the same adjective in every bullet of a landing page.
            </p>
            <p>
              Density also pairs with accessibility and conversion copy: screen reader users hear
              repetition quickly, and CRO teams notice when hero sections sound robotic. Because
              this SmartFlexa workflow never uploads your draft to a server, you can paste embargoed
              launch notes or legal disclaimers without expanding your data-processing footprint.
            </p>
            <p>
              Combine quantitative checks with qualitative review: read the highlighted preview to
              confirm emphasis lands on the right sentences, then validate discovery plumbing with
              the{" "}
              <Link
                href="/tools/meta-tag-generator"
                className="font-medium text-foreground underline"
              >
                Meta Tag Generator
              </Link>
              ,{" "}
              <Link
                href="/tools/sitemap-generator"
                className="font-medium text-foreground underline"
              >
                Sitemap Generator
              </Link>
              , and{" "}
              <Link
                href="/tools/robots-txt-generator"
                className="font-medium text-foreground underline"
              >
                Robots.txt Generator
              </Link>{" "}
              so crawlers see the same story your table summarizes.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to optimize content responsibly
            </h2>
            <p>
              Start from <strong className="text-foreground">search intent</strong>: informational
              queries need definitions and examples; transactional pages need specs, pricing clarity,
              and trust signals. Once the outline exists, drop your draft into this analyzer to
              verify the head term appears where readers expect—title, first screen, and at least
              one subheading—without carpet-bombing every paragraph.
            </p>
            <p>
              Prefer synonyms and related entities (people also ask, knowledge graph neighbors)
              instead of inflating a single string. Use the sort toggle to find unexpectedly heavy
              tokens; sometimes the culprit is a templated boilerplate sentence copied across
              sections. When localization matters, run each language separately because token rules
              differ and this build focuses on ASCII letters and digits for predictable SEO
              workflows.
            </p>
            <p>
              After edits, re-measure, export clean HTML, and monitor Search Console impressions and
              clicks rather than density alone. SEO wins when measurement, creative writing, and
              technical hygiene reinforce each other—not when a page chases a mythical three
              percent ceiling from a decade-old blog post.
            </p>
            <p>
              Agencies can snapshot client copy before and after workshops: export the textarea into
              version control, rerun the analyzer on each revision, and attach the density table to
              tickets as evidence that stuffing was removed. Internal comms teams reuse the same
              flow for employee-facing knowledge bases where consistent product vocabulary reduces
              support escalations even when those pages are not indexed.
            </p>
          </article>

          <section className="mt-14 max-w-3xl" aria-labelledby="kdc-faq-heading">
            <h2
              id="kdc-faq-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Frequently asked questions
            </h2>
            <dl className="mt-6 space-y-8 text-base">
              <div>
                <dt className="font-semibold text-foreground">What is keyword density?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  It is a term’s share of all words in a document, expressed as a percentage.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">How do you calculate keyword density?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Divide occurrences by total word count and multiply by 100—this tool does that per
                  token after normalization.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">What is ideal keyword density?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  There is no universal ideal; prioritize helpful, natural language and strong page
                  experience.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Does keyword density matter for SEO?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Only as a minor diagnostic compared with relevance, structure, links, and Core Web
                  Vitals-style quality signals.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">How can I improve SEO content?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Match intent, tighten headings, add trustworthy citations, improve page speed, and
                  keep metadata aligned with the on-page story.
                </dd>
              </div>
            </dl>
          </section>

          <div className="mt-14 space-y-10">
            <KeywordDensityRelatedToolLinks />
            <RelatedTools currentPath="/tools/keyword-density-checker" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
