"use client";

import { FC, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FixturePage } from "./FixturePage";
import { TablaDePosicionesWrapper } from "./TablasDePosicionesWrapper";
import PlayoffsPage from "../playoffs/PlayoffsPage";
import { useAllFasesByCategory } from "@/repositories/CategoriaRepository";
import { EstadisticasPage } from "./EstadisticasPage";
import CuadrangularDescensoPage from "./CuadrangularDescensoPage";
import { FaseGruposWrapper } from "../copa/FaseGruposWrapper";
import FixtureCopaPage from "../copa/FixtureCopaPage";
import { tenantConfig } from "@/config/tenant";
import { SeasonEnum } from "@/app/models/Campeonato";
import { SeasonSwitchBadge } from "../season/SeasonSwitchBadge";
import { FaseFinalDeEtapaPage } from "./FaseFinalDeEtapaPage";
import { useAccumulatedTableQuery } from "@/repositories/SeasonRepository";
import { TablaPosiciones } from "../TablaPosiciones";
import MiniLoading from "../loading/MiniLoading";

interface CategoriaPageBaseProps {
  id: string;
  title: string;
  seasonInfo?: {
    current: SeasonEnum;
    linkedId: string;
    aperturaId: string;
    clausuraId: string;
  } | null;
  hidePosiciones?: boolean;
  // Torneos con zonas (leaguewithzones): el ascenso/descenso se decide en la
  // tabla general de la zona (ver ZonaPanel), no en la fase de grupos de cada
  // categoría — ahí no deben pintarse colores.
  isZonal?: boolean;
}

export enum TabsEnum {
  POSICIONES = 0,
  FIXTURE = 1,
  PLAYOFFS = 2,
  ESTADISTICAS = 3,
  DESCENSO = 4,
  FASE_FINAL = 5,
  TABLA_GENERAL = 6,
  // Los tabs dinámicos empezarán desde 100
  GRUPOS_BASE = 100,
  FIXTURE_ZONAS_BASE = 200,
}

