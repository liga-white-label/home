import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import Iconify from "../iconify";
import PlayoffRoundsFixture from "./PlayoffRoundsFixture";
import { RoundCup } from "@/app/models/FaseCampeonato";

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
interface PlayoffFixtureNavigatorProps {
  rounds: RoundCup[];
  faseId: string;
  isLeague?: boolean;
}

const FASE_MINIMA = 32;
const FASE_MAXIMA = 1;

const PlayoffFixtureNavigator: React.FC<PlayoffFixtureNavigatorProps> = ({
  rounds,
  faseId,
  isLeague = false,
}) => {
  const [selectedPhase, setSelectedPhase] = useState<number>(
    rounds[rounds.length - 1].roundNumber
  );
  const currentPhase = rounds.find(
    (fase: RoundCup) => fase.roundNumber === selectedPhase
  );

  const doesRoundExist = (roundNumber: number) => {
    return rounds.some((fase: RoundCup) => fase.roundNumber === roundNumber);
  };

  return (
    <>
      <Box className="flex w-full p-4 justify-between items-center" style={{ backgroundColor: "var(--color-primary)" }}>
        <IconButton
          disabled={
            selectedPhase === FASE_MINIMA ||
            rounds.length === 1 ||
            !doesRoundExist(selectedPhase + selectedPhase)
          }
          onClick={() => setSelectedPhase((prev) => prev + prev)}
        >
          <Iconify icon={"ion:caret-back"} color={"white"} />
        </IconButton>
        <Typography className="font-bold text-white">
          {getFaseLabel(selectedPhase)}
        </Typography>
        <IconButton
          disabled={selectedPhase === FASE_MAXIMA || rounds.length === 1}
          onClick={() => setSelectedPhase((prev) => prev - prev / 2)}
        >
          <Iconify icon={"ion:caret-forward"} color={"white"} />
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
            isLeague={isLeague}
          />
        ))}
      </Box>
    </>
  );
};

export default PlayoffFixtureNavigator;
