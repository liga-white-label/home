"use client";

import { FC, useState } from "react";
import { TablaPosiciones } from "./TablaPosiciones";
import { Match } from "../models/Match";
import { FixturePage } from "./FixturePage";
import { EstadisticasPage } from "./EstadisticasPage";
import { useParams, useRouter, useSearchParams } from "next/navigation";

interface CategoriaPageBaseProps {
  title: string;
  dias: string[];
  selectedDia: number;
  partidosPorDia: { title: string; matches: Match[] };
  handleDia: (dia: number) => void;
}
export enum TabsEnum {
  POSICIONES = 0,
  FIXTURE = 1,
  ESTADISTICAS = 2,
}

export const CategoriaPageBase: FC<CategoriaPageBaseProps> = ({ title }) => {
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
      <div className="h-full w-full overflow-hidden overflow-x-hidden p-4 md:p-10">
        {selectedTab === TabsEnum.POSICIONES && <TablaPosiciones data={data} />}
        {selectedTab === TabsEnum.FIXTURE && <FixturePage matches={matches} />}
        {selectedTab === TabsEnum.ESTADISTICAS && (
          <EstadisticasPage
            goleadores={goleadoresData}
            amarillas={amarillasData}
          />
        )}
      </div>
    </main>
  );
};

const data = [
  {
    pos: 1,
    equipo: "SIN CONTRATO",
    escudo: "https://ligacubb.com/imagenes/sincontrato.png",
    pts: 17,
    pj: 8,
    pg: 5,
    pe: 2,
    pp: 1,
    gf: 16,
    gc: 7,
    dg: +9,
    nextMatch: "https://ligacubb.com/imagenes/liverfull.png",
  },
  {
    pos: 2,
    equipo: "RITMO Y SUSTANCIA",
    escudo: "https://ligacubb.com/imagenes/ritmoysustancia.png",
    pts: 17,
    pj: 8,
    pg: 5,
    pe: 2,
    pp: 1,
    gf: 13,
    gc: 6,
    dg: +7,
    nextMatch: "https://ligacubb.com/imagenes/supergedientos.png",
  },
  {
    pos: 3,
    equipo: "FUERTE AL MEDIO",
    escudo: "https://ligacubb.com/imagenes/fuertealmedio.png",
    pts: 14,
    pj: 9,
    pg: 3,
    pe: 5,
    pp: 1,
    gf: 13,
    gc: 7,
    dg: +6,
    nextMatch: "https://ligacubb.com/imagenes/mandiyusrevenge.png",
  },
  {
    pos: 4,
    equipo: "SUPERGEDIENTOS",
    escudo: "https://ligacubb.com/imagenes/supergedientos.png",
    pts: 14,
    pj: 8,
    pg: 4,
    pe: 2,
    pp: 2,
    gf: 15,
    gc: 12,
    dg: +3,
    nextMatch: "https://ligacubb.com/imagenes/ritmoysustancia.png",
  },
  {
    pos: 5,
    equipo: "ANTIDEPORTIVO CACACCIOLI",
    escudo: "https://ligacubb.com/imagenes/antideportivocacacioli.png",
    pts: 13,
    pj: 8,
    pg: 3,
    pe: 4,
    pp: 1,
    gf: 13,
    gc: 10,
    dg: +3,
    nextMatch: "https://ligacubb.com/imagenes/cualquierfrutayoverdura.png",
  },
  {
    pos: 6,
    equipo: "LIVERFULL",
    escudo: "https://ligacubb.com/imagenes/liverfull.png",
    pts: 13,
    pj: 8,
    pg: 3,
    pe: 4,
    pp: 1,
    gf: 14,
    gc: 12,
    dg: +2,
    nextMatch: "https://ligacubb.com/imagenes/sincontrato.png",
  },
  {
    pos: 7,
    equipo: "REPO P.A.",
    escudo: "https://ligacubb.com/imagenes/repopa.png",
    pts: 12,
    pj: 9,
    pg: 3,
    pe: 3,
    pp: 3,
    gf: 11,
    gc: 11,
    dg: +0,
    nextMatch: "https://ligacubb.com/imagenes/bafangulo.png",
  },
  {
    pos: 8,
    equipo: "BAFANGULO",
    escudo: "https://ligacubb.com/imagenes/bafangulo.png",
    pts: 12,
    pj: 9,
    pg: 3,
    pe: 3,
    pp: 3,
    gf: 7,
    gc: 11,
    dg: -4,
    nextMatch: "https://ligacubb.com/imagenes/repopa.png",
  },
  {
    pos: 9,
    equipo: "THE BIRDS",
    escudo: "https://ligacubb.com/imagenes/thebirds.png",
    pts: 11,
    pj: 9,
    pg: 3,
    pe: 2,
    pp: 4,
    gf: 10,
    gc: 11,
    dg: -1,
    nextMatch: "https://ligacubb.com/imagenes/labigorniafc.png",
  },
  {
    pos: 10,
    equipo: "ULTRA CUEVA FC",
    escudo: "https://ligacubb.com/imagenes/ultracuevafc.png",
    pts: 10,
    pj: 8,
    pg: 3,
    pe: 1,
    pp: 4,
    gf: 10,
    gc: 7,
    dg: +3,
    nextMatch: "https://ligacubb.com/imagenes/mandiyusrevenge.png",
  },
  {
    pos: 11,
    equipo: "LA BIGORNIA FC",
    escudo: "https://ligacubb.com/imagenes/labigorniafc.png",
    pts: 10,
    pj: 9,
    pg: 2,
    pe: 4,
    pp: 3,
    gf: 13,
    gc: 14,
    dg: -1,
    nextMatch: "https://ligacubb.com/imagenes/thebirds.png",
  },
  {
    pos: 12,
    equipo: "FONDO BLANCO",
    escudo: "https://ligacubb.com/imagenes/fondoblanco.png",
    pts: 10,
    pj: 9,
    pg: 3,
    pe: 1,
    pp: 5,
    gf: 9,
    gc: 14,
    dg: -5,
    nextMatch: "https://ligacubb.com/imagenes/cualquierfrutayoverdura.png",
  },
  {
    pos: 13,
    equipo: "MANDIYU'S REVENGE",
    escudo: "https://ligacubb.com/imagenes/mandiyusrevenge.png",
    pts: 9,
    pj: 8,
    pg: 2,
    pe: 3,
    pp: 3,
    gf: 10,
    gc: 11,
    dg: -1,
    nextMatch: "https://ligacubb.com/imagenes/fuertealmedio.png",
  },
  {
    pos: 14,
    equipo: "CUALQUIER FRUTA Y/O VERDURA",
    escudo: "https://ligacubb.com/imagenes/cualquierfrutayoverdura.png",
    pts: 8,
    pj: 8,
    pg: 2,
    pe: 2,
    pp: 4,
    gf: 9,
    gc: 10,
    dg: -1,
    nextMatch: "https://ligacubb.com/imagenes/antideportivocacacioli.png",
  },
  {
    pos: 15,
    equipo: "INQUI FC",
    escudo: "https://ligacubb.com/imagenes/inquifc.png",
    pts: 6,
    pj: 8,
    pg: 1,
    pe: 3,
    pp: 4,
    gf: 6,
    gc: 15,
    dg: -9,
    nextMatch: "https://ligacubb.com/imagenes/fernetbache.png",
  },
  {
    pos: 16,
    equipo: "FERNETBACHE",
    escudo: "https://ligacubb.com/imagenes/fernetbache.png",
    pts: 4,
    pj: 8,
    pg: 1,
    pe: 1,
    pp: 6,
    gf: 7,
    gc: 18,
    dg: -11,
    nextMatch: "https://ligacubb.com/imagenes/inquifc.png",
  },
];

