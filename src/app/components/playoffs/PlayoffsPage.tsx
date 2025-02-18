import React from "react";
import { useOneFasePlayoffQuery } from "@/repositories/CategoriaRepository";
import LoadingScreen from "../loading/Loading";
import ErrorPage from "../ErrorPage";
import CuadroPlayoff from "./CuadroPlayoff";
import PlayoffFixtureNavigator from "./PlayoffFixtureNavigator";
interface CuadroPlayoffProps {
  faseId: string;
}

const CuadroPlayoffV2: React.FC<CuadroPlayoffProps> = ({ faseId }) => {
  const { data: fase, isLoading, isError } = useOneFasePlayoffQuery(faseId);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorPage />;

  return (
    <>
      <CuadroPlayoff rondas={fase || []} />
      <PlayoffFixtureNavigator rounds={fase || []} faseId={faseId} />
    </>
  );
};

export default CuadroPlayoffV2;
