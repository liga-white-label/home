"use client";

import { FC, useState } from "react";
import { Liga } from "@/app/models/Campeonato";
import { useAccumulatedTableQuery } from "@/repositories/SeasonRepository";
import { TablaPosiciones, TABLA_GENERAL_ZONES } from "../TablaPosiciones";
import MiniLoading from "../loading/MiniLoading";

interface SeasonTablaGeneralPanelProps {
  apertura: Liga;
  clausura: Liga;
}

const normalize = (name: string) => name.trim().toLowerCase();

export const SeasonTablaGeneralPanel: FC<SeasonTablaGeneralPanelProps> = ({
  apertura,
  clausura,
}) => {
  const clausuraNames = new Set(
    (clausura.categories || []).map((c) => normalize(c.name))
  );
  const commonCategories = (apertura.categories || []).filter((c) =>
    clausuraNames.has(normalize(c.name))
  );

  const [selectedName, setSelectedName] = useState<string>(
    commonCategories[0]?.name || ""
  );

  const { data: positions, isLoading } = useAccumulatedTableQuery({
    aperturaLeagueId: apertura.id,
    clausuraLeagueId: clausura.id,
    categoryName: selectedName || commonCategories[0]?.name || "",
  });

  if (commonCategories.length === 0) {
    return (
      <p className="text-[var(--color-text-secondary)] text-sm">
        No hay categorías en común entre Apertura y Clausura.
      </p>
    );
  }

  const activeName = selectedName || commonCategories[0]?.name || "";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 overflow-x-auto">
        {commonCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedName(cat.name)}
            className="px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors"
            style={
              normalize(cat.name) === normalize(activeName)
                ? { backgroundColor: "var(--color-primary)", color: "#fff" }
                : { backgroundColor: "var(--color-surface-2)", color: "var(--color-text-secondary)", border: "1px solid var(--color-border)" }
            }
          >
            {cat.name}
          </button>
        ))}
      </div>
      {isLoading ? (
        <div className="flex justify-center py-10">
          <MiniLoading />
        </div>
      ) : (
        <TablaPosiciones
          data={positions || []}
          serverOrdered
          showNextMatch={false}
          title="Tabla General"
          zones={TABLA_GENERAL_ZONES}
        />
      )}
    </div>
  );
};
