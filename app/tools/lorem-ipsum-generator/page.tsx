"use client";

import { useId, useState } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { SignatureGeneratorInboundLinks } from "@/components/signature-generator-inbound-links";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

const LOREM_WORDS = `
lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et
dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip
ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt
mollit anim id est laborum curabitur pretium tincidunt lacus cras placerat vestibulum euismod mauris
laoreet integer tristique magna sit amet purus gravida quis blandit turpis cursus in hac habitasse
platea dictumst quisque sagittis purus sit amet volutpat consequat mauris nunc congue nisi vitae suscipit
tellus mauris a diam maecenas sed enim ut sem viverra aliquet eget sit amet tellus cras adipiscing enim
eu turpis egestas pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices eros in
cursus turpis massa tincidunt dui ut ornare lectus sit amet est placerat in egestas erat imperdiet sed
euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi
ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget felis eget nunc lobortis mattis
aliquam faucibus purus in massa tempor nec feugiat nisl pretium fusce id velit ut tortor pretium viverra
suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra
tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim
cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum varius duis at consectetur lorem donec
massa sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed
ullamcorper morbi tincidunt ornare massa eget egestas purus viverra accumsan in nisl nisi scelerisque eu
ultrices vitae auctor eu augue ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem
dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a cras semper auctor
neque vitae tempus quam pellentesque nec nam aliquam sem et tortor consequat id porta nibh venenatis cras
sed felis eget velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer enim
neque volutpat ac tincidunt vitae semper quis lectus nulla at volutpat diam ut venenatis tellus in metus
vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci porta non pulvinar neque laoreet
suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam non nisi est sit amet
facilisis magna etiam tempor orci eu lobortis elementum nibh tellus molestie nunc non blandit massa enim
nec dui nunc mattis enim ut tellus elementum sagittis vitae et leo duis ut diam quam nulla porttitor massa
id neque aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada
pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient montes nascetur
ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra maecenas
accumsan lacus vel facilisis volutpat est velit egestas dui id ornare arcu odio ut sem nulla pharetra diam
sit amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit sed vulputate mi sit
amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada
proin libero nunc consequat interdum varius sit amet mattis vulputate enim nulla aliquet porttitor lacus
luctus accumsan tortor posuere ac ut consequat semper viverra nam libero justo laoreet sit amet cursus
sit amet dictum sit amet justo donec enim diam vulputate ut pharetra sit amet aliquam id diam maecenas
ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend
quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui
sapien eget mi proin sed libero enim sed faucibus turpis in eu mi bibendum neque egestas congue quisque
egestas diam in arcu cursus euismod quis viverra nibh cras pulvinar mattis nunc sed blandit libero
volutpat sed cras ornare arcu dui vivamus arcu felis bibendum ut tristique et egestas quis ipsum
suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet
venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt
augue interdum velit euismod in pellentesque massa placerat duis ultricies lacus sed turpis tincidunt id
aliquet risus feugiat in ante metus dictum at tempor commodo ullamcorper a lacus vestibulum sed arcu non
odio euismod lacinia at quis risus sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit
aliquam etiam erat velit scelerisque in dictum non consectetur a erat nam at lectus urna duis convallis
convallis tellus id interdum velit laoreet id donec ultrices tincidunt arcu non sodales neque sodales ut
etiam sit amet nisl purus in mollis nunc sed id semper risus in hendrerit gravida rutrum quisque non
tellus orci ac auctor augue mauris augue neque gravida in fermentum et sollicitudin ac orci phasellus
egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio
eu feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam id leo in vitae turpis massa sed
elementum tempus egestas sed sed risus pretium quam vulputate dignissim suspendisse in est ante in nibh
mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing commodo elit at imperdiet dui
accumsan sit amet nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet non curabitur
gravida arcu ac tortor dignissim convallis aenean et tortor at risus viverra adipiscing at in tellus
integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor
morbi non arcu risus quis varius quam quisque id diam vel quam elementum pulvinar etiam non quam lacus
suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis
tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae
congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi
tristique senectus et netus et malesuada fames ac turpis egestas sed tempus urna et pharetra pharetra massa
massa ultricies mi quis hendrerit dolor magna eget est lorem ipsum dolor sit
`
  .trim()
  .split(/\s+/)
  .filter(Boolean);

function buildParagraph(wordCount: number, startOffset: number): string {
  if (wordCount < 1 || LOREM_WORDS.length === 0) return "";
  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    words.push(LOREM_WORDS[(startOffset + i) % LOREM_WORDS.length]!);
  }
  const raw = words.join(" ");
  return raw.charAt(0).toUpperCase() + raw.slice(1) + ".";
}

function generateLorem(paragraphs: number, totalWords: number | null): string {
  const p = Math.min(30, Math.max(1, Math.round(paragraphs)));
  const defaultTotal = p * 64;
  const total =
    totalWords != null && totalWords > 0
      ? Math.min(10000, Math.max(p, Math.round(totalWords)))
      : defaultTotal;

  const base = Math.floor(total / p);
  const remainder = total % p;
  const parts: string[] = [];
  let offset = 0;
  for (let i = 0; i < p; i++) {
    const n = base + (i < remainder ? 1 : 0);
    parts.push(buildParagraph(n, offset));
    offset += n;
  }
  return parts.join("\n\n");
}

