import { Grid } from "@mui/material";
import React, { FC } from "react";
import { Incidencia, IncidenciaByTeam } from "./InferenciaByTeam";

interface IncidenciasContainerProps {
  incidencias: Incidencia[];
}
export const IncidenciasContainer: FC<IncidenciasContainerProps> = ({
  incidencias,
}) => {
  return (
    <Grid container xs={12}>
      <Grid item xs={2} className="border-black border-r-2"></Grid>
      <Grid container xs={10}>
        <Grid item xs={6} className="border-black border-r-2 p-2">
          {incidencias
            .filter((i) => i.team === "home")
            .map((i, index) => (
              <IncidenciaByTeam key={index} incidencia={i} />
            ))}
        </Grid>

        <Grid item xs={6} className="p-2">
          {incidencias
            .filter((i) => i.team === "away")
            .map((i, index) => (
              <IncidenciaByTeam key={index} incidencia={i} />
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
