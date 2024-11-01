import { SportsSoccer, Rectangle } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { FC } from "react";

export interface Incidencia {
  type: "amarilla" | "expulsion" | "gol";
  player_name: string;
  team: "home" | "away";
}

interface IncidenciaByTeamProps {
  incidencia: Incidencia;
}

export const IncidenciaByTeam: FC<IncidenciaByTeamProps> = ({ incidencia }) => {
  const theme = useTheme();
  return (
    <div
      className={`flex gap-2 items-center ${
        incidencia.team === "home" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {incidencia.type === "gol" ? (
        <SportsSoccer className="h-5 w-5" />
      ) : (
        <Rectangle
          className="h-5 w-5 rotate-90"
          sx={{
            color: incidencia.type === "expulsion" ? "red" : "yellow",
          }}
        />
      )}
      <p className="text-lg">{incidencia.player_name}</p>
    </div>
  );
};
