"use client";

import { FC, useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAllFasesByCampeonato } from "@/repositories/CampeonatoRepository";
import { FaseGruposWrapper } from "./FaseGruposWrapper";
import FixtureCopaPage from "./FixtureCopaPage";
import PlayoffsCopaPage from "../playoffs/PlayoffsCopaPage";
import { EstadisticasCopaPage } from "./EstadisticasCopaPage";

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

  const { data: fases = [] } = useAllFasesByCampeonato(id);

  const faseGrupos = fases.find((f) => f.type === "group") || null;
  const fasesPlayoff = useMemo(
    () => fases.filter((f) => f.type === "playoff") || [],
    [fases]
  );

  useEffect(() => {
    if (tabParam) {
      setSelectedTab(parseInt(tabParam, 10));
    }
  }, [tabParam]);

  const handleChangeTab = (newValue: TabsEnum) => {
    setSelectedTab(newValue);
    router.push(`?tab=${newValue}`, undefined);
  };

  useEffect(() => {
    if (tabParam) {
      setSelectedTab(parseInt(tabParam, 10));
    } else if (faseGrupos) {
      setSelectedTab(TabsEnum.GRUPOS);
    } else if (fasesPlayoff.length > 0) {
      setSelectedTab(TabsEnum.PLAYOFFS);
    } else {
      setSelectedTab(TabsEnum.FIXTURE);
    }
  }, [faseGrupos, fasesPlayoff, tabParam]);

  return (
    <div className="w-full">
      <div
        className="w-full h-64 flex justify-start pt-24 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/assets/category_banner.jpg')`,
        }}
      >
        <div className="flex flex-col justify-between w-full">
          <p className="text-white text-4xl px-10">{title}</p>
          <div className="flex gap-2 px-0 md:px-10 overflow-x-auto">
            {!!faseGrupos && (
              <div
                onClick={() => handleChangeTab(TabsEnum.GRUPOS)}
                className={`p-2 md:p-4 rounded-t-lg cursor-pointer whitespace-nowrap ${
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
                className={`p-2 md:p-4 rounded-t-lg cursor-pointer whitespace-nowrap ${
                  selectedTab === TabsEnum.FIXTURE
                    ? "font-bold bg-white"
                    : "bg-slate-300 hover:font-bold hover:bg-slate-400"
                }`}
              >
                <p className="line-clamp-1">Fixture</p>
              </div>
            )}
            {!!fasesPlayoff && (
              <div
                onClick={() => handleChangeTab(TabsEnum.PLAYOFFS)}
                className={`p-2 md:p-4 rounded-t-lg cursor-pointer whitespace-nowrap ${
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
              className={`p-2 md:p-4 rounded-t-lg cursor-pointer whitespace-nowrap ${
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
      <div className="w-full p-4 md:p-10">
        {selectedTab === TabsEnum.GRUPOS && (
          <FaseGruposWrapper faseId={faseGrupos?.id || ""} />
        )}
        {selectedTab === TabsEnum.FIXTURE && (
          <FixtureCopaPage faseId={faseGrupos?.id || ""} />
        )}
        {selectedTab === TabsEnum.PLAYOFFS && (
          <PlayoffsCopaPage faseId={fasesPlayoff[0]?.id || ""} />
        )}
        {selectedTab === TabsEnum.ESTADISTICAS && (
          <EstadisticasCopaPage cupId={id} />
        )}
      </div>
    </div>
  );
};
