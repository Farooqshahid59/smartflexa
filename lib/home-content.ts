import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ALargeSmall,
  Braces,
  Cake,
  Clock,
  Calculator,
  Code,
  Binary,
  Globe,
  QrCode,
  ScanQrCode,
  Link2,
  Code2,
  Hash,
  Crop,
  FileImage,
  FileJson,
  FileCode,
  FileText,
  Files,
  Gift,
  Landmark,
  Ruler,
  Split,
  ImageIcon,
  Images,
  Lock,
  Minimize2,
  Percent,
  Palette,
  ShieldCheck,
  TextQuote,
  Dice5,
  UserX,
  Zap,
} from "lucide-react";

export const siteBrand = {
  name: "SmartFlexa",
  initials: "SF",
} as const;

export type ToolCategoryId = "developer" | "image" | "pdf" | "calculators";

export type ToolItem = {
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
  category: ToolCategoryId;
};

export const defaultTools: ToolItem[] = [
  {
    name: "JSON Formatter",
    description:
      "Format, validate, and beautify your JSON data with syntax highlighting.",
    icon: Braces,
    href: "/tools/json-formatter",
    category: "developer",
  },
  {
    name: "JSON Minifier",
    description:
      "Compress JSON by stripping whitespace—ideal for APIs and smaller payloads.",
    icon: Braces,
    href: "/tools/json-minifier",
    category: "developer",
  },
  {
    name: "UUID Generator",
    description:
      "Create version 4 UUIDs in bulk—copy-ready for APIs, DB keys, and tests.",
    icon: Hash,
    href: "/tools/uuid-generator",
    category: "developer",
  },
  {
    name: "HTML to Text",
    description:
      "Strip HTML tags and decode entities to clean plain text in your browser.",
    icon: FileCode,
    href: "/tools/html-to-text",
    category: "developer",
  },
  {
    name: "Lorem Ipsum Generator",
    description:
      "Placeholder paragraphs for mockups—set paragraph count and optional word total.",
    icon: TextQuote,
    href: "/tools/lorem-ipsum-generator",
    category: "developer",
  },
  {
    name: "Random Number Generator",
    description:
      "Pick integers in any range with optional batch draws—great for games and tests.",
    icon: Dice5,
    href: "/tools/random-number-generator",
    category: "calculators",
  },
  {
    name: "Percentage Calculator",
    description:
      "Find percent of a number, increase/decrease between values, and percentage difference.",
    icon: Calculator,
    href: "/tools/percentage-calculator",
    category: "calculators",
  },
  {
    name: "Age Calculator",
    description:
      "Years, months, days, and total days from date of birth—with leap years handled.",
    icon: Cake,
    href: "/tools/age-calculator",
    category: "calculators",
  },
  {
    name: "EMI Calculator",
    description:
      "Monthly EMI, total interest, and total payment from principal, rate, and tenure.",
    icon: Landmark,
    href: "/tools/emi-calculator",
    category: "calculators",
  },
  {
    name: "Discount Calculator",
    description:
      "Percent-off savings and final price from original price and discount %.",
    icon: Percent,
    href: "/tools/discount-calculator",
    category: "calculators",
  },
  {
    name: "BMI Calculator",
    description:
      "Body Mass Index from weight (kg) and height (cm or m) with category labels.",
    icon: Activity,
    href: "/tools/bmi-calculator",
    category: "calculators",
  },
  {
    name: "Image Compressor",
    description:
      "Compress images without losing quality. Supports PNG, JPG, and WebP.",
    icon: ImageIcon,
    href: "/tools/image-compressor",
    category: "image",
  },
  {
    name: "Image to Base64",
    description:
      "Turn JPG, PNG, or WebP into a data URL with preview and one-click copy.",
    icon: Binary,
    href: "/tools/image-to-base64",
    category: "image",
  },
  {
    name: "Image to WebP",
    description:
      "Convert JPG and PNG images to WebP format for smaller files and faster pages.",
    icon: FileImage,
    href: "/tools/image-to-webp",
    category: "image",
  },
  {
    name: "Resize Image",
    description:
      "Resize images with custom dimensions or presets like passport and Instagram.",
    icon: ImageIcon,
    href: "/tools/resize-image",
    category: "image",
  },
  {
    name: "Crop Image",
    description:
      "Crop images with rectangle or circle selection, preview, and instant download.",
    icon: Crop,
    href: "/tools/crop-image",
    category: "image",
  },
  {
    name: "PNG to JPG",
    description:
      "Convert PNG images to JPG with optional background for transparent areas.",
    icon: Images,
    href: "/tools/png-to-jpg",
    category: "image",
  },
  {
    name: "JPG to PNG",
    description:
      "Convert JPEG images to lossless PNG with instant preview and download.",
    icon: FileImage,
    href: "/tools/jpg-to-png",
    category: "image",
  },
  {
    name: "Merge PDF",
    description:
      "Combine multiple PDFs into one file with reordering—all in your browser.",
    icon: Files,
    href: "/tools/merge-pdf",
    category: "pdf",
  },
  {
    name: "Split PDF",
    description:
      "Extract page ranges or split every page into separate files—ZIP download.",
    icon: Split,
    href: "/tools/split-pdf",
    category: "pdf",
  },
  {
    name: "Compress PDF",
    description:
      "Reduce PDF file size with low, medium, or high compression presets.",
    icon: Minimize2,
    href: "/tools/compress-pdf",
    category: "pdf",
  },
  {
    name: "Word to PDF",
    description:
      "Convert DOC/DOCX to PDF format (placeholder conversion for now).",
    icon: FileText,
    href: "/tools/word-to-pdf",
    category: "pdf",
  },
  {
    name: "Remove Duplicate Lines",
    description:
      "Remove repeated lines from text while preserving order. Case-sensitive matching optional.",
    icon: FileText,
    href: "/tools/remove-duplicate-lines",
    category: "developer",
  },
  {
    name: "Text Case Converter",
    description:
      "Switch between uppercase, lowercase, title case, and sentence case instantly in your browser.",
    icon: ALargeSmall,
    href: "/tools/text-case-converter",
    category: "developer",
  },
  {
    name: "Slug Generator",
    description:
      "Turn titles into clean, SEO-friendly URL slugs with live preview and copy.",
    icon: Link2,
    href: "/tools/slug-generator",
    category: "developer",
  },
  {
    name: "URL Encoder & Decoder",
    description:
      "Percent-encode or decode URL text with encodeURIComponent and decodeURIComponent.",
    icon: Globe,
    href: "/tools/url-encoder-decoder",
    category: "developer",
  },
  {
    name: "QR Code Generator",
    description:
      "Create scannable QR codes from text or links with instant preview and PNG download.",
    icon: QrCode,
    href: "/tools/qr-code-generator",
    category: "developer",
  },
  {
    name: "QR Code Scanner",
    description:
      "Camera or image upload—scan QR codes in the browser with tappable URLs.",
    icon: ScanQrCode,
    href: "/tools/qr-code-scanner",
    category: "developer",
  },
  {
    name: "PDF Tools",
    description: "Merge, split, compress, and convert PDF files quickly and securely.",
    icon: FileText,
    href: "/tools/pdf-tools",
    category: "pdf",
  },
  {
    name: "Base64 Encoder & Decoder",
    description:
      "Encode plain text to Base64 or decode Base64 back to text in your browser.",
    icon: Code,
    href: "/tools/base64-encoder-decoder",
    category: "developer",
  },
  {
    name: "Color Picker",
    description:
      "Pick colors with a native picker and convert HEX ↔ RGB with validation and copy.",
    icon: Palette,
    href: "/tools/color-picker",
    category: "developer",
  },
  {
    name: "Password Generator",
    description:
      "Random passwords with length control, character sets, and a live strength meter.",
    icon: Lock,
    href: "/tools/password-generator",
    category: "developer",
  },
  {
    name: "Unit Converter",
    description:
      "Length, weight, temperature, and speed—live conversion with swap and reset.",
    icon: Ruler,
    href: "/tools/unit-converter",
    category: "calculators",
  },
  {
    name: "Time Zone Converter",
    description:
      "DST-aware conversion between world time zones with live “now” in each zone.",
    icon: Clock,
    href: "/tools/time-zone-converter",
    category: "calculators",
  },
  {
    name: "CSV to JSON",
    description: "Convert CSV data to JSON format and vice versa.",
    icon: FileJson,
    href: "/tools/csv-json",
    category: "developer",
  },
];

