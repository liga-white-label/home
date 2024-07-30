"use client";

import { FC, useState } from "react";
import { TablaPosiciones } from "./TablaPosiciones";
import { Match } from "../models/Match";
import { FixturePage } from "./FixturePage";
import { EstadisticasPage } from "./EstadisticasPage";
import { EquipoTablaPosicion } from "../models/Team";
import { PlayerStatistic } from "../models/PlayerStatistic";
import { TablaDePosicionesWrapper } from "./TablasDePosicionesWrapper";

interface CategoriaPageBaseProps {
  title: string;
  tabla?: EquipoTablaPosicion[];
  tablaZonas?: EquipoTablaPosicion[][];
  matches: Match[];
  goleadores: PlayerStatistic[];
  amarillas: PlayerStatistic[];
  tieneZonas?: boolean;
}
export enum TabsEnum {
  POSICIONES = 0,
  FIXTURE = 1,
  ESTADISTICAS = 2,
}

export const CategoriaPageBase: FC<CategoriaPageBaseProps> = ({
  title,
  tabla,
  tablaZonas,
  matches,
  goleadores,
  amarillas,
}) => {
  const [selectedTab, setSelectedTab] = useState<TabsEnum>(TabsEnum.POSICIONES);

  const handleChangeTab = (newValue: TabsEnum) => {
    setSelectedTab(newValue);
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
          <TablaDePosicionesWrapper data={tabla} dataZonas={tablaZonas} />
        )}
        {selectedTab === TabsEnum.FIXTURE && <FixturePage matches={matches} />}
        {selectedTab === TabsEnum.ESTADISTICAS && (
          <EstadisticasPage goleadores={goleadores} amarillas={amarillas} />
        )}
      </div>
    </main>
  );
};
