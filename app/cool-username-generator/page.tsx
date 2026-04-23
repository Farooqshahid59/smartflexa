import Link from "next/link";

import { UsernameGeneratorTool } from "@/app/tools/username-generator/username-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function CoolUsernameGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.coolUsernameGenerator)} />
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
        aria-labelledby="cool-user-heading"
      >
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Cool username generator</span>
          </nav>

          <h1
            id="cool-user-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Cool username generator
          </h1>

          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              “Cool” is subjective, but design systems still converge on a few traits: balanced
              syllables, subtle edge without toxicity, and lowercase flow that reads well on OLED
              posters. This <strong className="text-foreground">cool username generator</strong>{" "}
              route opens SmartFlexa in <strong className="text-foreground">Cool</strong> mode so
              adjectives skew modern, nouns stay punchy, and you can layer optional separators without
              drifting into meme spam.
            </p>
            <p>
              Pair the batch with your own moodboard: export ten handles, sleep on them, then delete
              anything that feels dated in a week. If you need softer aesthetics for photo feeds,
              pivot to the{" "}
              <Link
                href="/instagram-username-generator"
                className="font-medium text-foreground underline"
              >
                Instagram username generator
              </Link>
              .
            </p>
            <p>
              Central docs live at{" "}
              <Link href="/tools/username-generator" className="font-medium text-foreground underline">
                /tools/username-generator
              </Link>
              .
            </p>
          </div>

          <div className="mt-10">
            <UsernameGeneratorTool key="cool" defaultCategory="cool" />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/cool-username-generator" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
