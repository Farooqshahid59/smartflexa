"use client";

import { CategoryCard } from "@/components/category-card";
import {
  defaultCategories,
  type CategoryItem,
  type ToolCategoryId,
} from "@/lib/home-content";

export type CategoriesSectionProps = {
  title?: string;
  subtitle?: string;
  categories?: CategoryItem[];
  onSelectCategory?: (id: ToolCategoryId) => void;
};

export function CategoriesSection({
  title = "Browse by Category",
  subtitle = "Find the right tool for your needs",
  categories = defaultCategories,
  onSelectCategory,
}: CategoriesSectionProps) {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              description={category.description}
              icon={category.icon}
              href={category.href}
              count={category.count}
              onSelect={onSelectCategory}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
