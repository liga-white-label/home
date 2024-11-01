"use client";

import { CategoriaPageBase } from "@/app/components/CategoriaPageBase";
import LoadingScreen from "@/app/components/loading/Loading";
import { useCampeonatoQuery } from "@/repositories/CampeonatoRepository";
import { useParams } from "next/navigation";

export default function Home() {
  const { idCampeonato, idCategoria } = useParams();

  const {
    data: campeonato,
    isLoading,
    isError,
  } = useCampeonatoQuery(idCampeonato.toString());

  const categoria = campeonato?.categories?.find(
    (c) => c.id === idCategoria.toString()
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <CategoriaPageBase
      title={`Categoria ${categoria?.name} - ${
        categoria?.gender === "male" ? "Masculina" : "Femenina"
      }`}
      id={idCategoria.toString()}
    />
  );
}
