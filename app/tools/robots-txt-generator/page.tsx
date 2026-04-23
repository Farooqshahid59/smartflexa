import Link from "next/link";

import { RobotsTxtGeneratorTool } from "@/app/tools/robots-txt-generator/robots-txt-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RobotsTxtRelatedToolLinks } from "@/components/robots-txt-related-tool-links";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

const robotsTxtFaqJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is robots.txt file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "robots.txt is a plain-text file served at the root of a site that tells compliant crawlers which URLs they may fetch. It uses User-agent groups with Allow and Disallow path prefixes, optional Crawl-delay for some bots, and Sitemap lines pointing to XML sitemaps.",
      },
    },
    {
      "@type": "Question",
      name: "How to create robots.txt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Choose user-agent rules, list Allow and Disallow paths, add Sitemap URLs, save as robots.txt, and upload to your site root so it is available at https://yourdomain.com/robots.txt. Test with your search engine’s URL inspection or robots testing tool after deploy.",
      },
    },
    {
      "@type": "Question",
      name: "Where to place robots.txt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Place it in the website’s root directory so it is publicly reachable at /robots.txt for each hostname and protocol (http vs https) you care about. Subdomains need their own file if crawled separately.",
      },
    },
    {
      "@type": "Question",
      name: "Does robots.txt affect SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It affects crawling, not rankings directly. Blocking URLs can prevent thin or duplicate content from being indexed, while mistakes can hide important pages. It does not guarantee removal of already indexed URLs—use noindex or removals for that.",
      },
    },
    {
      "@type": "Question",
      name: "How to block pages in robots.txt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Add Disallow lines with path prefixes under the relevant User-agent group, for example Disallow: /private/ to block everything under that folder. Combine with Allow for exceptions. Remember malicious actors can ignore robots.txt, so do not rely on it for secrets.",
      },
    },
  ],
};

