"use client";
import { MatchProps } from "../components/Match";
import { useState } from "react";
import { CategoriaPageBase } from "../components/CategoriaPageBase";

const partidos_sabado: { title: string; matches: MatchProps[] } = {
  title: "",
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
};

const partidos_domingo: { title: string; matches: MatchProps[] } = {
  title: "",
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
};

export default function Home() {
  const [dia, setDia] = useState(0);

  const partidos_por_dia = dia === 0 ? partidos_sabado : partidos_domingo;
  return (
    <CategoriaPageBase
      title="Categoria B - Masculino"
      partidosPorDia={partidos_por_dia}
      selectedDia={dia}
      handleDia={(d) => setDia(d)}
      dias={["Sábado, 29 de Junio de 2024", "Domingo, 30 de Junio de 2024"]}
    />
  );
}
