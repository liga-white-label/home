import { useState } from "react";

import {
  useAllMatchesByFaseQuery,
  useOnePartidoDescensoQuery,
  useOnePartidoQuery,
} from "@/repositories/CategoriaRepository";
import { useRef } from "react";
import LoadingScreen from "../loading/Loading";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { convertToSimplifiedMatch, SimplifiedMatch } from "@/app/models/Match";
import { PartidosAgrupados } from "../fixture/PartidosAgrupados";
import InfoMatchModal from "../InfoMatchModal";
import { useOneFaseCampeonatoQuery } from "@/repositories/CampeonatoRepository";
import { useOnePartidoCopaQuery } from "@/repositories/CampeonatoRepository";
import { TablaPosiciones } from "../TablaPosiciones";

interface CuadrangularDescensoPageProps {
  faseId: string;
}

const CuadrangularDescensoPage: React.FC<CuadrangularDescensoPageProps> = ({
  faseId,
}) => {
  const currentMatchSelected = useRef<any | undefined>();

  const { data, isLoading, isError } = useOneFaseCampeonatoQuery(faseId);

  const { data: match, isLoading: matchLoading } = useOnePartidoDescensoQuery(
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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return data?.map((grupo, index) => (
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

export default CuadrangularDescensoPage;
