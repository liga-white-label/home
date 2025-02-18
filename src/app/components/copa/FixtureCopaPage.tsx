"use client";

import {
  useOneFaseCampeonatoQuery,
  useOnePartidoCopaQuery,
} from "@/repositories/CampeonatoRepository";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useRef, useState } from "react";
import { PartidosAgrupados } from "../fixture/PartidosAgrupados";
import LoadingScreen from "../loading/Loading";
import InfoMatchModal from "../InfoMatchModal";
import { SimplifiedMatch, convertToSimplifiedMatch } from "@/app/models/Match";
import ErrorPage from "../ErrorPage";

interface FixtureCopaPageProps {
  faseId: string;
}

const FixtureCopaPage: React.FC<FixtureCopaPageProps> = ({ faseId }) => {
  const currentMatchSelected = useRef<any | undefined>();

  const { data, isLoading, isError } = useOneFaseCampeonatoQuery(faseId);

  const { data: match, isLoading: matchLoading } = useOnePartidoCopaQuery(
    currentMatchSelected.current?.homeTeam,
    currentMatchSelected.current?.awayTeam,
    currentMatchSelected.current?.phaseId || "",
    !!currentMatchSelected.current
  );

  const [openMatchModal, setOpenMatchModal] = useState<boolean>(false);

  const handleClickSeeMatch = (match: SimplifiedMatch) => {
    currentMatchSelected.current = {
      homeTeam: match.homeTeamId,
      awayTeam: match.awayTeamId,
      phaseId: faseId || "",
    };

    setOpenMatchModal(true);
  };

  const handleCloseModal = () => {
    currentMatchSelected.current = undefined;
    setOpenMatchModal(false);
  };

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorPage />;

  return data?.map((grupo, index) => (
    <>
      <Box key={index}>
        <Box
          style={{
            display: "flex",
            width: "100%",
            padding: "0.5rem 0",
            backgroundColor: "#e5e7eb",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            {`Grupo ${grupo.name}`}
          </Typography>
        </Box>
        {
          <PartidosAgrupados
            matches={
              grupo.matches
                .map(convertToSimplifiedMatch)
                .sort((m1, m2) => (m1.dateNumber < m2.dateNumber ? -1 : 1)) ||
              []
            }
            handleClickSeeMatch={handleClickSeeMatch}
            isLoadingMatch={matchLoading}
            selectedMatch={
              [
                currentMatchSelected.current?.homeTeam,
                currentMatchSelected.current?.awayTeam,
              ].join("") || ""
            }
          />
        }
      </Box>
      <InfoMatchModal
        match={match || null}
        openMatchModal={openMatchModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  ));
};

export default FixtureCopaPage;
