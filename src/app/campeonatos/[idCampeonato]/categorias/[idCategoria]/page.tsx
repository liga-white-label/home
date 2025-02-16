"use client";

import { CategoriaPageBase } from "@/app/components/CategoriaPageBase";
import LoadingScreen from "@/app/components/loading/Loading";
import { useCampeonatoQuery } from "@/repositories/CampeonatoRepository";
import { useParams } from "next/navigation";
import ErrorPage from "@/app/components/ErrorPage";
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
    return <ErrorPage />;
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
