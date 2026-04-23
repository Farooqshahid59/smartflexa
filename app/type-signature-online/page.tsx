import Link from "next/link";

import { SignatureGeneratorTool } from "@/app/tools/signature-generator/signature-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function TypeSignatureOnlinePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.typeSignatureOnline)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="type-sig-heading">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Type signature online</span>
          </nav>

          <h1
            id="type-sig-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Type signature online
          </h1>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Not everyone wants to trace letters with a trackpad. When the brief says
              &quot;clean script, legible at stamp size,&quot;{" "}
              <strong className="text-foreground">typing a signature online</strong> beats
              guessing with a brush tool. You enter your name once, preview seven distinct
              handwriting-inspired faces, and export the winner as a PNG ready for email
              footers, pitch decks, or internal wiki avatars—all without installing fonts
              locally because we pull curated web fonts at runtime.
            </p>
            <p>
              Colour still matters: black is the default, but you can match navy headers or
              forest-green brand decks before download. Transparent backgrounds keep layered
              designs tidy, while the solid option helps older PDF viewers that flatten alpha
              oddly. If you later need a hand-drawn variant for the same brand, hop to{" "}
              <Link href="/draw-signature-online" className="font-medium text-foreground underline">
                draw signature online
              </Link>{" "}
              or open the combined{" "}
              <Link href="/tools/signature-generator" className="font-medium text-foreground underline">
                signature generator
              </Link>{" "}
              from the tools hub.
            </p>
            <p>
              Wondering how typed images compare with cryptographic signing? The{" "}
              <Link
                href="/digital-signature-generator"
                className="font-medium text-foreground underline"
              >
                digital signature generator
              </Link>{" "}
              page spells out when a PNG is enough and when you must use a regulated e-sign
              product instead—worth a skim before you send anything legally sensitive.
            </p>
          </div>

          <div className="mt-10">
            <SignatureGeneratorTool initialMode="type" />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/type-signature-online" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