const matches: Match[] = [
  {
    team1: {
      name: "SUPERGEDIENTOS",
      logoUrl: "https://ligacubb.com/imagenes/supergedientos.png",
      gender: "male",
      category_id: 1,
    },
    team2: {
      name: "RITMO Y SUSTANCIA",
      logoUrl: "https://ligacubb.com/imagenes/ritmoysustancia.png",
      gender: "male",
      category_id: 1,
    },
    time: "14:00",
    score1: 0,
    score2: 5,
    details: [
      { type: "gol", player_name: "Martin Emiliano Aguero", team: "team2" },
      { type: "gol", player_name: "Martin Emiliano Aguero", team: "team2" },
      { type: "gol", player_name: "Martin Emiliano Aguero", team: "team2" },
      { type: "gol", player_name: "Luciano Keegan", team: "team2" },
      { type: "gol", player_name: "Facundo Ruiz", team: "team2" },
    ],
    cancha: "SINTETICO 4",
  },
  {
    team1: {
      name: "THE BIRDS",
      logoUrl: "https://ligacubb.com/imagenes/thebirds.png",
      gender: "male",
      category_id: 1,
    },
    team2: {
      name: "LA BIGORNA FC",
      logoUrl: "https://ligacubb.com/imagenes/labigorniafc.png",
      gender: "male",
      category_id: 1,
    },
    time: "15:15",
    score1: 1,
    score2: 1,
    details: [],
    cancha: "CANCHA 9",
  },
  {
    team1: {
      name: "REPO PA",
      logoUrl: "https://ligacubb.com/imagenes/repopa.png",
      gender: "male",
      category_id: 1,
    },
    team2: {
      name: "BAFANGULO",
      logoUrl: "https://ligacubb.com/imagenes/bafangulo.png",
      gender: "male",
      category_id: 1,
    },
    time: "16:30",
    score1: 1,
    score2: 1,
    details: [{ type: "gol", player_name: "Gian Farina", team: "team1" }],
    cancha: "SINTETICO 4",
  },
  {
    team1: {
      name: "FUERTE AL MEDIO",
      logoUrl: "https://ligacubb.com/imagenes/fuertealmedio.png",
      gender: "male",
      category_id: 1,
    },
    team2: {
      name: "MANDIYU'S REVENGE",
      logoUrl: "https://ligacubb.com/imagenes/mandiyusrevenge.png",
      gender: "male",
      category_id: 1,
    },
    time: "16:30",
    score1: 0,
    score2: 5,
    details: [],
    cancha: "CANCHA 9",
  },
  {
    team1: {
      name: "LIVERFULL",
      logoUrl: "https://ligacubb.com/imagenes/liverfull.png",
      gender: "male",
      category_id: 1,
    },
    team2: {
      name: "SIN CONTRATO",
      logoUrl: "https://ligacubb.com/imagenes/sincontrato.png",
      gender: "male",
      category_id: 1,
    },
    time: "14:00",
    score1: 0,
    score2: 4,
    details: [],
    cancha: "CANCHA 9",
  },
  {
    team1: {
      name: "ULTRACUEVA FC",
      logoUrl: "https://ligacubb.com/imagenes/ultracuevafc.png",
      gender: "male",
      category_id: 1,
    },
    team2: {
      name: "FONDO BLANCO",
      logoUrl: "https://ligacubb.com/imagenes/fondoblanco.png",
      gender: "male",
      category_id: 1,
    },
    time: "15:15",
    score1: 1,
    score2: 1,
    details: [],
    cancha: "SINTETICO 4",
  },
  {
    team1: {
      name: "INQUI FC",
      logoUrl: "https://ligacubb.com/imagenes/inquifc.png",
      gender: "male",
      category_id: 1,
    },
    team2: {
      name: "FERNETBACHE",
      logoUrl: "https://ligacubb.com/imagenes/fernetbache.png",
      gender: "male",
      category_id: 1,
    },
    time: "16:30",
    score1: 0,
    score2: 0,
    details: [],
    cancha: "SINTETICO 4",
  },
  {
    team1: {
      name: "CUALQUIER FRUTA Y/O VERDURA",
      logoUrl: "https://ligacubb.com/imagenes/cualquierfrutayoverdura.png",
      gender: "male",
      category_id: 1,
    },
    team2: {
      name: "ANTIDEPORTIVO CACACIOLI",
      logoUrl: "https://ligacubb.com/imagenes/antideportivocacacioli.png",
      gender: "male",
      category_id: 1,
    },
    time: "16:30",
    score1: 1,
    score2: 3,
    details: [
      { type: "gol", player_name: "Franco Escobar", team: "team2" },
      { type: "gol", player_name: "Federico Higonet", team: "team2" },
      { type: "gol", player_name: "Federico Higonet", team: "team2" },
    ],
    cancha: "CANCHA 9",
  },
];

