import Link from "next/link";

import { AiEmailWriterTool } from "@/app/tools/ai-email-writer/ai-email-writer-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function AiEmailReplyGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.aiEmailReplyGenerator)} />
      <Header />
      <main className="flex-1 bg-background" id="main-content" aria-labelledby="ai-email-reply-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <h1 id="ai-email-reply-h1" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">AI Email Reply Generator</h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>An AI email reply generator helps when you need to respond quickly but still sound thoughtful. Whether you are answering clients, following up with candidates, or resolving support tickets, a structured draft saves time and reduces stress. Instead of writing from scratch, you provide context and generate a response that already includes greeting, core message, and closing. This is useful for high-volume inbox workflows where response quality still matters.</p>
            <p>SmartFlexa lets you choose purpose and tone so the draft aligns with the moment. Professional tone works for stakeholders and customer interactions, Friendly tone suits internal collaboration, and Short mode helps when you only need a crisp confirmation. The goal is not blind automation. The goal is faster first drafts with enough structure that your manual review takes minutes, not half an hour.</p>
            <p>For best results, include what the sender asked, what you can offer, and any timeline constraints. AI output quality rises when context is explicit. Then personalize names, details, and commitments before sending. This keeps communication accurate and human while still benefiting from speed. For complete documentation and FAQs, visit <Link href="/tools/ai-email-writer" className="font-medium text-foreground underline">AI email writer</Link>. The tool below is the same generator.</p>
          </article>
          <div className="mt-10"><AiEmailWriterTool /></div>
          <div className="mt-14"><RelatedTools currentPath="/ai-email-reply-generator" heading="More tools" /></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
