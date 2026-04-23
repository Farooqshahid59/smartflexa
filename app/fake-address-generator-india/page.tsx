import Link from "next/link";

import { FakeAddressGeneratorTool } from "@/app/tools/fake-address-generator/fake-address-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function FakeAddressGeneratorIndiaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.fakeAddressGeneratorIndia)} />
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
        aria-labelledby="fake-in-heading"
      >
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Fake India address generator</span>
          </nav>

          <h1
            id="fake-in-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Fake India address generator
          </h1>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Indian e-commerce and KYC screens frequently ask for a six-digit{" "}
              <strong className="text-foreground">PIN code</strong>, a state list, and a
              locality that may mix English with transliterated names. This route boots the
              generator in <strong className="text-foreground">India</strong> mode so you can
              rehearse dropdown cascades, length limits on apartment lines, and SMS OTP flows
              that assume a +91-style handset pattern—all without touching production PII.
            </p>
            <p>
              The data is still <strong className="text-foreground">synthetic</strong>: it is not
              tied to India Post verification, GST geo databases, or UIDAI records. Use it where
              you only need the <em>shape</em> of an address row, then swap in validated fixtures
              before any compliance review. For mixed-country suites, bookmark the{" "}
              <Link href="/tools/fake-address-generator" className="font-medium text-foreground underline">
                master fake address generator
              </Link>{" "}
              and toggle countries from one screen.
            </p>
            <p>
              Compare formats with{" "}
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
              , or the neutral{" "}
              <Link href="/random-address-generator" className="font-medium text-foreground underline">
                random address generator
              </Link>{" "}
              entry point.
            </p>
          </div>

          <div className="mt-10">
            <FakeAddressGeneratorTool key="IN" defaultCountry="IN" />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/fake-address-generator-india" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
