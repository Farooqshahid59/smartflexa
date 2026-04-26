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
  imageToPdfConverter: {
    name: "Image to PDF Converter Free (JPG, PNG to PDF Online)",
    description:
      "Convert images to PDF online for free. Merge multiple images into a single PDF instantly.",
    path: "/tools/image-to-pdf",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Image to PDF",
  },
  jpgToPdf: {
    name: "JPG to PDF — Free Online Converter",
    description:
      "Turn JPEG photos into a printable PDF: multi-file upload, reorder, A4 or Letter, portrait or landscape—client-side on SmartFlexa.",
    path: "/jpg-to-pdf",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "JPG to PDF",
  },
  pngToPdf: {
    name: "PNG to PDF — Lossless Pages Online",
    description:
      "Convert PNG screenshots and graphics into a multi-page PDF with drag-and-drop ordering and local processing.",
    path: "/png-to-pdf",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "PNG to PDF",
  },
  convertImagesToPdf: {
    name: "Convert Images to PDF — Merge JPG, PNG, WebP",
    description:
      "Convert images to PDF in one flow: previews, reorder, page size, orientation, download—runs in your browser.",
    path: "/convert-images-to-pdf",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Convert images to PDF",
  },
  mergeImagesToPdf: {
    name: "Merge Images to PDF — One File, Many Pages",
    description:
      "Merge multiple images into a single PDF document with thumbnails, arrows, and drag reorder. Free SmartFlexa tool.",
    path: "/merge-images-to-pdf",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Merge images to PDF",
  },
  removeBackgroundTool: {
    name: "Remove Background from Image Free (Online Background Remover)",
    description:
      "Remove image background online for free. Simple and fast background remover tool.",
    path: "/tools/remove-background",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Remove background",
  },
  removeBackgroundOnline: {
    name: "Remove Background Online — JPG & PNG, No Upload",
    description:
      "Remove background online in your browser: flood-fill from edges, bright threshold, or color pick—export transparent PNG.",
    path: "/remove-background-online",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Remove background online",
  },
  backgroundRemoverFree: {
    name: "Background Remover Free — Simple Photo Cutout",
    description:
      "Free background remover for product shots and scans: side-by-side preview, solid color fill option, PNG download on SmartFlexa.",
    path: "/background-remover-free",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Background remover free",
  },
  makeImageTransparent: {
    name: "Make Image Transparent — PNG Export",
    description:
      "Make image backgrounds transparent with fast canvas processing—no AI models, optional white replacement, client-side only.",
    path: "/make-image-transparent",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Make image transparent",
  },
  removeWhiteBackground: {
    name: "Remove White Background — Threshold & Edge Tools",
    description:
      "Remove white backgrounds from logos and photos using brightness threshold or border matching. Download PNG from SmartFlexa.",
    path: "/remove-white-background",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Remove white background",
  },
  textToImageTool: {
    name: "Text to Image Generator Free (Create Quote Images Online)",
    description:
      "Convert text into beautiful images. Create quote images and download instantly.",
    path: "/tools/text-to-image",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Text to image",
  },
  quoteImageMaker: {
    name: "Quote Image Maker — Typography on Canvas",
    description:
      "Make quote cards online: fonts, colors, padding, optional photo background—PNG or JPG download in your browser on SmartFlexa.",
    path: "/quote-image-maker",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Quote image maker",
  },
  textToImageOnline: {
    name: "Text to Image Online — Canvas Quote Graphics",
    description:
      "Turn text into images online with live preview, line spacing, center align, and client-side export—no server render on SmartFlexa.",
    path: "/text-to-image-online",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Text to image online",
  },
  createInstagramQuoteImage: {
    name: "Create Instagram Quote Image — 1080×1350 Preset",
    description:
      "Create Instagram quote images with a portrait preset, readable overlays, and instant PNG or JPG download from SmartFlexa.",
    path: "/create-instagram-quote-image",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Instagram quote image",
  },
  writeTextOnImage: {
    name: "Write Text on Image — Captions & Quotes",
    description:
      "Write text on image backgrounds or solid colors: multi-line layout, padding, download PNG/JPG—all local on SmartFlexa.",
    path: "/write-text-on-image",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Write text on image",
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
  caseConverterDev: {
    name: "Case Converter (camelCase, snake_case, kebab-case Online)",
    description:
      "Convert text to camelCase, snake_case, kebab-case and more. Free developer case converter tool.",
    path: "/tools/case-converter-dev",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Case converter (dev)",
  },
  camelCaseConverter: {
    name: "camelCase Converter — JavaScript & JSON Style Names",
    description:
      "Convert phrases to camelCase online: live preview, copy button, optional symbol stripping—runs locally on SmartFlexa.",
    path: "/camelcase-converter",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "camelCase converter",
  },
  snakeCaseConverter: {
    name: "snake_case Converter — Python & SQL Style Names",
    description:
      "Convert text to snake_case online: underscores, lowercase tokens, batch copy with SmartFlexa in your browser.",
    path: "/snake-case-converter",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "snake_case converter",
  },
  kebabCaseConverter: {
    name: "kebab-case Converter — URLs & CSS Friendly",
    description:
      "Convert labels to kebab-case online: hyphenated lowercase slugs, instant copy, client-side on SmartFlexa.",
    path: "/kebab-case-converter",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "kebab-case converter",
  },
  pascalCaseConverter: {
    name: "PascalCase Converter — React & C# Type Names",
    description:
      "Convert phrases to PascalCase online: capitalized words, no separators, copy-ready on SmartFlexa.",
    path: "/pascal-case-converter",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "PascalCase converter",
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
  colorPaletteGenerator: {
    name: "Color Palette Generator Free (From Image & Random Colors)",
    description:
      "Generate beautiful color palettes or extract colors from images. Free online color palette tool.",
    path: "/tools/color-palette-generator",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Color Palette Generator",
  },
  colorPaletteFromImage: {
    name: "Color Palette Generator from Image",
    description:
      "Upload a photo and extract dominant colors into a shareable palette. Free browser-based tool on SmartFlexa.",
    path: "/color-palette-generator-from-image",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Palette from image",
  },
  randomColorPaletteGenerator: {
    name: "Random Color Palette Generator",
    description:
      "Spin harmonious random palettes with HEX and RGB codes, lock swatches, and export JSON or CSS variables.",
    path: "/random-color-palette-generator",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Random palette generator",
  },
  hexColorPaletteGenerator: {
    name: "HEX Color Palette Generator",
    description:
      "Build palettes with copy-ready HEX codes plus RGB values. Export CSS custom properties for your design system.",
    path: "/hex-color-palette-generator",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "HEX palette generator",
  },
  colorCombinationGenerator: {
    name: "Color Combination Generator",
    description:
      "Explore balanced color combinations for interfaces and branding. Generate, lock, and export palettes locally.",
    path: "/color-combination-generator",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Color combination generator",
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
  fakeAddressGenerator: {
    name: "Fake Address Generator Online (Random US, UK, India Addresses)",
    description:
      "Generate random fake addresses for testing and signup forms. Free online tool with US, UK, India, and Canada formats—copy batches in your browser.",
    path: "/tools/fake-address-generator",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Fake Address Generator",
  },
  fakeAddressGeneratorUs: {
    name: "Fake US Address Generator — Random American Test Data",
    description:
      "Generate random US-style addresses for QA: names, streets, cities, states, ZIP codes, and phone patterns. Client-side only—never for fraud or misrepresentation.",
    path: "/fake-address-generator-us",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Fake US address generator",
  },
  fakeAddressGeneratorUk: {
    name: "Fake UK Address Generator — Postcode & County Test Data",
    description:
      "Random UK-style addresses for forms and fixtures: counties, cities, postcodes, and phone patterns. Free browser tool for developers and testers.",
    path: "/fake-address-generator-uk",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Fake UK address generator",
  },
  fakeAddressGeneratorIndia: {
    name: "Fake India Address Generator — PIN & State Test Data",
    description:
      "Generate random India-format addresses with states, cities, PIN codes, and phone-style numbers for testing. Runs locally in your browser.",
    path: "/fake-address-generator-india",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Fake India address generator",
  },
  randomAddressGenerator: {
    name: "Random Address Generator — Multi-Country Test Data",
    description:
      "Create random addresses across US, UK, India, and Canada for demos and QA. Switch countries, batch up to five rows, copy instantly—no backend.",
    path: "/random-address-generator",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Random address generator",
  },
  invoiceGenerator: {
    name: "Free Invoice Generator Online (Create & Download PDF Invoice)",
    description:
      "Create professional invoices online for free. Add items, calculate totals with optional tax, preview instantly, and download PDF—all client-side.",
    path: "/tools/invoice-generator",
    applicationCategory: "FinancialApplication" as const,
    breadcrumbName: "Invoice Generator",
  },
  invoiceGeneratorFree: {
    name: "Invoice Generator Free — PDF Download in Your Browser",
    description:
      "Free invoice generator with line items, tax, live totals, and PDF export. No signup; runs locally in your browser for freelancers and small teams.",
    path: "/invoice-generator-free",
    applicationCategory: "FinancialApplication" as const,
    breadcrumbName: "Invoice generator free",
  },
  simpleInvoiceGenerator: {
    name: "Simple Invoice Generator — Fast PDF Invoices",
    description:
      "Minimal invoice builder: seller, buyer, dates, rows, optional tax, PDF download. Ideal when you need a clean document without accounting software.",
    path: "/simple-invoice-generator",
    applicationCategory: "FinancialApplication" as const,
    breadcrumbName: "Simple invoice generator",
  },
  onlineInvoiceMaker: {
    name: "Online Invoice Maker — Create & Print Invoices",
    description:
      "Make invoices online with a live preview, optional sales tax, and print-friendly layout. Export PDF instantly—no server upload required.",
    path: "/online-invoice-maker",
    applicationCategory: "FinancialApplication" as const,
    breadcrumbName: "Online invoice maker",
  },
  freelanceInvoiceGenerator: {
    name: "Freelance Invoice Generator — Hours & Fixed Fees",
    description:
      "Bill clients for retainers, milestones, or hourly blocks. Free freelance invoice generator with PDF download and clear totals for contracts.",
    path: "/freelance-invoice-generator",
    applicationCategory: "FinancialApplication" as const,
    breadcrumbName: "Freelance invoice generator",
  },
  metaTagGenerator: {
    name: "Meta Tag Generator Free (SEO Meta Tags for Website)",
    description:
      "Generate SEO meta tags for your website including Open Graph and Twitter cards. Live HTML output, search snippet preview, copy to clipboard—runs in your browser.",
    path: "/tools/meta-tag-generator",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Meta Tag Generator",
  },
  keywordDensityChecker: {
    name: "Keyword Density Checker Free (SEO Keyword Analyzer)",
    description:
      "Check keyword density and frequency in your content. Free SEO keyword density tool.",
    path: "/tools/keyword-density-checker",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Keyword density checker",
  },
  seoKeywordDensityChecker: {
    name: "SEO Keyword Density Checker — Live Table & Highlights",
    description:
      "SEO keyword density checker with sortable frequency table, optional stop-word filter, and highlighted preview—runs locally on SmartFlexa.",
    path: "/seo-keyword-density-checker",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "SEO keyword density checker",
  },
  freeKeywordDensityTool: {
    name: "Free Keyword Density Tool — Upload .txt or Paste",
    description:
      "Free keyword density tool: count tokens, density percentages, filter stop words, .txt upload, mobile-friendly table on SmartFlexa.",
    path: "/free-keyword-density-tool",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Free keyword density tool",
  },
  checkKeywordDensityOnline: {
    name: "Check Keyword Density Online — Analyzer in Browser",
    description:
      "Check keyword density online without uploads to a server: instant stats, sort by frequency, highlight top terms on SmartFlexa.",
    path: "/check-keyword-density-online",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Check keyword density online",
  },
  keywordAnalyzerTool: {
    name: "Keyword Analyzer Tool — Frequency & Percentages",
    description:
      "Keyword analyzer tool for writers and SEOs: vocabulary size, density column, stop-word toggle—client-side on SmartFlexa.",
    path: "/keyword-analyzer-tool",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Keyword analyzer tool",
  },
  aiTextSummarizer: {
    name: "AI Text Summarizer Free (Summarize Articles Instantly)",
    description:
      "Summarize long text, articles, and content instantly using AI. Free online text summarizer.",
    path: "/tools/ai-text-summarizer",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "AI text summarizer",
  },
  articleSummarizer: {
    name: "Article Summarizer — AI Briefs from Long Reads",
    description:
      "Article summarizer powered by Hugging Face BART: short, medium, or detailed summaries with copy—via SmartFlexa.",
    path: "/article-summarizer",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Article summarizer",
  },
  textSummarizerOnline: {
    name: "Text Summarizer Online — Paste & Summarize",
    description:
      "Text summarizer online: compress articles and notes with length presets and instant copy on SmartFlexa.",
    path: "/text-summarizer-online",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Text summarizer online",
  },
  aiSummaryGenerator: {
    name: "AI Summary Generator — Fast Abstracts",
    description:
      "AI summary generator for blogs and reports: Hugging Face inference, responsive UI, copy-ready output on SmartFlexa.",
    path: "/ai-summary-generator",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "AI summary generator",
  },
  summarizeTextFree: {
    name: "Summarize Text Free — AI Shortener",
    description:
      "Summarize text free online: long-form input limits, Hugging Face BART summaries, and one-click copy on SmartFlexa.",
    path: "/summarize-text-free",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Summarize text free",
  },
  aiGrammarFixer: {
    name: "AI Grammar Fixer Free (Correct Sentences Instantly)",
    description:
      "Fix grammar mistakes and improve sentences instantly using AI. Free grammar correction tool online.",
    path: "/tools/ai-grammar-fixer",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "AI grammar fixer",
  },
  grammarCheckerOnline: {
    name: "Grammar Checker Online — AI Sentence Fixer",
    description:
      "Check grammar online and improve sentence clarity instantly with AI-powered correction on SmartFlexa.",
    path: "/grammar-checker-online",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Grammar checker online",
  },
  fixSentencesOnline: {
    name: "Fix Sentences Online — Rewrite for Clarity",
    description:
      "Fix sentences online with AI grammar correction, clearer phrasing, and copy-ready output on SmartFlexa.",
    path: "/fix-sentences-online",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Fix sentences online",
  },
  correctGrammarText: {
    name: "Correct Grammar Text — Instant AI Proofing",
    description:
      "Correct grammar text with AI in your browser: punctuation fixes, rewritten phrasing, and clean copy output.",
    path: "/correct-grammar-text",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Correct grammar text",
  },
  aiGrammarCorrection: {
    name: "AI Grammar Correction — Rewrite and Polish",
    description:
      "AI grammar correction tool for emails, blogs, and notes with fast Hugging Face inference on SmartFlexa.",
    path: "/ai-grammar-correction",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "AI grammar correction",
  },
  openGraphPreviewTool: {
    name: "Open Graph Preview Tool (Facebook & Twitter Link Preview)",
    description:
      "Preview how your website link will appear on Facebook and Twitter. Test Open Graph meta tags instantly.",
    path: "/tools/open-graph-preview",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Open Graph Preview",
  },
  facebookLinkPreview: {
    name: "Facebook Link Preview — See Your Share Card",
    description:
      "Visualize Facebook-style link previews from Open Graph tags. Edit title, description, and image locally on SmartFlexa.",
    path: "/facebook-link-preview",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Facebook link preview",
  },
  twitterCardPreview: {
    name: "Twitter Card Preview — X Link Appearance",
    description:
      "Preview summary_large_image style cards for X (Twitter): title, description, domain, and image before you post.",
    path: "/twitter-card-preview",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Twitter card preview",
  },
  openGraphChecker: {
    name: "Open Graph Checker — Validate OG Tags Visually",
    description:
      "Check Open Graph titles, descriptions, and images with live mockups. Optional URL fetch when CORS allows.",
    path: "/open-graph-checker",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Open Graph checker",
  },
  socialSharePreviewTool: {
    name: "Social Share Preview Tool",
    description:
      "Test how URLs may look when shared across social networks. Facebook and Twitter-style previews with copy-ready meta tags.",
    path: "/social-share-preview-tool",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Social share preview",
  },
  textDiffChecker: {
    name: "Text Diff Checker Online (Compare Two Texts Instantly)",
    description:
      "Compare two texts and find differences instantly. Free online text diff checker with highlights.",
    path: "/tools/text-diff-checker",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Text Diff Checker",
  },
  compareTwoTexts: {
    name: "Compare Two Texts — Side-by-Side Line Diff",
    description:
      "Compare two texts online with highlighted additions, removals, and changes. Optional .txt upload and ignore-case or whitespace modes on SmartFlexa.",
    path: "/compare-two-texts",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Compare two texts",
  },
  textDifferenceChecker: {
    name: "Text Difference Checker — Find Edits Fast",
    description:
      "Find differences between drafts with a line diff table, unified diff export, and local-only processing in your browser.",
    path: "/text-difference-checker",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Text difference checker",
  },
  compareFilesOnline: {
    name: "Compare Files Online — Plain Text .txt Diff",
    description:
      "Upload two text files and see a highlighted comparison. No server upload; SmartFlexa reads files locally with FileReader.",
    path: "/compare-files-online",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Compare files online",
  },
  diffCheckerOnline: {
    name: "Diff Checker Online — Line Highlights & Copy",
    description:
      "Online diff checker for two versions: red removals, green additions, yellow substitutions, copy-ready output—client-side.",
    path: "/diff-checker-online",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Diff checker online",
  },
  seoMetaTagGenerator: {
    name: "SEO Meta Tag Generator — Titles, Descriptions & Robots",
    description:
      "Free SEO meta tag generator: titles, meta descriptions, robots, viewport, and social tags with instant preview. Client-side only for SmartFlexa builders.",
    path: "/seo-meta-tag-generator",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "SEO meta tag generator",
  },
  openGraphGenerator: {
    name: "Open Graph Generator — og:title, og:image & More",
    description:
      "Build Open Graph meta tags for link previews: og:title, og:description, og:image, og:type. Pair with Twitter fields in one SmartFlexa editor.",
    path: "/open-graph-generator",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Open Graph generator",
  },
  twitterCardGenerator: {
    name: "Twitter Card Generator — twitter:title & Image Tags",
    description:
      "Generate Twitter Card meta tags: card type, title, description, and image URL. Free browser tool with live HTML for X and embedded previews.",
    path: "/twitter-card-generator",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Twitter card generator",
  },
  htmlMetaTagsGenerator: {
    name: "HTML Meta Tags Generator — Paste-Ready Head Markup",
    description:
      "Create HTML meta tags for any page: description, keywords, author, viewport, robots, Open Graph, and Twitter. Copy clean markup instantly.",
    path: "/html-meta-tags-generator",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "HTML meta tags generator",
  },
  robotsTxtGenerator: {
    name: "Robots.txt Generator Free (Create SEO Robots File Instantly)",
    description:
      "Generate robots.txt for your website: User-agent, Allow/Disallow paths, optional Crawl-delay, Sitemap URLs. Presets, live preview, copy and download—client-side.",
    path: "/tools/robots-txt-generator",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Robots.txt Generator",
  },
  createRobotsTxt: {
    name: "Create robots.txt — Crawl Rules & Sitemap Lines",
    description:
      "Create robots.txt online with Allow/Disallow groups, crawl-delay, and sitemap entries. Free SmartFlexa editor with copy and .txt download.",
    path: "/create-robots-txt",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Create robots.txt",
  },
  robotsTxtGeneratorOnline: {
    name: "Robots.txt Generator Online — Browser-Only Builder",
    description:
      "Robots.txt generator online: edit paths in real time, apply presets, export robots.txt without uploading your site to a server.",
    path: "/robots-txt-generator-online",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Robots.txt generator online",
  },
  robotsTxtForSeo: {
    name: "Robots.txt for SEO — Control Crawling & Duplicates",
    description:
      "Learn how robots.txt for SEO fits with sitemaps and meta robots. Build rules, preview output, and download a clean robots.txt file.",
    path: "/robots-txt-for-seo",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Robots.txt for SEO",
  },
  howToCreateRobotsTxt: {
    name: "How to Create robots.txt — Step-by-Step File Builder",
    description:
      "How to create robots.txt: user-agent blocks, allow/disallow paths, sitemaps, and validation tips. Same SmartFlexa generator with focused guidance.",
    path: "/how-to-create-robots-txt",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "How to create robots.txt",
  },
  sitemapGenerator: {
    name: "Sitemap Generator Free (Create XML Sitemap Online)",
    description:
      "Generate XML sitemap for your website: URLs, changefreq, priority, optional lastmod. Bulk paste, validation, copy and download sitemap.xml—client-side.",
    path: "/tools/sitemap-generator",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Sitemap Generator",
  },
  xmlSitemapGenerator: {
    name: "XML Sitemap Generator — urlset, loc & lastmod",
    description:
      "XML sitemap generator with standards-compliant urlset output, optional lastmod, and changefreq. Free SmartFlexa tool with live preview and download.",
    path: "/xml-sitemap-generator",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "XML sitemap generator",
  },
  freeSitemapGenerator: {
    name: "Free Sitemap Generator — No Signup XML Export",
    description:
      "Free sitemap generator: combine site URL, manual rows, and bulk paste into sitemap.xml. Copy or download instantly in your browser.",
    path: "/free-sitemap-generator",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Free sitemap generator",
  },
  sitemapGeneratorOnline: {
    name: "Sitemap Generator Online — Browser-Only Builder",
    description:
      "Sitemap generator online: build sitemap.xml without uploading your site. Edit URLs, set priority, export XML locally on SmartFlexa.",
    path: "/sitemap-generator-online",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Sitemap generator online",
  },
  createSitemapXml: {
    name: "Create Sitemap XML — URLs, Priority & Changefreq",
    description:
      "Create sitemap XML files for SEO: list loc entries, tune changefreq and priority, optional lastmod. Same editor as the main SmartFlexa sitemap generator.",
    path: "/create-sitemap-xml",
    applicationCategory: "DeveloperApplication" as const,
    breadcrumbName: "Create sitemap XML",
  },
  usernameGenerator: {
    name: "Username Generator Free (Cool, Gaming & Instagram Names)",
    description:
      "Generate unique usernames for Instagram, gaming, and social media. Categories, length, numbers and symbols—batch copy in your browser.",
    path: "/tools/username-generator",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Username Generator",
  },
  instagramUsernameGenerator: {
    name: "Instagram Username Generator — Aesthetic Handles",
    description:
      "Instagram username generator with soft presets, optional dots and underscores, batch ideas, and copy—all client-side on SmartFlexa.",
    path: "/instagram-username-generator",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Instagram username generator",
  },
  gamingUsernameGenerator: {
    name: "Gaming Username Generator — Gamertag Ideas",
    description:
      "Gaming username generator for competitive handles: edgy word pools, optional numbers, batch regenerate, copy list locally.",
    path: "/gaming-username-generator",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Gaming username generator",
  },
  coolUsernameGenerator: {
    name: "Cool Username Generator — Stylish Screen Names",
    description:
      "Cool username generator with modern adjective+noun blends, length control, and optional symbols. Free batch ideas online.",
    path: "/cool-username-generator",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Cool username generator",
  },
  usernameIdeas: {
    name: "Username Ideas — Brainstorm Handles & Tags",
    description:
      "Username ideas tool: generate batches for social and gaming, tweak categories, copy results. Same SmartFlexa generator with creative prompts.",
    path: "/username-ideas",
    applicationCategory: "UtilityApplication" as const,
    breadcrumbName: "Username ideas",
  },
} satisfies Record<string, ToolSchemaInput>;
