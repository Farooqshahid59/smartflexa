"use client";

import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
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
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

type ExtractMode = "all" | "range";

function isPdfFile(file: File): boolean {
  if (file.type === "application/pdf") return true;
  return file.name.toLowerCase().endsWith(".pdf");
}

/** 1-based page numbers, sorted, unique. */
function parsePageRangeString(
  input: string,
  totalPages: number,
): { pages: number[]; error: string | null } {
  const trimmed = input.trim();
  if (!trimmed) {
    return { pages: [], error: "Enter a page range (e.g. 1-3, 5, 7-9)." };
  }
  const parts = trimmed
    .split(/[,;\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const set = new Set<number>();
  try {
    for (const part of parts) {
      if (part.includes("-")) {
        const seg = part.split("-").map((s) => s.trim());
        if (seg.length !== 2) {
          return { pages: [], error: `Invalid range: "${part}". Use e.g. 1-3.` };
        }
        const a = Number(seg[0]);
        const b = Number(seg[1]);
        if (!Number.isFinite(a) || !Number.isFinite(b)) {
          return { pages: [], error: `Invalid numbers in "${part}".` };
        }
        const lo = Math.min(Math.floor(a), Math.floor(b));
        const hi = Math.max(Math.floor(a), Math.floor(b));
        for (let p = lo; p <= hi; p++) {
          if (p < 1 || p > totalPages) {
            return {
              pages: [],
              error: `Page ${p} is out of range (1–${totalPages}).`,
            };
          }
          set.add(p);
        }
      } else {
        const n = Number(part);
        if (!Number.isFinite(n) || !Number.isInteger(n)) {
          return { pages: [], error: `Invalid page: "${part}".` };
        }
        if (n < 1 || n > totalPages) {
          return {
            pages: [],
            error: `Page ${n} is out of range (1–${totalPages}).`,
          };
        }
        set.add(n);
      }
    }
  } catch {
    return { pages: [], error: "Could not parse page range." };
  }
  const pages = [...set].sort((x, y) => x - y);
  if (pages.length === 0) {
    return { pages: [], error: "No valid pages in range." };
  }
  return { pages, error: null };
}

async function loadPdfPageCount(bytes: ArrayBuffer): Promise<number> {
  const pdf = await PDFDocument.load(bytes);
  return pdf.getPageCount();
}

async function extractPagesByIndices(
  srcBytes: ArrayBuffer,
  pages1Based: number[],
): Promise<Uint8Array> {
  const src = await PDFDocument.load(srcBytes);
  const out = await PDFDocument.create();
  const zeroBased = pages1Based.map((p) => p - 1);
  const copied = await out.copyPages(src, zeroBased);
  copied.forEach((p) => out.addPage(p));
  return out.save();
}

async function splitEachPage(srcBytes: ArrayBuffer): Promise<Uint8Array[]> {
  const src = await PDFDocument.load(srcBytes);
  const n = src.getPageCount();
  const result: Uint8Array[] = [];
  for (let i = 0; i < n; i++) {
    const out = await PDFDocument.create();
    const [page] = await out.copyPages(src, [i]);
    out.addPage(page);
    result.push(await out.save());
  }
  return result;
}

/** Copies bytes into a fresh ArrayBuffer for Blob/JSZip (avoids SharedArrayBuffer typing issues). */
function uint8ToArrayBuffer(u8: Uint8Array): ArrayBuffer {
  const out = new ArrayBuffer(u8.byteLength);
  new Uint8Array(out).set(u8);
  return out;
}

export default function SplitPdfPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const rangeInputId = useId();
  const inputHintId = useId();
  const errorId = useId();
  const modeAllId = useId();
  const modeRangeId = useId();

  const [file, setFile] = useState<File | null>(null);
  const [srcBytes, setSrcBytes] = useState<ArrayBuffer | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [extractMode, setExtractMode] = useState<ExtractMode>("range");
  const [rangeInput, setRangeInput] = useState("1");
  const [isDropActive, setIsDropActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputName, setOutputName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const resetSource = () => {
    setFile(null);
    setSrcBytes(null);
    setPageCount(null);
    setOutputBlob(null);
    setOutputName("");
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const loadFile = async (next: File | null) => {
    setError(null);
    setOutputBlob(null);
    setOutputName("");
    if (!next) {
      resetSource();
      return;
    }
    if (!isPdfFile(next)) {
      setError("Please upload a PDF file.");
      return;
    }
    try {
      const bytes = await next.arrayBuffer();
      const count = await loadPdfPageCount(bytes);
      setFile(next);
      setSrcBytes(bytes);
      setPageCount(count);
      setRangeInput(count > 0 ? `1-${count}` : "1");
    } catch {
      setFile(null);
      setSrcBytes(null);
      setPageCount(null);
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

  const handleSplit = async () => {
    setError(null);
    setOutputBlob(null);
    setOutputName("");
    if (!srcBytes || pageCount == null || !file) {
      setError("Upload a PDF first.");
      return;
    }

    setIsProcessing(true);
    try {
      if (extractMode === "all") {
        const parts = await splitEachPage(srcBytes);
        const zip = new JSZip();
        for (let i = 0; i < parts.length; i++) {
          zip.file(`page-${i + 1}.pdf`, uint8ToArrayBuffer(parts[i]));
        }
        const blob = await zip.generateAsync({ type: "blob" });
        setOutputBlob(blob);
        const base = file.name.replace(/\.pdf$/i, "") || "document";
        setOutputName(`${base}-pages.zip`);
      } else {
        const parsed = parsePageRangeString(rangeInput, pageCount);
        if (parsed.error || parsed.pages.length === 0) {
          setError(parsed.error ?? "Invalid page range.");
          return;
        }
        const merged = await extractPagesByIndices(srcBytes, parsed.pages);
        setOutputBlob(
          new Blob([uint8ToArrayBuffer(merged)], { type: "application/pdf" }),
        );
        const base = file.name.replace(/\.pdf$/i, "") || "document";
        setOutputName(`${base}-extracted.pdf`);
      }
    } catch {
      setError("Split failed. Try another PDF or check the page range.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputBlob) return;
    const url = URL.createObjectURL(outputBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = outputName || "split-output";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    resetSource();
    setRangeInput("1");
    setExtractMode("range");
  };

  const canSplit =
    Boolean(file && srcBytes && pageCount != null && pageCount > 0) && !isProcessing;

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.splitPdf)} />
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
        aria-labelledby="split-pdf-heading"
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
                <span className="text-foreground">Split PDF</span>
              </p>
            </nav>
            <h1
              id="split-pdf-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Split PDF Online Free (Extract Pages Easily)
            </h1>
            <p
              id={inputHintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Extract specific pages or split every page into its own file—processed in
              your browser.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="split-pdf-heading"
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
              <p className="mt-1 text-xs text-muted-foreground">One PDF at a time</p>
            </div>

            {file ? (
              <p className="mt-4 text-sm text-foreground">
                <span className="font-medium">File:</span>{" "}
                <span className="break-all">{file.name}</span>
                {pageCount != null ? (
                  <span className="text-muted-foreground">
                    {" "}
                    · {pageCount} page{pageCount === 1 ? "" : "s"}
                  </span>
                ) : null}
              </p>
            ) : null}

            <fieldset className="mt-6 space-y-3">
              <legend className="text-sm font-medium text-foreground">
                Extraction mode
              </legend>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                  <input
                    type="radio"
                    name="extract-mode"
                    checked={extractMode === "range"}
                    onChange={() => setExtractMode("range")}
                    className="h-4 w-4 border-border text-primary"
                  />
                  <span id={modeRangeId}>Extract selected pages (page range)</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                  <input
                    type="radio"
                    name="extract-mode"
                    checked={extractMode === "all"}
                    onChange={() => setExtractMode("all")}
                    className="h-4 w-4 border-border text-primary"
                  />
                  <span id={modeAllId}>Extract all pages (one PDF per page, ZIP)</span>
                </label>
              </div>
            </fieldset>

            {extractMode === "range" ? (
              <div className="mt-4">
                <label
                  htmlFor={rangeInputId}
                  className="text-sm font-medium text-foreground"
                >
                  Page range (1-based)
                </label>
                <input
                  id={rangeInputId}
                  type="text"
                  value={rangeInput}
                  onChange={(e) => setRangeInput(e.target.value)}
                  placeholder="e.g. 1-3, 5, 7-9"
                  disabled={!file || pageCount == null}
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Comma-separated pages and ranges. Must be within 1–
                  {pageCount ?? "…"}.
                </p>
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                Each page will be saved as a separate PDF inside a ZIP file.
              </p>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => void handleSplit()}
                disabled={!canSplit}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isProcessing ? "Processing…" : "Split / extract"}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!outputBlob || isProcessing}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Download
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={!file && !outputBlob}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Reset
              </button>
            </div>

            {outputBlob ? (
              <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
                Ready: {outputName} ({(outputBlob.size / 1024).toFixed(1)} KB)
              </p>
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

          <article className="mt-14 space-y-10" aria-labelledby="split-seo-heading">
            <h2
              id="split-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is PDF Splitting?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Splitting a PDF means separating its pages into new files—either selected
              pages combined into one document, or every page as its own file—without
              changing the original content.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Split PDF Online
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Upload your PDF.</li>
              <li>Choose “selected pages” and enter a range, or “all pages” for a ZIP.</li>
              <li>Click Split / extract, then download the result.</li>
              <li>Use Reset to start over.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Extract Pages from PDF
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Pull out chapters, signatures, or attachments; share only the pages you
              need; or archive one page per file for automation and naming.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why Use This Tool?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Fast, free, and runs locally in your browser so your file is not uploaded
              to our servers for processing.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  How do I extract pages from a PDF?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Upload the PDF, choose “selected pages,” enter ranges like 1-3, 5, 7-9,
                  then Split / extract and Download.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Can I split a PDF without losing quality?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Pages are copied into new PDFs; vector and image content is preserved
                  like a normal PDF export from those pages.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool free?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa PDF split is free to use.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is my file secure?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Processing happens on your device. We do not store your PDF on our
                  servers for this tool.
                </dd>
              </div>
            </dl>

            <RelatedTools currentPath="/tools/split-pdf" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
