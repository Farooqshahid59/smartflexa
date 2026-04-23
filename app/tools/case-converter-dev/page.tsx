import Link from "next/link";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { CaseConverterDevRelatedToolLinks } from "@/components/case-converter-dev-related-tool-links";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

import { CaseConverterDevTool } from "./case-converter-dev-tool";

const caseDevFaqJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is camelCase?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "camelCase joins words without spaces, lowercase first word, and capitalizes the first letter of each following word (for example userProfileUrl). It is the default style for JavaScript object properties and many JSON APIs.",
      },
    },
    {
      "@type": "Question",
      name: "What is snake_case?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "snake_case uses lowercase letters with underscores between words (for example user_profile_url). It is common in Python, Ruby, SQL column names, and many REST query parameters.",
      },
    },
    {
      "@type": "Question",
      name: "How do I convert text case for code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste your phrase or identifier into SmartFlexa, toggle trim spaces or remove special characters if needed, and every variant updates live. Click Copy on any card to grab camelCase, snake_case, kebab-case, PascalCase, UPPER_CASE, or lower_case output—all in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "What is kebab-case?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "kebab-case (also called dash-case or lisp-case) joins lowercase words with hyphens, for example user-profile-url. It is widely used in URLs, CSS class names, and some configuration keys.",
      },
    },
    {
      "@type": "Question",
      name: "When should I use PascalCase?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use PascalCase when each word starts with a capital letter with no separators, for example UserProfileUrl. It is the conventional naming for React components, C# types, and many class names in object-oriented languages.",
      },
    },
  ],
};

