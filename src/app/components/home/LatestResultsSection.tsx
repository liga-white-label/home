"use client";

import { useState } from "react";
import { Liga, Campeonato } from "@/app/models/Campeonato";
import CategoryLatestMatches from "./CategoryLatestMatches";
import CupLatestMatches from "./CupLatestMatches";

type TabItem =
  | { kind: "category"; id: string; label: string; ligaId: string }
  | { kind: "cup"; id: string; label: string };

interface LatestResultsSectionProps {
  liga: Liga | null;
  cups: Campeonato[];
}

const LatestResultsSection = ({ liga, cups }: LatestResultsSectionProps) => {
  const categoryTabs: TabItem[] = (liga?.categories ?? []).map((cat) => ({
    kind: "category",
    id: cat.id,
    label: `Cat ${cat.name} — ${cat.gender === "male" ? "Masculina" : "Femenina"}`,
    ligaId: liga!.id,
  }));

  const cupTabs: TabItem[] = cups.map((cup) => ({
    kind: "cup",
    id: cup.id,
    label: cup.name,
  }));

  const tabs: TabItem[] = [...categoryTabs, ...cupTabs];

  const [selectedId, setSelectedId] = useState<string>(tabs[0]?.id ?? "");

  if (tabs.length === 0) return null;

  const selectedTab = tabs.find((t) => t.id === selectedId) ?? tabs[0];

  return (
    <section className="w-full">
      {/* Header + tabs */}
      <div
        className="px-4 md:px-10 pt-6 pb-0"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <h2 className="text-white text-xl font-bold mb-4 tracking-wide uppercase">
          Última Fecha
        </h2>

        <div className="flex gap-2 overflow-x-auto pb-0">
          {tabs.map((tab) => {
            const isSelected = tab.id === selectedId;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedId(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-t-lg text-sm font-medium transition-colors flex-shrink-0 ${
                  isSelected
                    ? "bg-white text-black font-bold"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content panel */}
      <div className="bg-white border-b border-gray-100 min-h-[180px]">
        {selectedTab.kind === "category" && (
          <CategoryLatestMatches
            key={selectedTab.id}
            categoryId={selectedTab.id}
            ligaId={selectedTab.ligaId}
          />
        )}
        {selectedTab.kind === "cup" && (
          <CupLatestMatches key={selectedTab.id} cupId={selectedTab.id} />
        )}
      </div>
    </section>
  );
};

export default LatestResultsSection;
