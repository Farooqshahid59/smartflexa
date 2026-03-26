"use client";

import {
  ChangeEvent,
  DragEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

const ACCEPTED_PDF = "application/pdf";

function isPdfFile(file: File): boolean {
  if (file.type === ACCEPTED_PDF) return true;
  return file.name.toLowerCase().endsWith(".pdf");
}

function formatKB(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function escapeRtf(text: string): string {
  // Basic escaping for RTF control chars.
  return text.replace(/[\\{}]/g, (m) => (m === "\\" ? "\\\\" : `\\${m}`));
}

function buildPlaceholderRtf(input: { filename: string; size: number }): string {
  const safeName = escapeRtf(input.filename);
  const safeSize = escapeRtf(formatKB(input.size));

  // Word can open RTF files even when downloaded with a `.doc` extension.
  return `{\\rtf1\\ansi{\\fonttbl{\\f0 Arial;}}\\fs24\\b PDF to Word Conversion (Placeholder)\\b0\\par
\\fs20 Converted file: ${safeName}\\par
File size: ${safeSize}\\par
\\par
\\fs20 Note: Real PDF-to-Word conversion requires a backend or dedicated conversion library.\\par
This download is a placeholder .doc (RTF) created in your browser for SEO/UI purposes.\\par
}`;
}

export default function PdfToWordPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputHintId = useId();
  const errorId = useId();

  const [file, setFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState<number | null>(null);

  const [docBlob, setDocBlob] = useState<Blob | null>(null);
  const [docUrl, setDocUrl] = useState<string | null>(null);

  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (docUrl) URL.revokeObjectURL(docUrl);
    };
  }, [docUrl]);

  const resetAll = () => {
    setError(null);
    setFile(null);
    setOriginalSize(null);
    if (docUrl) URL.revokeObjectURL(docUrl);
    setDocBlob(null);
    setDocUrl(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handlePick = (next: File | null) => {
    setError(null);
    setDocBlob(null);
    if (docUrl) URL.revokeObjectURL(docUrl);
    setDocUrl(null);

    if (!next) {
      setFile(null);
      setOriginalSize(null);
      return;
    }
    if (!isPdfFile(next)) {
      setFile(null);
      setOriginalSize(null);
      setError("Please upload a PDF file only.");
      return;
    }
    setFile(next);
    setOriginalSize(next.size);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handlePick(e.target.files?.[0] ?? null);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handlePick(e.dataTransfer.files?.[0] ?? null);
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
    setDocBlob(null);
    if (docUrl) URL.revokeObjectURL(docUrl);
    setDocUrl(null);

    if (!file || originalSize == null) {
      setError("Upload a PDF first.");
      return;
    }

    setIsConverting(true);
    try {
      // Placeholder conversion (RTF -> .doc download).
      const rtf = buildPlaceholderRtf({ filename: file.name, size: originalSize });
      const bytes = new TextEncoder().encode(rtf);
      const blob = new Blob([bytes], {
        type: "application/msword;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      setDocBlob(blob);
      setDocUrl(url);
    } catch {
      setError("Conversion failed. Try again with another PDF.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!docBlob || !docUrl || !file) return;
    const base = file.name.replace(/\\.[^.]+$/, "") || "document";
    const a = document.createElement("a");
    a.href = docUrl;
    a.download = `${base}.doc`;
    a.click();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.pdfToWord)} />
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
        aria-labelledby="pdf-to-word-heading"
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
                <span className="text-foreground">PDF to Word</span>
              </p>
            </nav>
            <h1
              id="pdf-to-word-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Convert PDF to Word Online Free
            </h1>
            <p
              id={inputHintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Turn PDF files into editable Word documents with instant download
              (placeholder conversion for now).
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="pdf-to-word-heading"
          >
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,.pdf"
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
              aria-label="Upload a PDF file by clicking or dragging and dropping"
            >
              <p className="text-sm font-medium text-foreground">
                Drag & drop a PDF here, or click to upload
              </p>
              <p className="mt-1 text-xs text-muted-foreground">PDF only</p>
            </div>

            {file ? (
              <p className="mt-4 text-sm text-foreground">
                <span className="font-medium">File:</span>{" "}
                <span className="break-all">{file.name}</span>
                <span className="text-muted-foreground">
                  {" "}
                  · {formatKB(originalSize ?? 0)}
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
                {isConverting ? "Converting…" : "Convert to Word"}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!docBlob || isConverting}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Download .doc
              </button>
              <button
                type="button"
                onClick={resetAll}
                disabled={isConverting}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Reset
              </button>
            </div>

            {docBlob && originalSize != null ? (
              <div className="mt-6 rounded-lg border border-border bg-muted/20 p-4 text-sm">
                <p className="font-medium text-foreground">Size comparison</p>
                <div className="mt-2 flex flex-wrap justify-between gap-2 text-muted-foreground">
                  <span>PDF (original)</span>
                  <span className="font-medium text-foreground">
                    {formatKB(originalSize)}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap justify-between gap-2 text-muted-foreground">
                  <span>DOC (output)</span>
                  <span className="font-medium text-foreground">
                    {formatKB(docBlob.size)}
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

          <article className="mt-14 space-y-10" aria-labelledby="pdf-word-seo-heading">
            <h2
              id="pdf-word-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is PDF to Word Conversion?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              PDF-to-Word conversion transforms a PDF document into an editable Word
              format so you can copy, edit, and reformat the content. PDFs are great
              for sharing, but Word is better for ongoing edits.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Convert PDF to Word Online
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Upload your PDF using drag & drop or the file picker.</li>
              <li>Click “Convert to Word”.</li>
              <li>Review the output download and use it in your editor.</li>
              <li>Reset to start over with a different PDF.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why Use This Tool?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Word documents are easier to edit, share with collaborators, and format
              for reports, resumes, and school assignments.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">Example</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              You upload a PDF, then download an editable .doc file you can update
              with your changes. (Conversion is currently a placeholder for SEO/UI.)
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  Can I convert PDF to Word for free?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. This tool is free to use in your browser.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is formatting preserved?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Formatting preservation depends on the original PDF content. For now,
                  downloads are placeholders intended to keep the UI/SEO flow ready
                  for full conversion later.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my file secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Processing is performed in the browser. This tool does not upload your
                  PDF to a backend for conversion in the placeholder flow.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Do you store files?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  No. We do not store your uploaded files on the server for this
                  placeholder conversion.
                </dd>
              </div>
            </dl>

            <RelatedTools currentPath="/tools/pdf-to-word" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}

