import Link from "next/link";

import { AiEmailWriterTool } from "@/app/tools/ai-email-writer/ai-email-writer-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function WriteEmailOnlinePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.writeEmailOnline)} />
      <Header />
      <main className="flex-1 bg-background" id="main-content" aria-labelledby="write-email-online-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <h1 id="write-email-online-h1" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Write Email Online</h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>When you need to write email online quickly, switching between tools slows you down. A browser-based AI writer keeps everything in one place: paste context, select tone, generate draft, and copy. This workflow is useful for founders, support agents, consultants, and students who handle constant written communication. It removes blank-page friction while keeping control in your hands.</p>
            <p>The main advantage is speed with structure. You get complete drafts that include opening, message body, and polite close. That makes it easier to send better emails under deadline pressure without sacrificing clarity. With tone controls, you can adapt the same message for formal stakeholder updates or brief friendly follow-ups. The shorter your feedback loops, the more valuable this becomes.</p>
            <p>AI drafts should still be reviewed. Check facts, commitments, and links before sending. Add personalization so the message reflects real relationship context. Used this way, AI is a practical accelerator for daily writing. For expanded guidance and FAQs, visit <Link href="/tools/ai-email-writer" className="font-medium text-foreground underline">AI email writer</Link>. The generator below is the same component.</p>
          </article>
          <div className="mt-10"><AiEmailWriterTool /></div>
          <div className="mt-14"><RelatedTools currentPath="/write-email-online" heading="More tools" /></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
