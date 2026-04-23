import Link from "next/link";

import { UsernameGeneratorTool } from "@/app/tools/username-generator/username-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function InstagramUsernameGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.instagramUsernameGenerator)} />
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
        aria-labelledby="ig-user-heading"
      >
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Instagram username generator</span>
          </nav>

          <h1
            id="ig-user-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Instagram username generator
          </h1>

          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Reels bios and story stickers read differently than Discord tags: the ideal{" "}
              <strong className="text-foreground">Instagram username generator</strong> output
              should feel soft, legible in a tiny circle avatar, and resilient when someone shouts it
              across a coffee shop. SmartFlexa boots the editor in <strong className="text-foreground">
                Instagram
              </strong>{" "}
              mode so adjectives skew cozy, separators favor dots, and batch sizes stay high enough
              to compare dozens of candidates before you burn a handle change cooldown.
            </p>
            <p>
              Toggle symbols when you want pastel dot aesthetics; leave them off when you prefer a
              single clean token. Numbers can disambiguate without looking like a bot farm if you
              keep suffixes short—two digits usually read more intentional than six.
            </p>
            <p>
              Compare vibes on{" "}
              <Link href="/cool-username-generator" className="font-medium text-foreground underline">
                cool username generator
              </Link>{" "}
              or return to the main{" "}
              <Link href="/tools/username-generator" className="font-medium text-foreground underline">
                username generator
              </Link>{" "}
              hub for FAQs.
            </p>
          </div>

          <div className="mt-10">
            <UsernameGeneratorTool key="instagram" defaultCategory="instagram" />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/instagram-username-generator" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
