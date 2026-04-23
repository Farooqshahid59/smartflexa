import Link from "next/link";

import { TextToImageTool } from "@/app/tools/text-to-image/text-to-image-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function WriteTextOnImagePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.writeTextOnImage)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="write-on-img-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Write text on image</span>
          </nav>
          <h1
            id="write-on-img-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Write text on image backgrounds
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Many briefs literally say &quot;<strong className="text-foreground">write text on image</strong>&quot;
              when they mean an overlay on a hero photo: event title plus date, sale percentage on a
              product still, or a testimonial on a team picture. SmartFlexa handles that by letting you
              upload the raster background, then compositing your lines above a subtle darkening layer
              so you are not fighting drop shadows pixel by pixel.
            </p>
            <p>
              When you do not have photography yet, stay in solid color mode and treat the canvas as
              a minimalist poster. Increase padding to mimic safe zones required by ad networks, or
              shrink it for thumbnail-style badges. Left alignment pairs well with logos or handle
              mentions you append later in another editor; center alignment remains the default for
              symmetrical hero shots.
            </p>
            <p>
              This URL emphasizes the photo-overlay story, while the shared widget also powers pure
              typography cards. Compare workflows on the{" "}
              <Link
                href="/quote-image-maker"
                className="font-medium text-foreground underline"
              >
                Quote image maker
              </Link>{" "}
              landing if you mostly work without photography, or return to{" "}
              <Link
                href="/tools/text-to-image"
                className="font-medium text-foreground underline"
              >
                Create image from text
              </Link>{" "}
              for the central documentation hub.
            </p>
          </article>
          <div className="mt-10">
            <TextToImageTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/write-text-on-image" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
