import React from "react";
import LoadingScreen from "../loading/Loading";
import { useOneFasePlayoffCopaQuery } from "@/repositories/CampeonatoRepository";
import CuadroPlayoff from "./CuadroPlayoff";
import PlayoffFixtureNavigator from "./PlayoffFixtureNavigator";
import ErrorPage from "../ErrorPage";
import { Typography } from "@mui/material";

interface CuadroPlayoffProps {
  faseId: string;
}

const PlayoffCopaPage: React.FC<CuadroPlayoffProps> = ({ faseId }) => {
  const {
    data: fase,
    isLoading,
    isError,
  } = useOneFasePlayoffCopaQuery({ id: faseId || "", enabled: true });

  if (!fase)
    return (
      <div className="flex flex-col items-center h-[70svh] pt-5 gap-5">
        <Typography variant="h3" color="text.primary">
          Proximamente
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          Todavía no se ha creado el cuadro de playoffs.
        </Typography>
      </div>
    );

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
