"use client";

import { useId, useState } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

const EXAMPLE_TEXT = "SmartFlexa tools are fast and easy to use.";
const EXAMPLE_ENCODED = "U21hcnRGbGV4YSB0b29scyBhcmUgZmFzdCBhbmQgZWFzeSB0byB1c2Uu";

function encodeBase64(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

function decodeBase64(value: string): string {
  const normalized = value.replace(/\s+/g, "");
  const binary = atob(normalized);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export default function Base64EncoderDecoderPage() {
  const inputHintId = useId();
  const errorId = useId();
  const copyStatusId = useId();

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const inputDescribedBy = [inputHintId, error ? errorId : null]
    .filter(Boolean)
    .join(" ");

  const handleEncode = () => {
    setError(null);
    setCopyStatus(null);
    if (!input) {
      setOutput("");
      return;
    }
    setOutput(encodeBase64(input));
  };

  const handleDecode = () => {
    setError(null);
    setCopyStatus(null);
    if (!input.trim()) {
      setOutput("");
      return;
    }
    try {
      setOutput(decodeBase64(input));
    } catch {
      setOutput("");
      setError(
        "Invalid Base64 input. Please check the text and try again.",
      );
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopyStatus("Output copied to clipboard.");
    } catch {
      setCopyStatus(null);
      setError("Could not copy output. Please copy it manually.");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    setCopyStatus(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.base64)} />
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
        aria-labelledby="base64-tool-heading"
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
                <span className="text-foreground">Base64 Encoder Decoder</span>
              </p>
            </nav>
            <h1
              id="base64-tool-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Base64 Encoder and Decoder Online
            </h1>
            <p
              id={inputHintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Encode plain text to Base64 or decode Base64 back to text in
              seconds.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="base64-tool-heading"
          >
            <label
              htmlFor="base64-input"
              className="text-sm font-medium text-foreground"
            >
              Input text
            </label>
            <textarea
              id="base64-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type plain text to encode, or paste Base64 to decode..."
              autoComplete="off"
              spellCheck={false}
              aria-invalid={Boolean(error)}
              aria-describedby={inputDescribedBy}
              className="mt-2 min-h-[180px] w-full resize-y rounded-lg border border-input bg-background px-4 py-3 font-mono text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={handleEncode}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Encode to Base64
              </button>
              <button
                type="button"
                onClick={handleDecode}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Decode from Base64
              </button>
              <button
                type="button"
                onClick={handleCopy}
                disabled={!output}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Copy Output
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Clear
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

            <p id={copyStatusId} className="sr-only" aria-live="polite">
              {copyStatus ?? ""}
            </p>

            <div className="mt-8">
              <label
                htmlFor="base64-output"
                className="text-sm font-medium text-foreground"
              >
                Output result
              </label>
              <textarea
                id="base64-output"
                value={output}
                readOnly
                placeholder="Your encoded or decoded output will appear here."
                className="mt-2 min-h-[180px] w-full resize-y rounded-lg border border-border bg-muted/20 px-4 py-3 font-mono text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </section>

          <article
            className="mt-14 space-y-10"
            aria-labelledby="article-about-base64"
          >
            <h2
              id="article-about-base64"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is Base64?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Base64 is a text format that represents binary data using letters,
              numbers, and a few symbols. It is commonly used when systems need
              to safely transmit data as plain text.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Use This Tool
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Paste plain text or Base64 content into the input box.</li>
              <li>
                Click <strong className="text-foreground">Encode to Base64</strong>{" "}
                to convert text to Base64.
              </li>
              <li>
                Click{" "}
                <strong className="text-foreground">Decode from Base64</strong> to
                convert Base64 back into readable text.
              </li>
              <li>Use Copy Output to copy the result, or Clear to reset both boxes.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Example
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Plain text:
            </p>
            <pre className="mt-2 overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 font-mono text-xs text-foreground sm:text-sm">
              {EXAMPLE_TEXT}
            </pre>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Encoded:
            </p>
            <pre className="mt-2 overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 font-mono text-xs text-foreground sm:text-sm">
              {EXAMPLE_ENCODED}
            </pre>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Decoded:
            </p>
            <pre className="mt-2 overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 font-mono text-xs text-foreground sm:text-sm">
              {EXAMPLE_TEXT}
            </pre>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              FAQ
            </h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  What is Base64 used for?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  It is used to safely transport text-like representations of
                  binary data in APIs, email attachments, data URLs, and config
                  files.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is Base64 encryption?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  No. Base64 is encoding, not encryption. Anyone can decode it
                  back to the original value.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is this tool free?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa’s Base64 tool is free to use with no signup.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my data secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Processing happens in your browser for this tool. Your input is
                  not sent to a server.
                </dd>
              </div>
            </dl>

            <RelatedTools currentPath="/tools/base64-encoder-decoder" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
