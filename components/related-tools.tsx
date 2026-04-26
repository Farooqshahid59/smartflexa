import Link from "next/link";

const LINKS = [
  { href: "/tools/image-compressor", label: "Image Compressor" },
  { href: "/tools/text-to-image", label: "Text to Image" },
  { href: "/tools/remove-background", label: "Remove Background" },
  { href: "/tools/image-to-base64", label: "Image to Base64" },
  { href: "/tools/image-to-webp", label: "Image to WebP" },
  { href: "/tools/resize-image", label: "Resize Image" },
  { href: "/tools/crop-image", label: "Crop Image" },
  { href: "/tools/passport-photo-maker", label: "Passport Photo Maker" },
  { href: "/tools/merge-pdf", label: "Merge PDF" },
  { href: "/tools/split-pdf", label: "Split PDF" },
  { href: "/tools/compress-pdf", label: "Compress PDF" },
  { href: "/tools/image-to-pdf", label: "Image to PDF" },
  { href: "/tools/pdf-to-word", label: "PDF to Word" },
  { href: "/tools/word-to-pdf", label: "Word to PDF" },
  { href: "/tools/remove-duplicate-lines", label: "Remove Duplicate Lines" },
  { href: "/tools/text-diff-checker", label: "Text Diff Checker" },
  { href: "/tools/text-case-converter", label: "Text Case Converter" },
  { href: "/tools/case-converter-dev", label: "Case Converter (Dev)" },
  { href: "/tools/slug-generator", label: "Slug Generator" },
  { href: "/tools/url-encoder-decoder", label: "URL Encoder" },
  { href: "/tools/qr-code-generator", label: "QR Code Generator" },
  { href: "/tools/qr-code-scanner", label: "QR Code Scanner" },
  { href: "/tools/password-generator", label: "Password Generator" },
  { href: "/tools/signature-generator", label: "Signature Generator" },
  { href: "/tools/random-number-generator", label: "Random Number Generator" },
  { href: "/tools/percentage-calculator", label: "Percentage Calculator" },
  { href: "/tools/age-calculator", label: "Age Calculator" },
  { href: "/tools/emi-calculator", label: "EMI Calculator" },
  { href: "/tools/discount-calculator", label: "Discount Calculator" },
  { href: "/tools/bmi-calculator", label: "BMI Calculator" },
  { href: "/tools/unit-converter", label: "Unit Converter" },
  { href: "/tools/time-zone-converter", label: "Time Zone Converter" },
  { href: "/tools/png-to-jpg", label: "PNG to JPG" },
  { href: "/tools/jpg-to-png", label: "JPG to PNG" },
  { href: "/tools/json-formatter", label: "JSON Formatter" },
  { href: "/tools/color-picker", label: "Color Picker" },
  { href: "/tools/color-palette-generator", label: "Color Palette Generator" },
  { href: "/tools/uuid-generator", label: "UUID Generator" },
  { href: "/tools/fake-address-generator", label: "Fake Address Generator" },
  { href: "/tools/invoice-generator", label: "Invoice Generator" },
  { href: "/tools/meta-tag-generator", label: "Meta Tag Generator" },
  { href: "/tools/keyword-density-checker", label: "Keyword Density Checker" },
  { href: "/tools/ai-text-summarizer", label: "AI Text Summarizer" },
  { href: "/tools/ai-grammar-fixer", label: "AI Grammar Fixer" },
  { href: "/tools/ai-paraphraser", label: "AI Paraphraser" },
  { href: "/tools/open-graph-preview", label: "Open Graph Preview" },
  { href: "/tools/robots-txt-generator", label: "Robots.txt Generator" },
  { href: "/tools/sitemap-generator", label: "Sitemap Generator" },
  { href: "/tools/username-generator", label: "Username Generator" },
  { href: "/tools/json-minifier", label: "JSON Minifier" },
  { href: "/tools/html-to-text", label: "HTML to Text" },
  { href: "/tools/word-counter", label: "Word Counter" },
  { href: "/tools/lorem-ipsum-generator", label: "Lorem Ipsum" },
  { href: "/tools/base64-encoder-decoder", label: "Base64" },
] as const;

export type RelatedToolsProps = {
  /** Current tool path — omitted from the list to avoid a self-link. */
  currentPath: string;
  /** Optional section heading when a page already uses “Related tools” above. */
  heading?: string;
};

export function RelatedTools({ currentPath, heading = "Related tools" }: RelatedToolsProps) {
  const links = LINKS.filter((l) => l.href !== currentPath);
  const headingId =
    heading === "Related tools" ? "related-tools-heading" : "more-tools-heading";

  return (
    <section aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="text-2xl font-bold tracking-tight text-foreground"
      >
        {heading}
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
