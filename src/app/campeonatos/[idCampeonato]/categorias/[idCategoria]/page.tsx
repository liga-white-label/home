"use client";

import { CategoriaPageBase } from "@/app/components/categoria/CategoriaPageBase";
import LoadingScreen from "@/app/components/loading/Loading";
import { useCampeonatoQuery } from "@/repositories/CampeonatoRepository";
import { useAllZonaCategoriasQuery } from "@/repositories/ZonaRepository";
import { useParams } from "next/navigation";
import ErrorPage from "@/app/components/ErrorPage";
import { CampeonatoTypeEnum, Liga, SeasonEnum } from "@/app/models/Campeonato";
export default function Home() {
  const { idCampeonato, idCategoria } = useParams();

  const {
    data: campeonatoData,
    isLoading,
    isError,
  } = useCampeonatoQuery(idCampeonato.toString());

  const campeonato = campeonatoData as Liga;
  const isZonal = campeonatoData?.type === CampeonatoTypeEnum.ZONAL;

  const { data: zonaCategorias, isLoading: isLoadingZonaCategorias } =
    useAllZonaCategoriasQuery(isZonal ? idCampeonato.toString() : "");

  const categoria = isZonal
    ? zonaCategorias?.find((c) => c.id === idCategoria.toString())
    : campeonato?.categories?.find((c) => c.id === idCategoria.toString());

  if (isLoading || (isZonal && isLoadingZonaCategorias)) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  const seasonInfo =
    campeonato?.season && campeonato?.linkedSeasonId
      ? {
          current: campeonato.season,
          linkedId: campeonato.linkedSeasonId,
          aperturaId:
            campeonato.season === SeasonEnum.APERTURA
              ? idCampeonato.toString()
              : campeonato.linkedSeasonId,
          clausuraId:
            campeonato.season === SeasonEnum.CLAUSURA
              ? idCampeonato.toString()
              : campeonato.linkedSeasonId,
        }
      : null;

  return (
    <CategoriaPageBase
      title={`Categoria ${categoria?.name} - ${
        categoria?.gender === "male" ? "Masculina" : "Femenina"
      }`}
      id={idCategoria.toString()}
      seasonInfo={seasonInfo}
    />
  );
}