export const CategoriaPageBase: FC<CategoriaPageBaseProps> = ({
  id,
  title,
  seasonInfo = null,
  hidePosiciones = false,
  isZonal = false,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab");

  const { data: fases } = useAllFasesByCategory(id);

  const hasFases = fases?.phases.length > 0;

  const faseRegular =
    fases?.phases.find((f: any) => f.type === "general") || null;

  const fasePlayoff =
    fases?.phases.find((f: any) => f.type === "playoff") || null;

  const fasesGrupos =
    fases?.phases.filter(
      (f: any) => f.type === "group" || f.type === "intergroup"
    ) || [];

  const faseDescenso =
    fases?.phases.find((f: any) => f.type === "relegated") || null;

  const { data: tablaGeneral, isLoading: isLoadingTablaGeneral } =
    useAccumulatedTableQuery({
      aperturaLeagueId: seasonInfo?.aperturaId || "",
      clausuraLeagueId: seasonInfo?.clausuraId || "",
      categoryName: fases?.categoryName || "",
    });

  const faseFinal =
    fases?.phases.find((f: any) => f.type === "seasonfinal") || null;

  const getInitialTab = () => {
    if (tabParam) {
      return parseInt(tabParam, 10);
    }
    if (fasesGrupos.length > 0) return TabsEnum.GRUPOS_BASE;
    return hidePosiciones ? TabsEnum.FIXTURE : TabsEnum.POSICIONES;
  };

  const [selectedTab, setSelectedTab] = useState<number>(getInitialTab());

  useEffect(() => {
    if (tabParam) {
      setSelectedTab(parseInt(tabParam, 10));
    }
  }, [tabParam]);

  const handleChangeTab = (newValue: number) => {
    setSelectedTab(newValue);
    router.push(`?tab=${newValue}`, undefined);
  };

  const getSelectedFaseGrupos = () => {
    if (
      selectedTab >= TabsEnum.GRUPOS_BASE &&
      selectedTab < TabsEnum.FIXTURE_ZONAS_BASE
    ) {
      const index = selectedTab - TabsEnum.GRUPOS_BASE;
      return fasesGrupos[index];
    }
    if (selectedTab >= TabsEnum.FIXTURE_ZONAS_BASE) {
      const index = selectedTab - TabsEnum.FIXTURE_ZONAS_BASE;
      return fasesGrupos[index];
    }
    return null;
  };

  const isGruposTab =
    selectedTab >= TabsEnum.GRUPOS_BASE &&
    selectedTab < TabsEnum.FIXTURE_ZONAS_BASE;
  const isFixtureZonasTab = selectedTab >= TabsEnum.FIXTURE_ZONAS_BASE;

  const tabHasContent =
    (selectedTab === TabsEnum.POSICIONES && !hidePosiciones) ||
    (selectedTab === TabsEnum.TABLA_GENERAL && !!seasonInfo) ||
    (selectedTab === TabsEnum.FIXTURE && !!faseRegular) ||
    (isGruposTab && !!getSelectedFaseGrupos()) ||
    (isFixtureZonasTab && !!getSelectedFaseGrupos()) ||
    (selectedTab === TabsEnum.PLAYOFFS && !!fasePlayoff) ||
    (selectedTab === TabsEnum.DESCENSO && !!faseDescenso) ||
    (selectedTab === TabsEnum.FASE_FINAL && !!faseFinal) ||
    selectedTab === TabsEnum.ESTADISTICAS;

  // Si el tab pedido por la URL no tiene contenido para esta categoría
  // (ej: ?tab=1 en una categoría sin fase "general", como Infantiles y
  // Menores, que solo tiene fases de zona), redirige a un tab válido en
  // lugar de dejar la sección en blanco.
  useEffect(() => {
    if (!fases) return;
    if (!tabHasContent) {
      const fallbackTab = fasesGrupos.length > 0
        ? TabsEnum.GRUPOS_BASE
        : faseRegular
          ? (hidePosiciones ? TabsEnum.FIXTURE : TabsEnum.POSICIONES)
          : TabsEnum.ESTADISTICAS;
      setSelectedTab(fallbackTab);
      router.replace(`?tab=${fallbackTab}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fases]);

  const tabClass = (active: boolean) =>
    `cursor-pointer pb-3 text-sm font-medium whitespace-nowrap transition-colors ${active
      ? "text-[var(--color-text)] border-b-2"
      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border-b-2 border-transparent"
    }`;

  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "var(--color-bg)" }}>
      {/* Header */}
      <div
        className="w-full pt-24 pb-8 px-6 md:px-10"
        style={{
          background: "radial-gradient(ellipse at 80% 0%, rgba(var(--color-gradient),0.35) 0%, transparent 60%), var(--color-bg)",
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-text)" }}>
          {tenantConfig.home.seasonLabel ?? "Temporada"}
        </p>
        <h1 className="text-[var(--color-text)] text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
          {title}
        </h1>
        {seasonInfo && (
          <div className="mt-3">
            <SeasonSwitchBadge current={seasonInfo.current} linkedId={seasonInfo.linkedId} />
          </div>
        )}
      </div>

      {/* Tab bar */}
      <div className="w-full border-b border-[var(--color-border)]" style={{ backgroundColor: "var(--color-bg)" }}>
        <div
          style={{ display: hasFases ? "flex" : "none" }}
          className="flex gap-6 px-6 md:px-10 max-w-full overflow-x-auto"
        >
          {!!faseRegular && !hidePosiciones && (
            <button
              onClick={() => handleChangeTab(TabsEnum.POSICIONES)}
              className={tabClass(selectedTab === TabsEnum.POSICIONES)}
              style={selectedTab === TabsEnum.POSICIONES ? { borderColor: "var(--color-primary)" } : {}}
            >
              Posiciones
            </button>
          )}

          {!!seasonInfo && (
            <button
              onClick={() => handleChangeTab(TabsEnum.TABLA_GENERAL)}
              className={tabClass(selectedTab === TabsEnum.TABLA_GENERAL)}
              style={selectedTab === TabsEnum.TABLA_GENERAL ? { borderColor: "var(--color-primary)" } : {}}
            >
              Tabla General
            </button>
          )}

          {fasesGrupos.map((fase: any, index: number) => (
            <button
              key={`grupos-${fase.id}`}
              onClick={() => handleChangeTab(TabsEnum.GRUPOS_BASE + index)}
              className={tabClass(selectedTab === TabsEnum.GRUPOS_BASE + index)}
              style={selectedTab === TabsEnum.GRUPOS_BASE + index ? { borderColor: "var(--color-primary)" } : {}}
            >
              {fasesGrupos.length > 1
                ? index === 0
                  ? "Fase parte 1"
                  : "Fase reclasificación"
                : "Fase de zonas"}
            </button>
          ))}

          {fasesGrupos.map((fase: any, index: number) => (
            <button
              key={`fixture-zonas-${fase.id}`}
              onClick={() => handleChangeTab(TabsEnum.FIXTURE_ZONAS_BASE + index)}
              className={tabClass(selectedTab === TabsEnum.FIXTURE_ZONAS_BASE + index)}
              style={selectedTab === TabsEnum.FIXTURE_ZONAS_BASE + index ? { borderColor: "var(--color-primary)" } : {}}
            >
              {fasesGrupos.length > 1
                ? index === 0
                  ? "Fixture parte 1"
                  : "Fixture reclasificación"
                : "Fixture zonas"}
            </button>
          ))}

          {!!faseRegular && (
            <button
              onClick={() => handleChangeTab(TabsEnum.FIXTURE)}
              className={tabClass(selectedTab === TabsEnum.FIXTURE)}
              style={selectedTab === TabsEnum.FIXTURE ? { borderColor: "var(--color-primary)" } : {}}
            >
              Fixture
            </button>
          )}

          {!!fasePlayoff && (
            <button
              onClick={() => handleChangeTab(TabsEnum.PLAYOFFS)}
              className={tabClass(selectedTab === TabsEnum.PLAYOFFS)}
              style={selectedTab === TabsEnum.PLAYOFFS ? { borderColor: "var(--color-primary)" } : {}}
            >
              Playoffs
            </button>
          )}

          {!!faseDescenso && (
            <button
              onClick={() => handleChangeTab(TabsEnum.DESCENSO)}
              className={tabClass(selectedTab === TabsEnum.DESCENSO)}
              style={selectedTab === TabsEnum.DESCENSO ? { borderColor: "var(--color-primary)" } : {}}
            >
              Cuadrangular de descenso
            </button>
          )}

          {!!faseFinal && (
            <button
              onClick={() => handleChangeTab(TabsEnum.FASE_FINAL)}
              className={tabClass(selectedTab === TabsEnum.FASE_FINAL)}
              style={selectedTab === TabsEnum.FASE_FINAL ? { borderColor: "var(--color-primary)" } : {}}
            >
              Fase Final de Etapa
            </button>
          )}

          <button
            onClick={() => handleChangeTab(TabsEnum.ESTADISTICAS)}
            className={tabClass(selectedTab === TabsEnum.ESTADISTICAS)}
            style={selectedTab === TabsEnum.ESTADISTICAS ? { borderColor: "var(--color-primary)" } : {}}
          >
            Estadísticas
          </button>
        </div>
      </div>

      <div className="h-full w-full min-h-lvh overflow-hidden p-4 md:p-10" style={{ backgroundColor: "var(--color-bg)" }}>
      <div key={selectedTab}>
        {selectedTab === TabsEnum.POSICIONES && !hidePosiciones && (
          <TablaDePosicionesWrapper
            faseId={faseRegular?.id || ""}
            showPromotionZones={!isZonal}
          />
        )}
        {selectedTab === TabsEnum.TABLA_GENERAL && !!seasonInfo && (
          isLoadingTablaGeneral ? (
            <div className="flex justify-center py-10">
              <MiniLoading />
            </div>
          ) : (
            <TablaPosiciones
              data={tablaGeneral || []}
              serverOrdered
              showPromotionZones={false}
              showNextMatch={false}
              title="Tabla General"
            />
          )
        )}
        {selectedTab === TabsEnum.FIXTURE && !!faseRegular && (
          <FixturePage faseId={faseRegular?.id || ""} />
        )}
        {isGruposTab && getSelectedFaseGrupos() && (
          <FaseGruposWrapper
            faseId={getSelectedFaseGrupos()?.id || ""}
            fromCategoria
            showPromotionZones={!isZonal}
          />
        )}
        {isFixtureZonasTab && getSelectedFaseGrupos() && (
          <FixtureCopaPage
            faseId={getSelectedFaseGrupos()?.id || ""}
            fromCategoria
            extraFechas={
              fases?.categoryName === "C" && !!getSelectedFaseGrupos() ? 2 : 0
            }
          />
        )}
        {selectedTab === TabsEnum.PLAYOFFS && !!fasePlayoff && (
          <PlayoffsPage faseId={fasePlayoff?.id || ""} />
        )}
        {selectedTab === TabsEnum.DESCENSO && !!faseDescenso && (
          <CuadrangularDescensoPage faseId={faseDescenso?.id || ""} />
        )}
        {selectedTab === TabsEnum.FASE_FINAL && !!faseFinal && (
          <FaseFinalDeEtapaPage faseId={faseFinal.id} />
        )}
        {selectedTab === TabsEnum.ESTADISTICAS && (
          <EstadisticasPage categoryId={id} />
        )}
        {(!hasFases || !tabHasContent) && (
          <div className="flex justify-center items-center h-full">
            <p className="text-xl text-center text-[var(--color-text-secondary)]">
              Todavía no hay información disponible para esta categoría.
            </p>
          </div>
        )}
      </div>
      </div>
    </main>
  );

};
