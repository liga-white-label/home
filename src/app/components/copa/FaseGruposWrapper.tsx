import { FC } from "react";
import { useOneFaseCampeonatoQuery } from "@/repositories/CampeonatoRepository";
import { Box, Typography } from "@mui/material";
import { TablaPosiciones } from "../TablaPosiciones";
import LoadingScreen from "../loading/Loading";
import ErrorPage from "../ErrorPage";

interface FaseGruposWrapperProps {
  faseId: string;
}
export const FaseGruposWrapper: FC<FaseGruposWrapperProps> = ({ faseId }) => {
  const { data, isLoading, isError } = useOneFaseCampeonatoQuery(faseId);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorPage />;

  return data?.map((grupo, index) => (
    <>
      <Box key={index}>
        <Box className="flex w-full py-2 bg-gray-200 items-center justify-center">
          <Typography
            variant="h6"
            fontWeight={"bold"}
          >{`Grupo ${grupo.name}`}</Typography>
        </Box>
        <TablaPosiciones data={grupo.positions} />
      </Box>
    </>
  ));
};
