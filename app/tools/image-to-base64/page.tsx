"use client";

import {
  ChangeEvent,
  DragEvent,
  useCallback,
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

const ACCEPT = "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp";
const MAX_BYTES = 15 * 1024 * 1024;
const COPY_MS = 2500;

function isAllowedImage(file: File): boolean {
  const okMime =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/webp";
  if (okMime) return true;
  const name = file.name.toLowerCase();
  return (
    name.endsWith(".jpg") ||
    name.endsWith(".jpeg") ||
    name.endsWith(".png") ||
    name.endsWith(".webp")
  );
}

export default function ImageToBase64Page() {
  const hintId = useId();
  const errorId = useId();
  const dropId = useId();
  const outputHintId = useId();
  const statusId = useId();

  const inputRef = useRef<HTMLInputElement>(null);
  const copyTimerRef = useRef<number | null>(null);

  const [dataUrl, setDataUrl] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    };
  }, []);

  const processFile = useCallback((file: File | undefined) => {
    setCopyStatus(null);
    setError(null);
    setDataUrl("");
    setFileName(null);

    if (!file) return;

    if (!isAllowedImage(file)) {
      setError("Please upload a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError(
        `File is too large (max ${Math.round(MAX_BYTES / (1024 * 1024))} MB). Try compressing the image first.`,
      );
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setDataUrl(result);
        setFileName(file.name);
      } else {
        setError("Could not read the file as text.");
      }
      setLoading(false);
    };
    reader.onerror = () => {
      setError("Reading the file failed. Try another image.");
      setLoading(false);
    };
    reader.readAsDataURL(file);
  }, []);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    processFile(file);
    e.target.value = "";
  };

  const openPicker = () => inputRef.current?.click();

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const onDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };

  const handleCopy = async () => {
    if (!dataUrl) return;
    try {
      await navigator.clipboard.writeText(dataUrl);
      setCopyStatus("Copied!");
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => {
        setCopyStatus(null);
        copyTimerRef.current = null;
      }, COPY_MS);
    } catch {
      setCopyStatus(null);
      setError("Copy failed. Select the text in the output area and copy manually.");
    }
  };

  const handleClear = () => {
    setDataUrl("");
    setFileName(null);
    setError(null);
    setCopyStatus(null);
    setLoading(false);
    if (copyTimerRef.current) {
      window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = null;
    }
    if (inputRef.current) inputRef.current.value = "";
  };

  const hasOutput = Boolean(dataUrl);
  const canCopy = hasOutput && !loading;

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.imageToBase64)} />
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
        aria-labelledby="img-b64-heading"
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
                <span className="text-foreground">Image to Base64</span>
              </p>
            </nav>

            <h1
              id="img-b64-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Image to Base64 Converter Online Free
            </h1>

            <p
              id={hintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Upload a JPG, PNG, or WebP file to get a{" "}
              <code className="rounded bg-muted px-1 font-mono text-sm">
                data:image/…;base64,…
              </code>{" "}
              string for embedding or APIs. Processing stays in your browser.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="tool-panel-heading"
          >
            <h2 id="tool-panel-heading" className="sr-only">
              Image to Base64
            </h2>

            <input
              ref={inputRef}
              type="file"
              accept={ACCEPT}
              className="sr-only"
              aria-hidden
              tabIndex={-1}
              onChange={onInputChange}
            />

            <div
              id={dropId}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openPicker();
                }
              }}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={openPicker}
              className={`flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-10 text-center transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-border bg-muted/20 hover:bg-muted/40"
              }`}
              aria-describedby={hintId}
            >
              {loading ? (
                <div className="flex flex-col items-center gap-3">
                  <span
                    className="h-10 w-10 animate-spin rounded-full border-2 border-muted-foreground border-t-primary"
                    aria-hidden
                  />
                  <span className="text-sm font-medium text-foreground">
                    Encoding image…
                  </span>
                </div>
              ) : (
                <>
                  <p className="text-sm font-medium text-foreground">
                    Drag &amp; drop an image here
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    or click to choose · JPG, PNG, WebP · max{" "}
                    {Math.round(MAX_BYTES / (1024 * 1024))} MB
                  </p>
                </>
              )}
            </div>

            {fileName ? (
              <p className="mt-3 text-sm text-muted-foreground">
                File: <span className="font-medium text-foreground">{fileName}</span>
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

            {hasOutput ? (
              <div className="mt-8 space-y-6">
                <div>
                  <p className="text-sm font-medium text-foreground">Preview</p>
                  <div className="mt-2 overflow-hidden rounded-lg border border-border bg-muted/30 p-4">
                    <img
                      src={dataUrl}
                      alt="Uploaded preview"
                      className="mx-auto max-h-64 max-w-full object-contain"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="b64-output" className="text-sm font-medium text-foreground">
                    Base64 output (data URL)
                  </label>
                  <textarea
                    id="b64-output"
                    readOnly
                    value={dataUrl}
                    rows={8}
                    spellCheck={false}
                    aria-describedby={outputHintId}
                    className="mt-2 w-full resize-y rounded-lg border border-input bg-muted/20 p-3 font-mono text-xs leading-relaxed text-foreground focus:outline-none focus:ring-2 focus:ring-ring sm:text-sm"
                  />
                  <p id={outputHintId} className="mt-1 text-xs text-muted-foreground">
                    Includes the MIME prefix so you can paste into{" "}
                    <code className="rounded bg-muted px-1">&lt;img src&gt;</code> or CSS.
                  </p>
                </div>
              </div>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!canCopy}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Copy Base64
              </button>
              <button
                type="button"
                onClick={handleClear}
                disabled={!hasOutput && !loading && !error && !fileName}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear
              </button>
            </div>

            {copyStatus ? (
              <p
                id={statusId}
                className="mt-4 text-sm font-medium text-foreground"
                role="status"
              >
                {copyStatus}
              </p>
            ) : null}
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="img-b64-seo-heading">
            <h2
              id="img-b64-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is Base64 Encoding?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Base64 turns binary data into plain ASCII text using 64 safe
              characters. For images, it is often wrapped in a data URL so
              browsers and apps can display or transport the picture without a
              separate file.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Convert Image to Base64
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Choose a JPG, PNG, or WebP file under the size limit.</li>
              <li>Drop it on the upload area or click to browse.</li>
              <li>Wait for the preview and data URL to appear.</li>
              <li>Copy the string for your template, email, or API payload.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why Use Base64 Images?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Embedding small icons or thumbnails inline avoids extra HTTP
              requests. Some APIs and config formats expect Base64 blobs instead
              of multipart uploads. Large photos grow the string a lot—compress
              first when possible.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Example
            </h2>
            <div className="mt-3 rounded-lg border border-border bg-muted/20 p-4 font-mono text-xs leading-relaxed text-muted-foreground sm:text-sm">
              <p className="break-all text-foreground">
                data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==
              </p>
              <p className="mt-2">
                A tiny 1×1 PNG as a data URL—the pattern matches what this tool
                outputs for your files.
              </p>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  What is Base64 used for?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Safely moving binary through text-only channels: HTML/CSS
                  embedding, JSON fields, data URIs, and some authentication
                  flows.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Does Base64 increase size?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes—encoding adds roughly 33% overhead versus raw bytes, plus
                  the short MIME prefix on a data URL.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool free?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa’s image-to-Base64 encoder is free with no signup.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my data secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Images are read with the FileReader API in your browser; they are
                  not uploaded to our servers for conversion.
                </dd>
              </div>
            </dl>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Explore Related Utility Tools
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              You can also try
              <a href="/tools/json-formatter" className="mx-1 underline underline-offset-4 hover:text-foreground">JSON Formatter</a>,
              <a href="/tools/percentage-calculator" className="mx-1 underline underline-offset-4 hover:text-foreground">Percentage Calculator</a>, and
              <a href="/tools/unit-converter" className="mx-1 underline underline-offset-4 hover:text-foreground">Unit Converter</a>
              for related workflows.
            </p>

            <RelatedTools currentPath="/tools/image-to-base64" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
