import { SportsSoccer, Rectangle } from "@mui/icons-material";
import { useMediaQuery, useTheme } from "@mui/material";
import { FC } from "react";

export interface Incidencia {
  type: "amarilla" | "expulsion" | "gol";
  playerFullName: string;
  team: "home" | "away";
}

interface IncidenciaByTeamProps {
  incidencia: Incidencia;
}

export const IncidenciaByTeam: FC<IncidenciaByTeamProps> = ({ incidencia }) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const simplifiedName =
    incidencia.playerFullName.split(" ")[0] +
    " " +
    incidencia.playerFullName.split(" ")?.[1]?.charAt(0) +
    ".";
  return (
    <div
      className={`flex gap-2 items-center ${
        incidencia.team === "home" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {incidencia.type === "gol" ? (
        <SportsSoccer className="h-2 w-2 md:h-4 md:w-4" />
      ) : (
        <Rectangle
          className="h-2 w-2 md:h-4 md:w-4 rotate-90"
          sx={{
            color: incidencia.type === "expulsion" ? "red" : "yellow",
          }}
        />
      )}
      <p className="text-xs md:text-md line-clamp-1 overflow-hidden whitespace-nowrap">
        {isMobile ? simplifiedName : incidencia.playerFullName}
      </p>
    </div>
  );
};
