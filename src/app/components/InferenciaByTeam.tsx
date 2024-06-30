import { SportsSoccer, Rectangle } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { FC } from "react";
import { Inferencia } from "./Match";

interface InferenciaByTeamProps {
  inferencia: Inferencia;
}

export const InferenciaByTeam: FC<InferenciaByTeamProps> = ({ inferencia }) => {
  return (
    <div className="flex gap-2 items-center ">
      {inferencia.type === "gol" ? (
        <SportsSoccer className="h-4 w-4" />
      ) : (
        <Rectangle className="h-4 w-4 rotate-90" color="error" />
      )}
      <Typography>{inferencia.player_name}</Typography>
    </div>
  );
};
