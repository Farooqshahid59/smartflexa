import type { LucideIcon } from "lucide-react";
import {
  Braces,
  Calculator,
  Code,
  Code2,
  Crop,
  FileImage,
  FileJson,
  FileText,
  Files,
  Gift,
  Split,
  ImageIcon,
  Images,
  Lock,
  Minimize2,
  Palette,
  ShieldCheck,
  UserX,
  Zap,
} from "lucide-react";

export const siteBrand = {
  name: "SmartFlexa",
  initials: "SF",
} as const;

export type ToolItem = {
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

export const defaultTools: ToolItem[] = [
  {
    name: "JSON Formatter",
    description:
      "Format, validate, and beautify your JSON data with syntax highlighting.",
    icon: Braces,
    href: "/tools/json-formatter",
  },
  {
    name: "Image Compressor",
    description:
      "Compress images without losing quality. Supports PNG, JPG, and WebP.",
    icon: ImageIcon,
    href: "/tools/image-compressor",
  },
  {
    name: "Image to WebP",
    description:
      "Convert JPG and PNG images to WebP format for smaller files and faster pages.",
    icon: FileImage,
    href: "/tools/image-to-webp",
  },
  {
    name: "Resize Image",
    description:
      "Resize images with custom dimensions or presets like passport and Instagram.",
    icon: ImageIcon,
    href: "/tools/resize-image",
  },
  {
    name: "Crop Image",
    description:
      "Crop images with rectangle or circle selection, preview, and instant download.",
    icon: Crop,
    href: "/tools/crop-image",
  },
  {
    name: "PNG to JPG",
    description:
      "Convert PNG images to JPG with optional background for transparent areas.",
    icon: Images,
    href: "/tools/png-to-jpg",
  },
  {
    name: "JPG to PNG",
    description:
      "Convert JPEG images to lossless PNG with instant preview and download.",
    icon: FileImage,
    href: "/tools/jpg-to-png",
  },
  {
    name: "Merge PDF",
    description:
      "Combine multiple PDFs into one file with reordering—all in your browser.",
    icon: Files,
    href: "/tools/merge-pdf",
  },
  {
    name: "Split PDF",
    description:
      "Extract page ranges or split every page into separate files—ZIP download.",
    icon: Split,
    href: "/tools/split-pdf",
  },
  {
    name: "Compress PDF",
    description:
      "Reduce PDF file size with low, medium, or high compression presets.",
    icon: Minimize2,
    href: "/tools/compress-pdf",
  },
  {
    name: "PDF Tools",
    description: "Merge, split, compress, and convert PDF files quickly and securely.",
    icon: FileText,
    href: "/tools/pdf-tools",
  },
  {
    name: "Base64 Encoder & Decoder",
    description:
      "Encode plain text to Base64 or decode Base64 back to text in your browser.",
    icon: Code,
    href: "/tools/base64-encoder-decoder",
  },
  {
    name: "Color Converter",
    description: "Convert colors between HEX, RGB, HSL, and other formats.",
    icon: Palette,
    href: "/tools/color-converter",
  },
  {
    name: "Password Generator",
    description: "Generate strong, secure passwords with customizable options.",
    icon: Lock,
    href: "/tools/password-generator",
  },
  {
    name: "Unit Calculator",
    description: "Convert between different units of measurement easily.",
    icon: Calculator,
    href: "/tools/unit-calculator",
  },
  {
    name: "CSV to JSON",
    description: "Convert CSV data to JSON format and vice versa.",
    icon: FileJson,
    href: "/tools/csv-json",
  },
];

export type CategoryItem = {
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
  count: number;
};

export const defaultCategories: CategoryItem[] = [
  {
    name: "Developer Tools",
    description: "JSON, Base64, regex testing, and more for developers",
    icon: Code2,
    href: "/categories/developer",
    count: 12,
  },
  {
    name: "Image Tools",
    description: "Compress, resize, convert, and edit images online",
    icon: ImageIcon,
    href: "/categories/image",
    count: 8,
  },
  {
    name: "PDF Tools",
    description: "Merge, split, compress, and convert PDF documents",
    icon: FileText,
    href: "/categories/pdf",
    count: 6,
  },
  {
    name: "Calculators",
    description: "Unit converters, percentage calculators, and more",
    icon: Calculator,
    href: "/categories/calculators",
    count: 10,
  },
];

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
  { label: "Blog", href: "#blog" },
  { label: "About", href: "#about" },
];

export type FooterColumn = { title: string; links: { name: string; href: string }[] };

export const defaultFooterColumns: FooterColumn[] = [
  {
    title: "Tools",
    links: [
      { name: "JSON Formatter", href: "/tools/json-formatter" },
      { name: "Base64 Encoder & Decoder", href: "/tools/base64-encoder-decoder" },
      { name: "Image Compressor", href: "/tools/image-compressor" },
      { name: "Image to WebP", href: "/tools/image-to-webp" },
      { name: "Resize Image", href: "/tools/resize-image" },
      { name: "Crop Image", href: "/tools/crop-image" },
      { name: "PNG to JPG", href: "/tools/png-to-jpg" },
      { name: "JPG to PNG", href: "/tools/jpg-to-png" },
      { name: "Merge PDF", href: "/tools/merge-pdf" },
      { name: "Split PDF", href: "/tools/split-pdf" },
      { name: "Compress PDF", href: "/tools/compress-pdf" },
      { name: "PDF Tools", href: "/tools/pdf-tools" },
      { name: "All Tools", href: "/tools" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
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
