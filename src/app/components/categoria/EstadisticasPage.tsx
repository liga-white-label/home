"use client";
import { TablaEstadisticas } from "../TablaEstadisticas";
import { useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import LoadingScreen from "../loading/Loading";
import {
  useAmarillasCategoriaQuery,
  useGoleadoresCategoriaQuery,
} from "@/repositories/CategoriaRepository";
import { GoleadoresMapper, AmarillasMapper } from "@/app/models/FaseCampeonato";

interface EstadisticasPageProps {
  categoryId: string;
}

export const EstadisticasPage: React.FC<EstadisticasPageProps> = ({
  categoryId = "",
}) => {
  const { data: goleadores = [], isLoading: goleadoresLoading } =
    useGoleadoresCategoriaQuery(categoryId);

  const { data: amarillas = [], isLoading: amarillasLoading } =
    useAmarillasCategoriaQuery(categoryId);

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
            : amarillas.map(AmarillasMapper).filter((a: any) => a.tarjetas > 0)
        }
        tipo={selectedOption === "0" ? "goleadores" : "amarillas"}
      />
    </div>
  );
};
