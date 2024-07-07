"use client";
import { Container } from "@mui/material";
import Section from "./components/Section";
import { FechaSelector } from "./components/FechaSelector";
import { useState } from "react";
import { MatchProps } from "./components/Match";

const partidos_sabado: { title: string; matches: MatchProps[] }[] = [
  {
    title: "CATEGORIA A - MASCULINO",
    matches: [
      {
        cancha: "Cancha 9",
        time: "15:15",
        team1: "ULTRACUEVA FC",
        team2: "LA BIGORNIA",
      },
      {
        time: "16:30",
        cancha: "Sintetico 3",
        team1: "SUPERGEDIENTOS",
        team2: "FUERTE AL MEDIO",
      },
      {
        time: "16:30",
        cancha: "Cancha 9",
        team1: "THE BIRDS",
        team2: "FERNETBACHE",
      },
    ],
  },
  {
    title: "CATEGORIA B - MASCULINO",
    matches: [
      {
        cancha: "Sintetico 3",
        time: "14:00",
        team1: "MEDIA PINTA FC",
        team2: "EQVIPO POTA",
      },
      {
        time: "14:00",
        cancha: "Cancha 11",
        team1: "AVES RAPACES FC",
        team2: "MORATORIA",
      },
      {
        time: "15:15",
        cancha: "Sintetico 3",
        team1: "LAS MULAS",
        team2: "ALTOS CAÑOS",
      },
      {
        cancha: "Cancha 11",
        time: "15:15",
        team1: "TOBAS HUAINAS CLUB",
        team2: "MARADONIANOS",
      },
      {
        time: "16:30",
        cancha: "Sintetico 1",
        team1: "ALL BLACKS",
        team2: "REAL DEPORTIVO COLOMBIA Y ALEM",
      },
      {
        time: "16:30",
        cancha: "Sintetico 4",
        team1: "DEPORTIVO CHANFLE",
        team2: "WINECHESTER",
      },
    ],
  },
];

const partidos_domingo: { title: string; matches: MatchProps[] }[] = [
  {
    title: "CATEGORIA A - MASCULINO",
    matches: [
      {
        cancha: "Cancha 9",
        time: "12:45",
        team1: "LIVERFULL",
        team2: "BAFANGULO",
      },
      {
        cancha: "Sintetico 4",
        time: "15:15",
        team1: "INQUI FC",
        team2: "MANDIYU'S REVENGE",
      },
      {
        time: "15:15",
        cancha: "Cancha 9",
        team1: "FONDO BLANCO",
        team2: "ANTIDEPORTIVO CACACIOLI",
      },
      {
        time: "16:30",
        cancha: "Sintetico 4",
        team1: "CUALQUIER FRUTA Y/O VERDURA",
        team2: "SIN CONTRATO",
      },
      {
        time: "16:30",
        cancha: "Cancha 9",
        team1: "REPO PA",
        team2: "RITMO Y SUSTANCIA",
      },
    ],
  },
  {
    title: "CATEGORIA B - MASCULINO",
    matches: [
      {
        cancha: "Cancha 10",
        time: "14:00",
        team1: "CSKA BIA",
        team2: "HUERGINA FC",
      },
      {
        time: "15:15",
        cancha: "Cancha 10",
        team1: "ATRA-K-LAOS",
        team2: "FALSO MADRID",
      },
    ],
  },
];

export default function Home() {
  const [dia, setDia] = useState(0);

  const partidos_por_dia = dia === 0 ? partidos_sabado : partidos_domingo;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <Container className="w-full flex flex-col items-center justify-center gap-5">
        <FechaSelector hideFechas disableMove />
        <div className="flex flex-col justify-center items-center gap-5 w-full">
          <div className="flex flex-row gap-5 w-full justify-between">
            <h2
              onClick={() => setDia(0)}
              className={`text-center  text-xl p-2 shadow-lg ${
                dia === 0 ? "bg-red-300 shadow-black" : "bg-gray-100"
              } rounded-lg  cursor-pointer border-black border-[1px]`}
            >
              Sábado, 29 de Junio de 2024
            </h2>
            <h2
              onClick={() => setDia(1)}
              className={`text-center  text-xl p-2 shadow-lg ${
                dia === 1 ? "bg-red-300 shadow-black" : "bg-gray-100"
              } rounded-lg  cursor-pointer border-black border-[1px]`}
            >
              Domingo, 30 de Junio de 2024
            </h2>
          </div>
          {partidos_por_dia.map((p) => (
            <Section title={p.title} matches={p.matches} />
          ))}
        </div>
      </Container>
    </main>
  );
}
