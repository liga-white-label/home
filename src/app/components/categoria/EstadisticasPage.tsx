"use client";
import { TablaEstadisticas } from "../TablaEstadisticas";
import LoadingScreen from "../loading/Loading";
import { useGoleadoresCategoriaQuery } from "@/repositories/CategoriaRepository";
import { useAccumulatedScorersQuery } from "@/repositories/SeasonRepository";
import { GoleadoresMapper } from "@/app/models/FaseCampeonato";

interface EstadisticasPageProps {
  categoryId: string;
  // Cuando la categoría forma parte de una temporada Apertura/Clausura, los
  // goleadores se muestran acumulados entre ambos torneos (ver
  // season/accumulated-scorers), en vez de solo los del torneo actual.
  seasonInfo?: {
    aperturaId: string;
    clausuraId: string;
  } | null;
  categoryName?: string;
}

export const EstadisticasPage: React.FC<EstadisticasPageProps> = ({
  categoryId = "",
  seasonInfo = null,
  categoryName = "",
}) => {
  const isSeason = !!seasonInfo?.aperturaId && !!seasonInfo?.clausuraId;

  const { data: goleadoresCategoria = [], isLoading: goleadoresCategoriaLoading } =
    useGoleadoresCategoriaQuery(!isSeason ? categoryId : "");

  const { data: goleadoresSeason = [], isLoading: goleadoresSeasonLoading } =
    useAccumulatedScorersQuery({
      aperturaLeagueId: isSeason ? seasonInfo!.aperturaId : "",
      clausuraLeagueId: isSeason ? seasonInfo!.clausuraId : "",
      categoryName,
    });

  const goleadores = isSeason ? goleadoresSeason : goleadoresCategoria;
  const goleadoresLoading = isSeason
    ? goleadoresSeasonLoading
    : goleadoresCategoriaLoading;

  if (goleadoresLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col h-full w-full gap-5">
      <TablaEstadisticas data={goleadores.map(GoleadoresMapper)} tipo="goleadores" />
    </div>
  );
};
