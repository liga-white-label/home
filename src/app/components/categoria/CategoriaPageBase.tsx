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
interface CategoriaPageBaseProps {
  id: string;
  title: string;
}
export enum TabsEnum {
  POSICIONES = 0,
  FIXTURE = 1,
  FIXTURE_ZONAS = 2,
  PLAYOFFS = 3,
  GRUPOS = 4,
  ESTADISTICAS = 5,
  DESCENSO = 6,
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

  const faseGrupos =
    fases?.phases.find(
      (f: any) => f.type === "group" || f.type === "intergroup"
    ) || null;

  const faseDescenso =
    fases?.phases.find((f: any) => f.type === "relegated") || null;

  const initialTab = tabParam
    ? parseInt(tabParam, 10)
    : faseGrupos
    ? TabsEnum.GRUPOS
    : TabsEnum.POSICIONES;
  const [selectedTab, setSelectedTab] = useState<TabsEnum>(initialTab);

  useEffect(() => {
    if (tabParam) {
      setSelectedTab(parseInt(tabParam, 10));
    }
  }, [tabParam]);

  const handleChangeTab = (newValue: TabsEnum) => {
    setSelectedTab(newValue);
    router.push(`?tab=${newValue}`, undefined);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div
        className="w-full max-w-full h-64 flex justify-start  pt-24"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/assets/category_banner.jpg')`,
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
                className={`p-2 md:p-4 rounded-t-lg  cursor-pointer ${
                  selectedTab === TabsEnum.POSICIONES
                    ? "font-bold bg-white"
                    : "bg-slate-300 hover:font-bold hover:bg-slate-400"
                }`}
              >
                <p className="line-clamp-1">Posiciones</p>
              </div>
            )}
            {!!faseGrupos && (
              <div
                onClick={() => handleChangeTab(TabsEnum.GRUPOS)}
                className={` p-2 md:p-4 rounded-t-lg  cursor-pointer ${
                  selectedTab === TabsEnum.GRUPOS
                    ? "font-bold bg-white"
                    : "bg-slate-300 hover:font-bold hover:bg-slate-400"
                }`}
              >
                Fase de zonas
              </div>
            )}
            {!!faseGrupos && (
              <div
                onClick={() => handleChangeTab(TabsEnum.FIXTURE_ZONAS)}
                className={` p-2 md:p-4 rounded-t-lg  cursor-pointer ${
                  selectedTab === TabsEnum.FIXTURE_ZONAS
                    ? "font-bold bg-white"
                    : "bg-slate-300 hover:font-bold hover:bg-slate-400"
                }`}
              >
                <p className="line-clamp-1">Fixture zonas</p>
              </div>
            )}
            {!!faseRegular && (
              <div
                onClick={() => handleChangeTab(TabsEnum.FIXTURE)}
                className={` p-2 md:p-4 rounded-t-lg  cursor-pointer ${
                  selectedTab === TabsEnum.FIXTURE
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
                className={` p-2 md:p-4 rounded-t-lg  cursor-pointer ${
                  selectedTab === TabsEnum.PLAYOFFS
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
                className={` p-2 md:p-4 rounded-t-lg  cursor-pointer ${
                  selectedTab === TabsEnum.DESCENSO
                    ? "font-bold bg-white"
                    : "bg-slate-300 hover:font-bold hover:bg-slate-400"
                }`}
              >
                <p className="line-clamp-1">Cuadrangular de descenso</p>
              </div>
            )}
            <div
              onClick={() => handleChangeTab(TabsEnum.ESTADISTICAS)}
              className={` p-2 md:p-4 rounded-t-lg  cursor-pointer ${
                selectedTab === TabsEnum.ESTADISTICAS
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
        {selectedTab === TabsEnum.GRUPOS && !!faseGrupos && (
          <FaseGruposWrapper faseId={faseGrupos?.id || ""} fromCategoria />
        )}
        {selectedTab === TabsEnum.FIXTURE_ZONAS && !!faseGrupos && (
          <FixtureCopaPage
            faseId={faseGrupos?.id || ""}
            fromCategoria
            extraFechas={fases?.categoryName === "C" && !!faseGrupos ? 2 : 0}
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
