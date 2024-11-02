import {
  useOneFasePlayoffCopaQuery,
  useOnePartidoCopaPlayoffQuery,
} from "@/repositories/CampeonatoRepository";
import { TableBody, Table } from "@mui/material";
import { useRef, useState } from "react";
import { RoundMatch } from "@/repositories/CategoriaRepository";
import { IndexMatch, indexMatchMapper } from "@/app/models/Match";
import InfoMatchModal from "../InfoMatchModal";
import { PartidoRow } from "../fixture/PartidoRow";

interface PlayoffRoundsFixtureProps {
  cruce: RoundMatch;
  index: number;
  idFase: string;
}

const PlayoffRoundsFixture: React.FC<PlayoffRoundsFixtureProps> = ({
  cruce,
  index,
  idFase,
}) => {
  const currentMatchSelected = useRef<any | undefined>();

  const { data: fase } = useOneFasePlayoffCopaQuery(idFase || "");
  const { data: match, isLoading: matchLoading } =
    useOnePartidoCopaPlayoffQuery(
      currentMatchSelected.current?.homeTeam,
      currentMatchSelected.current?.awayTeam,
      currentMatchSelected.current?.roundId || "",
      currentMatchSelected.current?.phaseId || "",
      !!currentMatchSelected.current
    );

  const [openMatchModal, setOpenMatchModal] = useState<boolean>(false);

  const isDoubleMatch = fase![0]?.doubleMatch || false;

  const handleClickSeeMatch = (match: IndexMatch) => {
    currentMatchSelected.current = {
      homeTeam: match.homeTeamId,
      awayTeam: match.awayTeamId,
      roundId: cruce.id,
      phaseId: idFase || "",
    };

    setOpenMatchModal(true);
  };

  const handleCloseModal = () => {
    currentMatchSelected.current = undefined;
    setOpenMatchModal(false);
  };

  const partidoIda: IndexMatch = indexMatchMapper(cruce.homeMatch);

  const partidoVuelta = isDoubleMatch
    ? indexMatchMapper(cruce.awayMatch)
    : null;

  return (
    <>
      <Table>
        <TableBody>
          <PartidoRow
            match={partidoIda}
            handleClickSeeMatch={handleClickSeeMatch}
            isLoadingMatch={
              matchLoading &&
              [
                currentMatchSelected.current.homeTeam,
                currentMatchSelected.current.awayTeam,
              ].join("") ===
                [partidoIda.homeTeamId, partidoIda.awayTeamId].join("")
            }
            index={index}
          />
          {partidoVuelta && (
            <PartidoRow
              match={partidoVuelta}
              handleClickSeeMatch={handleClickSeeMatch}
              isLoadingMatch={
                matchLoading &&
                [
                  currentMatchSelected.current.homeTeam,
                  currentMatchSelected.current.awayTeam,
                ].join("") ===
                  [partidoVuelta.homeTeamId, partidoVuelta.awayTeamId].join("")
              }
              index={index}
            />
          )}
        </TableBody>
      </Table>
      <InfoMatchModal
        match={match || null}
        openMatchModal={openMatchModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default PlayoffRoundsFixture;
