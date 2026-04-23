import Link from "next/link";

type PassportWorkflowPage =
  | "/tools/image-compressor"
  | "/tools/resize-image"
  | "/tools/crop-image";

type PassportWorkflowRelatedLinksProps = {
  currentPath: PassportWorkflowPage;
};

/**
 * Focused internal links for passport-style workflows (image compressor, resize, crop).
 */
export function PassportWorkflowRelatedLinks({
  currentPath,
}: PassportWorkflowRelatedLinksProps) {
  return (
    <section aria-labelledby="passport-workflow-related-heading">
      <h2
        id="passport-workflow-related-heading"
        className="text-2xl font-bold tracking-tight text-foreground"
      >
        Related tools
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Crop, resize, or compress your picture, then finish with the right passport or
        visa-style dimensions—all free in your browser.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href="/tools/passport-photo-maker"
          className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground hover:bg-muted"
        >
          Passport size photo maker online free
        </Link>
        {currentPath !== "/tools/resize-image" ? (
          <Link
            href="/tools/resize-image"
            className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground hover:bg-muted"
          >
            Resize image for passport
          </Link>
        ) : null}
        {currentPath !== "/tools/image-compressor" ? (
          <Link
            href="/tools/image-compressor"
            className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground hover:bg-muted"
          >
            Compress passport photo
          </Link>
        ) : null}
        {currentPath !== "/tools/crop-image" ? (
          <Link
            href="/tools/crop-image"
            className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground hover:bg-muted"
          >
            Crop image for passport
          </Link>
        ) : null}
      </div>
    </section>
  );
}
