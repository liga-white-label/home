import { useState } from "react";
import LoadingScreen from "../loading/Loading";
import {
  Box,
  Typography,
} from "@mui/material";
import { convertToSimplifiedMatch, Match, SimplifiedMatch } from "@/app/models/Match";
import { PartidosAgrupados } from "../fixture/PartidosAgrupados";
import InfoMatchModal from "../InfoMatchModal";
import { useOneFaseCampeonatoQuery } from "@/repositories/CampeonatoRepository";
import { TablaPosiciones } from "../TablaPosiciones";

interface CuadrangularDescensoPageProps {
  faseId: string;
}

const CuadrangularDescensoPage: React.FC<CuadrangularDescensoPageProps> = ({
  faseId,
}) => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [openMatchModal, setOpenMatchModal] = useState<boolean>(false);

  const { data, isLoading, isError } = useOneFaseCampeonatoQuery({
    id: faseId,
  });

  const handleClickSeeMatch = (match: SimplifiedMatch) => {
    setSelectedMatch(match.matchDetail || null);
    setOpenMatchModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMatch(null);
    setOpenMatchModal(false);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return data?.map((grupo: any, index: number) => (
    <>
      <Box key={index}>
        <Box className="flex w-full py-2 bg-gray-200 items-center justify-center">
          <Typography
            variant="h6"
            fontWeight={"bold"}
          >{`Grupo ${grupo.name}`}</Typography>
        </Box>
        <TablaPosiciones data={grupo.positions} />
        {
          <PartidosAgrupados
            matches={
              grupo.matches
                .map(convertToSimplifiedMatch)
                .sort((m1: any, m2: any) => (m1.dateNumber < m2.dateNumber ? -1 : 1)) ||
              []
            }
            handleClickSeeMatch={handleClickSeeMatch}
            isLoadingMatch={false}
            selectedMatch=""
          />
        }
      </Box>
      <InfoMatchModal
        match={selectedMatch}
        openMatchModal={openMatchModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  ));
};

export default CuadrangularDescensoPage;
