import Link from "next/link";

import { UsernameGeneratorTool } from "@/app/tools/username-generator/username-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function GamingUsernameGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.gamingUsernameGenerator)} />
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
        aria-labelledby="gaming-user-heading"
      >
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Gaming username generator</span>
          </nav>

          <h1
            id="gaming-user-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Gaming username generator
          </h1>

          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Kill feeds compress typography: long strings truncate, homoglyphs confuse spectators, and
              offensive substrings get auto-reported. A focused{" "}
              <strong className="text-foreground">gaming username generator</strong> should bias
              toward punchy compounds, optional numeric tails, and separators that still read when
              squashed into 12 characters. SmartFlexa loads the <strong className="text-foreground">
                Gaming
              </strong>{" "}
              preset so you can iterate quickly before checking clan tag compatibility or voice-bot
              pronunciation.
            </p>
            <p>
              Turn on numbers when your dream phrase is taken everywhere else; flip symbols when your
              squad uses underscores for roster imports. Nothing here checks Steam or Xbox live
              availability—treat every line as brainstorming until the platform confirms.
            </p>
            <p>
              Also browse{" "}
              <Link href="/username-ideas" className="font-medium text-foreground underline">
                username ideas
              </Link>{" "}
              or the main{" "}
              <Link href="/tools/username-generator" className="font-medium text-foreground underline">
                SmartFlexa username generator
              </Link>
              .
            </p>
          </div>

          <div className="mt-10">
            <UsernameGeneratorTool key="gaming" defaultCategory="gaming" />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/gaming-username-generator" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
