import Link from "next/link";

import { FakeAddressGeneratorTool } from "@/app/tools/fake-address-generator/fake-address-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function FakeAddressGeneratorUkPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.fakeAddressGeneratorUk)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="fake-uk-heading">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Fake UK address generator</span>
          </nav>

          <h1
            id="fake-uk-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Fake UK address generator
          </h1>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              British forms often care more about the <strong className="text-foreground">postcode
              </strong> and the outward/inward split than about a verbose state line. This hub
              starts the generator in <strong className="text-foreground">United Kingdom</strong>{" "}
              mode so you can test Royal Mail-style validation regex, county pickers, and how
              your UI wraps long Welsh or Scottish city names on narrow phones.
            </p>
            <p>
              County labels stand in for the &quot;state&quot; column you might still have in a
              generic schema, while postcodes follow a simplified alphanumeric pattern suitable
              for UI snapshots—not for proving delivery to HMRC or DVLA. Pair the output with
              the main{" "}
              <Link href="/tools/fake-address-generator" className="font-medium text-foreground underline">
                fake address generator
              </Link>{" "}
              when you need to flip between countries in one sitting.
            </p>
            <p>
              For North American or Indian fixtures, see{" "}
              <Link
                href="/fake-address-generator-us"
                className="font-medium text-foreground underline"
              >
                US
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
              landing page.
            </p>
          </div>

          <div className="mt-10">
            <FakeAddressGeneratorTool key="UK" defaultCountry="UK" />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/fake-address-generator-uk" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
