"use client";
import { PartidosPorDia } from "./PartidosPorDia";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { Match } from "../models/Match";

interface FixturePageProps {
  matches: Match[];
}

export const FixturePage: React.FC<FixturePageProps> = ({ matches }) => {
  const [selectedFecha, setSelectedFecha] = useState<string>("1");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedFecha(event.target.value as string);
  };

  return (
    <div className="flex flex-col h-full w-full gap-5 ">
      <FormControl
        fullWidth
        className="flex flex-col gap-4 max-sm:items-center w-full "
      >
        <Typography variant="h5" fontWeight={"bold"}>
          Fecha
        </Typography>
        <Select
          value={selectedFecha}
          onChange={handleChange}
          className="w-56 max-sm:w-full"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => (
            <MenuItem value={`${item}`}>{`Fecha ${item}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="max-w-full overflow-x-hidden flex flex-col gap-5 justify-center">
        <p className="font-bold max-sm:text-center">Sabado 13 de Julio</p>
        <PartidosPorDia matches={matches.filter((_, index) => index < 4)} />
        <p className="font-bold max-sm:text-center">Domingo 14 de Julio</p>
        <PartidosPorDia matches={matches.filter((_, index) => index >= 4)} />
      </div>
    </div>
  );
};
