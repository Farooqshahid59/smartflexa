import Link from "next/link";

import { AiEmailWriterTool } from "@/app/tools/ai-email-writer/ai-email-writer-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function ProfessionalEmailWriterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.professionalEmailWriter)} />
      <Header />
      <main className="flex-1 bg-background" id="main-content" aria-labelledby="professional-email-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <h1 id="professional-email-h1" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Professional Email Writer</h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>A professional email writer tool is ideal when tone and precision are non-negotiable. Business communication must be respectful, concise, and action-oriented, especially in client-facing updates, negotiations, and operational escalations. Many drafts fail because they are either too vague or too long. AI drafting helps by providing clean structure from the first attempt so your edits focus on strategy rather than sentence mechanics.</p>
            <p>On SmartFlexa, you can feed context and generate ready-to-edit messages with greeting, body, and closing included. This is practical for account management, recruiting, procurement, and internal coordination. The output is intentionally structured to reduce back-and-forth: explain context, state request, and end with a concrete next step. That pattern improves readability and response speed across teams.</p>
            <p>Always verify critical details before send, including names, dates, pricing, and obligations. AI helps draft faster but cannot own accountability. Add your voice and organizational standards in the final pass, then send with confidence. If you want the canonical route with full FAQ content, open <Link href="/tools/ai-email-writer" className="font-medium text-foreground underline">Generate email using AI</Link>. The component below is the same.</p>
          </article>
          <div className="mt-10"><AiEmailWriterTool /></div>
          <div className="mt-14"><RelatedTools currentPath="/professional-email-writer" heading="More tools" /></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
