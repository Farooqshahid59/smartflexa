import Link from "next/link";

import { TextToImageTool } from "@/app/tools/text-to-image/text-to-image-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function TextToImageOnlinePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.textToImageOnline)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="tti-online-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Text to image online</span>
          </nav>
          <h1
            id="tti-online-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Text to image online
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Searching for <strong className="text-foreground">text to image online</strong>{" "}
              usually lands you on either generative AI homepages or bloated editors with accounts.
              This SmartFlexa route is intentionally narrow: you type, you style, the browser paints
              immediately, and you save. That makes it appropriate for compliance-heavy orgs that
              still want polished quote cards without granting a third party continuous access to
              draft language.
            </p>
            <p>
              Width and height inputs cap at 2048 pixels per side so laptops stay responsive while
              exports remain sharp enough for most social surfaces. Word wrapping respects manual line
              breaks, which matters when you paste poetry, numbered principles, or bilingual blocks
              where automatic hyphenation would be wrong. Switch to a photo background when you want
              texture; the dim veil keeps contrast predictable without manual layer masks.
            </p>
            <p>
              When you are ready to deep-link the flagship experience, bookmark{" "}
              <Link
                href="/tools/text-to-image"
                className="font-medium text-foreground underline"
              >
                Create image from text
              </Link>{" "}
              on the main tools path for FAQs and extended guidance—the component below is identical.
            </p>
          </article>
          <div className="mt-10">
            <TextToImageTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/text-to-image-online" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