const goleadoresData = [
  {
    pos: 1,
    jugador: "GRASSI ANGELO EMILIO",
    equipo: "LA BIGORNIA F.C.",
    escudo: "https://ligacubb.com/imagenes/labigorniafc.png",
    goles: 8,
  },
  {
    pos: 2,
    jugador: "DI FIORI GUERRA FABRICIO BALTAZAR",
    equipo: "ULTRA CUEVA F.C.",
    escudo: "https://ligacubb.com/imagenes/ultracuevafc.png",
    goles: 6,
  },
  {
    pos: 3,
    jugador: "AGUERO MARTIN EMILIANO",
    equipo: "RITMO Y SUSTANCIA",
    escudo: "https://ligacubb.com/imagenes/ritmoysustancia.png",
    goles: 5,
  },
  {
    pos: 4,
    jugador: "FRANCHI TOMAS",
    equipo: "REPO P.A",
    escudo: "https://ligacubb.com/imagenes/repopa.png",
    goles: 5,
  },
  {
    pos: 5,
    jugador: "TIRABASSO FRANCO AGUSTN",
    equipo: "SUPERGEDIENTOS",
    escudo: "https://ligacubb.com/imagenes/supergedientos.png",
    goles: 5,
  },
  {
    pos: 6,
    jugador: "BARRIOS VALENTIN",
    equipo: "LIVERFULL",
    escudo: "https://ligacubb.com/imagenes/liverfull.png",
    goles: 4,
  },
  {
    pos: 7,
    jugador: "ESCOBAR FRANCO",
    equipo: "ANTIDEPORTIVO CACACCIOLI",
    escudo: "https://ligacubb.com/imagenes/antideportivocacacioli.png",
    goles: 4,
  },
  {
    pos: 8,
    jugador: "KEIL TOBIAS",
    equipo: "THE BIRDS",
    escudo: "https://ligacubb.com/imagenes/thebirds.png",
    goles: 4,
  },
  {
    pos: 9,
    jugador: "MATE MANUEL",
    equipo: "FUERTE AL MEDIO",
    escudo: "https://ligacubb.com/imagenes/fuertealmedio.png",
    goles: 4,
  },
  {
    pos: 10,
    jugador: "ROQUE NICOLAS",
    equipo: "FERNETBACHE",
    escudo: "https://ligacubb.com/imagenes/fernetbache.png",
    goles: 4,
  },
  {
    pos: 11,
    jugador: "ALENCASTRE CORDI JOAQUIN",
    equipo: "SIN CONTRATO",
    escudo: "https://ligacubb.com/imagenes/sincontrato.png",
    goles: 3,
  },
  {
    pos: 12,
    jugador: "ARAUJO GONZALO MANUEL",
    equipo: "ANTIDEPORTIVO CACACCIOLI",
    escudo: "https://ligacubb.com/imagenes/antideportivocacacioli.png",
    goles: 3,
  },
  {
    pos: 13,
    jugador: "CICCONE RENZO",
    equipo: "INQUI F.C.",
    escudo: "https://ligacubb.com/imagenes/ritmoysustancia.png",
    goles: 3,
  },
  {
    pos: 14,
    jugador: "FISCHER GERONIMO WALTER",
    equipo: "SIN CONTRATO",
    escudo: "https://ligacubb.com/imagenes/sincontrato.png",
    goles: 3,
  },
  {
    pos: 15,
    jugador: "FUNES SACHA",
    equipo: "MANDIYU'S REVENGE",
    escudo: "https://ligacubb.com/imagenes/mandiyusrevenge.png",
    goles: 3,
  },
  {
    pos: 16,
    jugador: "HERNANDEZ JUAN IGNACIO",
    equipo: "ANTIDEPORTIVO CACACCIOLI",
    escudo: "https://ligacubb.com/imagenes/antideportivocacacioli.png",
    goles: 3,
  },
  {
    pos: 17,
    jugador: "ITURRIOZ IGNACIO",
    equipo: "THE BIRDS",
    escudo: "https://ligacubb.com/imagenes/thebirds.png",
    goles: 3,
  },
  {
    pos: 18,
    jugador: "MIGUEL SANTIAGO",
    equipo: "SIN CONTRATO",
    escudo: "https://ligacubb.com/imagenes/sincontrato.png",
    goles: 3,
  },
  {
    pos: 19,
    jugador: "PIERRESTEGUI MANUEL",
    equipo: "FONDO BLANCO",
    escudo: "https://ligacubb.com/imagenes/fondoblanco.png",
    goles: 3,
  },
  {
    pos: 20,
    jugador: "POCHON MARTIN",
    equipo: "SIN CONTRATO",
    escudo: "https://ligacubb.com/imagenes/sincontrato.png",
    goles: 3,
  },
  {
    pos: 21,
    jugador: "STANGEN IAN",
    equipo: "MANDIYU'S REVENGE",
    escudo: "https://ligacubb.com/imagenes/mandiyusrevenge.png",
    goles: 3,
  },
];

