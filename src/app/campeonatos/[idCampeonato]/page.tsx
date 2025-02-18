"use client";

import { CopaPageBase } from "@/app/components/copa/CopaPageBase";
import LoadingScreen from "@/app/components/loading/Loading";
import ErrorPage from "@/app/components/ErrorPage";
import { useCampeonatoQuery } from "@/repositories/CampeonatoRepository";
import { useParams } from "next/navigation";

export default function Home() {
  const { idCampeonato } = useParams();

  const {
    data: campeonato,
    isLoading,
    isError,
  } = useCampeonatoQuery(idCampeonato.toString());

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <CopaPageBase
      title={`${campeonato?.name} ${campeonato?.year}`}
      id={idCampeonato.toString()}
    />
  );
}
