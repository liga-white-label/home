import React from "react";
import { useOneFasePlayoffQuery } from "@/repositories/CategoriaRepository";
import LoadingScreen from "../loading/Loading";
import ErrorPage from "../ErrorPage";
import CuadroPlayoff from "./CuadroPlayoff";
import PlayoffFixtureNavigator from "./PlayoffFixtureNavigator";

interface CuadroPlayoffProps {
  faseId: string;
}

const PlayoffsPage: React.FC<CuadroPlayoffProps> = ({ faseId }) => {
  const {
    data: fase,
    isError,
    isLoading,
  } = useOneFasePlayoffQuery({
    id: faseId,
    enabled: true,
  });

  if (
    !isLoading &&
    (!fase || !Array.isArray(fase) || fase.length === 0 || isError)
  )
    return <ErrorPage />;

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <CuadroPlayoff rondas={fase || []} />
      <PlayoffFixtureNavigator
        rounds={fase || []}
        faseId={faseId}
        isLeague={true}
      />
    </>
  );
};

export default PlayoffsPage;
