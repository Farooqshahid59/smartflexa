"use client";

import { PDFDocument } from "pdf-lib";
import {
  ChangeEvent,
  DragEvent,
  useCallback,
  useId,
  useRef,
  useState,
} from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

type PdfItem = {
  id: string;
  file: File;
  pageCount: number | null;
  error: string | null;
};

function isPdfFile(file: File): boolean {
  if (file.type === "application/pdf") return true;
  return file.name.toLowerCase().endsWith(".pdf");
}

async function loadPdfPageCount(file: File): Promise<number> {
  const bytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(bytes);
  return pdf.getPageCount();
}

async function mergePdfFiles(files: File[]): Promise<Uint8Array> {
  const merged = await PDFDocument.create();
  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const src = await PDFDocument.load(bytes);
    const indices = src.getPageIndices();
    const pages = await merged.copyPages(src, indices);
    pages.forEach((p) => merged.addPage(p));
  }
  return merged.save();
}

export default function MergePdfPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputHintId = useId();
  const errorId = useId();
  const listLabelId = useId();

  const [items, setItems] = useState<PdfItem[]>([]);
  const [isDropActive, setIsDropActive] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [mergedBlob, setMergedBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addFiles = useCallback(async (fileList: FileList | File[]) => {
    const arr = Array.from(fileList).filter((f) => isPdfFile(f));
    if (arr.length === 0) {
      setError("Add at least one valid PDF file.");
      return;
    }
    setError(null);
    setMergedBlob(null);

    const newItems: PdfItem[] = arr.map((file) => ({
      id: crypto.randomUUID(),
      file,
      pageCount: null,
      error: null,
    }));

    setItems((prev) => [...prev, ...newItems]);

    for (const item of newItems) {
      try {
        const count = await loadPdfPageCount(item.file);
        setItems((prev) =>
          prev.map((p) =>
            p.id === item.id ? { ...p, pageCount: count, error: null } : p,
          ),
        );
      } catch {
        setItems((prev) =>
          prev.map((p) =>
            p.id === item.id
              ? {
                  ...p,
                  pageCount: null,
                  error: "Could not read PDF (encrypted or invalid).",
                }
              : p,
          ),
        );
      }
    }
  }, []);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) void addFiles(files);
    e.target.value = "";
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropActive(false);
    if (e.dataTransfer.files?.length) void addFiles(e.dataTransfer.files);
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

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
    setMergedBlob(null);
    setError(null);
  };

  const move = (index: number, dir: -1 | 1) => {
    setItems((prev) => {
      const next = [...prev];
      const j = index + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[index], next[j]] = [next[j], next[index]];
      return next;
    });
    setMergedBlob(null);
  };

  const handleMerge = async () => {
    setError(null);
    const valid = items.filter((i) => !i.error);
    if (valid.length < 2) {
      setError("Add at least two valid PDF files to merge.");
      return;
    }
    setIsMerging(true);
    setMergedBlob(null);
    try {
      const bytes = await mergePdfFiles(valid.map((i) => i.file));
      const copy = Uint8Array.from(bytes);
      setMergedBlob(new Blob([copy], { type: "application/pdf" }));
    } catch {
      setError("Merge failed. Check that PDFs are not password-protected.");
    } finally {
      setIsMerging(false);
    }
  };

  const handleDownload = () => {
    if (!mergedBlob) return;
    const url = URL.createObjectURL(mergedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "merged.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setItems([]);
    setMergedBlob(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const validCount = items.filter((i) => !i.error).length;
  const canMerge = validCount >= 2 && !isMerging;

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.mergePdf)} />
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
        aria-labelledby="merge-pdf-heading"
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
                <span className="text-foreground">Merge PDF</span>
              </p>
            </nav>
            <h1
              id="merge-pdf-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Merge PDF Files Online Free
            </h1>
            <p
              id={inputHintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Combine multiple PDFs in your chosen order. Processing runs in your
              browser—nothing is uploaded to a server.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="merge-pdf-heading"
          >
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,.pdf"
              multiple
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
              aria-label="Add PDF files by clicking or dragging and dropping"
            >
              <p className="text-sm font-medium text-foreground">
                Drag & drop PDFs here, or click to add files
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                You can select multiple PDFs at once
              </p>
            </div>

            <div className="mt-8">
              <p id={listLabelId} className="text-sm font-medium text-foreground">
                Files ({items.length})
              </p>
              {items.length === 0 ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  No files yet. Upload at least two PDFs to merge.
                </p>
              ) : (
                <ul
                  className="mt-3 space-y-2"
                  aria-labelledby={listLabelId}
                >
                  {items.map((item, index) => (
                    <li
                      key={item.id}
                      className="flex flex-col gap-2 rounded-lg border border-border bg-muted/20 px-3 py-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {item.file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.error ? (
                            <span className="text-destructive">{item.error}</span>
                          ) : item.pageCount != null ? (
                            <>
                              {item.pageCount} page{item.pageCount === 1 ? "" : "s"}
                            </>
                          ) : (
                            "Reading…"
                          )}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-wrap gap-1">
                        <button
                          type="button"
                          onClick={() => move(index, -1)}
                          disabled={index === 0}
                          className="rounded-md border border-border px-2 py-1 text-xs text-foreground hover:bg-muted disabled:opacity-40"
                          aria-label={`Move ${item.file.name} up`}
                        >
                          Up
                        </button>
                        <button
                          type="button"
                          onClick={() => move(index, 1)}
                          disabled={index === items.length - 1}
                          className="rounded-md border border-border px-2 py-1 text-xs text-foreground hover:bg-muted disabled:opacity-40"
                          aria-label={`Move ${item.file.name} down`}
                        >
                          Down
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="rounded-md border border-destructive/40 px-2 py-1 text-xs text-destructive hover:bg-destructive/10"
                          aria-label={`Remove ${item.file.name}`}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={handleMerge}
                disabled={!canMerge}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isMerging ? "Merging…" : "Merge PDFs"}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!mergedBlob || isMerging}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Download merged PDF
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={items.length === 0 && !mergedBlob}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Reset
              </button>
            </div>

            {error ? (
              <p
                id={errorId}
                className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            {mergedBlob ? (
              <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
                Ready to download ({(mergedBlob.size / 1024).toFixed(1)} KB).
              </p>
            ) : null}
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="merge-seo-heading">
            <h2
              id="merge-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is PDF Merge?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Merging combines two or more PDF documents into a single file, keeping pages
              in the order you choose. It is useful for reports, portfolios, and
              multi-part forms.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Merge PDF Files Online
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Upload PDFs using drag and drop or the file picker (multiple files ok).</li>
              <li>Use Up / Down to set the order of documents.</li>
              <li>Click Merge PDFs, then download your combined file.</li>
              <li>Use Reset to clear the list and start over.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why Use This Tool?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              SmartFlexa is free, works in your browser, and does not require an account.
              Your files stay on your device during merging.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">Example</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Combine a cover page PDF, a contract PDF, and an appendix PDF into one
              document for sharing or archiving.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  How do I combine PDF files?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Add two or more PDFs, order them with Up/Down, click Merge PDFs, then
                  Download merged PDF.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is merging PDFs safe?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Here, merging runs locally in your browser. We do not upload your PDFs
                  to SmartFlexa servers for this tool.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool free?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. The PDF merge tool is free to use.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Do you store my files?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  No. Processing happens on your device; nothing is stored on our servers
                  for this merge flow.
                </dd>
              </div>
            </dl>

            <RelatedTools currentPath="/tools/merge-pdf" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
