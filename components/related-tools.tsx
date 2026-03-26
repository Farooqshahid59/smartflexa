import Link from "next/link";

const LINKS = [
  { href: "/tools/image-compressor", label: "Image Compressor" },
  { href: "/tools/image-to-webp", label: "Image to WebP" },
  { href: "/tools/json-formatter", label: "JSON Formatter" },
  { href: "/tools/word-counter", label: "Word Counter" },
  { href: "/tools/base64-encoder-decoder", label: "Base64" },
] as const;

export type RelatedToolsProps = {
  /** Current tool path — omitted from the list to avoid a self-link. */
  currentPath: string;
};

export function RelatedTools({ currentPath }: RelatedToolsProps) {
  const links = LINKS.filter((l) => l.href !== currentPath);

  return (
    <section aria-labelledby="related-tools-heading">
      <h2
        id="related-tools-heading"
        className="text-2xl font-bold tracking-tight text-foreground"
      >
        Related tools
      </h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground hover:bg-muted"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
