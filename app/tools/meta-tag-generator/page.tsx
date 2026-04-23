import Link from "next/link";

import { MetaTagGeneratorTool } from "@/app/tools/meta-tag-generator/meta-tag-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { MetaTagRelatedToolLinks } from "@/components/meta-tag-related-tool-links";
import { RobotsTxtInboundLinks } from "@/components/robots-txt-inbound-links";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

const metaTagFaqJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are meta tags?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Meta tags are HTML elements in the document head that describe a page for browsers, search engines, and social platforms—such as title, description, robots directives, Open Graph properties for link previews, and Twitter Card fields.",
      },
    },
    {
      "@type": "Question",
      name: "How to add meta tags?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Place them inside the <head> of your HTML document, or use your framework’s metadata API (for example Next.js metadata or react-helmet). Keep one clear title and description per URL, validate attribute quoting, and deploy before requesting indexing in Search Console.",
      },
    },
    {
      "@type": "Question",
      name: "What is meta description?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The meta description is a short summary typically declared with the HTML meta element whose name attribute is description. Search engines may show it as the snippet under your blue link title. It does not directly guarantee ranking but influences click-through when it matches the query.",
      },
    },
    {
      "@type": "Question",
      name: "Do meta keywords matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Major search engines like Google have ignored the meta keywords tag for ranking for many years. It is optional; focus on helpful titles, descriptions, structured content, and technical SEO instead.",
      },
    },
    {
      "@type": "Question",
      name: "How to improve SEO with meta tags?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Write unique titles and descriptions per page, align them with on-page content, set accurate robots directives, use canonical URLs where duplicates exist, and add Open Graph/Twitter tags so shared links look professional—then measure clicks and impressions in analytics.",
      },
    },
  ],
};

export default function MetaTagGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.metaTagGenerator)} />
      <JsonLd data={metaTagFaqJsonLd} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="meta-tag-heading">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Meta Tag Generator</span>
          </nav>

          <h1
            id="meta-tag-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Meta tag generator free
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Build <strong className="text-foreground">SEO meta tags</strong>, Open Graph, and Twitter
            Card markup with live HTML output and a Google-style snippet preview. For focused
            landing pages, see{" "}
            <Link href="/seo-meta-tag-generator" className="font-medium text-foreground underline">
              SEO meta tag generator
            </Link>
            ,{" "}
            <Link href="/open-graph-generator" className="font-medium text-foreground underline">
              Open Graph generator
            </Link>
            ,{" "}
            <Link href="/twitter-card-generator" className="font-medium text-foreground underline">
              Twitter card generator
            </Link>
            , and{" "}
            <Link
              href="/html-meta-tags-generator"
              className="font-medium text-foreground underline"
            >
              HTML meta tags generator
            </Link>
            .
          </p>

          <div className="mt-10">
            <MetaTagGeneratorTool />
          </div>

          <article className="mt-16 max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              What are meta tags?
            </h2>
            <p>
              Meta tags live in the <strong className="text-foreground">&lt;head&gt;</strong> of an
              HTML document and describe the page to machines: search crawlers, browsers, social
              networks, and accessibility tools. Some tags control presentation—most famously the
              viewport meta tag that tells mobile browsers how wide the layout should be—while
              others classify content, declare authorship, or instruct robots whether to index a
              URL and follow its links. They do not replace good copy on the page itself, but they
              bundle that copy into a compact contract between your server and the rest of the web.
            </p>
            <p>
              Social extensions such as Open Graph (<code className="rounded bg-muted px-1">og:*</code>
              ) and Twitter Cards (<code className="rounded bg-muted px-1">twitter:*</code>) reuse
              the same ideas with different property names so link unfurls look crisp in Slack,
              iMessage, and X. When those fields are missing, platforms guess from body text or show
              a bare URL—which is rarely the first impression you want after shipping a campaign.
            </p>
            <p>
              Character limits are softer than they look: Google may rewrite snippets when queries
              mismatch your marketing prose, while social apps crop titles aggressively on small
              screens. Treat the preview in this tool as a compass, not a contract—iterate after you
              inspect real devices and query-specific SERPs.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why meta tags matter for SEO
            </h2>
            <p>
              Search engines still begin with the URL, title, and snippet when ranking and
              presenting results. A precise title clarifies relevance; a persuasive description
              improves click-through rate even if your position is unchanged. Robots meta values
              prevent accidental indexing of staging sites or faceted navigation duplicates, while
              canonical tags (often paired in the same head block) consolidate signals to a single
              preferred URL. None of this replaces fast pages, structured data where appropriate, or
              authoritative backlinks—but neglecting head metadata is like printing a beautiful
              brochure and forgetting the address on the envelope.
            </p>
            <p>
              For JavaScript-heavy stacks—React, Vue, or Next.js—meta information may be emitted
              through a framework API instead of hand-written strings. The generator on this page
              outputs standards-friendly HTML you can paste into templates or compare against what
              your framework already produces, which helps catch drift between marketing copy and
              production builds.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to use meta tags in practice
            </h2>
            <p>
              Start with one source of truth for the page title and description: align them with
              the H1 and opening paragraph so users who click from Google see consistent language.
              Fill Open Graph and Twitter fields when the page is likely to be shared—blog posts,
              product launches, documentation hubs. Use absolute HTTPS URLs for images and keep file
              sizes reasonable so previews load quickly on cellular networks.
            </p>
            <p>
              After deployment, validate with your crawler of choice or Search Console’s URL
              inspection. Update tags when you rename products or change pricing; stale snippets erode
              trust faster than missing tags. Pair this workflow with SmartFlexa’s{" "}
              <Link href="/tools/json-formatter" className="font-medium text-foreground underline">
                JSON Formatter
              </Link>{" "}
              for config files, the{" "}
              <Link
                href="/tools/url-encoder-decoder"
                className="font-medium text-foreground underline"
              >
                URL Encoder
              </Link>{" "}
              when building tracking parameters, and{" "}
              <Link href="/tools/html-to-text" className="font-medium text-foreground underline">
                HTML to Text
              </Link>{" "}
              when repurposing CMS HTML into shorter descriptions. Together they shorten the loop
              from content edit to indexable page.
            </p>
            <p>
              Finally, treat generated markup as a starting point: frameworks may require additional
              fields (charset, theme-color, CSP) and regional regulations may demand disclosures for
              cookies or age-gated media. Review with your legal and security teams before publishing
              high-risk templates.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">What are meta tags?</dt>
                <dd className="mt-2">
                  They are head elements that describe a page—title, description, robots, viewport,
                  and social preview properties—for crawlers and browsers.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">How to add meta tags?</dt>
                <dd className="mt-2">
                  Insert them in the document head or via your framework’s metadata system, then
                  deploy and verify with Search Console or a crawler.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">What is meta description?</dt>
                <dd className="mt-2">
                  A short summary in the HTML meta description element that search engines may show
                  under your result title.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Do meta keywords matter?</dt>
                <dd className="mt-2">
                  Not for Google ranking. They are optional; prioritize title, description, and
                  high-quality page content.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  How to improve SEO with meta tags?
                </dt>
                <dd className="mt-2">
                  Use unique titles and descriptions, correct robots directives, social images for
                  shares, and monitor click-through after changes.
                </dd>
              </div>
            </dl>
          </article>

          <div className="mt-14 space-y-10">
            <MetaTagRelatedToolLinks />
            <RobotsTxtInboundLinks />
            <RelatedTools currentPath="/tools/meta-tag-generator" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
