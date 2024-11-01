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

interface EstadisticasPageProps {
  categoryId: string;
}

export const EstadisticasPage: React.FC<EstadisticasPageProps> = ({
  categoryId,
}) => {
  const goleadores: any[] = [];
  const amarillas: any[] = [];

  const [selectedOption, setSelectedOption] = useState<string>("0");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value as string);
  };
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
        data={selectedOption === "0" ? goleadores : amarillas}
        tipo={selectedOption === "0" ? "goleadores" : "amarillas"}
      />
    </div>
  );
};
