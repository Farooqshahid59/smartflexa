"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { CategoriesSection } from "@/components/categories-section";
import { HeroSection } from "@/components/hero-section";
import { ToolsSection } from "@/components/tools-section";
import {
  defaultTools,
  getHomeCategories,
  HOME_TOOLS_CATEGORY_QUERY,
  homeToolsCategoryHref,
  parseHomeToolCategoryParam,
  type ToolCategoryId,
} from "@/lib/home-content";

export function HomeSearchTools() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ToolCategoryId | null>(
    () =>
      parseHomeToolCategoryParam(
        searchParams.get(HOME_TOOLS_CATEGORY_QUERY),
      ),
  );

  const categories = useMemo(() => getHomeCategories(defaultTools), []);

  const scrollToTools = () => {
    document.getElementById("tools")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const cat = parseHomeToolCategoryParam(
      searchParams.get(HOME_TOOLS_CATEGORY_QUERY),
    );
    setActiveCategory(cat);
    if (cat) {
      setSearchQuery("");
      requestAnimationFrame(() => scrollToTools());
    }
  }, [searchParams]);

  const handleSelectCategory = (id: ToolCategoryId) => {
    setActiveCategory(id);
    setSearchQuery("");
    router.replace(homeToolsCategoryHref(id), { scroll: false });
    requestAnimationFrame(() => scrollToTools());
  };

  const handleClearCategory = () => {
    setActiveCategory(null);
    router.replace("/", { scroll: false });
  };

  return (
    <>
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <CategoriesSection
        categories={categories}
        onSelectCategory={handleSelectCategory}
      />
      <ToolsSection
        searchQuery={searchQuery}
        categoryId={activeCategory}
        categoryLabel={
          activeCategory
            ? categories.find((c) => c.id === activeCategory)?.name ?? null
            : null
        }
        onClearCategory={handleClearCategory}
      />
    </>
  );
}
