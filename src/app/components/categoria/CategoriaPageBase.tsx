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

interface CategoriaPageBaseProps {
  id: string;
  title: string;
}

export enum TabsEnum {
  POSICIONES = 0,
  FIXTURE = 1,
  PLAYOFFS = 2,
  ESTADISTICAS = 3,
  DESCENSO = 4,
  // Los tabs dinámicos empezarán desde 100
  GRUPOS_BASE = 100,
  FIXTURE_ZONAS_BASE = 200,
}

export const CategoriaPageBase: FC<CategoriaPageBaseProps> = ({
  id,
  title,
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

  const getInitialTab = () => {
    if (tabParam) {
      return parseInt(tabParam, 10);
    }
    return fasesGrupos.length > 0 ? TabsEnum.GRUPOS_BASE : TabsEnum.POSICIONES;
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

  const tabClass = (active: boolean) =>
    `cursor-pointer pb-3 text-sm font-medium whitespace-nowrap transition-colors ${
      active
        ? "text-white border-b-2"
        : "text-gray-400 hover:text-white border-b-2 border-transparent"
    }`;

  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Header */}
      <div
        className="w-full pt-24 pb-8 px-6 md:px-10"
        style={{
          background: "radial-gradient(ellipse at 80% 0%, rgba(180,0,0,0.35) 0%, transparent 60%), #0a0a0a",
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-primary)" }}>
          {tenantConfig.home.seasonLabel ?? "Temporada"}
        </p>
        <h1 className="text-white text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
          {title}
        </h1>
      </div>

      {/* Tab bar */}
      <div className="w-full border-b border-gray-800" style={{ backgroundColor: "#0a0a0a" }}>
        <div
          style={{ display: hasFases ? "flex" : "none" }}
          className="flex gap-6 px-6 md:px-10 max-w-full overflow-x-auto"
        >
          {!!faseRegular && (
            <button
              onClick={() => handleChangeTab(TabsEnum.POSICIONES)}
              className={tabClass(selectedTab === TabsEnum.POSICIONES)}
              style={selectedTab === TabsEnum.POSICIONES ? { borderColor: "var(--color-primary)" } : {}}
            >
              Posiciones
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

          <button
            onClick={() => handleChangeTab(TabsEnum.ESTADISTICAS)}
            className={tabClass(selectedTab === TabsEnum.ESTADISTICAS)}
            style={selectedTab === TabsEnum.ESTADISTICAS ? { borderColor: "var(--color-primary)" } : {}}
          >
            Estadísticas
          </button>
        </div>
      </div>

      <div className="h-full w-full min-h-lvh overflow-hidden p-4 md:p-10" style={{ backgroundColor: "#0a0a0a" }}>
        {selectedTab === TabsEnum.POSICIONES && (
          <TablaDePosicionesWrapper faseId={faseRegular?.id || ""} />
        )}
        {selectedTab === TabsEnum.FIXTURE && !!faseRegular && (
          <FixturePage faseId={faseRegular?.id || ""} />
        )}
        {isGruposTab && getSelectedFaseGrupos() && (
          <FaseGruposWrapper
            faseId={getSelectedFaseGrupos()?.id || ""}
            fromCategoria
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
        {selectedTab === TabsEnum.ESTADISTICAS && (
          <EstadisticasPage categoryId={id} />
        )}
        {!hasFases && (
          <div className="flex justify-center items-center h-full">
            <p className="text-xl text-center text-gray-500">
              Todavía no hay información disponible para esta categoría.
            </p>
          </div>
        )}
      </div>
    </main>
  );

};
