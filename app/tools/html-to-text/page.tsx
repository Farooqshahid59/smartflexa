"use client";

import { ChangeEvent, useId, useState } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { DiffInboundLinks } from "@/components/diff-inbound-links";
import { MetaTagInboundLinks } from "@/components/meta-tag-inbound-links";
import { RobotsTxtInboundLinks } from "@/components/robots-txt-inbound-links";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

function htmlToPlainText(html: string): string {
  const trimmed = html.trim();
  if (!trimmed) return "";

  const doc = new DOMParser().parseFromString(html, "text/html");
  doc
    .querySelectorAll("script, style, noscript, iframe, object, embed, template")
    .forEach((el) => el.remove());

  const body = doc.body;
  if (!body) return "";

  const raw = body.innerText ?? body.textContent ?? "";
  return raw
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default function HtmlToTextPage() {
  const inputHintId = useId();
  const outputHintId = useId();
  const errorId = useId();
  const copyStatusId = useId();

  const [inputHtml, setInputHtml] = useState("");
  const [outputText, setOutputText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const canConvert = inputHtml.trim().length > 0;
  const canCopy = outputText.trim().length > 0;

  const convert = () => {
    setError(null);
    setCopyStatus(null);
    if (!inputHtml.trim()) {
      setOutputText("");
      return;
    }
    try {
      const text = htmlToPlainText(inputHtml);
      setOutputText(text);
    } catch {
      setOutputText("");
      setError("Could not convert this HTML. Try simplifying the markup.");
    }
  };

  const handleCopy = async () => {
    setError(null);
    if (!outputText.trim()) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopyStatus("Copied output to clipboard.");
    } catch {
      setCopyStatus(null);
      setError("Copy failed. Your browser may block clipboard access.");
    }
  };

  const handleClear = () => {
    setInputHtml("");
    setOutputText("");
    setError(null);
    setCopyStatus(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.htmlToText)} />
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
        aria-labelledby="html-to-text-heading"
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
                <span className="text-foreground">HTML to Text</span>
              </p>
            </nav>

            <h1
              id="html-to-text-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              HTML to Text Converter Online Free
            </h1>

            <p
              id={inputHintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Paste HTML and convert it to plain text: tags are removed, common
              entities are decoded, and line breaks are kept readable.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="html-to-text-heading"
          >
            <div className="space-y-3">
              <label
                htmlFor="html-input"
                className="text-sm font-medium text-foreground"
              >
                HTML input
              </label>
              <textarea
                id="html-input"
                value={inputHtml}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                  setInputHtml(e.target.value);
                  setCopyStatus(null);
                  setError(null);
                }}
                placeholder="<p>Hello &amp; welcome!</p>"
                spellCheck={false}
                autoComplete="off"
                aria-describedby={inputHintId}
                className="min-h-[200px] w-full resize-y rounded-lg border border-input bg-background px-4 py-3 font-mono text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={convert}
                disabled={!canConvert}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Convert to Text
              </button>
              <button
                type="button"
                onClick={() => void handleCopy()}
                disabled={!canCopy}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Copy output
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

            <div className="mt-8 space-y-3">
              <label
                htmlFor="text-output"
                className="text-sm font-medium text-foreground"
              >
                Plain text output
              </label>
              <textarea
                id="text-output"
                value={outputText}
                readOnly
                aria-describedby={outputHintId}
                placeholder='Click "Convert to Text" to see plain text here.'
                className="min-h-[200px] w-full resize-y rounded-lg border border-input bg-muted/20 px-4 py-3 text-base text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p id={outputHintId} className="text-xs text-muted-foreground">
                Scripts, styles, and other non-visible markup are stripped before
                extracting text.
              </p>
            </div>
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="html2text-seo-heading">
            <h2
              id="html2text-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is HTML to Text Conversion?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              It is the process of turning HTML markup into ordinary text: tags
              disappear, character entities become real characters, and you keep a
              readable version of the content.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Remove HTML Tags
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Paste your HTML into the input box.</li>
              <li>Click “Convert to Text”.</li>
              <li>Review the plain text result and copy or clear as needed.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why Use This Tool?
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Clean pasted content for notes, emails, or documents.</li>
              <li>Preview visible text without layout noise.</li>
              <li>Work locally in the browser without uploading files.</li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Example
            </h2>
            <div className="mt-3 space-y-4 rounded-lg border border-border bg-muted/20 p-4 text-sm">
              <div>
                <p className="font-medium text-foreground">HTML input</p>
                <pre className="mt-2 overflow-x-auto whitespace-pre-wrap font-mono text-muted-foreground">
                  {`<h1>Hi</h1><p>Tom &amp; Jerry</p>`}
                </pre>
              </div>
              <div>
                <p className="font-medium text-foreground">Plain text output</p>
                <pre className="mt-2 whitespace-pre-wrap text-muted-foreground">
                  {`Hi

Tom & Jerry`}
                </pre>
              </div>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  How do I strip HTML tags?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Paste the HTML here and run “Convert to Text”. The tool parses the
                  markup and returns only the visible text content.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Does this remove scripts and styles?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. Script, style, and similar elements are removed before text is
                  extracted, so their contents do not appear in the output.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is this tool free?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa offers this converter at no cost with no signup
                  required.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my data secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Conversion runs in your browser. Your HTML is not sent to our
                  servers for this tool.
                </dd>
              </div>
            </dl>

            <MetaTagInboundLinks />
            <RobotsTxtInboundLinks />
            <DiffInboundLinks />
            <RelatedTools currentPath="/tools/html-to-text" heading="More tools" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
