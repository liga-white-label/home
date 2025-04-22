"use client";

import { Box, Typography } from "@mui/material";
import { useAllNovedadesQuery } from "@/repositories/NovedadRepository";
import LoadingScreen from "../loading/Loading";
import NovedadCard from "./NovedadCard";

const NovedadesContent = () => {
  const { data: novedades, isLoading, isError } = useAllNovedadesQuery();

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-[#220a0a] w-full">
      <Box className="flex flex-col items-center gap-4 w-full sm:w-3/5 bg-[#fff] pt-4 min-h-screen">
        <Box className="flex flex-col gap-2 w-full px-10">
          <Typography variant="h4" color="text.primary">
            Novedades
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Acá podrás encontrar las novedades de la liga
          </Typography>
        </Box>

        <Box className="flex flex-col gap-4 w-full items-center justify-center px-10 pb-10">
          {novedades && novedades?.length > 0 ? (
            novedades?.map((novedad) => (
              <NovedadCard key={novedad.id} novedad={novedad} />
            ))
          ) : (
            <div className="flex items-center justify-center mt-10 text-center text-gray-500">
              No hay novedades
            </div>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default NovedadesContent;
