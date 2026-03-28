"use client";

import { useMemo } from "react";

import { ToolCard } from "@/components/tool-card";
import {
  defaultTools,
  type ToolCategoryId,
  type ToolItem,
} from "@/lib/home-content";

function matchesQuery(tool: ToolItem, raw: string): boolean {
  const q = raw.trim().toLowerCase();
  if (!q) return true;
  const compact = q.replace(/\s+/g, "");
  const hrefLower = tool.href.toLowerCase();
  return (
    tool.name.toLowerCase().includes(q) ||
    tool.description.toLowerCase().includes(q) ||
    hrefLower.includes(compact) ||
    hrefLower.replace(/\//g, "").includes(compact)
  );
}

export type ToolsSectionProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  tools?: ToolItem[];
  searchQuery?: string;
  categoryId?: ToolCategoryId | null;
  categoryLabel?: string | null;
  onClearCategory?: () => void;
};

export function ToolsSection({
  id = "tools",
  title = "Popular Tools",
  subtitle = "Discover our most-used tools to boost your productivity",
  tools = defaultTools,
  searchQuery = "",
  categoryId = null,
  categoryLabel = null,
  onClearCategory,
}: ToolsSectionProps) {
  const filtered = useMemo(() => {
    let list = tools;
    if (categoryId) {
      list = list.filter((t) => t.category === categoryId);
    }
    const q = searchQuery.trim();
    if (q) {
      list = list.filter((t) => matchesQuery(t, q));
    }
    return list;
  }, [tools, categoryId, searchQuery]);

  const queryTrimmed = searchQuery.trim();
  const isSearchFiltered = queryTrimmed.length > 0;
  const isCategoryFiltered = categoryId !== null;
  const isFiltered = isSearchFiltered || isCategoryFiltered;

  return (
    <section id={id} className="bg-muted/30 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {subtitle}
          </p>
          <p className="sr-only" aria-live="polite" aria-atomic>
            {isFiltered
              ? `${filtered.length} tool${filtered.length === 1 ? "" : "s"} shown.`
              : `${tools.length} tools listed.`}
          </p>

          {isCategoryFiltered && categoryLabel ? (
            <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
              <p className="text-sm text-muted-foreground">
                Category:{" "}
                <span className="font-medium text-foreground">{categoryLabel}</span>
              </p>
              {onClearCategory ? (
                <button
                  type="button"
                  onClick={onClearCategory}
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Show all tools
                </button>
              ) : null}
            </div>
          ) : null}

          {isFiltered ? (
            <p className="mt-3 text-sm text-muted-foreground" aria-hidden>
              Showing {filtered.length} of {tools.length} tools
              {isSearchFiltered ? ` matching “${queryTrimmed}”` : ""}
              {isCategoryFiltered && isSearchFiltered
                ? ` in ${categoryLabel ?? "this category"}`
                : ""}
            </p>
          ) : null}
        </div>

        {filtered.length === 0 ? (
          <p className="mx-auto mt-12 max-w-md text-center text-base text-muted-foreground">
            No tools match your filters.
            {isCategoryFiltered && onClearCategory ? (
              <>
                {" "}
                <button
                  type="button"
                  onClick={onClearCategory}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Show all tools
                </button>
                {isSearchFiltered ? " or adjust your search." : "."}
              </>
            ) : isSearchFiltered ? (
              <> Try a different search.</>
            ) : null}
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map(({ category: _category, ...card }) => (
              <ToolCard key={card.href} {...card} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
