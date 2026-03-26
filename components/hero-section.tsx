"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export type HeroSectionProps = {
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  browseHref?: string;
};

export function HeroSection({
  title = "Smart tools that simplify your work",
  description = "Free online tools for developers, creators, and everyday users. No signup required.",
  searchPlaceholder = "Search tools...",
  browseHref = "#tools",
}: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {description}
          </p>

          <div className="mx-auto mt-10 max-w-xl">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                name="hero-search"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 w-full rounded-xl border border-input bg-background pl-12 pr-4 text-base text-foreground shadow-sm transition-shadow placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="mt-8">
            <Button size="lg" className="h-12 px-8 text-base" asChild>
              <Link href={browseHref}>Browse Tools</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute -top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-muted/50 blur-3xl" />
      </div>
    </section>
  );
}
