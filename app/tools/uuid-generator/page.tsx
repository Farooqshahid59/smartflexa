"use client";

import { ChangeEvent, useId, useState } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

function generateUuidV4(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  const buf = new Uint8Array(16);
  crypto.getRandomValues(buf);
  buf[6] = (buf[6]! & 0x0f) | 0x40;
  buf[8] = (buf[8]! & 0x3f) | 0x80;
  const hex = Array.from(buf, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function parseCount(s: string): number | null {
  const t = s.trim();
  if (t === "") return null;
  const n = Number(t);
  if (!Number.isInteger(n)) return null;
  return n;
}

export default function UuidGeneratorPage() {
  const hintId = useId();
  const listHintId = useId();
  const errorId = useId();
  const copyStatusId = useId();

  const [countStr, setCountStr] = useState("5");
  const [uuids, setUuids] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const count = parseCount(countStr);
  const canGenerate = count !== null && count >= 1 && count <= 50;
  const canCopy = uuids.length > 0;

  const generate = () => {
    setCopyStatus(null);
    setError(null);
    if (!canGenerate || count === null) {
      setError("Enter a whole number from 1 to 50.");
      return;
    }
    const next: string[] = [];
    for (let i = 0; i < count; i++) {
      next.push(generateUuidV4());
    }
    setUuids(next);
  };

  const handleCopyAll = async () => {
    setError(null);
    if (!uuids.length) return;
    try {
      await navigator.clipboard.writeText(uuids.join("\n"));
      setCopyStatus("Copied!");
    } catch {
      setCopyStatus(null);
      setError("Copy failed. Try selecting the list manually.");
    }
  };

  const handleClear = () => {
    setUuids([]);
    setError(null);
    setCopyStatus(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.uuidGenerator)} />
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
        aria-labelledby="uuid-gen-heading"
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
                <span className="text-foreground">UUID Generator</span>
              </p>
            </nav>

            <h1
              id="uuid-gen-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              UUID Generator Online Free
            </h1>

            <p
              id={hintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Create RFC 4122 version 4 UUIDs for databases, APIs, and tests.
              Generation uses your browser’s secure random source.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="uuid-gen-heading"
          >
            <div className="max-w-xs">
              <label
                htmlFor="uuid-count"
                className="text-sm font-medium text-foreground"
              >
                How many UUIDs? (1–50)
              </label>
              <input
                id="uuid-count"
                type="text"
                inputMode="numeric"
                value={countStr}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCountStr(e.target.value)
                }
                aria-describedby={hintId}
                className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-4 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={generate}
                disabled={!canGenerate}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Generate
              </button>
              <button
                type="button"
                onClick={() => void handleCopyAll()}
                disabled={!canCopy}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Copy all
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Clear
              </button>
            </div>

            {copyStatus ? (
              <p
                id={copyStatusId}
                className="mt-4 text-sm font-medium text-foreground"
                role="status"
              >
                {copyStatus}
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

            <div className="mt-8">
              <p className="text-sm font-medium text-foreground">
                Generated UUIDs (v4)
              </p>
              <ul
                className="mt-2 max-h-[min(60vh,420px)] overflow-y-auto rounded-lg border border-border bg-muted/30 p-4 font-mono text-sm leading-relaxed text-foreground sm:text-base"
                aria-describedby={listHintId}
              >
                {uuids.length === 0 ? (
                  <li className="text-muted-foreground">
                    Click Generate to create UUIDs.
                  </li>
                ) : (
                  uuids.map((id, i) => (
                    <li key={i} className="break-all py-1">
                      {id}
                    </li>
                  ))
                )}
              </ul>
              <p id={listHintId} className="mt-2 text-xs text-muted-foreground">
                Each value is a random version 4 UUID in standard 8-4-4-4-12
                format.
              </p>
            </div>
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="uuid-seo-heading">
            <h2
              id="uuid-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is a UUID?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              A Universally Unique Identifier is a 128-bit label, usually written
              as hex with hyphens. Version 4 means the bits come from random
              data, which is ideal for unique keys without a central registry.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Generate UUID
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Choose how many UUIDs you need (up to 50 per click).</li>
              <li>Click Generate.</li>
              <li>Copy the list or clear and run again.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Use Cases
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Databases: primary keys and correlation IDs.</li>
              <li>APIs: request tracing and idempotency keys.</li>
              <li>Apps: unique filenames, sessions, and test data.</li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Example
            </h2>
            <div className="mt-3 rounded-lg border border-border bg-muted/20 p-4 font-mono text-sm text-muted-foreground">
              <p>550e8400-e29b-41d4-a716-446655440000</p>
              <p className="mt-2">7c9e6679-7425-40de-944b-e07fc1f90ae7</p>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">What is UUID v4?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  It is the “random” variant: all digits except the version nibble
                  are generated from random bits, which is what this tool
                  produces.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is a UUID truly unique?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Collisions are astronomically unlikely for practical purposes.
                  You should still follow your database’s uniqueness rules.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is this tool free?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa’s UUID generator is free with no signup.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my data secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  UUIDs are created in your browser. They are not sent to our
                  servers when you generate or copy them.
                </dd>
              </div>
            </dl>

            <RelatedTools currentPath="/tools/uuid-generator" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
