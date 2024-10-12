"use client";

import { CopaPageBase } from "@/app/components/CopaPageBase";
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
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <CopaPageBase
      title={`${campeonato?.name} ${campeonato?.year}`}
      id={idCampeonato.toString()}
    />
  );
}