const amarillasData = [
  {
    pos: 1,
    jugador: "AGUERO MARTIN EMILIANO",
    equipo: "RITMO Y SUSTANCIA",
    escudo: "https://ligacubb.com/imagenes/ritmoysustancia.png",
    tarjetas: 4,
  },
  {
    pos: 2,
    jugador: "MAS MANUEL",
    equipo: "LIVERFULL",
    escudo: "https://ligacubb.com/imagenes/liverfull.png",
    tarjetas: 4,
  },
  {
    pos: 3,
    jugador: "TIRABASSO FRANCO AGUSTN",
    equipo: "SUPERGEDIENTOS",
    escudo: "https://ligacubb.com/imagenes/supergedientos.png",
    tarjetas: 4,
  },
  {
    pos: 4,
    jugador: "TOVAR JUAN BAUTISTA",
    equipo: "CUALQUIER FRUTA Y/O VERDURA",
    escudo: "https://ligacubb.com/imagenes/cualquierfrutayoverdura.png",
    tarjetas: 4,
  },
  {
    pos: 5,
    jugador: "BRAÑAS JERONIMO",
    equipo: "MANDIYU'S REVENGE",
    escudo: "https://ligacubb.com/imagenes/mandiyusrevenge.png",
    tarjetas: 3,
  },
  {
    pos: 6,
    jugador: "ESCOBAR FRANCO",
    equipo: "ANTIDEPORTIVO CACACCIOLI",
    escudo: "https://ligacubb.com/imagenes/antideportivocacacioli.png",
    tarjetas: 3,
  },
  {
    pos: 7,
    jugador: "FARINA GIANFRANCO",
    equipo: "REPO P.A",
    escudo: "https://ligacubb.com/imagenes/repopa.png",
    tarjetas: 3,
  },
  {
    pos: 8,
    jugador: "GONZALEZ NICOLAS",
    equipo: "ANTIDEPORTIVO CACACCIOLI",
    escudo: "https://ligacubb.com/imagenes/antideportivocacacioli.png",
    tarjetas: 3,
  },
  {
    pos: 9,
    jugador: "GRASSI ANGELO EMILIO",
    equipo: "LA BIGORNIA F.C.",
    escudo: "https://ligacubb.com/imagenes/labigorniafc.png",
    tarjetas: 3,
  },
  {
    pos: 10,
    jugador: "HOLZMAN JULIAN",
    equipo: "FERNETBACHE",
    escudo: "https://ligacubb.com/imagenes/fernetbache.png",
    tarjetas: 3,
  },
  {
    pos: 11,
    jugador: "LANTALILLA IVAN RODRIGO",
    equipo: "BAFANGULO",
    escudo: "https://ligacubb.com/imagenes/bafangulo.png",
    tarjetas: 3,
  },
  {
    pos: 12,
    jugador: "MASCIOLI BERNARDO",
    equipo: "BAFANGULO",
    escudo: "https://ligacubb.com/imagenes/bafangulo.png",
    tarjetas: 3,
  },
  {
    pos: 13,
    jugador: "MEYER LUIS MATIAS",
    equipo: "FONDO BLANCO",
    escudo: "https://ligacubb.com/imagenes/fondoblanco.png",
    tarjetas: 3,
  },
  {
    pos: 14,
    jugador: "MONDINO JUAN CRUZ",
    equipo: "LIVERFULL",
    escudo: "https://ligacubb.com/imagenes/liverfull.png",
    tarjetas: 3,
  },
  {
    pos: 15,
    jugador: "RIVAS FACUNDO",
    equipo: "ANTIDEPORTIVO CACACCIOLI",
    escudo: "https://ligacubb.com/imagenes/antideportivocacacioli.png",
    tarjetas: 3,
  },
  {
    pos: 16,
    jugador: "RUESGA LEOPOLDO",
    equipo: "RITMO Y SUSTANCIA",
    escudo: "https://ligacubb.com/imagenes/ritmoysustancia.png",
    tarjetas: 3,
  },
  {
    pos: 17,
    jugador: "SALAZAR MARTIN",
    equipo: "THE BIRDS",
    escudo: "https://ligacubb.com/imagenes/thebirds.png",
    tarjetas: 3,
  },
  {
    pos: 18,
    jugador: "SCHWAB MAX",
    equipo: "INQUI F.C.",
    escudo: "https://ligacubb.com/imagenes/inquifc.png",
    tarjetas: 3,
  },
  {
    pos: 19,
    jugador: "STORNI BERNABE",
    equipo: "MANDIYU'S REVENGE",
    escudo: "https://ligacubb.com/imagenes/mandiyusrevenge.png",
    tarjetas: 3,
  },
  {
    pos: 20,
    jugador: "TEJERINA SANTIAGO ANDRES",
    equipo: "SIN CONTRATO",
    escudo: "https://ligacubb.com/imagenes/sincontrato.png",
    tarjetas: 3,
  },
  {
    pos: 21,
    jugador: "VARRETTO IGNACIO",
    equipo: "LA BIGORNIA F.C.",
    escudo: "https://ligacubb.com/imagenes/labigorniafc.png",
    tarjetas: 3,
  },
];
