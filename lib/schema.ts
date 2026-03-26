import { siteUrl } from "@/lib/site";

/** Public site URL without www (matches WebSite / SEO requirements). */
export const siteUrlBare = "https://smartflexa.com" as const;

const freeOffer = {
  "@type": "Offer" as const,
  price: "0",
  priceCurrency: "USD",
};

export function getWebSiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SmartFlexa",
    url: siteUrlBare,
    description:
      "Free online tools for developers, creators, and everyday users",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrlBare}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

type ToolCategory = "DeveloperApplication" | "UtilityApplication";

export type ToolSchemaInput = {
  name: string;
  description: string;
  path: `/${string}`;
  applicationCategory: ToolCategory;
  breadcrumbName: string;
};

function absoluteUrl(path: string): string {
  const base = siteUrl.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

function softwareApplicationJsonLd(input: ToolSchemaInput): Record<string, unknown> {
  return {
    "@type": "SoftwareApplication",
    name: input.name,
    applicationCategory: input.applicationCategory,
    operatingSystem: "Web",
    url: absoluteUrl(input.path),
    description: input.description,
    offers: freeOffer,
  };
}

function breadcrumbJsonLd(input: ToolSchemaInput): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${absoluteUrl("/")}#tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: input.breadcrumbName,
        item: absoluteUrl(input.path),
      },
    ],
  };
}

/** Single JSON-LD document with @graph (SoftwareApplication + BreadcrumbList). */
export function getToolPageJsonLd(input: ToolSchemaInput): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      softwareApplicationJsonLd(input),
      breadcrumbJsonLd(input),
    ],
  };
}

/** Central metadata for tool routes — avoids duplicating strings across pages. */
export const toolSchemas = {
  jsonFormatter: {
    name: "JSON Formatter",
    description:
      "Free online JSON formatter and validator for SmartFlexa. Pretty-print JSON with 2-space indentation, fix errors, and copy formatted output — runs in your browser.",
    path: "/tools/json-formatter",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "JSON Formatter",
  },
  wordCounter: {
    name: "Word Counter",
    description:
      "Free online word counter for SmartFlexa. Count words, characters, and sentences in real time as you type — runs in your browser, no signup required.",
    path: "/tools/word-counter",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Word Counter",
  },
  base64: {
    name: "Base64 Encoder & Decoder",
    description:
      "Encode and decode Base64 instantly with our free online tool. Fast, secure, and easy to use.",
    path: "/tools/base64-encoder-decoder",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Base64 Encoder & Decoder",
  },
  imageCompressor: {
    name: "Image Compressor",
    description:
      "Reduce image size online to specific KB. Free image compressor with preview and download. Fast and secure.",
    path: "/tools/image-compressor",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Image Compressor",
  },
  imageToWebp: {
    name: "Image to WebP Converter",
    description:
      "Convert JPG and PNG images to WebP format online. Reduce image size and improve performance. Free and secure tool.",
    path: "/tools/image-to-webp",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Image to WebP Converter",
  },
  resizeImage: {
    name: "Image Resizer Tool",
    description:
      "Resize images to any size or preset dimensions like passport and Instagram. Free online image resizer tool with instant preview.",
    path: "/tools/resize-image",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Resize Image",
  },
  pngToJpg: {
    name: "PNG to JPG Converter",
    description:
      "Free online PNG to JPG converter. Convert PNG images to JPG instantly with preview and download. Fast and secure.",
    path: "/tools/png-to-jpg",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "PNG to JPG Converter",
  },
  jpgToPng: {
    name: "JPG to PNG Converter",
    description:
      "Free JPG to PNG converter. Convert JPEG images to PNG instantly with preview and download. Fast and secure tool.",
    path: "/tools/jpg-to-png",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "JPG to PNG Converter",
  },
  cropImage: {
    name: "Image Crop Tool",
    description:
      "Crop images online easily with rectangle or circle crop. Free tool for Instagram, profile pictures, and more.",
    path: "/tools/crop-image",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Crop Image",
  },
  mergePdf: {
    name: "PDF Merge Tool",
    description:
      "Combine multiple PDF files into one instantly. Free online PDF merge tool with secure processing and fast download.",
    path: "/tools/merge-pdf",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Merge PDF",
  },
} satisfies Record<string, ToolSchemaInput>;
