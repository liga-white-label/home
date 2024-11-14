"use client";

import { FC, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { EstadisticasPage } from "./EstadisticasPage";
import { useAllFasesByCampeonato } from "@/repositories/CampeonatoRepository";
import { FaseGruposWrapper } from "./FaseGruposWrapper";
import FixtureCopaPage from "./FixtureCopaPage";
import PlayoffsCopaPage from "./playoffs/PlayoffsCopaPage";

interface CopaPageBaseProps {
  id: string;
  title: string;
}
export enum TabsEnum {
  GRUPOS = 0,
  FIXTURE = 1,
  PLAYOFFS = 2,
  ESTADISTICAS = 3,
}

export const CopaPageBase: FC<CopaPageBaseProps> = ({ id, title }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab");
  const initialTab = tabParam ? parseInt(tabParam, 10) : TabsEnum.GRUPOS;
  const [selectedTab, setSelectedTab] = useState<TabsEnum>(initialTab);

  const { data: fases } = useAllFasesByCampeonato(id);

  const faseGrupos = fases?.phases.find((f: any) => f.type === "group") || null;

  const fasePlayoff =
    fases?.phases.find((f: any) => f.type === "playoff") || null;

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
            {!!faseGrupos && (
              <div
                onClick={() => handleChangeTab(TabsEnum.GRUPOS)}
                className={`p-2 md:p-4 rounded-t-lg  cursor-pointer ${
                  selectedTab === TabsEnum.GRUPOS
                    ? "font-bold bg-white"
                    : "bg-slate-300 hover:font-bold hover:bg-slate-400"
                }`}
              >
                <p className="line-clamp-1">Fase de Grupos</p>
              </div>
            )}
            {!!faseGrupos && (
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
      <div className="h-full w-full min-h-lvh overflow-hidden overflow-x-hidden p-4 md:p-10">
        {selectedTab === TabsEnum.GRUPOS && (
          <FaseGruposWrapper faseId={faseGrupos?.id || ""} />
        )}
        {selectedTab === TabsEnum.FIXTURE && (
          <FixtureCopaPage faseId={faseGrupos?.id || ""} />
        )}
        {selectedTab === TabsEnum.PLAYOFFS && (
          <PlayoffsCopaPage faseId={fasePlayoff?.id || ""} />
        )}
        {selectedTab === TabsEnum.ESTADISTICAS && (
          <EstadisticasPage cupId={id} />
        )}
      </div>
    </main>
  );
};
