"use client";

import { useState } from "react";

import { HeroSection } from "@/components/hero-section";
import { ToolsSection } from "@/components/tools-section";

export function HomeSearchTools() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <ToolsSection searchQuery={searchQuery} />
    </>
  );
}
