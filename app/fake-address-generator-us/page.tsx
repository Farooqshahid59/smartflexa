import Link from "next/link";

import { FakeAddressGeneratorTool } from "@/app/tools/fake-address-generator/fake-address-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function FakeAddressGeneratorUsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.fakeAddressGeneratorUs)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="fake-us-heading">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Fake US address generator</span>
          </nav>

          <h1
            id="fake-us-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Fake US address generator
          </h1>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              American checkout flows expect a two-letter state, a five-digit ZIP, and a phone
              line that looks like NANP formatting—even when the cart is full of dummy SKUs.
              This page opens the SmartFlexa generator with{" "}
              <strong className="text-foreground">United States</strong> pre-selected so you can
              stress autocomplete widgets, tax nexus toggles, and carrier zone tables without
              scraping real residents from OpenStreetMap.
            </p>
            <p>
              Rows include a plausible personal name, street number and suffix, city tied to a
              real metro abbreviation, and a ZIP-shaped code. Phone values intentionally resemble
              the <strong className="text-foreground">555</strong> style test range where
              appropriate so they are less likely to ring a stranger if misrouted. Nothing here
              validates against USPS—treat every line as{" "}
              <strong className="text-foreground">formatting fiction</strong> for engineering
              only.
            </p>
            <p>
              Need Canada for cross-border freight mocks, or India for PIN-code parsers? Use the{" "}
              <Link href="/tools/fake-address-generator" className="font-medium text-foreground underline">
                full fake address generator
              </Link>
              , or jump to{" "}
              <Link
                href="/fake-address-generator-uk"
                className="font-medium text-foreground underline"
              >
                UK
              </Link>
              ,{" "}
              <Link
                href="/fake-address-generator-india"
                className="font-medium text-foreground underline"
              >
                India
              </Link>
              , or the{" "}
              <Link href="/random-address-generator" className="font-medium text-foreground underline">
                random address generator
              </Link>{" "}
              overview.
            </p>
          </div>

          <div className="mt-10">
            <FakeAddressGeneratorTool key="US" defaultCountry="US" />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/fake-address-generator-us" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