export default function RobotsTxtGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.robotsTxtGenerator)} />
      <JsonLd data={robotsTxtFaqJsonLd} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="robots-heading">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Robots.txt Generator</span>
          </nav>

          <h1
            id="robots-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Robots.txt generator free
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Draft crawl rules for any <strong className="text-foreground">User-agent</strong>, mix{" "}
            <strong className="text-foreground">Allow</strong> and{" "}
            <strong className="text-foreground">Disallow</strong> paths, optionally set{" "}
            <strong className="text-foreground">Crawl-delay</strong>, and list{" "}
            <strong className="text-foreground">Sitemap</strong> URLs—then copy or download{" "}
            <code className="rounded bg-muted px-1">robots.txt</code>. Explore keyword hubs:{" "}
            <Link href="/create-robots-txt" className="font-medium text-foreground underline">
              create robots.txt
            </Link>
            ,{" "}
            <Link
              href="/robots-txt-generator-online"
              className="font-medium text-foreground underline"
            >
              robots.txt generator online
            </Link>
            ,{" "}
            <Link href="/robots-txt-for-seo" className="font-medium text-foreground underline">
              robots.txt for SEO
            </Link>
            , and{" "}
            <Link href="/how-to-create-robots-txt" className="font-medium text-foreground underline">
              how to create robots.txt
            </Link>
            .
          </p>

          <div className="mt-10">
            <RobotsTxtGeneratorTool />
          </div>

          <article className="mt-16 max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              What is robots.txt?
            </h2>
            <p>
              The Robots Exclusion Protocol—almost always exposed as a file named{" "}
              <code className="rounded bg-muted px-1">robots.txt</code>—is a voluntary contract between
              your site and polite crawlers. It does not authenticate users or encrypt anything; it
              simply lists path prefixes that major search engines agree to skip or prioritize when
              they respect the file. Because the syntax is line-oriented and case-sensitive on the
              path portion, small typos can accidentally block entire product trees or leave staging
              servers wide open when DNS points the wrong host at production.
            </p>
            <p>
              Each rule block begins with a <strong className="text-foreground">User-agent</strong>{" "}
              token such as <code className="rounded bg-muted px-1">*</code> for all bots or{" "}
              <code className="rounded bg-muted px-1">Googlebot</code> for Google’s crawler. Under
              that header you stack <strong className="text-foreground">Allow</strong> exceptions and{" "}
              <strong className="text-foreground">Disallow</strong> prefixes until the policy matches
              how your routes are actually structured. Large sites often ship multiple blocks back to
              back—one for Googlebot-Image, another generic wildcard—so teams can tune media crawling
              without rewriting the entire policy for every bot family.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">How robots.txt works</h2>
            <p>
              Crawlers fetch <code className="rounded bg-muted px-1">/robots.txt</code> before they
              hammer every URL they discover. When a URL’s longest matching rule is Disallow, well-behaved
              bots skip the fetch, saving your origin bandwidth and keeping low-value faceted URLs out
              of the crawl queue. When the longest match is Allow—or when no rule matches—they may
              request the page and then apply separate signals such as{" "}
              <code className="rounded bg-muted px-1">noindex</code> meta tags or HTTP headers to decide
              indexing. That split is why robots.txt alone cannot remove embarrassing content from
              search results: it only withholds the crawl, not the index entry if a URL was already
              known.
            </p>
            <p>
              <strong className="text-foreground">Sitemap</strong> directives at the bottom of the file
              advertise XML sitemap locations so discovery does not depend solely on internal links.
              Optional <strong className="text-foreground">Crawl-delay</strong> hints throttle polite bots
              on overloaded hosts, though Google has historically ignored crawl-delay for Googlebot.
              Always verify behavior in your target engine’s documentation before relying on delay for
              incident response.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to use robots.txt for SEO
            </h2>
            <p>
              From an SEO perspective, robots.txt is a guardrail: block duplicate parameter floods,
              internal search endpoints, and unfinished CMS shells while leaving money pages crawlable.
              Pair it with clean canonical tags and consistent internal linking so equity flows to URLs
              you actually want ranked. After edits, monitor coverage reports for spikes in “blocked by
              robots.txt” exclusions—those often trace to an over-broad Disallow like{" "}
              <code className="rounded bg-muted px-1">Disallow: /</code> on the wrong host.
            </p>
            <p>
              Use SmartFlexa’s presets as teaching aids: <strong className="text-foreground">Allow all</strong>{" "}
              mirrors the simplest public site, <strong className="text-foreground">Block all</strong>{" "}
              matches maintenance windows, and <strong className="text-foreground">Block common folders</strong>{" "}
              seeds WordPress-style paths you can tighten before launch. Combine this generator with the{" "}
              <Link href="/tools/meta-tag-generator" className="font-medium text-foreground underline">
                Meta Tag Generator
              </Link>{" "}
              for page-level robots directives, the{" "}
              <Link
                href="/tools/url-encoder-decoder"
                className="font-medium text-foreground underline"
              >
                URL Encoder
              </Link>{" "}
              when pasting analytics-heavy sitemap URLs, and{" "}
              <Link href="/tools/html-to-text" className="font-medium text-foreground underline">
                HTML to Text
              </Link>{" "}
              when auditing rendered titles against the URLs you allow.
            </p>
            <p>
              Finally, treat any online generator—including this one—as a drafting assistant. Review
              the diff in Git, run it through your staging robots tester, and keep ownership clear
              between marketing, platform engineering, and security so emergency blocks do not linger
              after incidents close.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">What is robots.txt file?</dt>
                <dd className="mt-2">
                  A root-level text file that tells compliant crawlers which path prefixes to fetch or
                  skip, plus optional sitemap hints.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">How to create robots.txt?</dt>
                <dd className="mt-2">
                  Define User-agent groups, add Allow/Disallow lines, list sitemaps, save as
                  robots.txt, deploy to the site root, and validate with search tools.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Where to place robots.txt?</dt>
                <dd className="mt-2">
                  At the domain root so it is served at /robots.txt for each hostname (including
                  www vs apex if both are used).
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Does robots.txt affect SEO?</dt>
                <dd className="mt-2">
                  It shapes crawling and can prevent low-value URLs from being fetched; it does not
                  assign ranking scores by itself and is not a substitute for noindex when removal is
                  required.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">How to block pages in robots.txt?</dt>
                <dd className="mt-2">
                  Use Disallow with a path prefix for the section to hide, optionally layering Allow
                  lines for exceptions inside that tree.
                </dd>
              </div>
            </dl>
          </article>

          <div className="mt-14 space-y-10">
            <RobotsTxtRelatedToolLinks />
            <RelatedTools currentPath="/tools/robots-txt-generator" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
