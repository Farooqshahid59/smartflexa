"use client";

import { useMemo } from "react";

import { ToolCard } from "@/components/tool-card";
import { defaultTools, type ToolItem } from "@/lib/home-content";

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
  /** When set, filters the grid by name, description, and path (live). */
  searchQuery?: string;
};

export function ToolsSection({
  id = "tools",
  title = "Popular Tools",
  subtitle = "Discover our most-used tools to boost your productivity",
  tools = defaultTools,
  searchQuery = "",
}: ToolsSectionProps) {
  const filtered = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return tools;
    return tools.filter((t) => matchesQuery(t, q));
  }, [tools, searchQuery]);

  const queryTrimmed = searchQuery.trim();
  const isFiltered = queryTrimmed.length > 0;

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
              ? `${filtered.length} tool${filtered.length === 1 ? "" : "s"} match your search.`
              : `${tools.length} tools listed.`}
          </p>
          {isFiltered ? (
            <p className="mt-3 text-sm text-muted-foreground" aria-hidden>
              Showing {filtered.length} of {tools.length} tools
              {filtered.length === 0
                ? ` for “${queryTrimmed}”`
                : ` matching “${queryTrimmed}”`}
            </p>
          ) : null}
        </div>

        {filtered.length === 0 ? (
          <p className="mx-auto mt-12 max-w-md text-center text-base text-muted-foreground">
            No tools match{" "}
            <span className="font-medium text-foreground">“{queryTrimmed}”</span>.
            Try a shorter keyword or clear the search box above.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
