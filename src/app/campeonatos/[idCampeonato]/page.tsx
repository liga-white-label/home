"use client";

import { CopaPageBase } from "@/app/components/copa/CopaPageBase";
import { LigaPageBase } from "@/app/components/liga/LigaPageBase";
import { ZonalPageBase } from "@/app/components/zonal/ZonalPageBase";
import LoadingScreen from "@/app/components/loading/Loading";
import ErrorPage from "@/app/components/ErrorPage";
import { useCampeonatoQuery } from "@/repositories/CampeonatoRepository";
import { useParams } from "next/navigation";
import { CampeonatoTypeEnum } from "@/app/models/Campeonato";

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

  if (isError || !campeonato) {
    return <ErrorPage />;
  }

  const title = `${campeonato.name} ${campeonato.year}`;

  switch (campeonato.type) {
    case CampeonatoTypeEnum.ZONAL:
      return <ZonalPageBase id={idCampeonato.toString()} title={title} />;
    case CampeonatoTypeEnum.REGULAR:
      return <LigaPageBase id={idCampeonato.toString()} title={title} />;
    case CampeonatoTypeEnum.COPA:
    default:
      return <CopaPageBase id={idCampeonato.toString()} title={title} />;
  }
}
