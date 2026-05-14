import {
  useOneFasePlayoffCopaQuery,
} from "@/repositories/CampeonatoRepository";
import { TableBody, Table, Box, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import InfoMatchModal from "../InfoMatchModal";
import { PartidoRow } from "../fixture/PartidoRow";
import { RoundMatch } from "@/app/models/FaseCampeonato";
import {
  SimplifiedMatch,
  Match,
  convertToSimplifiedMatch,
} from "@/app/models/Match";
import { useOneFasePlayoffQuery } from "@/repositories/CategoriaRepository";

interface PlayoffRoundsFixtureProps {
  cruce: RoundMatch;
  index: number;
  idFase: string;
  isLeague: boolean;
}

const PlayoffRoundsFixture: React.FC<PlayoffRoundsFixtureProps> = ({
  cruce,
  index,
  idFase,
  isLeague,
}) => {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("sm"));

  const { data: faseCopa } = useOneFasePlayoffCopaQuery({
    id: idFase || "",
    enabled: !isLeague,
  });

  const { data: faseLeague } = useOneFasePlayoffQuery({
    id: idFase || "",
    enabled: isLeague,
  });

  const fase = isLeague ? faseLeague : faseCopa;

  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [openMatchModal, setOpenMatchModal] = useState<boolean>(false);

  const isDoubleMatch = fase?.[0]?.doubleMatch || false;

  const handleClickSeeMatch = (match: SimplifiedMatch) => {
    setSelectedMatch(match.matchDetail || null);
    setOpenMatchModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMatch(null);
    setOpenMatchModal(false);
  };

  const partidoIda = convertToSimplifiedMatch(cruce.homeMatch);

  const partidoVuelta = isDoubleMatch
    ? convertToSimplifiedMatch(cruce.awayMatch)
    : null;

  return (
    <>
      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "-ms-autohiding-scrollbar",
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "var(--color-primary)",
            borderRadius: "4px",
          },
        }}
      >
        <Table sx={{ minWidth: isSmallDevice ? 500 : "auto" }}>
          <TableBody>
            <PartidoRow
              match={partidoIda}
              handleClickSeeMatch={handleClickSeeMatch}
              isLoadingMatch={false}
              index={index}
            />
            {partidoVuelta && (
              <PartidoRow
                match={partidoVuelta}
                handleClickSeeMatch={handleClickSeeMatch}
                isLoadingMatch={false}
                index={index}
              />
            )}
          </TableBody>
        </Table>
      </Box>
      <InfoMatchModal
        match={selectedMatch}
        openMatchModal={openMatchModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default PlayoffRoundsFixture;
