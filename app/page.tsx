import { BlogSection } from "@/components/blog-section";
import { CategoriesSection } from "@/components/categories-section";
import { FeaturesSection } from "@/components/features-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { JsonLd } from "@/components/json-ld";
import { ToolsSection } from "@/components/tools-section";
import { getWebSiteJsonLd } from "@/lib/schema";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getWebSiteJsonLd()} />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ToolsSection />
        <CategoriesSection />
        <BlogSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
