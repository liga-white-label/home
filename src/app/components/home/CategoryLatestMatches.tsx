"use client";

import { useState } from "react";
import {
  useAllFasesByCategoryQuery,
  useCurrentDateQuery,
  useLeagueMatchesQuery,
  useOneFasePlayoffQuery,
} from "@/repositories/CategoriaRepository";
import { Match, MatchStatus, SimplifiedMatch } from "@/app/models/Match";
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

interface CategoryLatestMatchesProps {
  categoryId: string;
  ligaId: string;
}

const DayHeader = ({ label }: { label: string }) => (
  <div
    className="px-4 py-2"
    style={{ backgroundColor: "#1a1a1a" }}
  >
    <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
      {label}
    </span>
  </div>
);

const CategoryLatestMatches = ({
  categoryId,
  ligaId,
}: CategoryLatestMatchesProps) => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const { data: fases, isLoading: isLoadingFases } =
    useAllFasesByCategoryQuery(categoryId);

  const faseRegular =
    fases?.phases?.find((f: any) => f.type === "general") ?? null;
  const fasePlayoff =
    fases?.phases?.find((f: any) => f.type === "playoff") ?? null;

  const { data: currentDate, isLoading: isLoadingDate } = useCurrentDateQuery(
    faseRegular?.id ?? ""
  );
  const { data: generalMatches = [], isLoading: isLoadingMatches } =
    useLeagueMatchesQuery(faseRegular?.id ?? "", currentDate);

  const { data: playoffRounds = [], isLoading: isLoadingPlayoff } =
    useOneFasePlayoffQuery({ id: fasePlayoff?.id ?? "", enabled: !!fasePlayoff?.id });

  const isLoading =
    isLoadingFases || isLoadingDate || isLoadingMatches || isLoadingPlayoff;

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
            href={`/campeonatos/${ligaId}/categorias/${categoryId}?tab=2`}
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

  if (!faseRegular) {
    return (
      <p className="text-center text-gray-500 py-8 text-sm">
        No hay información disponible para esta categoría.
      </p>
    );
  }

  const sorted: SimplifiedMatch[] = [
    ...(generalMatches as SimplifiedMatch[]).filter((m) => m.status === MatchStatus.JUGADO),
    ...(generalMatches as SimplifiedMatch[]).filter((m) => m.status !== MatchStatus.JUGADO),
  ];

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #1a1a1a" }}>
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Fase Regular — Fecha {currentDate}
        </span>
        <Link
          href={`/campeonatos/${ligaId}/categorias/${categoryId}?tab=1`}
          className="text-xs font-semibold hover:opacity-80 transition-opacity"
          style={{ color: "var(--color-primary)" }}
        >
          Ver fixture completo →
        </Link>
      </div>
      {sorted.length === 0 ? (
        <p className="text-center text-gray-500 py-8 text-sm">
          No hay partidos para esta fecha.
        </p>
      ) : (
        groupMatchesByDay(sorted).map((group) => (
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

export default CategoryLatestMatches;
