import { Round } from "@/repositories/CategoriaRepository";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import Iconify from "../iconify";
import PlayoffRoundsFixture from "./PlayoffRoundsFixture";

interface PlayoffFixtureNavigatorProps {
  rounds: Round[];
  faseId: string;
}

const FASE_MINIMA = 32;
const FASE_MAXIMA = 1;

const getFaseLabel = (fase: number) => {
  switch (fase) {
    case 32:
      return "32avos de final";
    case 16:
      return "16avos de final";
    case 8:
      return "Octavos de final";
    case 4:
      return "Cuartos de final";
    case 2:
      return "Semifinal";
    case 1:
      return "Final";
    default:
      return "";
  }
};

const PlayoffFixtureNavigator: React.FC<PlayoffFixtureNavigatorProps> = ({
  rounds,
  faseId,
}) => {
  const [selectedPhase, setSelectedPhase] = useState<number>(
    rounds[rounds.length - 1].roundNumber
  );
  const currentPhase = rounds.find(
    (fase: Round) => fase.roundNumber === selectedPhase
  );

  const doesRoundExist = (roundNumber: number) => {
    return rounds.some((fase: Round) => fase.roundNumber === roundNumber);
  };

  return (
    <>
      <Box className="flex w-full p-4 justify-between items-center">
        <IconButton
          disabled={
            selectedPhase === FASE_MINIMA ||
            rounds.length === 1 ||
            !doesRoundExist(selectedPhase + selectedPhase)
          }
          onClick={() => setSelectedPhase((prev) => prev + prev)}
        >
          <Iconify icon={"ion:caret-back"} />
        </IconButton>
        <Typography className="font-bold">
          {getFaseLabel(selectedPhase)}
        </Typography>
        <IconButton
          disabled={selectedPhase === FASE_MAXIMA || rounds.length === 1}
          onClick={() => setSelectedPhase((prev) => prev - prev / 2)}
        >
          <Iconify icon={"ion:caret-forward"} />
        </IconButton>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          p: 4,
        }}
      >
        {currentPhase?.matchesPlayoff.map((cruce, index) => (
          <PlayoffRoundsFixture
            key={index}
            cruce={cruce}
            index={index}
            idFase={faseId}
          />
        ))}
      </Box>
    </>
  );
};

export default PlayoffFixtureNavigator;
