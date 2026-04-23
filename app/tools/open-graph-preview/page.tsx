import Link from "next/link";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { OgPreviewRelatedToolLinks } from "@/components/og-preview-related-tool-links";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

import { OpenGraphPreviewTool } from "./open-graph-preview-tool";

const ogPreviewFaqJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Open Graph?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open Graph is a set of meta properties (og:title, og:description, og:image, og:url, og:type) that social platforms read to build link previews. It was introduced by Facebook and is now widely supported so shared links show a thumbnail, title, and description instead of a bare URL.",
      },
    },
    {
      "@type": "Question",
      name: "How do I preview a link on Facebook?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use this SmartFlexa tool to model the title, description, image, and domain Facebook will read from your og:* tags. After deployment, Facebook’s Sharing Debugger can refresh the cache. Locally, you can also fetch the page if its server sends CORS headers that allow your browser to read the HTML.",
      },
    },
    {
      "@type": "Question",
      name: "How do I fix a broken link preview?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Verify absolute HTTPS URLs for og:image, keep images under a few megabytes, and use og:title and og:description lengths that read well when cropped. Clear stale cache in each platform’s debugger, ensure robots or paywalls are not blocking crawlers, and confirm the page returns 200 with the meta tags in the initial HTML (not only after client-side JavaScript).",
      },
    },
    {
      "@type": "Question",
      name: "What is og:image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "og:image is the Open Graph meta property that points to the primary image URL for a page’s link preview. It should be an absolute URL, ideally at least about 1200×630 pixels for large cards, in a common format such as JPEG or PNG, and publicly reachable without authentication.",
      },
    },
    {
      "@type": "Question",
      name: "How can I improve social sharing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Write a specific title and description per URL, add a compelling og:image, include twitter:card and related Twitter fields for X, test previews on mobile widths, and measure clicks after updates. Pair technical tags with on-page content that matches the promise of the preview so bounce rates stay healthy.",
      },
    },
  ],
};

