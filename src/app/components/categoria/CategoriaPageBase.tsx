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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div
        className="w-full max-w-full h-64 flex justify-start  pt-24"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${tenantConfig.home.categoryBannerPath}')`,
        }}
      >
        <div className="flex flex-col justify-between max-w-full">
          <p className="text-white text-4xl px-10">{title}</p>
          <div
            style={{
              display: hasFases ? "flex" : "none",
            }}
            className="flex gap-2 px-0 md:px-10 max-w-full overflow-x-auto"
          >
            {!!faseRegular && (
              <div
                onClick={() => handleChangeTab(TabsEnum.POSICIONES)}
                className={`p-2 md:p-4 rounded-t-lg  cursor-pointer ${selectedTab === TabsEnum.POSICIONES
                  ? "font-bold bg-white"
                  : "bg-slate-300 hover:font-bold hover:bg-slate-400"
                  }`}
              >
                <p className="line-clamp-1">Posiciones</p>
              </div>
            )}

            {fasesGrupos.map((fase: any, index: number) => (
              <div key={`grupos-${fase.id}`}>
                <div
                  onClick={() => handleChangeTab(TabsEnum.GRUPOS_BASE + index)}
                  className={`p-2 md:p-4 rounded-t-lg cursor-pointer whitespace-nowrap ${selectedTab === TabsEnum.GRUPOS_BASE + index
                    ? "font-bold bg-white"
                    : "bg-slate-300 hover:font-bold hover:bg-slate-400"
                    }`}
                >
                  <p className="line-clamp-1">
                    {fasesGrupos.length > 1
                      ? index === 0
                        ? "Fase parte 1"
                        : "Fase reclasificación"
                      : "Fase de zonas"}
                  </p>
                </div>
              </div>
            ))}

            {fasesGrupos.map((fase: any, index: number) => (
              <div key={`fixture-zonas-${fase.id}`}>
                <div
                  onClick={() =>
                    handleChangeTab(TabsEnum.FIXTURE_ZONAS_BASE + index)
                  }
                  className={`p-2 md:p-4 rounded-t-lg  cursor-pointer whitespace-nowrap ${selectedTab === TabsEnum.FIXTURE_ZONAS_BASE + index
                    ? "font-bold bg-white"
                    : "bg-slate-300 hover:font-bold hover:bg-slate-400"
                    }`}
                >
                  <p className="line-clamp-1">
                    {fasesGrupos.length > 1
                      ? index === 0
                        ? "Fixture parte 1"
                        : "Fixture reclasificación"
                      : "Fixture zonas"}
                  </p>
                </div>
              </div>
            ))}

            {!!faseRegular && (
              <div
                onClick={() => handleChangeTab(TabsEnum.FIXTURE)}
                className={` p-2 md:p-4 rounded-t-lg  cursor-pointer ${selectedTab === TabsEnum.FIXTURE
                  ? "font-bold bg-white"
                  : "bg-slate-300 hover:font-bold hover:bg-slate-400"
                  }`}
              >
                <p className="line-clamp-1">Fixture</p>
              </div>
            )}

            {!!fasePlayoff && (
              <div
                onClick={() => handleChangeTab(TabsEnum.PLAYOFFS)}
                className={` p-2 md:p-4 rounded-t-lg  cursor-pointer ${selectedTab === TabsEnum.PLAYOFFS
                  ? "font-bold bg-white"
                  : "bg-slate-300 hover:font-bold hover:bg-slate-400"
                  }`}
              >
                <p className="line-clamp-1">Playoffs</p>
              </div>
            )}

            {!!faseDescenso && (
              <div
                onClick={() => handleChangeTab(TabsEnum.DESCENSO)}
                className={` p-2 md:p-4 rounded-t-lg  cursor-pointer ${selectedTab === TabsEnum.DESCENSO
                  ? "font-bold bg-white"
                  : "bg-slate-300 hover:font-bold hover:bg-slate-400"
                  }`}
              >
                <p className="line-clamp-1">Cuadrangular de descenso</p>
              </div>
            )}

            <div
              onClick={() => handleChangeTab(TabsEnum.ESTADISTICAS)}
              className={` p-2 md:p-4 rounded-t-lg  cursor-pointer ${selectedTab === TabsEnum.ESTADISTICAS
                ? "font-bold bg-white"
                : "bg-slate-300 hover:font-bold hover:bg-slate-400"
                }`}
            >
              <p className="line-clamp-1">Estadísticas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-full w-full min-h-lvh overflow-hidden overflow-x- p-4 md:p-10">
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
