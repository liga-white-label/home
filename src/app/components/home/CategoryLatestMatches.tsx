"use client";

import {
  useAllFasesByCategoryQuery,
  useCurrentDateQuery,
  useLeagueMatchesQuery,
  useOneFasePlayoffQuery,
} from "@/repositories/CategoriaRepository";
import { MatchStatus, SimplifiedMatch } from "@/app/models/Match";
import Link from "next/link";
import MiniLoading from "../loading/MiniLoading";
import MatchResultRow from "./MatchResultRow";
import {
  findMostAdvancedRound,
  getRoundLabel,
  roundToSimplifiedMatches,
} from "./playoffUtils";

interface CategoryLatestMatchesProps {
  categoryId: string;
  ligaId: string;
}

const CategoryLatestMatches = ({
  categoryId,
  ligaId,
}: CategoryLatestMatchesProps) => {
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

  // Determine what to show: playoff takes priority if any match has been played
  const activeRound = findMostAdvancedRound(playoffRounds);

  if (activeRound) {
    const playoffMatches = roundToSimplifiedMatches(activeRound);
    const played = playoffMatches.filter(
      (m) => m.status === MatchStatus.JUGADO
    );
    const upcoming = playoffMatches.filter(
      (m) => m.status !== MatchStatus.JUGADO
    );
    const toShow = [...played, ...upcoming];

    return (
      <div className="px-4 md:px-8 py-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>
            Playoffs — {getRoundLabel(activeRound.roundNumber)}
          </span>
          <Link
            href={`/campeonatos/${ligaId}/categorias/${categoryId}?tab=2`}
            className="text-sm font-medium hover:underline"
            style={{ color: "var(--color-primary)" }}
          >
            Ver playoffs →
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          {toShow.map((match, i) => (
            <MatchResultRow key={i} match={match} />
          ))}
        </div>
      </div>
    );
  }

  // Fallback: show general phase current-date matches
  if (!faseRegular) {
    return (
      <p className="text-center text-gray-400 py-8 text-sm">
        No hay información disponible para esta categoría.
      </p>
    );
  }

  const sorted: SimplifiedMatch[] = [
    ...(generalMatches as SimplifiedMatch[]).filter(
      (m) => m.status === MatchStatus.JUGADO
    ),
    ...(generalMatches as SimplifiedMatch[]).filter(
      (m) => m.status !== MatchStatus.JUGADO
    ),
  ];

  return (
    <div className="px-4 md:px-8 py-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-400 font-medium">
          Fase Regular — Fecha {currentDate}
        </span>
        <Link
          href={`/campeonatos/${ligaId}/categorias/${categoryId}?tab=1`}
          className="text-sm font-medium hover:underline"
          style={{ color: "var(--color-primary)" }}
        >
          Ver fixture completo →
        </Link>
      </div>
      {sorted.length === 0 ? (
        <p className="text-center text-gray-400 py-6 text-sm">
          No hay partidos para esta fecha.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {sorted.map((match, i) => (
            <MatchResultRow key={i} match={match} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryLatestMatches;