const EXAMPLE_SNIPPET = generateLorem(2, 80);

export default function LoremIpsumGeneratorPage() {
  const hintId = useId();
  const outputHintId = useId();
  const errorId = useId();
  const copyStatusId = useId();

  const [paragraphs, setParagraphs] = useState(3);
  const [wordsInput, setWordsInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const trimmedWords = wordsInput.trim();
  const parsedWords =
    trimmedWords === "" ? null : Number.parseInt(trimmedWords, 10);
  const wordsInvalid =
    trimmedWords !== "" &&
    (parsedWords === null ||
      Number.isNaN(parsedWords) ||
      parsedWords < 10 ||
      parsedWords > 10000);

  const canGenerate =
    paragraphs >= 1 &&
    paragraphs <= 30 &&
    !wordsInvalid &&
    !Number.isNaN(paragraphs);

  const runGenerate = () => {
    setCopyStatus(null);
    setError(null);
    if (!canGenerate) {
      if (wordsInvalid) {
        setError("Word count must be between 10 and 10,000, or leave blank for defaults.");
      }
      return;
    }
    const totalWords =
      parsedWords != null &&
      !Number.isNaN(parsedWords) &&
      parsedWords >= 10 &&
      parsedWords <= 10000
        ? parsedWords
        : null;
    try {
      setOutput(generateLorem(paragraphs, totalWords));
    } catch {
      setOutput("");
      setError("Could not generate text. Try different numbers.");
    }
  };

  const handleCopy = async () => {
    setError(null);
    if (!output.trim()) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopyStatus("Copied to clipboard.");
    } catch {
      setCopyStatus(null);
      setError("Copy failed. Your browser may block clipboard access.");
    }
  };

  const handleClear = () => {
    setOutput("");
    setError(null);
    setCopyStatus(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.loremIpsumGenerator)} />
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
        aria-labelledby="lorem-heading"
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
                <span className="text-foreground">Lorem Ipsum Generator</span>
              </p>
            </nav>

            <h1
              id="lorem-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Lorem Ipsum Generator Online Free
            </h1>

            <p
              id={hintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Create placeholder paragraphs for mockups and layouts. Choose how many
              paragraphs you need and optionally cap total words.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="lorem-heading"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="lorem-paragraphs"
                  className="text-sm font-medium text-foreground"
                >
                  Number of paragraphs (1–30)
                </label>
                <input
                  id="lorem-paragraphs"
                  type="number"
                  min={1}
                  max={30}
                  value={paragraphs}
                  onChange={(e) => {
                    const v = Number.parseInt(e.target.value, 10);
                    setParagraphs(
                      Number.isNaN(v) ? 1 : Math.min(30, Math.max(1, v)),
                    );
                  }}
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="lorem-words"
                  className="text-sm font-medium text-foreground"
                >
                  Total words (optional, 10–10,000)
                </label>
                <input
                  id="lorem-words"
                  type="number"
                  min={10}
                  max={10000}
                  value={wordsInput}
                  onChange={(e) => setWordsInput(e.target.value)}
                  placeholder="Default: ~64 per paragraph"
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={runGenerate}
                disabled={!canGenerate}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Generate
              </button>
              <button
                type="button"
                onClick={() => void handleCopy()}
                disabled={!output.trim()}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Copy
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
                htmlFor="lorem-output"
                className="text-sm font-medium text-foreground"
              >
                Output
              </label>
              <textarea
                id="lorem-output"
                value={output}
                readOnly
                aria-describedby={outputHintId}
                placeholder='Click "Generate" to create lorem ipsum text.'
                className="min-h-[260px] w-full resize-y rounded-lg border border-input bg-muted/20 px-4 py-3 text-base leading-relaxed text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p id={outputHintId} className="text-xs text-muted-foreground">
                Paragraphs are separated by a blank line.
              </p>
            </div>
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="lorem-seo-heading">
            <h2
              id="lorem-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is Lorem Ipsum?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Lorem ipsum is placeholder text derived from classical Latin literature.
              Designers and developers use it to fill layouts before real copy exists.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Generate Lorem Ipsum
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Set the number of paragraphs you need.</li>
              <li>
                Optionally set a total word count (spread across those paragraphs).
              </li>
              <li>Click Generate, then copy or clear the output.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why Use Lorem Ipsum?
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Prototype pages without writing final content.</li>
              <li>Test typography and spacing with realistic paragraph length.</li>
              <li>Avoid distracting readable English in early design reviews.</li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Example
            </h2>
            <div className="mt-3 rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Sample (2 paragraphs)</p>
              <p className="mt-3 whitespace-pre-wrap leading-relaxed">
                {EXAMPLE_SNIPPET}
              </p>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  What is lorem ipsum used for?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  It fills space in mockups, wireframes, and templates so stakeholders
                  can focus on layout instead of draft copy.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool free?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa’s lorem ipsum generator is free with no signup
                  required.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Can I customize text?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  You can choose paragraph count and optional total words. The wording
                  follows a classic lorem-style word pool for predictable length.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my data secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Generation runs in your browser. Your settings are not uploaded to our
                  servers for this tool.
                </dd>
              </div>
            </dl>

            <SignatureGeneratorInboundLinks />
            <RelatedTools
              currentPath="/tools/lorem-ipsum-generator"
              heading="More tools"
            />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
