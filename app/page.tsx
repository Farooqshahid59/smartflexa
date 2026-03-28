import { Suspense } from "react";

// import { BlogSection } from "@/components/blog-section";
import { FeaturesSection } from "@/components/features-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HomeSearchTools } from "@/components/home-search-tools";
import { JsonLd } from "@/components/json-ld";
import { getWebSiteJsonLd } from "@/lib/schema";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getWebSiteJsonLd()} />
      <Header />
      <main className="flex-1">
        <Suspense fallback={null}>
          <HomeSearchTools />
        </Suspense>
        {/* Blog section paused for now
        <BlogSection />
        */}
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
