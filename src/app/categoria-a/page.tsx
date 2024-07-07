"use client";
import { Container, Grid } from "@mui/material";
import { FechaSelector } from "../components/FechaSelector";
import { MatchProps } from "../components/Match";
import { useState } from "react";
import Section from "../components/Section";
import { CategoriaPageBase } from "../components/CategoriaPageBase";

const partidos_sabado: { title: string; matches: MatchProps[] } = {
  title: "",
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
};

const partidos_domingo: { title: string; matches: MatchProps[] } = {
  title: "",
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
};

export default function Home() {
  const [dia, setDia] = useState(0);

  const partidos_por_dia = dia === 0 ? partidos_sabado : partidos_domingo;
  return (
    <CategoriaPageBase
      title="Categoria A - Masculino"
      partidosPorDia={partidos_por_dia}
      selectedDia={dia}
      handleDia={(d) => setDia(d)}
      dias={["Sábado, 29 de Junio de 2024", "Domingo, 30 de Junio de 2024"]}
    />
  );
}
