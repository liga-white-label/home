import { Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import { Inferencia } from "./Match";
import { InferenciaByTeam } from "./InferenciaByTeam";

interface InferenciasContainerProps {
  inferencias: Inferencia[];
}
export const InferenciasContainer: FC<InferenciasContainerProps> = ({
  inferencias,
}) => {
  return (
    <Grid container xs={12}>
      <Grid item xs={2} className="border-black border-r-2"></Grid>
      <Grid container xs={10}>
        <Grid item xs={6} className="border-black border-r-2 p-2">
          {inferencias
            .filter((i) => i.team === "team1")
            .map((i) => (
              <InferenciaByTeam inferencia={i} />
            ))}
        </Grid>

        <Grid item xs={6} className="p-2">
          {inferencias
            .filter((i) => i.team === "team2")
            .map((i) => (
              <InferenciaByTeam inferencia={i} />
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
