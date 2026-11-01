"use client";

import Image from "next/image";
import { useState } from "react";
import { FilterPill } from "@/components/ui/filter-pill";
import { Tag } from "@/components/ui/primitives";
import { insightCategories, insightDrafts } from "@/content/insights";

/** Working titles only. Labelled "In draft", with no read times, and deliberately not links. */
export function InsightList({ limit, filterable = false }: { limit?: number; filterable?: boolean }) {
  const [category, setCategory] = useState<string | null>(null);
  const drafts = insightDrafts.filter((draft) => !category || draft.category === category).slice(0, limit);

  return (
    <>
      {filterable && (
        <div role="group" aria-label="Filter by topic" className="mb-8 flex flex-wrap gap-2 md:mb-12">
          <FilterPill active={!category} onClick={() => setCategory(null)}>All</FilterPill>
          {insightCategories.map((item) => (
            <FilterPill key={item} active={category === item} onClick={() => setCategory(item)}>{item}</FilterPill>
          ))}
        </div>
      )}
      <ul className="divide-y divide-current/15 border-y border-current/15">
        {drafts.map((draft) => (
          <li key={draft.title} className="flex items-center gap-5 py-5 md:gap-8 md:py-6">
            <div className="relative aspect-[3/2] w-28 shrink-0 overflow-hidden rounded-md bg-graphite sm:w-40 md:w-56">
              <Image src={draft.image} alt="" fill sizes="(min-width: 768px) 224px, 160px" className="object-cover" />
            </div>
            <div>
              <h3 className="font-display text-[clamp(1.125rem,2vw,1.875rem)] leading-[1.15] font-bold tracking-[-0.02em]">{draft.title}</h3>
              <p className="mt-2 hidden text-sm leading-relaxed opacity-75 sm:block">{draft.premise}</p>
              <p className="mt-2 flex items-center gap-3 text-sm font-medium">
                {draft.category}
                <Tag>In draft</Tag>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
