"use client";

import { CategoriaPageBase } from "@/app/components/categoria/CategoriaPageBase";
import LoadingScreen from "@/app/components/loading/Loading";
import { useCampeonatoQuery } from "@/repositories/CampeonatoRepository";
import { useParams } from "next/navigation";
import ErrorPage from "@/app/components/ErrorPage";
import { Liga } from "@/app/models/Campeonato";
export default function Home() {
  const { idCampeonato, idCategoria } = useParams();

  const {
    data: campeonatoData,
    isLoading,
    isError,
  } = useCampeonatoQuery(idCampeonato.toString());

  const campeonato = campeonatoData as Liga;

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
