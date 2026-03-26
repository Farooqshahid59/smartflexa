"use client";

import { ChangeEvent, useId, useMemo, useState } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

type SlugOptions = {
  lowercase: boolean;
  spacesToHyphens: boolean;
  removeSpecial: boolean;
};

function generateSlug(text: string, opts: SlugOptions): string {
  let s = text;
  if (opts.lowercase) s = s.toLowerCase();

  if (opts.spacesToHyphens) {
    s = s.replace(/\s+/g, "-");
  } else {
    s = s.replace(/\s+/g, "");
  }

  if (opts.removeSpecial) {
    if (opts.lowercase) {
      s = s.replace(/[^a-z0-9-]/g, "");
    } else {
      s = s.replace(/[^a-zA-Z0-9-]/g, "");
    }
  } else {
    s = s.replace(/[^a-zA-Z0-9\-_]/g, "");
  }

  s = s.replace(/-+/g, "-");
  s = s.replace(/^-+|-+$/g, "");

  return s;
}

export default function SlugGeneratorPage() {
  const inputHintId = useId();
  const outputHintId = useId();
  const errorId = useId();
  const copyStatusId = useId();

  const [inputText, setInputText] = useState("");
  const [lowercase, setLowercase] = useState(true);
  const [spacesToHyphens, setSpacesToHyphens] = useState(true);
  const [removeSpecial, setRemoveSpecial] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const slug = useMemo(
    () =>
      generateSlug(inputText, {
        lowercase,
        spacesToHyphens,
        removeSpecial,
      }),
    [inputText, lowercase, spacesToHyphens, removeSpecial],
  );

  const canCopy = slug.length > 0;

  const handleCopy = async () => {
    setCopyStatus(null);
    setError(null);
    if (!slug) return;
    try {
      await navigator.clipboard.writeText(slug);
      setCopyStatus("Copied slug to clipboard.");
    } catch {
      setError("Copy failed. Your browser may block clipboard access.");
    }
  };

  const clearAll = () => {
    setInputText("");
    setError(null);
    setCopyStatus(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.slugGenerator)} />
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
        aria-labelledby="slug-generator-heading"
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
                <span className="text-foreground">Slug Generator</span>
              </p>
            </nav>

            <h1
              id="slug-generator-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Slug Generator Online Free
            </h1>

            <p
              id={inputHintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Turn titles or phrases into clean, URL-friendly slugs. Updates live
              as you type—no upload required.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="slug-generator-heading"
          >
            <div className="space-y-3">
              <label
                htmlFor="slug-input"
                className="text-sm font-medium text-foreground"
              >
                Text or title
              </label>
              <textarea
                id="slug-input"
                value={inputText}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                  setInputText(e.target.value);
                  setCopyStatus(null);
                  setError(null);
                }}
                placeholder="e.g. My Blog Post Title! 2024"
                spellCheck={true}
                autoComplete="off"
                aria-describedby={inputHintId}
                className="min-h-[140px] w-full resize-y rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="mt-6 space-y-4">
              <p className="text-sm font-medium text-foreground">Options</p>
              <ul className="space-y-3" role="list">
                <li className="flex items-start gap-3">
                  <input
                    id="opt-lowercase"
                    type="checkbox"
                    checked={lowercase}
                    onChange={(e) => setLowercase(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-ring"
                  />
                  <label
                    htmlFor="opt-lowercase"
                    className="text-sm leading-snug text-foreground"
                  >
                    Lowercase (recommended for URLs)
                  </label>
                </li>
                <li className="flex items-start gap-3">
                  <input
                    id="opt-hyphens"
                    type="checkbox"
                    checked={spacesToHyphens}
                    onChange={(e) => setSpacesToHyphens(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-ring"
                  />
                  <label
                    htmlFor="opt-hyphens"
                    className="text-sm leading-snug text-foreground"
                  >
                    Replace spaces with hyphens (otherwise spaces are removed)
                  </label>
                </li>
                <li className="flex items-start gap-3">
                  <input
                    id="opt-special"
                    type="checkbox"
                    checked={removeSpecial}
                    onChange={(e) => setRemoveSpecial(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-ring"
                  />
                  <label
                    htmlFor="opt-special"
                    className="text-sm leading-snug text-foreground"
                  >
                    Remove special characters (keep letters, numbers, hyphens;
                    underscores allowed when off)
                  </label>
                </li>
              </ul>
            </div>

            <div className="mt-6 space-y-3">
              <label
                htmlFor="slug-output"
                className="text-sm font-medium text-foreground"
              >
                Generated slug
              </label>
              <input
                id="slug-output"
                type="text"
                readOnly
                value={slug}
                aria-describedby={outputHintId}
                className="h-12 w-full rounded-lg border border-input bg-muted/20 px-4 text-base text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p id={outputHintId} className="text-xs text-muted-foreground">
                Hyphens are collapsed and leading or trailing hyphens are removed.
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={() => void handleCopy()}
                disabled={!canCopy}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Copy slug
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Clear
              </button>
            </div>

            {copyStatus ? (
              <p
                id={copyStatusId}
                className="mt-4 text-sm text-foreground"
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
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="slug-seo-heading">
            <h2
              id="slug-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is a Slug?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              A URL slug is the human-readable part of a web address that comes
              after the domain—usually lowercase words separated by hyphens, like{" "}
              <span className="font-mono text-foreground">
                /blog/my-first-post
              </span>
              . Good slugs help visitors and search engines understand the page.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Create SEO-Friendly URLs
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Use short, descriptive phrases that match the page topic.</li>
              <li>Prefer hyphens between words instead of underscores or spaces.</li>
              <li>Keep letters and numbers; avoid long IDs and stuffed keywords.</li>
              <li>Use consistent lowercase to avoid duplicate URLs.</li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Use This Tool
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Paste a title, headline, or phrase into the text box.</li>
              <li>Adjust options for lowercase, spaces, and special characters.</li>
              <li>Copy the generated slug and use it in your CMS or routes.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Example
            </h2>
            <div className="mt-3 rounded-lg border border-border bg-muted/20 p-4 text-sm">
              <p className="font-medium text-foreground">Text</p>
              <p className="mt-2 font-mono text-muted-foreground">
                Hello World! Best Tips 2024
              </p>
              <p className="mt-4 font-medium text-foreground">Slug</p>
              <p className="mt-2 font-mono text-muted-foreground">
                hello-world-best-tips-2024
              </p>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  What is a URL slug?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  It is the path segment that identifies a page in a readable way,
                  often built from a title converted to lowercase words with hyphens.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Why use hyphens?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Hyphens separate words clearly in URLs and are widely used in SEO
                  best practices for readability and sharing.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is this tool free?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa provides this slug generator at no cost with no
                  signup required.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my data secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Everything runs in your browser. Your text is not sent to our
                  servers to build the slug.
                </dd>
              </div>
            </dl>

            <RelatedTools currentPath="/tools/slug-generator" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