export type CategoryItem = {
  id: ToolCategoryId;
  name: string;
  description: string;
  icon: LucideIcon;
  /** SEO / fallback link (homepage uses in-page filter + #tools). */
  href: string;
  count: number;
};

const CATEGORY_ORDER: ToolCategoryId[] = [
  "developer",
  "image",
  "pdf",
  "calculators",
];

const CATEGORY_DEFINITIONS: Record<
  ToolCategoryId,
  Omit<CategoryItem, "count" | "id">
> = {
  developer: {
    name: "Developer Tools",
    description: "JSON, Base64, regex testing, and more for developers",
    icon: Code2,
    href: "/categories/developer",
  },
  image: {
    name: "Image Tools",
    description: "Compress, resize, convert, and edit images online",
    icon: ImageIcon,
    href: "/categories/image",
  },
  pdf: {
    name: "PDF Tools",
    description: "Merge, split, compress, and convert PDF documents",
    icon: FileText,
    href: "/categories/pdf",
  },
  calculators: {
    name: "Calculators",
    description: "Unit converters, percentage calculators, and more",
    icon: Calculator,
    href: "/categories/calculators",
  },
};

export function getHomeCategories(tools: ToolItem[]): CategoryItem[] {
  const counts: Record<ToolCategoryId, number> = {
    developer: 0,
    image: 0,
    pdf: 0,
    calculators: 0,
  };
  for (const t of tools) {
    counts[t.category]++;
  }
  return CATEGORY_ORDER.map((id) => ({
    id,
    ...CATEGORY_DEFINITIONS[id],
    count: counts[id],
  }));
}

