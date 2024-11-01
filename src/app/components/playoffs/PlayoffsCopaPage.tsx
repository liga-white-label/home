import React from "react";
import LoadingScreen from "../loading/Loading";
import { useOneFasePlayoffCopaQuery } from "@/repositories/CampeonatoRepository";
import CuadroPlayoffV3 from "./CuadroPlayoffV3";
import PlayoffFixtureNavigator from "./PlayoffFixtureNavigator";

interface CuadroPlayoffProps {
  faseId: string;
}

const PlayoffCopaPage: React.FC<CuadroPlayoffProps> = ({ faseId }) => {
  const {
    data: fase,
    isLoading,
    isError,
  } = useOneFasePlayoffCopaQuery(faseId || "");

  if (isLoading) return <LoadingScreen />;
  if (isError) return <div>Error...</div>;

  return (
    <>
      <CuadroPlayoffV3 rondas={fase || []} />
      <PlayoffFixtureNavigator rounds={fase || []} faseId={faseId} />
    </>
  );
};

export default PlayoffCopaPage;
