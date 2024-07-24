"use client";
import { useState } from "react";
import { CategoriaPageBase } from "../components/CategoriaPageBase";

export default function Home() {
  const [dia, setDia] = useState(0);

  return (
    <CategoriaPageBase
      title="Categoria B - Masculino"
      partidosPorDia={{ title: "", matches: [] }}
      selectedDia={dia}
      handleDia={(d) => setDia(d)}
      dias={["Sábado, 29 de Junio de 2024", "Domingo, 30 de Junio de 2024"]}
    />
  );
}
