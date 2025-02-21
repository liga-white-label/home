import React from "react";
import LoadingScreen from "../loading/Loading";
import { useOneFasePlayoffCopaQuery } from "@/repositories/CampeonatoRepository";
import CuadroPlayoff from "./CuadroPlayoff";
import PlayoffFixtureNavigator from "./PlayoffFixtureNavigator";
import ErrorPage from "../ErrorPage";

interface CuadroPlayoffProps {
  faseId: string;
}

const PlayoffCopaPage: React.FC<CuadroPlayoffProps> = ({ faseId }) => {
  const {
    data: fase,
    isLoading,
    isError,
  } = useOneFasePlayoffCopaQuery({ id: faseId || "", enabled: true });

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorPage />;

  return (
    <>
      <CuadroPlayoff rondas={fase || []} />
      <PlayoffFixtureNavigator
        rounds={fase || []}
        faseId={faseId}
        isLeague={false}
      />
    </>
  );
};

export default PlayoffCopaPage;
