"use client";

import { FC, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Match } from "../models/Match";
import { FixturePage } from "./FixturePage";
import { EstadisticasPage } from "./EstadisticasPage";
import { EquipoTablaPosicion } from "../models/Team";
import { PlayerStatistic } from "../models/PlayerStatistic";
import { TablaDePosicionesWrapper } from "./TablasDePosicionesWrapper";
import PlayoffsPage from "./playoffs/PlayoffsPage";
import {
  CategoriaRepository,
  useAllFasesByCategory,
} from "@/repositories/CategoriaRepository";

interface CategoriaPageBaseProps {
  id: string;
  title: string;
}
export enum TabsEnum {
  POSICIONES = 0,
  FIXTURE = 1,
  PLAYOFFS = 2,
  GRUPOS = 3,
  ESTADISTICAS = 4,
}

export const CategoriaPageBase: FC<CategoriaPageBaseProps> = ({
  id,
  title,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab");
  const initialTab = tabParam ? parseInt(tabParam, 10) : TabsEnum.POSICIONES;
  const [selectedTab, setSelectedTab] = useState<TabsEnum>(initialTab);

  const { data: fases } = useAllFasesByCategory(id);

  const faseRegular =
    fases?.phases.find((f: any) => f.type === "general") || null;

  const fasePlayoff =
    fases?.phases.find((f: any) => f.type === "playoff") || null;

  const faseGrupos =
    fases?.phases.find((f: any) => f.type === "groups") || null;

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
          <div className="flex gap-2 px-0 md:px-10 max-w-full overflow-hidden">
            <div
              onClick={() => handleChangeTab(TabsEnum.POSICIONES)}
              className={`p-2 md:p-4 rounded-t-lg  cursor-pointer ${
                selectedTab === TabsEnum.POSICIONES
                  ? "font-bold bg-white"
                  : "bg-slate-300 hover:font-bold hover:bg-slate-400"
              }`}
            >
              Posiciones
            </div>
            {!!faseRegular && (
              <div
                onClick={() => handleChangeTab(TabsEnum.FIXTURE)}
                className={` p-2 md:p-4 rounded-t-lg  cursor-pointer ${
                  selectedTab === TabsEnum.FIXTURE
                    ? "font-bold bg-white"
                    : "bg-slate-300 hover:font-bold hover:bg-slate-400"
                }`}
              >
                Fixture
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
                Playoffs
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
                Fase de grupos
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
              Estadisticas
            </div>
          </div>
        </div>
      </div>
      <div className="h-full w-full min-h-lvh overflow-hidden overflow-x-hidden p-4 md:p-10">
        {selectedTab === TabsEnum.POSICIONES && (
          <TablaDePosicionesWrapper faseId={faseRegular?.id || ""} />
        )}
        {selectedTab === TabsEnum.FIXTURE && !!faseRegular && (
          <FixturePage faseId={faseRegular?.id || ""} />
        )}
        {selectedTab === TabsEnum.GRUPOS && !!faseGrupos && (
          <FixturePage faseId={faseRegular?.id || ""} />
        )}
        {selectedTab === TabsEnum.PLAYOFFS && !!fasePlayoff && (
          <PlayoffsPage faseId={fasePlayoff?.id || ""} />
        )}
        {selectedTab === TabsEnum.ESTADISTICAS && (
          <EstadisticasPage faseId={faseRegular?.id} />
        )}
      </div>
    </main>
  );
};
