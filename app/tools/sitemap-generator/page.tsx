import Link from "next/link";

import { SitemapGeneratorTool } from "@/app/tools/sitemap-generator/sitemap-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { OgPreviewInboundLinks } from "@/components/og-preview-inbound-links";
import { KeywordDensityInboundLinks } from "@/components/keyword-density-inbound-links";
import { SitemapRelatedToolLinks } from "@/components/sitemap-related-tool-links";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

const sitemapFaqJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is XML sitemap?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An XML sitemap is a file that lists important URLs on your site, often with last modification dates, change frequency hints, and priority values. Search engines can use it to discover and schedule crawling of those URLs.",
      },
    },
    {
      "@type": "Question",
      name: "How to create sitemap?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Collect canonical HTTPS URLs, choose changefreq and priority defaults, add optional lastmod dates, emit a urlset document with the sitemaps.org namespace, save as sitemap.xml, host it on your domain, and reference it in robots.txt or Search Console.",
      },
    },
    {
      "@type": "Question",
      name: "Where to upload sitemap?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Host sitemap.xml on your public web root or another URL you control, then submit the absolute URL in Google Search Console and Bing Webmaster Tools. Also add a Sitemap line in robots.txt pointing to the same URL for broader crawler discovery.",
      },
    },
    {
      "@type": "Question",
      name: "Does sitemap help SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sitemaps help discovery and crawl scheduling; they do not guarantee rankings. They are most useful for large sites, new sites with few inbound links, or pages that are hard to reach via navigation.",
      },
    },
    {
      "@type": "Question",
      name: "How often to update sitemap?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Update whenever URLs materially change—new pages, removals, or significant content refreshes. Automated pipelines often regenerate nightly; small sites may update on each deploy.",
      },
    },
  ],
};

export default function SitemapGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.sitemapGenerator)} />
      <JsonLd data={sitemapFaqJsonLd} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="sitemap-heading">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Sitemap Generator</span>
          </nav>

          <h1
            id="sitemap-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Sitemap generator free
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Produce a standards-based <strong className="text-foreground">XML sitemap</strong> with{" "}
            <code className="rounded bg-muted px-1">loc</code>,{" "}
            <code className="rounded bg-muted px-1">changefreq</code>,{" "}
            <code className="rounded bg-muted px-1">priority</code>, and optional{" "}
            <code className="rounded bg-muted px-1">lastmod</code>. More entry points:{" "}
            <Link href="/xml-sitemap-generator" className="font-medium text-foreground underline">
              XML sitemap generator
            </Link>
            ,{" "}
            <Link href="/free-sitemap-generator" className="font-medium text-foreground underline">
              free sitemap generator
            </Link>
            ,{" "}
            <Link
              href="/sitemap-generator-online"
              className="font-medium text-foreground underline"
            >
              sitemap generator online
            </Link>
            , and{" "}
            <Link href="/create-sitemap-xml" className="font-medium text-foreground underline">
              create sitemap XML
            </Link>
            .
          </p>

          <div className="mt-10">
            <SitemapGeneratorTool />
          </div>

          <article className="mt-16 max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              What is sitemap.xml?
            </h2>
            <p>
              A <code className="rounded bg-muted px-1">sitemap.xml</code> file is an XML document
              rooted in a <strong className="text-foreground">urlset</strong> element that enumerates
              URLs you consider important for crawling and indexing. Each child{" "}
              <strong className="text-foreground">url</strong> entry typically includes a canonical{" "}
              <strong className="text-foreground">loc</strong>, optional{" "}
              <strong className="text-foreground">lastmod</strong> timestamp,{" "}
              <strong className="text-foreground">changefreq</strong> hint, and a{" "}
              <strong className="text-foreground">priority</strong> score relative to other URLs on the
              same host. The format is documented by sitemaps.org and supported by major search
              engines as a supplement—not a replacement—for normal HTML linking.
            </p>
            <p>
              Sitemaps can also be split into indexes when you exceed URL count limits per file, or
              specialized for news, video, and images. This SmartFlexa generator focuses on the core
              web sitemap profile so you can bootstrap a static file before graduating to CMS or
              framework automation.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why a sitemap is important for SEO
            </h2>
            <p>
              Search engines eventually find popular pages through links, but fresh sites, deep
              faceted catalogs, and isolated landing pages can sit undiscovered for weeks. A sitemap
              shortens the path from publish to crawl by advertising URLs directly. It also carries{" "}
              <strong className="text-foreground">lastmod</strong> signals that help schedulers decide
              whether to revisit content after an update—especially when combined with consistent HTTP
              caching headers and visible on-page change dates.
            </p>
            <p>
              Sitemaps do not transfer PageRank magically; they coordinate discovery. Pair them with
              a clean <Link href="/tools/robots-txt-generator" className="font-medium text-foreground underline">
                robots.txt
              </Link>{" "}
              that references the sitemap URL, accurate{" "}
              <Link href="/tools/meta-tag-generator" className="font-medium text-foreground underline">
                meta robots
              </Link>{" "}
              where pages should not be indexed, and validated URLs from your{" "}
              <Link
                href="/tools/url-encoder-decoder"
                className="font-medium text-foreground underline"
              >
                URL encoder
              </Link>{" "}
              when campaign parameters must remain crawl-safe.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to create a sitemap
            </h2>
            <p>
              Start from canonical HTTPS URLs only—avoid listing duplicate http versions unless they
              intentionally resolve with redirects you control. Choose realistic{" "}
              <strong className="text-foreground">changefreq</strong> values: claiming{" "}
              <code className="rounded bg-muted px-1">daily</code> for static contact pages erodes trust
              in your signals. Priorities are relative within the site; use higher values for home,
              pricing, and flagship articles, lower for tag archives unless they drive revenue.
            </p>
            <p>
              After export, host <code className="rounded bg-muted px-1">/sitemap.xml</code> (or your
              chosen path) over HTTPS with <code className="rounded bg-muted px-1">200</code> status
              and <code className="rounded bg-muted px-1">application/xml</code> or compatible content
              type. Submit the URL in Search Console, monitor coverage for “Submitted URL not selected
              as canonical” messages, and iterate when migrations add or retire routes.
            </p>
            <p>
              For large teams, treat the generator as a spec tool: capture the XML here, commit it to
              Git, and let CI regenerate when routes change. That audit trail beats emailing ad-hoc
              attachments that never reach production.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">What is XML sitemap?</dt>
                <dd className="mt-2">
                  An XML file listing site URLs with optional metadata to help search engines discover
                  and schedule crawling.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">How to create sitemap?</dt>
                <dd className="mt-2">
                  Gather URLs, set changefreq and priority, add optional lastmod, output urlset XML,
                  host publicly, and submit in Search Console.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Where to upload sitemap?</dt>
                <dd className="mt-2">
                  Serve it from your domain (often the site root), then submit the absolute URL in
                  webmaster tools and optionally list it in robots.txt.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Does sitemap help SEO?</dt>
                <dd className="mt-2">
                  It improves discovery and crawl efficiency; it does not directly assign ranking
                  scores.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">How often to update sitemap?</dt>
                <dd className="mt-2">
                  Update when URLs change materially—after deploys, content refreshes, or structural
                  navigation updates.
                </dd>
              </div>
            </dl>
          </article>

          <div className="mt-14 space-y-10">
            <SitemapRelatedToolLinks />
            <KeywordDensityInboundLinks />
            <OgPreviewInboundLinks />
            <RelatedTools currentPath="/tools/sitemap-generator" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
