"use client";

import Link from "next/link";
import { PDFDocument } from "pdf-lib";
import {
  ChangeEvent,
  DragEvent,
  useId,
  useRef,
  useState,
} from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { ImagePdfInboundLinks } from "@/components/image-pdf-inbound-links";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

type CompressLevel = "low" | "medium" | "high";

function isPdfFile(file: File): boolean {
  if (file.type === "application/pdf") return true;
  return file.name.toLowerCase().endsWith(".pdf");
}

function formatKB(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function uint8ToArrayBuffer(u8: Uint8Array): ArrayBuffer {
  const out = new ArrayBuffer(u8.byteLength);
  new Uint8Array(out).set(u8);
  return out;
}

/**
 * Rebuilds the PDF with pdf-lib and applies object-stream settings.
 * Low = larger file / minimal restructuring; high = extra normalization pass.
 */
async function compressPdf(bytes: ArrayBuffer, level: CompressLevel): Promise<Uint8Array> {
  const src = await PDFDocument.load(bytes);
  const out = await PDFDocument.create();
  const copied = await out.copyPages(src, src.getPageIndices());
  copied.forEach((p) => out.addPage(p));

  if (level === "low") {
    return out.save({ useObjectStreams: false });
  }
  if (level === "medium") {
    return out.save({ useObjectStreams: true });
  }
  const first = await out.save({ useObjectStreams: true });
  const src2 = await PDFDocument.load(first);
  const out2 = await PDFDocument.create();
  const copied2 = await out2.copyPages(src2, src2.getPageIndices());
  copied2.forEach((p) => out2.addPage(p));
  return out2.save({ useObjectStreams: true });
}

const LEVELS: { id: CompressLevel; label: string; hint: string }[] = [
  {
    id: "low",
    label: "Low compression",
    hint: "Best compatibility; larger file",
  },
  {
    id: "medium",
    label: "Medium compression",
    hint: "Balanced size and quality",
  },
  {
    id: "high",
    label: "High compression",
    hint: "Smaller file; extra optimization pass",
  },
];

export default function CompressPdfPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputHintId = useId();
  const errorId = useId();
  const levelGroupId = useId();

  const [file, setFile] = useState<File | null>(null);
  const [srcBytes, setSrcBytes] = useState<ArrayBuffer | null>(null);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [level, setLevel] = useState<CompressLevel>("medium");
  const [isDropActive, setIsDropActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadFile = async (next: File | null) => {
    setError(null);
    setCompressedBlob(null);
    setCompressedSize(null);
    if (!next) {
      setFile(null);
      setSrcBytes(null);
      setOriginalSize(null);
      return;
    }
    if (!isPdfFile(next)) {
      setError("Please upload a PDF file.");
      return;
    }
    try {
      const bytes = await next.arrayBuffer();
      await PDFDocument.load(bytes);
      setFile(next);
      setSrcBytes(bytes);
      setOriginalSize(bytes.byteLength);
    } catch {
      setFile(null);
      setSrcBytes(null);
      setOriginalSize(null);
      setError("Could not read PDF (invalid or password-protected).");
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    void loadFile(e.target.files?.[0] ?? null);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropActive(false);
    void loadFile(e.dataTransfer.files?.[0] ?? null);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropActive(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropActive(false);
  };

  const handleCompress = async () => {
    setError(null);
    setCompressedBlob(null);
    setCompressedSize(null);
    if (!srcBytes || !file) {
      setError("Upload a PDF first.");
      return;
    }
    setIsProcessing(true);
    try {
      const out = await compressPdf(srcBytes, level);
      const buf = uint8ToArrayBuffer(out);
      const blob = new Blob([buf], { type: "application/pdf" });
      setCompressedBlob(blob);
      setCompressedSize(blob.size);
    } catch {
      setError("Compression failed. Try another PDF or a different level.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedBlob || !file) return;
    const base = file.name.replace(/\.pdf$/i, "") || "document";
    const url = URL.createObjectURL(compressedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${base}-compressed.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setFile(null);
    setSrcBytes(null);
    setOriginalSize(null);
    setCompressedBlob(null);
    setCompressedSize(null);
    setError(null);
    setLevel("medium");
    if (inputRef.current) inputRef.current.value = "";
  };

  const canCompress = Boolean(file && srcBytes && !isProcessing);
  const savedPct =
    originalSize && compressedSize != null && originalSize > 0
      ? Math.max(0, Math.round((1 - compressedSize / originalSize) * 100))
      : null;

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.compressPdf)} />
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
        aria-labelledby="compress-pdf-heading"
      >
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mb-8 text-center sm:text-left">
            <nav aria-label="Breadcrumb">
              <p className="text-sm font-medium text-muted-foreground">
                <Link href="/" className="hover:text-foreground">
                  Home
                </Link>
                <span className="mx-2 text-border" aria-hidden>
                  /
                </span>
                <span>Tools</span>
                <span className="mx-2 text-border" aria-hidden>
                  /
                </span>
                <span className="text-foreground">Compress PDF</span>
              </p>
            </nav>
            <h1
              id="compress-pdf-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Compress PDF Online Free (Reduce File Size)
            </h1>
            <p
              id={inputHintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Shrink PDF file size in your browser with low, medium, or high compression
              presets.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="compress-pdf-heading"
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
                isDropActive
                  ? "border-primary bg-primary/5"
                  : "border-border bg-muted/20 hover:bg-muted/30"
              }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  inputRef.current?.click();
                }
              }}
              aria-label="Upload PDF by clicking or dragging and dropping"
            >
              <p className="text-sm font-medium text-foreground">
                Drag & drop a PDF here, or click to upload
              </p>
              <p className="mt-1 text-xs text-muted-foreground">PDF only</p>
            </div>

            {file && originalSize != null ? (
              <p className="mt-4 text-sm text-foreground">
                <span className="font-medium">File:</span>{" "}
                <span className="break-all">{file.name}</span>
                <span className="text-muted-foreground">
                  {" "}
                  · {formatKB(originalSize)}
                </span>
              </p>
            ) : null}

            <fieldset className="mt-6">
              <legend id={levelGroupId} className="text-sm font-medium text-foreground">
                Compression level
              </legend>
              <div
                className="mt-3 space-y-3"
                role="radiogroup"
                aria-labelledby={levelGroupId}
              >
                {LEVELS.map((opt) => (
                  <label
                    key={opt.id}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-muted/10 px-3 py-3 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                  >
                    <input
                      type="radio"
                      name="compress-level"
                      value={opt.id}
                      checked={level === opt.id}
                      onChange={() => setLevel(opt.id)}
                      className="mt-1 h-4 w-4 border-border text-primary"
                    />
                    <span>
                      <span className="block text-sm font-medium text-foreground">
                        {opt.label}
                      </span>
                      <span className="text-xs text-muted-foreground">{opt.hint}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => void handleCompress()}
                disabled={!canCompress}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isProcessing ? "Compressing…" : "Compress PDF"}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!compressedBlob || isProcessing}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Download compressed
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={!file && !compressedBlob}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Reset
              </button>
            </div>

            {originalSize != null && compressedSize != null ? (
              <div className="mt-6 rounded-lg border border-border bg-muted/20 p-4 text-sm">
                <p className="font-medium text-foreground">Size comparison</p>
                <div className="mt-2 flex flex-wrap justify-between gap-2 text-muted-foreground">
                  <span>Original</span>
                  <span className="font-medium text-foreground">
                    {formatKB(originalSize)}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap justify-between gap-2 text-muted-foreground">
                  <span>Compressed</span>
                  <span className="font-medium text-foreground">
                    {formatKB(compressedSize)}
                  </span>
                </div>
                {savedPct != null ? (
                  <p className="mt-2 text-xs text-muted-foreground">
                    {savedPct > 0
                      ? `About ${savedPct}% smaller than the original.`
                      : savedPct === 0
                        ? "Similar size to the original (depends on PDF content)."
                        : "Output is larger than the original for this file; you can still download it."}
                  </p>
                ) : null}
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

          <article className="mt-14 space-y-10" aria-labelledby="compress-seo-heading">
            <h2
              id="compress-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is PDF Compression?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              PDF compression reduces file size so documents are easier to email, upload,
              and store. How much you can shrink a file depends on images, fonts, and how
              the PDF was created.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Compress PDF Online
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Upload your PDF.</li>
              <li>Pick low, medium, or high compression.</li>
              <li>Click Compress PDF and review the size comparison.</li>
              <li>Download the compressed file or reset to try another document.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Compress PDF to a Specific Size
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Targets like 100 KB or 200 KB are common for email attachments or upload
              limits. Results vary: image-heavy PDFs shrink more than text-only files. Try
              high compression first; if you still need a smaller file, use an image
              compressor on embedded images or split the PDF into parts.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why Use This Tool?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              It is fast, free, and runs in your browser without forcing you to create an
              account.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  How do I reduce PDF file size?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Upload the PDF, choose a compression level, run compress, then download
                  the result.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Does compression reduce quality?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  This tool rebuilds the PDF structure; visible quality change is usually
                  small, but image-heavy PDFs are more sensitive than text-only ones.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool free?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa PDF compression is free to use.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is my file secure?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Processing happens locally in your browser; your PDF is not uploaded to
                  our servers for this tool.
                </dd>
              </div>
            </dl>

            <ImagePdfInboundLinks />
            <RelatedTools currentPath="/tools/compress-pdf" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
