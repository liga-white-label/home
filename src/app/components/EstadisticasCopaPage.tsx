"use client";
import { TablaEstadisticas } from "./TablaEstadisticas";
import { useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import LoadingScreen from "./loading/Loading";
import {
  useAmarillasCopaQuery,
  useGoleadoresCopaQuery,
} from "@/repositories/CampeonatoRepository";
import { GoleadoresMapper, AmarillasMapper } from "../models/FaseCampeonato";

interface EstadisticasCopaPageProps {
  cupId: string;
}

export const EstadisticasCopaPage: React.FC<EstadisticasCopaPageProps> = ({
  cupId = "",
}) => {
  const { data: goleadores = [], isLoading: goleadoresLoading } =
    useGoleadoresCopaQuery(cupId);

  const { data: amarillas = [], isLoading: amarillasLoading } =
    useAmarillasCopaQuery(cupId);

  const [selectedOption, setSelectedOption] = useState<string>("0");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value as string);
  };

  if (goleadoresLoading || amarillasLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="flex flex-col h-full w-full gap-5 ">
      <FormControl
        fullWidth
        className="flex flex-col gap-4 max-sm:items-center w-full "
      >
        <Typography variant="h5" fontWeight={"bold"}>
          Tipo de estadística
        </Typography>
        <Select
          value={selectedOption}
          onChange={handleChange}
          className="w-56 max-sm:w-full"
        >
          <MenuItem value={"0"}>Goleadores</MenuItem>
          <MenuItem value={"1"}>Amarillas</MenuItem>
        </Select>
      </FormControl>

      <TablaEstadisticas
        data={
          selectedOption === "0"
            ? goleadores.map(GoleadoresMapper)
            : amarillas.map(AmarillasMapper)
        }
        tipo={selectedOption === "0" ? "goleadores" : "amarillas"}
      />
    </div>
  );
};
