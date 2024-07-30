"use client";
import { useState } from "react";
import { CategoriaPageBase } from "../components/CategoriaPageBase";

export default function Home() {
  const [dia, setDia] = useState(0);

  return (
    <CategoriaPageBase
      title="Categoria B - Femenino"
      tabla={[]}
      matches={[]}
      goleadores={[]}
      amarillas={[]}
    />
  );
}
