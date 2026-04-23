import { siteUrl } from "@/lib/site";

/** Alias for structured data (same host as `siteUrl`). */
export const siteUrlBare = siteUrl;

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

type ToolCategory =
  | "DeveloperApplication"
  | "UtilityApplication"
  | "SecurityApplication"
  | "FinancialApplication"
  | "HealthApplication";

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
  passportPhotoMaker: {
    name: "Passport Size Photo Maker Online Free (2x2, Visa Photos)",
    description:
      "Free online passport and visa photo maker: 2×2 inch style, UK and India 35×45 mm presets, custom size, square crop, white background, JPG and optional A4 sheet—all in your browser.",
    path: "/tools/passport-photo-maker",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Passport Photo Maker",
  },
  passportPhotoSizeUs: {
    name: "US Passport Photo Size (2×2 inches) — Online Maker",
    description:
      "US passport photo size guide: 2×2 inch prints and common 600×600 px digital files. Crop, white background, JPG and A4 sheet in your browser—always confirm with travel.state.gov.",
    path: "/passport-photo-size-us",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "US passport photo size",
  },
  passportPhotoSizeIndia: {
    name: "India Passport Photo Size (35×45 mm) — Online Maker",
    description:
      "India passport photo dimensions: 35×45 mm prints and typical digital exports. Free crop-and-export tool in your browser; verify file size and rules on the official PSK portal.",
    path: "/passport-photo-size-india",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "India passport photo size",
  },
  passportPhotoSizeUk: {
    name: "UK Passport Photo Size (35×45 mm) — Online Maker",
    description:
      "UK passport photo size in millimetres and pixels, plain background, and how to export a JPG at home. Browser-only tool; check GOV.UK for the latest photo rules before you apply.",
    path: "/passport-photo-size-uk",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "UK passport photo size",
  },
  twoByTwoPhotoMaker: {
    name: "2×2 Photo Maker Online Free (Passport & ID)",
    description:
      "Make a 2 inch by 2 inch photo online: square crop, 600×600 px export, white background, JPG download and optional A4 print grid. Runs locally in your browser for US-style IDs and forms.",
    path: "/2x2-photo-maker",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "2×2 photo maker",
  },
  mergePdf: {
    name: "PDF Merge Tool",
    description:
      "Combine multiple PDF files into one instantly. Free online PDF merge tool with secure processing and fast download.",
    path: "/tools/merge-pdf",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Merge PDF",
  },
  splitPdf: {
    name: "PDF Split Tool",
    description:
      "Split PDF files online and extract pages easily. Free and secure PDF splitter with fast processing.",
    path: "/tools/split-pdf",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Split PDF",
  },
  compressPdf: {
    name: "PDF Compressor Tool",
    description:
      "Reduce PDF file size online with our free PDF compressor. Fast, secure, and easy to use.",
    path: "/tools/compress-pdf",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Compress PDF",
  },
  pdfToWord: {
    name: "PDF to Word Converter",
    description:
      "Convert PDF files to editable Word documents with preview and download. Free and secure tool.",
    path: "/tools/pdf-to-word",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "PDF to Word Converter",
  },
  wordToPdf: {
    name: "Word to PDF Converter",
    description:
      "Convert DOC and DOCX files to PDF with preview and download. Free and secure tool.",
    path: "/tools/word-to-pdf",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Word to PDF Converter",
  },
  removeDuplicateLines: {
    name: "Remove Duplicate Lines Tool",
    description:
      "Remove duplicate lines from text online for free. Clean and deduplicate text instantly while preserving order. Fast and secure.",
    path: "/tools/remove-duplicate-lines",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Remove Duplicate Lines",
  },
  textCaseConverter: {
    name: "Text Case Converter",
    description:
      "Convert text to uppercase, lowercase, title case, or sentence case instantly. Free online tool for SmartFlexa — runs in your browser.",
    path: "/tools/text-case-converter",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Text Case Converter",
  },
  slugGenerator: {
    name: "Slug Generator Tool",
    description:
      "Generate SEO-friendly URL slugs from titles or phrases. Clean, readable permalinks for websites and blogs — free and runs in your browser.",
    path: "/tools/slug-generator",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Slug Generator",
  },
  urlEncoderDecoder: {
    name: "URL Encoder Decoder Tool",
    description:
      "Encode and decode URL components with percent-encoding. Fast, free online tool for SmartFlexa — runs in your browser.",
    path: "/tools/url-encoder-decoder",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "URL Encoder Decoder",
  },
  passwordGenerator: {
    name: "Password Generator Tool",
    description:
      "Generate secure random passwords with customizable length and character sets. Free strength-aware password generator — runs in your browser.",
    path: "/tools/password-generator",
    applicationCategory: "SecurityApplication" as const,
    breadcrumbName: "Password Generator",
  },
  htmlToText: {
    name: "HTML to Text Converter",
    description:
      "Convert HTML to plain text online. Strip tags, decode entities, and keep readable line breaks — free and runs in your browser.",
    path: "/tools/html-to-text",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "HTML to Text Converter",
  },
  jsonMinifier: {
    name: "JSON Minifier Tool",
    description:
      "Minify JSON online: remove whitespace and line breaks for smaller payloads. Free, fast, and runs in your browser.",
    path: "/tools/json-minifier",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "JSON Minifier",
  },
  qrCodeGenerator: {
    name: "QR Code Generator",
    description:
      "Create QR codes for URLs and text in your browser. Free instant preview and PNG download—no signup.",
    path: "/tools/qr-code-generator",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "QR Code Generator",
  },
  loremIpsumGenerator: {
    name: "Lorem Ipsum Generator",
    description:
      "Generate lorem ipsum placeholder paragraphs with optional word counts. Free dummy text for layouts—runs in your browser.",
    path: "/tools/lorem-ipsum-generator",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Lorem Ipsum Generator",
  },
  randomNumberGenerator: {
    name: "Random Number Generator",
    description:
      "Generate random integers in a range with optional batch count. Free, fast, and runs in your browser.",
    path: "/tools/random-number-generator",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Random Number Generator",
  },
  uuidGenerator: {
    name: "UUID Generator",
    description:
      "Generate RFC 4122 version 4 UUIDs in your browser. Batch copy for APIs, databases, and testing—free and secure.",
    path: "/tools/uuid-generator",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "UUID Generator",
  },
  colorPicker: {
    name: "Color Picker Tool",
    description:
      "Pick colors and convert HEX to RGB instantly in your browser. Free online color picker and converter for developers and designers.",
    path: "/tools/color-picker",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Color Picker",
  },
  percentageCalculator: {
    name: "Percentage Calculator",
    description:
      "Calculate percentages, percent increase and decrease, and percentage difference between two values. Free online calculator—runs in your browser.",
    path: "/tools/percentage-calculator",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Percentage Calculator",
  },
  ageCalculator: {
    name: "Age Calculator",
    description:
      "Calculate age in years, months, and days from date of birth. Free online age calculator with total days lived—runs in your browser.",
    path: "/tools/age-calculator",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Age Calculator",
  },
  emiCalculator: {
    name: "EMI Calculator",
    description:
      "Calculate loan EMI, total interest, and total payment from principal, annual rate, and tenure. Free online EMI calculator for planning—runs in your browser.",
    path: "/tools/emi-calculator",
    applicationCategory: "FinancialApplication" as const,
    breadcrumbName: "EMI Calculator",
  },
  bmiCalculator: {
    name: "BMI Calculator",
    description:
      "Calculate Body Mass Index (BMI) from weight and height with category guidance. Free online BMI calculator—runs in your browser; not medical advice.",
    path: "/tools/bmi-calculator",
    applicationCategory: "HealthApplication" as const,
    breadcrumbName: "BMI Calculator",
  },
  unitConverter: {
    name: "Unit Converter",
    description:
      "Convert length, weight, temperature, and speed between common units. Free online unit converter—runs in your browser.",
    path: "/tools/unit-converter",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Unit Converter",
  },
  discountCalculator: {
    name: "Discount Calculator",
    description:
      "Calculate discount amount and final price from original price and percent off. Free online discount calculator—runs in your browser.",
    path: "/tools/discount-calculator",
    applicationCategory: "FinancialApplication" as const,
    breadcrumbName: "Discount Calculator",
  },
  timeZoneConverter: {
    name: "Time Zone Converter",
    description:
      "Convert date and time between IANA time zones with DST-aware results. Free online time zone converter—runs in your browser.",
    path: "/tools/time-zone-converter",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Time Zone Converter",
  },
  imageToBase64: {
    name: "Image to Base64 Converter",
    description:
      "Encode JPG, PNG, and WebP images to Base64 data URLs with preview and copy. Free online tool—runs in your browser.",
    path: "/tools/image-to-base64",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Image to Base64 Converter",
  },
  qrCodeScanner: {
    name: "QR Code Scanner",
    description:
      "Scan QR codes with your camera or from an uploaded image. Free online QR scanner—decoding runs in your browser.",
    path: "/tools/qr-code-scanner",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "QR Code Scanner",
  },
  signatureGenerator: {
    name: "Signature Generator Online Free (Draw or Type Your Signature)",
    description:
      "Create your digital signature online for free. Draw or type your signature and download instantly as PNG with optional transparent background—all in your browser.",
    path: "/tools/signature-generator",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Signature Generator",
  },
  drawSignatureOnline: {
    name: "Draw Signature Online Free",
    description:
      "Draw your signature online with mouse or touch, adjust pen thickness and color, and download a PNG. Client-side canvas—no upload to servers.",
    path: "/draw-signature-online",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Draw signature online",
  },
  typeSignatureOnline: {
    name: "Type Signature Online Free",
    description:
      "Type your name and pick from script-style fonts to create a signature image. Download PNG instantly in your browser.",
    path: "/type-signature-online",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Type signature online",
  },
  digitalSignatureGenerator: {
    name: "Digital Signature Generator (Image PNG)",
    description:
      "Generate a digital signature image online: draw or type, transparent or white background, PNG download. Runs locally—know when your workflow needs certified e-sign instead.",
    path: "/digital-signature-generator",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Digital signature generator",
  },
} satisfies Record<string, ToolSchemaInput>;
