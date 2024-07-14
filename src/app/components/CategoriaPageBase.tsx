"use client";
import { Container, Grid, Tab } from "@mui/material";
import Tabs from "@mui/material/Tabs";

import { FechaSelector } from "../components/FechaSelector";
import { MatchProps } from "../components/Match";
import { FC, useState } from "react";
import Section from "../components/Section";
import { TablaPosiciones } from "./TablaPosiciones";

interface CategoriaPageBaseProps {
  title: string;
  dias: string[];
  selectedDia: number;
  partidosPorDia: { title: string; matches: MatchProps[] };
  handleDia: (dia: number) => void;
}
export enum TabsEnum {
  POSICIONES = 0,
  FIXTURE = 1,
  ESTADISTICAS = 2,
}

export const CategoriaPageBase: FC<CategoriaPageBaseProps> = ({
  title,
  dias,
  selectedDia,
  partidosPorDia,
  handleDia,
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
          <div className="flex gap-2 px-0 md:px-10 max-w-full overflow-hidden overflow-x-scroll">
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
      <div className="overflow-hidden overflow-x-scroll p-2 md:p-10">
        {selectedTab === TabsEnum.POSICIONES && <PosicionesPage />}
      </div>
    </main>
  );
};

const PosicionesPage = () => {
  return <TablaPosiciones data={data} />;
};

const data = [
  {
    pos: 1,
    equipo: "SIN CONTRATO",
    pts: 17,
    pj: 8,
    pg: 5,
    pe: 2,
    pp: 1,
    gf: 16,
    gc: 7,
    dg: +9,
    nextMatch: "/assets/ultracuevafc.png",
  },
  {
    pos: 2,
    equipo: "RITMO Y SUSTANCIA",
    pts: 17,
    pj: 8,
    pg: 5,
    pe: 2,
    pp: 1,
    gf: 13,
    gc: 6,
    dg: +7,
    nextMatch: "/assets/ultracuevafc.png",
  },
  {
    pos: 3,
    equipo: "FUERTE AL MEDIO",
    pts: 14,
    pj: 9,
    pg: 3,
    pe: 5,
    pp: 1,
    gf: 13,
    gc: 7,
    dg: +6,
    nextMatch: "/assets/ultracuevafc.png",
  },
  {
    pos: 4,
    equipo: "SUPERGEDIENTOS",
    pts: 14,
    pj: 8,
    pg: 4,
    pe: 2,
    pp: 2,
    gf: 15,
    gc: 12,
    dg: +3,
    nextMatch: "/assets/ultracuevafc.png",
  },
  {
    pos: 5,
    equipo: "ANTIDEPORTIVO CACACCIOLI",
    pts: 13,
    pj: 8,
    pg: 3,
    pe: 4,
    pp: 1,
    gf: 13,
    gc: 10,
    dg: +3,
    nextMatch: "/assets/ultracuevafc.png",
  },
  {
    pos: 6,
    equipo: "LIVERFULL",
    pts: 13,
    pj: 8,
    pg: 3,
    pe: 4,
    pp: 1,
    gf: 14,
    gc: 12,
    dg: +2,
    nextMatch: "/assets/ultracuevafc.png",
  },
  {
    pos: 7,
    equipo: "REPO P.A.",
    pts: 12,
    pj: 9,
    pg: 3,
    pe: 3,
    pp: 3,
    gf: 11,
    gc: 11,
    dg: +0,
    nextMatch: "/assets/ultracuevafc.png",
  },
  {
    pos: 8,
    equipo: "BAFANGULO",
    pts: 12,
    pj: 9,
    pg: 3,
    pe: 3,
    pp: 3,
    gf: 7,
    gc: 11,
    dg: -4,
    nextMatch: "/assets/ultracuevafc.png",
  },
  {
    pos: 9,
    equipo: "THE BIRDS",
    pts: 11,
    pj: 9,
    pg: 3,
    pe: 2,
    pp: 4,
    gf: 10,
    gc: 11,
    dg: -1,
    nextMatch: "/assets/ultracuevafc.png",
  },
  {
    pos: 10,
    equipo: "ULTRA CUEVA FC",
    pts: 10,
    pj: 8,
    pg: 3,
    pe: 1,
    pp: 4,
    gf: 10,
    gc: 7,
    dg: +3,
    nextMatch: "/assets/ultracuevafc.png",
  },
  {
    pos: 11,
    equipo: "LA BIGORNIA FC",
    pts: 10,
    pj: 9,
    pg: 2,
    pe: 4,
    pp: 3,
    gf: 13,
    gc: 14,
    dg: -1,
    nextMatch: "/assets/ultracuevafc.png",
  },
  {
    pos: 12,
    equipo: "FONDO BLANCO",
    pts: 10,
    pj: 9,
    pg: 3,
    pe: 1,
    pp: 5,
    gf: 9,
    gc: 14,
    dg: -5,
    nextMatch: "/assets/ultracuevafc.png",
  },
  {
    pos: 13,
    equipo: "MANDIYU'S REVENGE",
    pts: 9,
    pj: 8,
    pg: 2,
    pe: 3,
    pp: 3,
    gf: 10,
    gc: 11,
    dg: -1,
    nextMatch: "/assets/ultracuevafc.png",
  },
  {
    pos: 14,
    equipo: "CUALQUIER FRUTA Y/O VERDURA",
    pts: 8,
    pj: 8,
    pg: 2,
    pe: 2,
    pp: 4,
    gf: 9,
    gc: 10,
    dg: -1,
    nextMatch: "/assets/ultracuevafc.png",
  },
  {
    pos: 15,
    equipo: "INQUI FC",
    pts: 6,
    pj: 8,
    pg: 1,
    pe: 3,
    pp: 4,
    gf: 6,
    gc: 15,
    dg: -9,
    nextMatch: "/assets/ultracuevafc.png",
  },
  {
    pos: 16,
    equipo: "FERNETBACHE",
    pts: 4,
    pj: 8,
    pg: 1,
    pe: 1,
    pp: 6,
    gf: 7,
    gc: 18,
    dg: -11,
    nextMatch: "/assets/ultracuevafc.png",
  },
];

{
  /* <Container className="w-full flex flex-col items-center justify-center gap-5">
        <div className="w-full bg-white rounded-md py-2">
          <h2 className="text-center  font-bold text-2xl">{title}</h2>
        </div>
        <FechaSelector />
        <div className="w-full">
          <Tabs
            value={selectedDia}
            onChange={handleChangeDia}
            variant="fullWidth"
            className="w-full bg-white"
          >
            {dias.map((d) => (
              <Tab label={d} />
            ))}
          </Tabs>

          <Section
            title={partidosPorDia.title}
            matches={partidosPorDia.matches}
          />
        </div>
        <div className="max-w-full">
          <Tabs
            value={selectedTable}
            onChange={handleChangeTable}
            variant="fullWidth"
            className="w-full bg-white"
          >
            <Tab label={"Posiciones"} />
            <Tab label={"Goleadores"} />
            <Tab label={"Tarjetas"} />
          </Tabs>
          {selectedTable === TablesEnum.POSICIONES && (
            <TablaPosiciones data={data} />
          )}
          {selectedTable === TablesEnum.GOLEADORES && (
            <TablaPosiciones data={data} />
          )}
          {selectedTable === TablesEnum.TARJETAS && (
            <TablaPosiciones data={data} />
          )}
        </div>
      </Container> */
}
