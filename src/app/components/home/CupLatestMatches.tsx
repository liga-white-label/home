"use client";

import { useState } from "react";
import {
  useAllFasesByCampeonato,
  useOneFaseCampeonatoQuery,
  useOneFasePlayoffCopaQuery,
} from "@/repositories/CampeonatoRepository";
import {
  convertToSimplifiedMatch,
  Match,
  MatchStatus,
  SimplifiedMatch,
} from "@/app/models/Match";
import { FaseGruposCopa } from "@/app/models/FaseCampeonato";
import Link from "next/link";
import MiniLoading from "../loading/MiniLoading";
import MatchResultRow from "./MatchResultRow";
import InfoMatchModal from "../InfoMatchModal";
import {
  findMostAdvancedRound,
  getRoundLabel,
  roundToSimplifiedMatches,
  groupMatchesByDay,
} from "./playoffUtils";

interface CupLatestMatchesProps {
  cupId: string;
}

const DayHeader = ({ label }: { label: string }) => (
  <div className="px-4 py-2" style={{ backgroundColor: "#1a1a1a" }}>
    <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
      {label}
    </span>
  </div>
);

const CupLatestMatches = ({ cupId }: CupLatestMatchesProps) => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const { data: fases = [], isLoading: isLoadingFases } =
    useAllFasesByCampeonato(cupId);

  const groupPhase = (fases as any[]).find((f) => f.type === "group") ?? null;
  const playoffPhase = (fases as any[]).find((f) => f.type === "playoff") ?? null;

  const { data: gruposData = [], isLoading: isLoadingGrupos } =
    useOneFaseCampeonatoQuery({ id: groupPhase?.id ?? "", enabled: !!groupPhase?.id });

  const { data: playoffRounds = [], isLoading: isLoadingPlayoff } =
    useOneFasePlayoffCopaQuery({ id: playoffPhase?.id ?? "", enabled: !!playoffPhase?.id });

  const isLoading = isLoadingFases || isLoadingGrupos || isLoadingPlayoff;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <MiniLoading />
      </div>
    );
  }

  const activeRound = findMostAdvancedRound(playoffRounds);

  if (activeRound) {
    const playoffMatches = roundToSimplifiedMatches(activeRound);
    const played = playoffMatches.filter((m) => m.status === MatchStatus.JUGADO);
    const upcoming = playoffMatches.filter((m) => m.status !== MatchStatus.JUGADO);
    const toShow = [...played, ...upcoming];

    return (
      <>
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #1a1a1a" }}>
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Playoffs — {getRoundLabel(activeRound.roundNumber)}
          </span>
          <Link
            href={`/campeonatos/${cupId}?tab=2`}
            className="text-xs font-semibold hover:opacity-80 transition-opacity"
            style={{ color: "var(--color-primary)" }}
          >
            Ver playoffs →
          </Link>
        </div>
        {groupMatchesByDay(toShow).map((group) => (
          <div key={group.dayKey}>
            <DayHeader label={group.dayLabel} />
            {group.matches.map((match, i) => (
              <MatchResultRow
                key={i}
                match={match}
                onClick={match.matchDetail ? () => setSelectedMatch(match.matchDetail!) : undefined}
              />
            ))}
          </div>
        ))}
        <InfoMatchModal
          openMatchModal={selectedMatch !== null}
          handleCloseModal={() => setSelectedMatch(null)}
          match={selectedMatch}
        />
      </>
    );
  }

  if (!groupPhase || (gruposData as FaseGruposCopa[]).length === 0) {
    return (
      <p className="text-center text-gray-500 py-8 text-sm">
        No hay información disponible para esta copa.
      </p>
    );
  }

  const allMatches: SimplifiedMatch[] = (gruposData as FaseGruposCopa[]).flatMap(
    (grupo) => grupo.matches.map(convertToSimplifiedMatch)
  );

  const played = allMatches
    .filter((m) => m.status === MatchStatus.JUGADO)
    .sort((a, b) => (b.dateNumber ?? 0) - (a.dateNumber ?? 0))
    .slice(0, 6);

  const upcoming = allMatches
    .filter((m) => m.status !== MatchStatus.JUGADO)
    .sort((a, b) => (a.dateNumber ?? 0) - (b.dateNumber ?? 0))
    .slice(0, 4);

  const toShow = played.length > 0 ? played : upcoming;
  const label = played.length > 0 ? "Últimos resultados" : "Próximos partidos";

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #1a1a1a" }}>
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          {label}
        </span>
        <Link
          href={`/campeonatos/${cupId}`}
          className="text-xs font-semibold hover:opacity-80 transition-opacity"
          style={{ color: "var(--color-primary)" }}
        >
          Ver copa →
        </Link>
      </div>
      {toShow.length === 0 ? (
        <p className="text-center text-gray-500 py-8 text-sm">
          No hay partidos disponibles.
        </p>
      ) : (
        groupMatchesByDay(toShow).map((group) => (
          <div key={group.dayKey}>
            <DayHeader label={group.dayLabel} />
            {group.matches.map((match, i) => (
              <MatchResultRow
                key={i}
                match={match}
                onClick={match.matchDetail ? () => setSelectedMatch(match.matchDetail!) : undefined}
              />
            ))}
          </div>
        ))
      )}
      <InfoMatchModal
        openMatchModal={selectedMatch !== null}
        handleCloseModal={() => setSelectedMatch(null)}
        match={selectedMatch}
      />
    </>
  );
};

export default CupLatestMatches;
