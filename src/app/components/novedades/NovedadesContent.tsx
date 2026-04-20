"use client";

import NovedadCard from "./NovedadCard";
import { tenantConfig } from "@/config/tenant";
import moment from "moment";
import { useState, useEffect, useCallback, useMemo, memo, useRef } from "react";
import { Novedad } from "@/app/models/Novedad";
import {
  useAllCampeonatosQuery,
  useCampeonatoQuery,
  useAllFasesByCampeonato,
  useOneFaseCampeonatoQuery,
  useOneFasePlayoffCopaQuery,
} from "@/repositories/CampeonatoRepository";
import {
  useAllFasesByCategoryQuery,
  useCurrentDateQuery,
  useLeagueMatchesQuery,
  useOneFasePlayoffQuery,
} from "@/repositories/CategoriaRepository";
import { Liga } from "@/app/models/Campeonato";
import {
  MatchStatus,
  SimplifiedMatch,
  convertToSimplifiedMatch,
} from "@/app/models/Match";
import { FaseGruposCopa } from "@/app/models/FaseCampeonato";
import {
  findMostAdvancedRound,
  roundToSimplifiedMatches,
} from "../home/playoffUtils";
import MiniLoading from "../loading/MiniLoading";

const PAGE_SIZE = 4;

// ── Helpers ───────────────────────────────────────────────────────────────

const matchToNovedad = (
  match: SimplifiedMatch,
  sourceLabel: string,
  idPrefix: string
): Novedad => {
  const homeGoals = match.homeTeamGoals ?? 0;
  const awayGoals = match.awayTeamGoals ?? 0;
  const homeWon = homeGoals > awayGoals;
  const draw = homeGoals === awayGoals;

  let titulo: string;
  let descripcion: string;

  if (draw) {
    titulo = `Empate ${homeGoals}-${awayGoals}: ${match.homeTeamName} y ${match.awayTeamName} se repartieron los puntos`;
    descripcion = `${match.homeTeamName} y ${match.awayTeamName} no pudieron sacarse ventaja y empataron ${homeGoals}-${awayGoals} en un parejo encuentro de ${sourceLabel}, correspondiente a la fecha ${match.dateNumber}. Ambos equipos suman un punto en la tabla de posiciones.`;
  } else {
    const winner = homeWon ? match.homeTeamName : match.awayTeamName;
    const loser = homeWon ? match.awayTeamName : match.homeTeamName;
    const winGoals = homeWon ? homeGoals : awayGoals;
    const loseGoals = homeWon ? awayGoals : homeGoals;
    titulo = `${winner} venció ${winGoals}-${loseGoals} a ${loser} y suma tres puntos clave`;
    descripcion = `${winner} se impuso ante ${loser} con un contundente marcador de ${winGoals}-${loseGoals} en ${sourceLabel}, fecha ${match.dateNumber}. El triunfo le permite al equipo consolidar su posición en la tabla y continuar en la lucha por los primeros puestos de la competencia.`;
  }

  const rawLogo = homeWon || draw ? match.homeTeamLogo : match.awayTeamLogo;
  const imagen =
    rawLogo || `https://picsum.photos/seed/${idPrefix}-${match.homeTeamId}/600/400`;

  return {
    id: `${idPrefix}-${match.homeTeamId}-${match.awayTeamId}`,
    titulo,
    descripcion,
    fecha: match.date ?? moment(),
    imagen,
    categoria: sourceLabel,
  };
};

// ── Headless fetchers — render null, report data via callback ──────────────

interface CategoryFetcherProps {
  categoryId: string;
  categoryLabel: string;
  onResult: (sourceId: string, novedades: Novedad[]) => void;
}

const CategoryFetcher = memo(
  ({ categoryId, categoryLabel, onResult }: CategoryFetcherProps) => {
    const { data: fases } = useAllFasesByCategoryQuery(categoryId);
    const faseRegular =
      fases?.phases?.find((f: any) => f.type === "general") ?? null;
    const fasePlayoff =
      fases?.phases?.find((f: any) => f.type === "playoff") ?? null;

    const { data: currentDate } = useCurrentDateQuery(faseRegular?.id ?? "");
    const { data: generalMatches = [] } = useLeagueMatchesQuery(
      faseRegular?.id ?? "",
      currentDate
    );
    const { data: playoffRounds = [] } = useOneFasePlayoffQuery({
      id: fasePlayoff?.id ?? "",
      enabled: !!fasePlayoff?.id,
    });

    const activeRound = useMemo(
      () => findMostAdvancedRound(playoffRounds as any),
      [playoffRounds]
    );

    const novedades = useMemo(() => {
      let matches: SimplifiedMatch[];
      if (activeRound) {
        matches = roundToSimplifiedMatches(activeRound).filter(
          (m) => m.status === MatchStatus.JUGADO
        );
      } else {
        matches = (generalMatches as SimplifiedMatch[]).filter(
          (m) => m.status === MatchStatus.JUGADO
        );
      }
      return matches.map((m) =>
        matchToNovedad(m, categoryLabel, `cat-${categoryId}`)
      );
    }, [activeRound, generalMatches, categoryId, categoryLabel]);

    const onResultRef = useRef(onResult);
    useEffect(() => {
      onResultRef.current = onResult;
    });

    useEffect(() => {
      onResultRef.current(categoryId, novedades);
    }, [novedades, categoryId]);

    return null;
  }
);
CategoryFetcher.displayName = "CategoryFetcher";

