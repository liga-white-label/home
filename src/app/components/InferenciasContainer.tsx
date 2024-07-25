import { Grid } from "@mui/material";
import React, { FC } from "react";
import { Incidencia } from "./Match";
import { IncidenciaByTeam } from "./IncidenciaByTeam";

interface IncidenciasContainerProps {
  Incidencias: Incidencia[];
}
export const IncidenciasContainer: FC<IncidenciasContainerProps> = ({
  Incidencias,
}) => {
  return (
    <Grid container xs={12}>
      <Grid item xs={2} className="border-black border-r-2"></Grid>
      <Grid container xs={10}>
        <Grid item xs={6} className="border-black border-r-2 p-2">
          {Incidencias.filter((i) => i.team === "team1").map((i) => (
            <IncidenciaByTeam Incidencia={i} />
          ))}
        </Grid>

        <Grid item xs={6} className="p-2">
          {Incidencias.filter((i) => i.team === "team2").map((i) => (
            <IncidenciaByTeam Incidencia={i} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
