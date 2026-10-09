"use client";

import { CopaPageBase } from "@/app/components/copa/CopaPageBase";
import { LigaPageBase } from "@/app/components/liga/LigaPageBase";
import { ZonalPageBase } from "@/app/components/zonal/ZonalPageBase";
import LoadingScreen from "@/app/components/loading/Loading";
import ErrorPage from "@/app/components/ErrorPage";
import { useCampeonatoQuery } from "@/repositories/CampeonatoRepository";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { CampeonatoTypeEnum, Liga } from "@/app/models/Campeonato";

export default function Home() {
  const { idCampeonato } = useParams();
  const router = useRouter();

  const {
    data: campeonato,
    isLoading,
    isError,
  } = useCampeonatoQuery(idCampeonato.toString());

  // Las ligas se ven siempre desde la página de categoría (posiciones, tabla
  // general, fixture, goleadores), igual que Primera División A masculino:
  // se entra directo a la primera categoría en vez de a la lista.
  const primeraCategoria =
    campeonato?.type === CampeonatoTypeEnum.REGULAR
      ? (campeonato as Liga).categories?.[0]
      : undefined;

  useEffect(() => {
    if (primeraCategoria) {
      router.replace(
        `/campeonatos/${idCampeonato}/categorias/${primeraCategoria.id}`
      );
    }
  }, [primeraCategoria, idCampeonato, router]);

  if (isLoading || primeraCategoria) {
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
