import Link from "next/link";

import { AiEmailWriterTool } from "@/app/tools/ai-email-writer/ai-email-writer-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function EmailResponseGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.emailResponseGenerator)} />
      <Header />
      <main className="flex-1 bg-background" id="main-content" aria-labelledby="email-response-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <h1 id="email-response-h1" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Email Response Generator</h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>An email response generator helps teams answer inbound messages with consistency and speed. This is especially useful for support, operations, and sales where inbox volume can be unpredictable. Instead of writing each reply from scratch, you summarize context and let AI generate a structured response. The draft still needs human review, but the time to first usable version drops significantly.</p>
            <p>Structured responses reduce mistakes. A good reply acknowledges the issue, provides a clear update, and closes with next steps. AI can enforce this pattern quickly, especially when your team handles repetitive requests like policy clarifications, timeline questions, and status checks. Choosing the right tone also helps protect customer experience when conversations are sensitive or urgent.</p>
            <p>To improve output quality, include constraints such as deadlines, options, and required actions. Then personalize language before sending. The combination of AI drafting and human oversight gives both speed and reliability. For full documentation and main FAQs, open <Link href="/tools/ai-email-writer" className="font-medium text-foreground underline">Generate email using AI</Link>. The same tool is embedded below.</p>
          </article>
          <div className="mt-10"><AiEmailWriterTool /></div>
          <div className="mt-14"><RelatedTools currentPath="/email-response-generator" heading="More tools" /></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
