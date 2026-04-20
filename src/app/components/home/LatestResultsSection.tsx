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
    <section className="w-full px-4 md:px-10 py-8" style={{ backgroundColor: "#0a0a0a" }}>
      <h2 className="text-white text-lg font-bold mb-5 tracking-widest uppercase">
        Fecha Actual
      </h2>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-2">
        {tabs.map((tab) => {
          const isSelected = tab.id === selectedId;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedId(tab.id)}
              className="whitespace-nowrap px-4 py-2 rounded text-sm font-medium transition-colors flex-shrink-0"
              style={{
                backgroundColor: isSelected ? "white" : "#1a1a1a",
                color: isSelected ? "#0a0a0a" : "#9ca3af",
                border: "1px solid",
                borderColor: isSelected ? "white" : "#2a2a2a",
                fontWeight: isSelected ? 700 : 500,
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content panel */}
      <div className="rounded-lg overflow-hidden" style={{ backgroundColor: "#111" }}>
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
