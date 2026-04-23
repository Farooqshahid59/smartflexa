"use client";

import Link from "next/link";

import { FakeAddressGeneratorTool } from "@/app/tools/fake-address-generator/fake-address-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { FakeAddressRelatedToolLinks } from "@/components/fake-address-related-tool-links";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

const fakeAddressFaqJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is a fake address legal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Using made-up addresses for software testing, demos, or QA is generally fine when no fraud or misrepresentation to governments, banks, or people occurs. Do not use fake addresses to evade law, open real accounts, or ship goods under a false identity.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use a fake address for testing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes—developers and QA teams commonly use random addresses in staging databases, Storybook fixtures, and integration tests. Prefer environments that are not production and strip test data before go-live.",
      },
    },
    {
      "@type": "Question",
      name: "How do I generate a random address?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pick a country, choose how many rows you need (1–5), then click Generate address or Regenerate. Copy the block to your clipboard when you are ready to paste into a spreadsheet or form.",
      },
    },
    {
      "@type": "Question",
      name: "Does this create real addresses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Output is algorithmic fiction styled like real formats. A line may resemble a real street by chance, but it is not sourced from postal databases and must not be treated as verified.",
      },
    },
    {
      "@type": "Question",
      name: "What is address format?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Address format is how a country orders lines—US uses city, state, ZIP; UK uses postcode and county; India uses PIN codes and states; Canada uses province and alphanumeric postal codes. This tool approximates those patterns for UI testing.",
      },
    },
  ],
};

export default function FakeAddressGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.fakeAddressGenerator)} />
      <JsonLd data={fakeAddressFaqJsonLd} />
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
        aria-labelledby="fake-address-heading"
      >
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
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
            <span className="text-foreground">Fake Address Generator</span>
          </nav>

          <h1
            id="fake-address-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Fake Address Generator Online (Random US, UK, India Addresses)
          </h1>
          <p className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Generate random fake addresses for testing and signup forms. Free online tool with
            multiple countries—runs in your browser with copy and regenerate controls.
          </p>

          <p className="mt-6 text-sm text-muted-foreground">
            Country hubs:{" "}
            <Link
              href="/fake-address-generator-us"
              className="font-medium text-foreground underline"
            >
              US addresses
            </Link>
            ,{" "}
            <Link
              href="/fake-address-generator-uk"
              className="font-medium text-foreground underline"
            >
              UK addresses
            </Link>
            ,{" "}
            <Link
              href="/fake-address-generator-india"
              className="font-medium text-foreground underline"
            >
              India addresses
            </Link>
            , or{" "}
            <Link href="/random-address-generator" className="font-medium text-foreground underline">
              random address generator
            </Link>
            .
          </p>

          <div className="mt-8">
            <FakeAddressGeneratorTool />
          </div>

          <article className="mt-14 space-y-10" aria-labelledby="fake-address-seo-heading">
            <h2
              id="fake-address-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              About fake addresses for testing
            </h2>

            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              What is a fake address generator?
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              A <strong className="text-foreground">fake address generator</strong> produces rows
              that look like mailing addresses—names, streets, cities, regions, postal codes, and
              sometimes phone numbers—without pointing to a real household. Product teams use
              that synthetic data to fill checkout prototypes, seed databases, or screenshot
              marketing pages without publishing someone&apos;s actual home. The important
              distinction is <strong className="text-foreground">intent</strong>: QA and design
              workflows are normal; impersonation, loan fraud, or bypassing KYC are not.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              SmartFlexa&apos;s version keeps everything{" "}
              <strong className="text-foreground">client-side</strong>. Your browser builds the
              strings locally, so nothing is logged on our servers for this tool. You can
              generate one row or up to five in a batch, switch countries when you need to test
              localization, and copy the entire stack to the clipboard for spreadsheets or JSON
              fixtures.
            </p>

            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              Use cases in testing and development
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Engineers wire fake addresses into <strong className="text-foreground">unit
              tests</strong> for geocoding adapters, tax calculators, and carrier rate tables.
              Designers drop them into Figma-linked forms to check wrapping, hyphenation, and
              error states. Support teams rehearse CRM flows with realistic-looking tickets that
              still respect privacy. Because the values are random each click, you reduce the
              risk of accidentally committing a colleague&apos;s real address from an old
              spreadsheet.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Pair this page with our{" "}
              <Link href="/tools/uuid-generator" className="font-medium text-foreground underline">
                UUID Generator
              </Link>{" "}
              when you need primary keys, or the{" "}
              <Link
                href="/tools/random-number-generator"
                className="font-medium text-foreground underline"
              >
                Random Number Generator
              </Link>{" "}
              for numeric edge cases. When you create throwaway logins, add the{" "}
              <Link
                href="/tools/password-generator"
                className="font-medium text-foreground underline"
              >
                Password Generator
              </Link>{" "}
              so credentials and addresses stay clearly non-production.
            </p>

            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              Country-specific address formats
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              <strong className="text-foreground">United States</strong> rows follow the familiar{" "}
              <strong className="text-foreground">City, ST ZIP</strong> rhythm with five-digit ZIP
              codes and a separate state abbreviation. <strong className="text-foreground">United
              Kingdom</strong> entries favour outward and inward postcodes, county-style regions,
              and shorter street labels common in British addressing. <strong className="text-foreground">India</strong>{" "}
              uses six-digit PIN codes, state names, and city tokens drawn from large metros and
              tier-two hubs. <strong className="text-foreground">Canada</strong> combines two-letter
              provinces with alphanumeric postal codes and North American phone patterns.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              None of these combinations are validated against postal authority files—treat them
              as <strong className="text-foreground">shape tests</strong>, not deliverability
              proofs. If you need verified addresses for shipping, use your carrier&apos;s address
              validation API or official postal tools instead.
            </p>

            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              Safety and responsible use
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Before you paste generated rows into any live system, confirm your company policy
              on synthetic PII. Some regulated environments require masked or tokenized data even
              in lower environments. When in doubt, ask security or legal—the generator is a
              convenience layer, not a policy document.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">Is a fake address legal?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Using invented addresses for software testing is widely accepted. Using them to
                  deceive people, institutions, or verification systems is not. Stay in sandbox and
                  demo contexts.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Can I use a fake address for testing?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes—for fixtures, screenshots, and non-production databases. Avoid production
                  systems unless your policy explicitly allows synthetic PII there too.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">How do I generate a random address?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Choose country and count, then click <strong className="text-foreground">Generate
                  address</strong> or <strong className="text-foreground">Regenerate</strong>. Use{" "}
                  <strong className="text-foreground">Copy to clipboard</strong> to grab every block
                  at once.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Does this create real addresses?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  No. Values are random templates. Any resemblance to a real property is accidental
                  and not verified.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">What is address format?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  It is the order and type of lines each country expects—state vs province, ZIP vs
                  PIN vs postcode, and how phone numbers are grouped. Matching format helps UI and
                  validation tests feel realistic.
                </dd>
              </div>
            </dl>

            <FakeAddressRelatedToolLinks />

            <RelatedTools
              currentPath="/tools/fake-address-generator"
              heading="More tools"
            />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