export const defaultCategories: CategoryItem[] =
  getHomeCategories(defaultTools);

/** Query param for deep-linking to the home tools grid with a category filter. */
export const HOME_TOOLS_CATEGORY_QUERY = "category" as const;

export function homeToolsCategoryHref(id: ToolCategoryId): string {
  return `/?${HOME_TOOLS_CATEGORY_QUERY}=${id}#tools`;
}

export function parseHomeToolCategoryParam(
  raw: string | null | undefined,
): ToolCategoryId | null {
  if (!raw) return null;
  return (CATEGORY_ORDER as readonly string[]).includes(raw)
    ? (raw as ToolCategoryId)
    : null;
}

export type BlogPost = {
  title: string;
  excerpt: string;
  href: string;
  date: string;
  category: string;
};

export const defaultBlogPosts: BlogPost[] = [
  {
    title: "10 Must-Have Developer Tools for 2024",
    excerpt:
      "Discover the essential tools that every developer should have in their toolkit to boost productivity and streamline workflows.",
    href: "/blog/developer-tools-2024",
    date: "Mar 15, 2024",
    category: "Developer",
  },
  {
    title: "How to Optimize Images for the Web",
    excerpt:
      "Learn the best practices for compressing and optimizing images to improve your website's performance and user experience.",
    href: "/blog/optimize-images",
    date: "Mar 10, 2024",
    category: "Images",
  },
  {
    title: "PDF Workflow Automation Tips",
    excerpt:
      "Automate your PDF workflows and save hours of manual work with these practical tips and techniques.",
    href: "/blog/pdf-automation",
    date: "Mar 5, 2024",
    category: "PDF",
  },
];

export type FeatureItem = {
  name: string;
  description: string;
  icon: LucideIcon;
};

export const defaultFeatures: FeatureItem[] = [
  {
    name: "Lightning Fast",
    description: "All tools run directly in your browser for instant results",
    icon: Zap,
  },
  {
    name: "100% Free",
    description: "No hidden fees or premium tiers. All tools are completely free",
    icon: Gift,
  },
  {
    name: "No Signup Required",
    description: "Start using any tool immediately without creating an account",
    icon: UserX,
  },
  {
    name: "Secure & Private",
    description: "Your data never leaves your browser. We respect your privacy",
    icon: ShieldCheck,
  },
];

export type NavLink = { label: string; href: string };

export const defaultNavLinks: NavLink[] = [
  { label: "Tools", href: "#tools" },
  // { label: "Blog", href: "#blog" }, // paused: no blog block on home for now
  { label: "About", href: "#about" },
];

export type FooterColumn = { title: string; links: { name: string; href: string }[] };

export const defaultFooterColumns: FooterColumn[] = [
  {
    title: "Tools",
    links: getHomeCategories(defaultTools).map((c) => ({
      name: c.name,
      href: homeToolsCategoryHref(c.id),
    })),
  },
  {
    title: "Resources",
    links: [
      // { name: "Blog", href: "/blog" }, // paused for now (home blog section off)
      { name: "About", href: "/about" },
      {
        name: "Contact",
        href: "mailto:f.shahid95@yahoo.com",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },
];
