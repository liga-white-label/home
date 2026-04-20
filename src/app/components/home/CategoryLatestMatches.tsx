"use client";

import { useState, useMemo } from "react";
import {
  useAllFasesByCategoryQuery,
  useCurrentDateQuery,
  useLeagueMatchesQuery,
  useOneFasePlayoffQuery,
} from "@/repositories/CategoriaRepository";
import moment from "moment";
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

const parseFieldOrder = (s: string): [number, number] => {
  const m = s.match(/^(Cancha|Sint[eé]tico)\s+(\d+)$/i);
  if (!m) return [2, 0];
  return [m[1].toLowerCase() === "cancha" ? 0 : 1, parseInt(m[2])];
};

const CategoryLatestMatches = ({
  categoryId,
  ligaId,
}: CategoryLatestMatchesProps) => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedCancha, setSelectedCancha] = useState<string | null>(null);

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

  const sorted: SimplifiedMatch[] = [...(generalMatches as SimplifiedMatch[])].sort(
    (a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return moment(a.date).valueOf() - moment(b.date).valueOf();
    }
  );

  const availableCanchas = useMemo(() => {
    const fields = Array.from(new Set(sorted.map((m) => m.field).filter(Boolean) as string[]));
    return fields.sort((a, b) => {
      const [ta, na] = parseFieldOrder(a);
      const [tb, nb] = parseFieldOrder(b);
      return ta !== tb ? ta - tb : na - nb;
    });
  }, [sorted]);

  const filteredMatches = selectedCancha
    ? sorted.filter((m) => m.field === selectedCancha)
    : sorted;

  const canchaLabel = selectedCancha
    ? selectedCancha.toUpperCase()
    : "TODAS LAS CANCHAS";

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
            className="text-xs font-semibold hover:opacity-80 transition-opacity text-gray-500"
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

  return (
    <>
      {availableCanchas.length > 0 && (
        <div className="flex gap-2 overflow-x-auto px-4 pt-3 pb-1 flex-wrap">
          <button
            onClick={() => setSelectedCancha(null)}
            className="whitespace-nowrap px-3 py-1.5 rounded text-sm font-medium transition-colors flex-shrink-0"
            style={{
              backgroundColor: selectedCancha === null ? "white" : "#1a1a1a",
              color: selectedCancha === null ? "#0a0a0a" : "#9ca3af",
              border: "1px solid",
              borderColor: selectedCancha === null ? "white" : "#2a2a2a",
              fontWeight: selectedCancha === null ? 700 : 500,
            }}
          >
            Todas
          </button>
          {availableCanchas.map((cancha) => (
            <button
              key={cancha}
              onClick={() => setSelectedCancha(cancha)}
              className="whitespace-nowrap px-3 py-1.5 rounded text-sm font-medium transition-colors flex-shrink-0"
              style={{
                backgroundColor: selectedCancha === cancha ? "white" : "#1a1a1a",
                color: selectedCancha === cancha ? "#0a0a0a" : "#9ca3af",
                border: "1px solid",
                borderColor: selectedCancha === cancha ? "white" : "#2a2a2a",
                fontWeight: selectedCancha === cancha ? 700 : 500,
              }}
            >
              {cancha}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #1a1a1a" }}>
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Fase Regular — Fecha {currentDate} — {canchaLabel}
        </span>
        <Link
          href={`/campeonatos/${ligaId}/categorias/${categoryId}?tab=1`}
          className="text-xs font-semibold hover:opacity-80 transition-opacity text-gray-500"
        >
          Ver fixture completo →
        </Link>
      </div>
      {filteredMatches.length === 0 ? (
        <p className="text-center text-gray-500 py-8 text-sm">
          No hay partidos para esta fecha.
        </p>
      ) : (
        groupMatchesByDay(filteredMatches).map((group) => (
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
