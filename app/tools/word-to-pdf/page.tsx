"use client";

import {
  ChangeEvent,
  DragEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { PDFDocument, StandardFonts } from "pdf-lib";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

const ACCEPTED_TYPES = [
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function isWordFile(file: File): boolean {
  if (ACCEPTED_TYPES.includes(file.type)) return true;
  const lower = file.name.toLowerCase();
  return lower.endsWith(".doc") || lower.endsWith(".docx");
}

function formatKB(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function convertWordToPlaceholderPdf(input: {
  filename: string;
  size: number;
}): Promise<Uint8Array> {
  // Placeholder conversion: generates a simple PDF containing the filename
  // and a note that real DOC/DOCX->PDF conversion requires a backend.
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const title = "PDF Preview (Placeholder)";
  const text = [
    `Converted from: ${input.filename}`,
    `Original size: ${formatKB(input.size)}`,
    "",
    "This is a placeholder PDF for now.",
    "Real DOC/DOCX to PDF conversion will require a backend or dedicated library.",
  ];

  page.drawText(title, { x: 48, y: 720, size: 18, font });
  page.drawText(text.join("\n"), {
    x: 48,
    y: 680,
    size: 12,
    font,
    lineHeight: 14,
  });

  return pdfDoc.save();
}

export default function WordToPdfPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputHintId = useId();
  const errorId = useId();

  const [file, setFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState<number | null>(null);

  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const [isConverting, setIsConverting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  const resetAll = () => {
    setError(null);
    setFile(null);
    setOriginalSize(null);
    setPdfBytes(null);
    setPdfBlob(null);
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const setNewFile = (next: File | null) => {
    setError(null);
    setPdfBytes(null);
    setPdfBlob(null);
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl(null);
    if (!next) {
      setFile(null);
      setOriginalSize(null);
      return;
    }
    if (!isWordFile(next)) {
      setFile(null);
      setOriginalSize(null);
      setError("Please upload a DOC or DOCX file only.");
      return;
    }
    setFile(next);
    setOriginalSize(next.size);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewFile(e.target.files?.[0] ?? null);
    e.target.value = "";
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setNewFile(e.dataTransfer.files?.[0] ?? null);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleConvert = async () => {
    setError(null);
    setPdfBytes(null);
    setPdfBlob(null);
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl(null);

    if (!file || originalSize == null) {
      setError("Upload a Word document first.");
      return;
    }

    setIsConverting(true);
    setIsProcessing(true);
    try {
      const bytes = await convertWordToPlaceholderPdf({
        filename: file.name.replace(/\.[^.]+$/, "") || "document",
        size: originalSize,
      });

      const safeArray = Uint8Array.from(bytes);
      const blob = new Blob([safeArray], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setPdfBytes(bytes);
      setPdfBlob(blob);
      setPdfUrl(url);
    } catch {
      setError("Conversion failed. Try another file.");
    } finally {
      setIsConverting(false);
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!pdfBlob || !file || !pdfUrl) return;
    const base = file.name.replace(/\.[^.]+$/, "") || "document";
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = `${base}.pdf`;
    a.click();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.wordToPdf)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main
        id="main-content"
        className="flex-1 bg-background"
        aria-labelledby="word-to-pdf-heading"
      >
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mb-8 text-center sm:text-left">
            <nav aria-label="Breadcrumb">
              <p className="text-sm font-medium text-muted-foreground">
                <a href="/" className="hover:text-foreground">
                  Home
                </a>
                <span className="mx-2 text-border" aria-hidden>
                  /
                </span>
                <span>Tools</span>
                <span className="mx-2 text-border" aria-hidden>
                  /
                </span>
                <span className="text-foreground">Word to PDF</span>
              </p>
            </nav>
            <h1
              id="word-to-pdf-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Convert Word to PDF Online Free
            </h1>
            <p
              id={inputHintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Convert DOC/DOCX to PDF instantly (placeholder conversion for now).
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="word-to-pdf-heading"
          >
            <input
              ref={inputRef}
              type="file"
              accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              onChange={onInputChange}
            />

            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onClick={() => inputRef.current?.click()}
              className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition ${
                file ? "border-primary bg-primary/5" : "border-border bg-muted/20 hover:bg-muted/30"
              }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  inputRef.current?.click();
                }
              }}
              aria-label="Upload Word file by clicking or dragging and dropping"
            >
              <p className="text-sm font-medium text-foreground">
                Drag & drop a Word file here, or click to upload
              </p>
              <p className="mt-1 text-xs text-muted-foreground">DOC and DOCX only</p>
            </div>

            {file ? (
              <p className="mt-4 text-sm text-foreground">
                <span className="font-medium">File:</span>{" "}
                <span className="break-all">{file.name}</span>
                <span className="text-muted-foreground">
                  {" "}
                  · {originalSize != null ? formatKB(originalSize) : ""}
                </span>
              </p>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => void handleConvert()}
                disabled={!file || isConverting}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isConverting ? "Converting…" : "Convert to PDF"}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!pdfBlob || isConverting}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Download PDF
              </button>
              <button
                type="button"
                onClick={resetAll}
                disabled={isProcessing && !file}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Reset
              </button>
            </div>

            {pdfBlob && originalSize != null ? (
              <div className="mt-6 rounded-lg border border-border bg-muted/20 p-4 text-sm">
                <p className="font-medium text-foreground">Size comparison</p>
                <div className="mt-2 flex flex-wrap justify-between gap-2 text-muted-foreground">
                  <span>DOC/DOCX (original)</span>
                  <span className="font-medium text-foreground">
                    {formatKB(originalSize)}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap justify-between gap-2 text-muted-foreground">
                  <span>PDF (output)</span>
                  <span className="font-medium text-foreground">
                    {formatKB(pdfBlob.size)}
                  </span>
                </div>
              </div>
            ) : null}

            {error ? (
              <p
                id={errorId}
                className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                role="alert"
              >
                {error}
              </p>
            ) : null}
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="word-pdf-seo-heading">
            <h2
              id="word-pdf-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is Word to PDF Conversion?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Word to PDF conversion turns editable DOC/DOCX documents into a
              universally readable PDF format. PDFs are great for sharing, printing,
              and preserving layout across devices.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Convert Word to PDF Online
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Upload a DOC or DOCX file.</li>
              <li>Click “Convert to PDF”.</li>
              <li>Download your PDF output.</li>
              <li>Use Reset to upload another file.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why Convert Word to PDF?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              PDF files are secure, easy to share, and keep formatting consistent.
              They’re also convenient for sending documents to clients or schools.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Example
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Convert a DOCX resume into a PDF so hiring managers can view it
              consistently on any device.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  Can I convert Word to PDF for free?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa’s Word to PDF tool is free to use in your browser.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is formatting preserved?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Formatting depends on the original Word file and the conversion method. This
                  tool currently uses placeholder PDF output for UI/SEO.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my file secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  The placeholder conversion runs locally in your browser and does not store your file.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Do you store files?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  No. We do not store your uploaded documents in this placeholder flow.
                </dd>
              </div>
            </dl>

            <RelatedTools currentPath="/tools/word-to-pdf" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}

