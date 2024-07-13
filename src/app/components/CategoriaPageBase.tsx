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
export enum TablesEnum {
  POSICIONES = 0,
  GOLEADORES = 1,
  TARJETAS = 2,
}

export const CategoriaPageBase: FC<CategoriaPageBaseProps> = ({
  title,
  dias,
  selectedDia,
  partidosPorDia,
  handleDia,
}) => {
  const [selectedTable, setSelectedTable] = useState<TablesEnum>(
    TablesEnum.POSICIONES
  );
  const handleChangeDia = (event: React.SyntheticEvent, newValue: number) => {
    handleDia(newValue);
  };
  const handleChangeTable = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTable(newValue);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-20">
      <Container className="w-full flex flex-col items-center justify-center gap-5">
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
      </Container>
    </main>
  );
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
  },
];