interface CupFetcherProps {
  cupId: string;
  cupName: string;
  onResult: (sourceId: string, novedades: Novedad[]) => void;
}

const CupFetcher = memo(({ cupId, cupName, onResult }: CupFetcherProps) => {
  const { data: fases = [] } = useAllFasesByCampeonato(cupId);
  const groupPhase = (fases as any[]).find((f) => f.type === "group") ?? null;
  const playoffPhase =
    (fases as any[]).find((f) => f.type === "playoff") ?? null;

  const { data: gruposData = [] } = useOneFaseCampeonatoQuery({
    id: groupPhase?.id ?? "",
    enabled: !!groupPhase?.id,
  });
  const { data: playoffRounds = [] } = useOneFasePlayoffCopaQuery({
    id: playoffPhase?.id ?? "",
    enabled: !!playoffPhase?.id,
  });

  const activeRound = useMemo(
    () => findMostAdvancedRound(playoffRounds as any),
    [playoffRounds]
  );

  const novedades = useMemo(() => {
    let matches: SimplifiedMatch[];
    if (activeRound) {
      matches = roundToSimplifiedMatches(activeRound).filter(
        (m) => m.status === MatchStatus.JUGADO
      );
    } else {
      matches = (gruposData as FaseGruposCopa[])
        .flatMap((g) => g.matches.map(convertToSimplifiedMatch))
        .filter((m) => m.status === MatchStatus.JUGADO)
        .sort((a, b) => (b.dateNumber ?? 0) - (a.dateNumber ?? 0))
        .slice(0, 6);
    }
    return matches.map((m) => matchToNovedad(m, cupName, `cup-${cupId}`));
  }, [activeRound, gruposData, cupId, cupName]);

  const onResultRef = useRef(onResult);
  useEffect(() => {
    onResultRef.current = onResult;
  });

  useEffect(() => {
    onResultRef.current(cupId, novedades);
  }, [novedades, cupId]);

  return null;
});
CupFetcher.displayName = "CupFetcher";

// ── Main component ────────────────────────────────────────────────────────

const NovedadesContent = () => {
  const { data: allCampeonatos, isLoading: isLoadingAll } =
    useAllCampeonatosQuery();
  const campeonatoBase = allCampeonatos?.find((c) => c.current);
  const { data: campeonatoActual, isLoading: isLoadingLiga } =
    useCampeonatoQuery(campeonatoBase?.id ?? "");

  const liga = campeonatoActual as Liga | undefined;
  const categorias = liga?.categories ?? [];
  const copas =
    allCampeonatos?.filter((c) => c.type === "cup" && c.enabled) ?? [];

  const [collected, setCollected] = useState<Record<string, Novedad[]>>({});
  const [page, setPage] = useState(1);

  const handleResult = useCallback(
    (sourceId: string, novs: Novedad[]) => {
      setCollected((prev) => ({ ...prev, [sourceId]: novs }));
    },
    []
  );

  const novedades = useMemo(() => {
    const all = Object.values(collected).flat();
    return all.sort((a, b) => moment(b.fecha).diff(moment(a.fecha)));
  }, [collected]);

  const isLoadingTop = isLoadingAll || isLoadingLiga;
  const totalPages = Math.ceil(novedades.length / PAGE_SIZE);
  const paginated = novedades.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const [featured, ...rest] = paginated;

  return (
    <div className="flex flex-col w-full min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Invisible fetchers */}
      {!isLoadingTop &&
        categorias.map((cat) => (
          <CategoryFetcher
            key={cat.id}
            categoryId={cat.id}
            categoryLabel={`Cat. ${cat.name} ${cat.gender === "male" ? "Masculina" : "Femenina"}`}
            onResult={handleResult}
          />
        ))}
      {!isLoadingTop &&
        copas.map((cup) => (
          <CupFetcher
            key={cup.id}
            cupId={cup.id}
            cupName={cup.name}
            onResult={handleResult}
          />
        ))}

      {/* Masthead */}
      <div
        className="w-full pt-24 pb-8 px-6 md:px-10"
        style={{
          background:
            "radial-gradient(ellipse at 80% 0%, rgba(180,0,0,0.35) 0%, transparent 60%), #0a0a0a",
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: "var(--color-primary)" }}
        >
          {tenantConfig.brand.name}
        </p>
        <h1 className="text-white text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
          Novedades
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-6 py-8">
        {isLoadingTop ? (
          <div className="flex justify-center py-20">
            <MiniLoading />
          </div>
        ) : novedades.length === 0 ? (
          <p className="text-center text-gray-500 py-20">
            No hay novedades disponibles.
          </p>
        ) : (
          <>
            {/* Featured article */}
            {featured && (
              <div className="mb-10">
                <NovedadCard novedad={featured} featured />
              </div>
            )}

            {/* Grid */}
            {rest.length > 0 && (
              <>
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Más noticias
                  </span>
                  <div className="flex-1 h-px" style={{ backgroundColor: "#1f1f1f" }} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {rest.map((novedad) => (
                    <NovedadCard key={novedad.id} novedad={novedad} />
                  ))}
                </div>
              </>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 pt-4 pb-10">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setPage(p);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-9 h-9 rounded text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: page === p ? "var(--color-primary)" : "#1a1a1a",
                      color: page === p ? "white" : "#9ca3af",
                      border: "1px solid",
                      borderColor: page === p ? "var(--color-primary)" : "#2a2a2a",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NovedadesContent;
