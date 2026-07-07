"use client";

import { FC } from "react";
import Image from "next/image";
import { useSeasonFinalQuery } from "@/repositories/SeasonRepository";
import { useEquipoQuery } from "@/repositories/EquipoRepository";
import MiniLoading from "../loading/MiniLoading";

interface FaseFinalDeEtapaPageProps {
  faseId: string;
}

const EquipoRow: FC<{ label: string; logoUrl?: string; name?: string }> = ({
  label,
  logoUrl,
  name,
}) => (
  <div className="rounded-lg p-4 flex flex-col gap-3" style={{ backgroundColor: "#111" }}>
    <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
      {label}
    </span>
    {name ? (
      <div className="flex items-center gap-3">
        {logoUrl && (
          <Image src={logoUrl} alt={name} width={32} height={32} className="object-contain" />
        )}
        <span className="text-white text-sm font-medium uppercase">{name}</span>
      </div>
    ) : (
      <span className="text-gray-500 text-sm">Todavía sin definir</span>
    )}
  </div>
);

export const FaseFinalDeEtapaPage: FC<FaseFinalDeEtapaPageProps> = ({
  faseId,
}) => {
  const { data: faseFinal, isLoading } = useSeasonFinalQuery(faseId);

  const { data: ganadorRegular } = useEquipoQuery(
    faseFinal?.regularStageWinnerId || "",
    !!faseFinal?.regularStageWinnerId
  );
  const { data: ganadorPlayoff } = useEquipoQuery(
    faseFinal?.playoffWinnerId || "",
    !!faseFinal?.playoffWinnerId
  );
  const { data: campeon } = useEquipoQuery(
    faseFinal?.stageFinalWinnerId || "",
    !!faseFinal?.stageFinalWinnerId
  );
  const { data: partidoLocal } = useEquipoQuery(
    faseFinal?.stageFinalMatch?.homeTeamId || "",
    !!faseFinal?.stageFinalMatch?.homeTeamId
  );
  const { data: partidoVisitante } = useEquipoQuery(
    faseFinal?.stageFinalMatch?.awayTeamId || "",
    !!faseFinal?.stageFinalMatch?.awayTeamId
  );

  if (isLoading || !faseFinal) {
    return (
      <div className="flex justify-center py-10">
        <MiniLoading />
      </div>
    );
  }

  const match = faseFinal.stageFinalMatch;
  const partidoJugado = match?.status === "played";

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EquipoRow
          label="Ganador de la Fase Regular"
          name={ganadorRegular?.name}
          logoUrl={ganadorRegular?.logoUrl}
        />
        <EquipoRow
          label="Ganador del Playoff"
          name={ganadorPlayoff?.name}
          logoUrl={ganadorPlayoff?.logoUrl}
        />
      </div>

      {faseFinal.stageFinalWinnerId && !faseFinal.stageFinalMatchNeeded && (
        <div
          className="rounded-lg p-4 flex items-center gap-3"
          style={{ backgroundColor: "#111", border: "1px solid var(--color-primary)" }}
        >
          {campeon?.logoUrl && (
            <Image src={campeon.logoUrl} alt={campeon.name} width={40} height={40} className="object-contain" />
          )}
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Campeón de la etapa
            </span>
            <span className="text-white text-lg font-bold uppercase">
              {campeon?.name || "—"}
            </span>
          </div>
        </div>
      )}

      {faseFinal.stageFinalMatchNeeded && match && (
        <div className="rounded-lg p-4 flex flex-col gap-2" style={{ backgroundColor: "#111" }}>
          <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Partido final de etapa
          </span>
          {partidoJugado ? (
            <span className="text-white text-sm">
              {partidoLocal?.name || "Local"} {match.homeTeamGoals} - {match.awayTeamGoals}{" "}
              {partidoVisitante?.name || "Visitante"}
            </span>
          ) : (
            <span className="text-gray-400 text-sm">
              A definir{match.date ? ` — ${match.date}` : ""}
              {match.field ? ` en ${match.field}` : ""}
            </span>
          )}
        </div>
      )}

      {faseFinal.stageFinalMatchNeeded && faseFinal.stageFinalWinnerId && (
        <div
          className="rounded-lg p-4 flex items-center gap-3"
          style={{ backgroundColor: "#111", border: "1px solid var(--color-primary)" }}
        >
          {campeon?.logoUrl && (
            <Image src={campeon.logoUrl} alt={campeon.name} width={40} height={40} className="object-contain" />
          )}
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Campeón de la etapa
            </span>
            <span className="text-white text-lg font-bold uppercase">
              {campeon?.name || "—"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
