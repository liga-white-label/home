import { SportsSoccer, Rectangle } from "@mui/icons-material";
import { FC } from "react";
import { Incidencia } from "./Match";

interface IncidenciaByTeamProps {
  incidencia: Incidencia;
}

export const IncidenciaByTeam: FC<IncidenciaByTeamProps> = ({ incidencia }) => {
  return (
    <div
      className={`flex gap-2 items-center ${
        incidencia.team === "team1" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {incidencia.type === "gol" ? (
        <SportsSoccer className="h-10 w-10" />
      ) : (
        <Rectangle className="h-10 w-10 rotate-90" color="error" />
      )}
      <p className="text-lg">{incidencia.player_name}</p>
    </div>
  );
};
