"use client";

import { FC, useEffect, useState } from "react";
import { useZonasQuery } from "@/repositories/ZonaRepository";
import { ZonaPanel } from "./ZonaPanel";
import MiniLoading from "../loading/MiniLoading";

interface ZonalTournamentViewProps {
  torneoId: string;
}

export const ZonalTournamentView: FC<ZonalTournamentViewProps> = ({
  torneoId,
}) => {
  const { data: zonas, isLoading } = useZonasQuery(torneoId);
  const [selectedZoneId, setSelectedZoneId] = useState<string>("");

  useEffect(() => {
    if (!selectedZoneId && zonas && zonas.length > 0) {
      setSelectedZoneId(zonas[0].id);
    }
  }, [zonas, selectedZoneId]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <MiniLoading />
      </div>
    );
  }

  if (!zonas || zonas.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        Todavía no hay zonas cargadas para este torneo.
      </p>
    );
  }

  const hasBothGenders = new Set(zonas.map((z) => z.gender)).size > 1;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-3 overflow-x-auto">
        {zonas.map((zona) => (
          <button
            key={zona.id}
            onClick={() => setSelectedZoneId(zona.id)}
            className="px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors"
            style={
              selectedZoneId === zona.id
                ? { backgroundColor: "var(--color-primary)", color: "#fff" }
                : { backgroundColor: "#111", color: "#9ca3af", border: "1px solid #2a2a2a" }
            }
          >
            {zona.name}
            {hasBothGenders
              ? ` — ${zona.gender === "male" ? "Masculino" : "Femenino"}`
              : ""}
          </button>
        ))}
      </div>
      {selectedZoneId && (
        <ZonaPanel key={selectedZoneId} zoneId={selectedZoneId} torneoId={torneoId} />
      )}
    </div>
  );
};
