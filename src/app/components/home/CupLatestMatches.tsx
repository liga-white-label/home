"use client";

import { useState, useMemo } from "react";
import {
  useAllFasesByCampeonato,
  useOneFaseCampeonatoQuery,
  useOneFasePlayoffCopaQuery,
} from "@/repositories/CampeonatoRepository";
import moment from "moment";
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

const parseFieldOrder = (s: string): [number, number] => {
  const m = s.match(/^(Cancha|Sint[eé]tico)\s+(\d+)$/i);
  if (!m) return [2, 0];
  return [m[1].toLowerCase() === "cancha" ? 0 : 1, parseInt(m[2])];
};

const CupLatestMatches = ({ cupId }: CupLatestMatchesProps) => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedCancha, setSelectedCancha] = useState<string | null>(null);

  const { data: fases = [], isLoading: isLoadingFases } =
    useAllFasesByCampeonato(cupId);

  const groupPhase = (fases as any[]).find((f) => f.type === "group") ?? null;
  const playoffPhase = (fases as any[]).find((f) => f.type === "playoff") ?? null;

  const { data: gruposData = [], isLoading: isLoadingGrupos } =
    useOneFaseCampeonatoQuery({ id: groupPhase?.id ?? "", enabled: !!groupPhase?.id });

  const { data: playoffRounds = [], isLoading: isLoadingPlayoff } =
    useOneFasePlayoffCopaQuery({ id: playoffPhase?.id ?? "", enabled: !!playoffPhase?.id });

  const isLoading = isLoadingFases || isLoadingGrupos || isLoadingPlayoff;

  const activeRound = findMostAdvancedRound(playoffRounds);

  const allMatches: SimplifiedMatch[] = useMemo(
    () =>
      activeRound
        ? []
        : (gruposData as FaseGruposCopa[]).flatMap((grupo) =>
            grupo.matches.map(convertToSimplifiedMatch)
          ),
    [activeRound, gruposData]
  );

  const sortByDate = (a: SimplifiedMatch, b: SimplifiedMatch) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return moment(a.date).valueOf() - moment(b.date).valueOf();
  };

  const groupToShow = useMemo(() => {
    if (activeRound) return [];
    const played = allMatches
      .filter((m) => m.status === MatchStatus.JUGADO)
      .sort(sortByDate)
      .slice(0, 6);
    const upcoming = allMatches
      .filter((m) => m.status !== MatchStatus.JUGADO)
      .sort(sortByDate)
      .slice(0, 4);
    return played.length > 0 ? played : upcoming;
  }, [activeRound, allMatches]);

  const groupLabel = useMemo(() => {
    if (activeRound) return "";
    const played = allMatches.filter((m) => m.status === MatchStatus.JUGADO);
    return played.length > 0 ? "Últimos resultados" : "Próximos partidos";
  }, [activeRound, allMatches]);

  const availableCanchas = useMemo(() => {
    const fields = Array.from(new Set(groupToShow.map((m) => m.field).filter(Boolean) as string[]));
    return fields.sort((a, b) => {
      const [ta, na] = parseFieldOrder(a);
      const [tb, nb] = parseFieldOrder(b);
      return ta !== tb ? ta - tb : na - nb;
    });
  }, [groupToShow]);

  const filteredMatches = selectedCancha
    ? groupToShow.filter((m) => m.field === selectedCancha)
    : groupToShow;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <MiniLoading />
      </div>
    );
  }

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

  if (!groupPhase || (gruposData as FaseGruposCopa[]).length === 0) {
    return (
      <p className="text-center text-gray-500 py-8 text-sm">
        No hay información disponible para esta copa.
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
          {groupLabel}
        </span>
        <Link
          href={`/campeonatos/${cupId}`}
          className="text-xs font-semibold hover:opacity-80 transition-opacity"
          style={{ color: "var(--color-primary)" }}
        >
          Ver copa →
        </Link>
      </div>
      {filteredMatches.length === 0 ? (
        <p className="text-center text-gray-500 py-8 text-sm">
          No hay partidos disponibles.
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

export default CupLatestMatches;
