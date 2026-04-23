import Link from "next/link";

import { FakeAddressGeneratorTool } from "@/app/tools/fake-address-generator/fake-address-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function RandomAddressGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.randomAddressGenerator)} />
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
        aria-labelledby="random-addr-heading"
      >
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Random address generator</span>
          </nav>

          <h1
            id="random-addr-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Random address generator
          </h1>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Localization QA rarely stops at one border. Product managers often ask for a{" "}
              <strong className="text-foreground">random address generator</strong> that can hop
              from ZIP codes to UK postcodes to Indian PINs in the same afternoon. This page
              loads the shared SmartFlexa editor with <strong className="text-foreground">United
              States</strong> as the default preset, but every other country sits one dropdown
              away—ideal when you are validating shared React components that render labels like
              &quot;Province&quot; versus &quot;State&quot; based on locale props.
            </p>
            <p>
              Batch up to five rows when you need to fill a table component, then hit{" "}
              <strong className="text-foreground">Copy to clipboard</strong> to paste straight
              into Notion, Jira, or a CSV template. If your sprint focuses on a single market,
              deep-link to{" "}
              <Link
                href="/fake-address-generator-us"
                className="font-medium text-foreground underline"
              >
                US
              </Link>
              ,{" "}
              <Link
                href="/fake-address-generator-uk"
                className="font-medium text-foreground underline"
              >
                UK
              </Link>
              , or{" "}
              <Link
                href="/fake-address-generator-india"
                className="font-medium text-foreground underline"
              >
                India
              </Link>{" "}
              for shorter intros that stress each postal culture.
            </p>
            <p>
              For documentation about legal use and format differences, read the companion{" "}
              <Link href="/tools/fake-address-generator" className="font-medium text-foreground underline">
                fake address generator
              </Link>{" "}
              article on the tools hub—including Canada alongside the three headline countries.
            </p>
          </div>

          <div className="mt-10">
            <FakeAddressGeneratorTool key="RANDOM" defaultCountry="US" />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/random-address-generator" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
