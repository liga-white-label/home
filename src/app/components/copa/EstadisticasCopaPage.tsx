"use client";
import { TablaEstadisticas } from "../TablaEstadisticas";
import LoadingScreen from "../loading/Loading";
import { useGoleadoresCopaQuery } from "@/repositories/CampeonatoRepository";
import { GoleadoresMapper } from "@/app/models/FaseCampeonato";

interface EstadisticasCopaPageProps {
  cupId: string;
}

export const EstadisticasCopaPage: React.FC<EstadisticasCopaPageProps> = ({
  cupId = "",
}) => {
  const { data: goleadores = [], isLoading: goleadoresLoading } =
    useGoleadoresCopaQuery(cupId);

  if (goleadoresLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col h-full w-full gap-5">
      <TablaEstadisticas data={goleadores.map(GoleadoresMapper)} tipo="goleadores" />
    </div>
  );
};
