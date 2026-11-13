"use client";

import { useState, useMemo } from "react";
import {
  useAllFasesByCategoryQuery,
  useCurrentDateQuery,
  useCurrentDateGroupQuery,
  useGeneralMatchesDetailQuery,
  useLeagueMatchesQuery,
  useLeagueGroupMatchesQuery,
  useOneFasePlayoffQuery,
  useFasesPlayoffQueries,
} from "@/repositories/CategoriaRepository";
import { convertToSimplifiedMatch } from "@/app/models/Match";
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
  isSingleMatchPhaseCurrent,
  singleMatchPhaseMatches,
} from "./playoffUtils";
import SingleMatchLatestBlock from "./SingleMatchLatestBlock";

// Mismo offset que TabsEnum.PARTIDO_UNICO_BASE en CategoriaPageBase
const PARTIDO_UNICO_TAB_BASE = 500;
const isFinishedOrMissingDate = (d: unknown) => d === undefined || d === null || Number(d) < 0;

interface CategoryLatestMatchesProps {
  categoryId: string;
  ligaId: string;
}

const DayHeader = ({ label }: { label: string }) => (
  <div
    className="px-4 py-2"
    style={{ backgroundColor: "var(--color-surface)" }}
  >
    <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
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
  const faseGrupo =
    fases?.phases?.find((f: any) => f.type === "group" || f.type === "intergroup") ?? null;

  const { data: currentDate, isLoading: isLoadingDate } = useCurrentDateQuery(
    faseRegular?.id ?? ""
  );
  const { data: generalMatches = [], isLoading: isLoadingMatches } =
    useLeagueMatchesQuery(faseRegular?.id ?? "", currentDate);

  const { data: playoffRounds = [], isLoading: isLoadingPlayoff } =
    useOneFasePlayoffQuery({ id: fasePlayoff?.id ?? "", enabled: !!fasePlayoff?.id });

  const { data: currentGroupDate, isLoading: isLoadingGroupDate } =
    useCurrentDateGroupQuery(!faseRegular ? (faseGrupo?.id ?? "") : "");
  const { data: groupMatchesRaw = [], isLoading: isLoadingGroupMatches } =
    useLeagueGroupMatchesQuery(!faseRegular ? (faseGrupo?.id ?? "") : "", currentGroupDate);

  // Fases de partido único (finales, partidos extras, promociones)
  const fasesPartidoUnico: any[] =
    fases?.phases?.filter((f: any) => f.type === "singlematch") ?? [];
  const singleMatchQueries = useFasesPlayoffQueries(
    fasesPartidoUnico.map((f: any) => f.id)
  );

  const groupMatches: SimplifiedMatch[] = useMemo(() => {
    if (!Array.isArray(groupMatchesRaw)) return [];
    return (groupMatchesRaw as any[]).flatMap((g: any) =>
      (g.matches ?? []).map(convertToSimplifiedMatch)
    );
  }, [groupMatchesRaw]);

  const isLoading =
    isLoadingFases || isLoadingDate || isLoadingMatches || isLoadingPlayoff ||
    isLoadingGroupDate || isLoadingGroupMatches ||
    singleMatchQueries.some((q) => q.isLoading);

  const sorted: SimplifiedMatch[] = [...(generalMatches as SimplifiedMatch[])].sort(
    (a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return moment(a.date).valueOf() - moment(b.date).valueOf();
    }
  );

  const generalMatchDetailQueries = useGeneralMatchesDetailQuery(
    sorted,
    faseRegular?.id ?? ""
  );
  const sortedWithDetail: SimplifiedMatch[] = sorted.map((m, i) => ({
    ...m,
    matchDetail: generalMatchDetailQueries[i]?.data as Match | undefined,
  }));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <MiniLoading />
      </div>
    );
  }

  const activeRound = findMostAdvancedRound(playoffRounds);

  // No queda otra fase en curso: no hay playoff y la fase regular/de grupos ya terminó (o no existe).
  const mainIsIdle = activeRound
    ? false
    : faseRegular
      ? isFinishedOrMissingDate(currentDate)
      : faseGrupo
        ? isFinishedOrMissingDate(currentGroupDate)
        : true;

  // Partidos únicos que se juegan esta fecha/finde (o se jugaron hace poco), o que quedan
  // pendientes cuando ya no hay otra fase en curso.
  const currentSingleMatches = fasesPartidoUnico
    .map((fase: any, index: number) => ({
      fase,
      index,
      matches: singleMatchPhaseMatches(singleMatchQueries[index]?.data ?? []),
    }))
    .filter(({ matches }) => isSingleMatchPhaseCurrent(matches, mainIsIdle));

  const singleMatchBlocks = currentSingleMatches.map(({ fase, index, matches }) => (
    <SingleMatchLatestBlock
      key={fase.id}
      title={fase.label || fase.name || "Partido único"}
      href={`/campeonatos/${ligaId}/categorias/${categoryId}?tab=${PARTIDO_UNICO_TAB_BASE + index}`}
      matches={matches}
      onSelectMatch={setSelectedMatch}
    />
  ));

  // Terminó la fase regular y solo quedan partidos únicos: se muestran solo esos
  if (mainIsIdle && singleMatchBlocks.length > 0) {
    return (
      <>
        {singleMatchBlocks}
        <InfoMatchModal
          openMatchModal={selectedMatch !== null}
          handleCloseModal={() => setSelectedMatch(null)}
          match={selectedMatch}
        />
      </>
    );
  }

  if (activeRound) {
    const playoffMatches = roundToSimplifiedMatches(activeRound);
    const played = playoffMatches.filter((m) => m.status === MatchStatus.JUGADO);
    const upcoming = playoffMatches.filter((m) => m.status !== MatchStatus.JUGADO);
    const toShow = [...played, ...upcoming];

    return (
      <>
        {singleMatchBlocks}
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--color-surface)" }}>
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
            Playoffs — {getRoundLabel(activeRound.roundNumber)}
          </span>
          <Link
            href={`/campeonatos/${ligaId}/categorias/${categoryId}?tab=2`}
            className="text-xs font-semibold hover:opacity-80 transition-opacity text-[var(--color-text-secondary)]"
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

  if (!faseRegular && faseGrupo) {
    const sortedGroupMatches = [...groupMatches].sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return moment(a.date).valueOf() - moment(b.date).valueOf();
    });

    return (
      <>
        {singleMatchBlocks}
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--color-surface)" }}>
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
            Fase de Grupos — Fecha {currentGroupDate}
          </span>
          <Link
            href={`/campeonatos/${ligaId}/categorias/${categoryId}?tab=200`}
            className="text-xs font-semibold hover:opacity-80 transition-opacity text-[var(--color-text-secondary)]"
          >
            Ver fixture completo →
          </Link>
        </div>
        {sortedGroupMatches.length === 0 ? (
          <p className="text-center text-[var(--color-text-secondary)] py-8 text-sm">
            No hay partidos para esta fecha.
          </p>
        ) : (
          groupMatchesByDay(sortedGroupMatches).map((group) => (
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
  }

  if (!faseRegular) {
    return (
      <p className="text-center text-[var(--color-text-secondary)] py-8 text-sm">
        No hay información disponible para esta categoría.
      </p>
    );
  }

  return (
    <>
      {singleMatchBlocks}
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--color-surface)" }}>
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
          Fecha {currentDate}
        </span>
        <Link
          href={`/campeonatos/${ligaId}/categorias/${categoryId}?tab=1`}
          className="text-xs font-semibold hover:opacity-80 transition-opacity text-[var(--color-text-secondary)]"
        >
          Ver fixture completo →
        </Link>
      </div>
      {sortedWithDetail.length === 0 ? (
        <p className="text-center text-[var(--color-text-secondary)] py-8 text-sm">
          No hay partidos para esta fecha.
        </p>
      ) : (
        groupMatchesByDay(sortedWithDetail).map((group) => (
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
