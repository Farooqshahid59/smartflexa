"use client";

import { useId, useMemo, useState } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { AiSummarizerInboundLinks } from "@/components/ai-summarizer-inbound-links";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

function countWords(text: string): number {
  const t = text.trim();
  if (!t) return 0;
  return t.split(/\s+/).filter(Boolean).length;
}

function countSentences(text: string): number {
  const t = text.trim();
  if (!t) return 0;
  return t.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
}

export default function WordCounterPage() {
  const inputHintId = useId();
  const statsRegionId = useId();

  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const words = countWords(text);
    const characters = text.length;
    const sentences = countSentences(text);
    return { words, characters, sentences };
  }, [text]);

  const handleClear = () => setText("");

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.wordCounter)} />
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
        aria-labelledby="word-counter-heading"
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
                <span className="text-foreground">Word Counter</span>
              </p>
            </nav>
            <h1
              id="word-counter-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Word Counter
            </h1>
            <p
              id={inputHintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Paste or type text to see word, character, and sentence counts
              update live.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="word-counter-heading"
          >
            <label
              htmlFor="word-counter-input"
              className="text-sm font-medium text-foreground"
            >
              Your text
            </label>
            <textarea
              id="word-counter-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing or paste your text here..."
              spellCheck={true}
              autoComplete="off"
              aria-describedby={inputHintId}
              className="mt-2 min-h-[220px] w-full resize-y rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Clear
              </button>
            </div>

            <div
              id={statsRegionId}
              className="mt-8 rounded-lg border border-border bg-muted/30 p-4 sm:p-6"
              role="region"
              aria-labelledby="stats-heading"
            >
              <h2
                id="stats-heading"
                className="text-sm font-semibold text-foreground"
              >
                Counts
              </h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-border bg-card px-4 py-3 text-center shadow-sm">
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Words
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
                    {stats.words}
                  </dd>
                </div>
                <div className="rounded-lg border border-border bg-card px-4 py-3 text-center shadow-sm">
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Characters
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
                    {stats.characters}
                  </dd>
                </div>
                <div className="rounded-lg border border-border bg-card px-4 py-3 text-center shadow-sm sm:col-span-1">
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Sentences
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
                    {stats.sentences}
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-xs text-muted-foreground">
                Sentences are estimated by splitting on{" "}
                <span className="font-mono">. ! ?</span> markers. Unusual
                punctuation may affect the count.
              </p>
            </div>
          </section>

          <article
            className="mt-14 space-y-10"
            aria-labelledby="article-about-word-counter"
          >
            <h2
              id="article-about-word-counter"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is a Word Counter?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              A word counter measures how much you have written. It typically
              reports the number of words, characters (letters, numbers, spaces,
              and symbols), and often sentences. It is useful for essays, posts,
              SEO copy, and staying within limits.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Use
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Type or paste your text into the box above.</li>
              <li>
                Watch the counts update automatically as you edit—no button
                required.
              </li>
              <li>Use Clear to remove all text and reset the counts to zero.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Example
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Sample text:
            </p>
            <pre className="mt-2 overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 font-mono text-xs text-foreground sm:text-sm whitespace-pre-wrap">
              SmartFlexa helps you work faster. Try our tools today!
            </pre>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Approximate counts: <strong className="text-foreground">9</strong>{" "}
              words, <strong className="text-foreground">54</strong>{" "}
              characters, <strong className="text-foreground">2</strong>{" "}
              sentences.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              FAQ
            </h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  How are words counted?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Words are groups of characters separated by whitespace (spaces,
                  tabs, or line breaks). Multiple spaces between words still count
                  as one separator.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Does this tool store my text?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  No. Counting runs in your browser; your text is not sent to a
                  server for this page.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is this tool free?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa’s Word Counter is free to use with no signup
                  required.
                </dd>
              </div>
            </dl>

            <AiSummarizerInboundLinks />
            <RelatedTools currentPath="/tools/word-counter" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