export default function OpenGraphPreviewPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.openGraphPreviewTool)} />
      <JsonLd data={ogPreviewFaqJsonLd} />
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
        aria-labelledby="og-preview-heading"
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
            <span className="text-foreground">Open Graph Preview</span>
          </nav>

          <h1
            id="og-preview-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Open Graph Preview Tool (Facebook &amp; Twitter Link Preview)
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Enter a URL, title, description, and image to see how a share card could look.
            Fetch works when CORS allows; otherwise paste values from your CMS or HTML. Copy
            ready-made <strong className="text-foreground">Open Graph</strong> and{" "}
            <strong className="text-foreground">Twitter</strong> meta snippets in one click.
          </p>

          <div className="mt-10">
            <OpenGraphPreviewTool />
          </div>

          <article className="mt-16 max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              What is Open Graph?
            </h2>
            <p>
              Open Graph is a vocabulary of <code className="rounded bg-muted px-1">meta</code>{" "}
              tags—usually declared with <code className="rounded bg-muted px-1">property=&quot;og:*&quot;</code>
              —that tells social apps how to render a link. Instead of guessing from random
              on-page text, crawlers read a predictable contract: the human-readable title, a
              short description, a canonical URL, an image, and a content type such as article
              or website. The protocol began with Facebook but is now the de facto baseline for
              Slack, LinkedIn, iMessage, and many other clients that unfurl URLs.
            </p>
            <p>
              Twitter (now X) adds parallel <code className="rounded bg-muted px-1">twitter:*</code>{" "}
              fields and a <code className="rounded bg-muted px-1">twitter:card</code> mode such as{" "}
              <code className="rounded bg-muted px-1">summary_large_image</code>. When both sets
              exist, platforms pick the most specific data they trust. Missing tags do not always
              produce an error—they produce a bland preview, which is worse for marketing because
              users scroll past without clicking.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why social previews matter
            </h2>
            <p>
              Organic shares, paid campaigns, and internal Slack announcements all compete for
              attention inside infinite feeds. A crisp image and a clear title communicate
              credibility before the page loads. Conversely, truncated titles, pixelated crops,
              or mismatched descriptions signal neglect and increase bounce rates even when the
              underlying article is excellent. Treat previews as part of the product surface,
              not as an afterthought buried in the head element.
            </p>
            <p>
              Previews also reinforce brand: consistent typography in images, recognizable color
              bars, and accurate domain labels help audiences trust that the link is authentic.
              After major launches, marketing and engineering should review the same SmartFlexa
              mockup so copy changes in the CMS do not drift from what engineers ship in
              metadata.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to optimize sharing
            </h2>
            <p>
              Start with an image sized for large cards—roughly 1.91:1 aspect ratio—and compress
              it so mobile networks fetch it quickly. Use absolute HTTPS URLs, not root-relative
              paths, because crawlers resolve them differently across environments. Keep titles
              under roughly sixty visible characters where possible and front-load the value
              proposition; descriptions should expand on the title without repeating it verbatim.
            </p>
            <p>
              Align Open Graph text with the on-page <strong className="text-foreground">H1</strong>{" "}
              and opening paragraph so visitors see a coherent story after they click. When you
              change pricing, dates, or legal claims, update both body copy and meta tags in the
              same release. Use each platform’s cache debugger after deploys, and pair this
              preview with SmartFlexa’s{" "}
              <Link href="/tools/meta-tag-generator" className="font-medium text-foreground underline">
                Meta Tag Generator
              </Link>{" "}
              when you need the full HTML block, plus{" "}
              <Link href="/tools/sitemap-generator" className="font-medium text-foreground underline">
                Sitemap Generator
              </Link>{" "}
              and{" "}
              <Link href="/tools/robots-txt-generator" className="font-medium text-foreground underline">
                Robots.txt Generator
              </Link>{" "}
              so crawlers can reach the URLs you intend to share.
            </p>
            <p>
              Finally, remember that previews are cached. A perfect local test does not
              guarantee instant updates in production feeds—plan buffer time for re-scraping and
              communicate that to stakeholders when rebranding or renaming products.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Technical checklist before you share
            </h2>
            <p>
              Confirm that <code className="rounded bg-muted px-1">og:url</code> matches the
              canonical users should bookmark, that images return <code className="rounded bg-muted px-1">200</code>{" "}
              without redirects to unrelated hosts, and that TLS certificates cover both apex
              and <code className="rounded bg-muted px-1">www</code> if you advertise both. Avoid
              blocking Facebook or Twitter user agents in WAF rules when marketing depends on
              those scrapers. If you rely on JavaScript to inject tags, remember many crawlers
              still prefer the first HTML payload—mirror critical tags server-side when possible.
            </p>
            <p>
              Document the owner for each field (brand, growth, localization) so translations do
              not silently overwrite English-only og:title strings. When campaigns end, roll back
              temporary og:image artwork to evergreen brand imagery to prevent outdated promos
              from resurfacing in old Slack threads.
            </p>
          </article>

          <section className="mt-14 max-w-3xl" aria-labelledby="og-preview-faq-heading">
            <h2
              id="og-preview-faq-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Frequently asked questions
            </h2>
            <dl className="mt-6 space-y-8 text-base">
              <div>
                <dt className="font-semibold text-foreground">What is Open Graph?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  It is a family of meta tags that describe how a URL should look when shared,
                  especially <code className="rounded bg-muted px-1">og:title</code>,{" "}
                  <code className="rounded bg-muted px-1">og:description</code>, and{" "}
                  <code className="rounded bg-muted px-1">og:image</code>.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  How do I preview a link on Facebook?
                </dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Model your fields here, then use Meta’s Sharing Debugger after go-live to
                  scrape the live URL and refresh cached previews.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">How do I fix a broken link preview?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Fix invalid image URLs, add missing og tags in the server-rendered HTML, avoid
                  blocking crawlers, and clear platform caches after corrections.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">What is og:image?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  The Open Graph property that points to the preview image; it should be
                  absolute, reachable, and appropriately large for social crops.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">How can I improve social sharing?</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  Match titles and images to campaign intent, test on mobile, export consistent
                  meta snippets, and monitor engagement when you iterate copy.
                </dd>
              </div>
            </dl>
          </section>

          <div className="mt-14 space-y-10">
            <OgPreviewRelatedToolLinks />
            <RelatedTools currentPath="/tools/open-graph-preview" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