export default function CaseConverterDevPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.caseConverterDev)} />
      <JsonLd data={caseDevFaqJsonLd} />
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
        aria-labelledby="ccd-heading"
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
            <span className="text-foreground">Case Converter (Dev)</span>
          </nav>

          <h1
            id="ccd-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Case Converter (camelCase, snake_case, kebab-case Online)
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Paste labels, column titles, or mixed identifiers and get{" "}
            <strong className="text-foreground">camelCase</strong>,{" "}
            <strong className="text-foreground">snake_case</strong>,{" "}
            <strong className="text-foreground">kebab-case</strong>,{" "}
            <strong className="text-foreground">PascalCase</strong>,{" "}
            <strong className="text-foreground">UPPER_CASE</strong>, and{" "}
            <strong className="text-foreground">lower_case</strong> (flat lowercase) in one grid—
            with optional trimming and symbol stripping. Runs entirely in your browser on SmartFlexa.
          </p>

          <div className="mt-10">
            <CaseConverterDevTool />
          </div>

          <article className="mt-16 max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              What is case conversion?
            </h2>
            <p>
              <strong className="text-foreground">Case conversion</strong> for developers is not
              only about upper versus lower letters—it is about how human-readable phrases become
              machine-safe tokens. Product copy might read &quot;Monthly active users&quot;, but a
              Postgres column, a JavaScript property, and a URL slug each impose different rules
              about separators, capitalization, and which punctuation may appear at all. A dedicated
              converter removes the mental gymnastics of retyping the same concept six ways while
              you wire an API schema to a mobile client.
            </p>
            <p>
              SmartFlexa first normalizes your input with optional whitespace trimming and optional
              stripping of non-alphanumeric characters, then splits on spaces, underscores,
              hyphens, slashes, and camelCase boundaries so tokens like <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">userProfile</code>{" "}
              decompose into <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">user</code>{" "}
              and <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">profile</code>{" "}
              before reassembling. Everything executes locally, which matters when the clipboard
              contains internal enum names or unreleased feature flags you do not want logged on a
              remote service.
            </p>
            <p>
              The <strong className="text-foreground">lower_case</strong> card concatenates tokens
              without separators (sometimes called flat case), which can be handy for compact keys
              when underscores are not allowed. If you need prose-oriented title or sentence casing
              instead, use the separate{" "}
              <Link
                href="/tools/text-case-converter"
                className="font-medium text-foreground underline"
              >
                Text Case Converter
              </Link>{" "}
              in the same toolbox.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Different naming conventions
            </h2>
            <p>
              <strong className="text-foreground">camelCase</strong> and{" "}
              <strong className="text-foreground">PascalCase</strong> differ only in the first
              letter: functions and object literals in JavaScript typically use camelCase, while
              exported React components and many C# public types use PascalCase.{" "}
              <strong className="text-foreground">snake_case</strong> trades vertical space on the
              page for unmistakable word boundaries and pairs naturally with languages that avoid
              capital letters in identifiers. <strong className="text-foreground">kebab-case</strong>{" "}
              mirrors snake_case but swaps underscores for hyphens so strings can drop directly into
              URLs or attribute selectors without percent-encoding the separator.
            </p>
            <p>
              <strong className="text-foreground">UPPER_CASE</strong> here follows the common
              convention of uppercase words joined by underscores—the style many teams use for
              environment variables, enum members, and SQL constants. Consistency beats cleverness:
              mixing snake env vars with camel JSON keys is normal at boundaries, but each layer
              should still be internally uniform so code review and grep stay predictable.
            </p>
            <p>
              When you are unsure which file a symbol belongs in, align with the dominant ecosystem:
              follow PEP 8 in Python repos, Airbnb or Prettier defaults in JavaScript repos, and
              whatever your OpenAPI generator emits for clients—then use this page to translate a
              product phrase into each representation without hand errors.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Use cases in programming
            </h2>
            <p>
              Backend engineers often receive CSV headers or spreadsheet columns with mixed spaces
              and capitalization. Pasting a header row into this converter yields ready-made field
              names for ORM models, migration files, and protobuf fields. Frontend developers
              renaming a component can copy PascalCase for the export while instantly grabbing a
              matching kebab-case string for the design system documentation URL.
            </p>
            <p>
              DevOps engineers mapping Kubernetes labels or Terraform variables benefit from the{" "}
              <strong className="text-foreground">UPPER_CASE</strong> card when aligning with
              existing <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">TF_VAR_*</code>{" "}
              patterns. Technical writers drafting code samples can keep narrative text in Title
              Case in prose, then snapshot every identifier variant for multilanguage snippets without
              breaking build pipelines.
            </p>
            <p>
              After you settle on strings, validate JSON payloads with the{" "}
              <Link href="/tools/json-formatter" className="font-medium text-foreground underline">
                JSON Formatter
              </Link>{" "}
              and percent-encode any values that will live in query strings using the{" "}
              <Link
                href="/tools/url-encoder-decoder"
                className="font-medium text-foreground underline"
              >
                URL Encoder/Decoder
              </Link>
              . Together these utilities cover the last mile from brainstormed label to safe wire
              format.
            </p>
            <p>
              Remember that automatic conversion cannot read your team&apos;s domain dictionary:
              acronyms like &quot;HTTP&quot; or &quot;OAuth&quot; may need manual touch-ups after
              export so you do not ship <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">hTTP</code>{" "}
              style artifacts. Treat the grid as a fast first pass, then apply project-specific
              lint rules in CI.
            </p>
          </article>

          <section className="mt-14 max-w-3xl" aria-labelledby="ccd-faq-heading">
            <h2
              id="ccd-faq-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Frequently asked questions
            </h2>
            <dl className="mt-6 space-y-8 text-base">
              <div>
                <dt className="font-semibold text-foreground">What is camelCase?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Words run together with the first word lowercase and later words capitalized on
                  the first letter—common in JavaScript properties and many JSON APIs.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">What is snake_case?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Lowercase words separated by underscores, popular in Python, Ruby, and SQL schemas.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">How do I convert text case?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Paste into the textarea, adjust trim and special-character options, then copy any
                  live-updated card.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">What is kebab-case?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Lowercase words joined by hyphens—ideal for URLs, slugs, and several CSS naming
                  schemes.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">When should I use PascalCase?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Use it for React components, C# types, and other symbols where every word starts
                  with a capital letter and there is no separator.
                </dd>
              </div>
            </dl>
          </section>

          <div className="mt-14 space-y-10">
            <CaseConverterDevRelatedToolLinks />
            <RelatedTools currentPath="/tools/case-converter-dev" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
