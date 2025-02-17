"use client";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import { useRef, useState } from "react";
import { PartidosAgrupados } from "./fixture/PartidosAgrupados";
import {
  useAllMatchesByFaseQuery,
  useOnePartidoQuery,
} from "@/repositories/CategoriaRepository";
import InfoMatchModal from "./InfoMatchModal";
import LoadingScreen from "./loading/Loading";
import { SimplifiedMatch } from "../models/Match";

interface FixturePageProps {
  faseId: string;
}

export const FixturePage: React.FC<FixturePageProps> = ({ faseId }) => {
  const [selectedFecha, setSelectedFecha] = useState<number>(1);
  const currentMatchSelected = useRef<any | undefined>();

  const { data: matchesFechaActual, isLoading } = useAllMatchesByFaseQuery(
    faseId,
    selectedFecha
  );

  const { data: match, isLoading: isLoadingMatch } = useOnePartidoQuery(
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

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedFecha(Number(event.target.value));
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="flex flex-col h-full w-full gap-5 ">
        <FormControl
          fullWidth
          className="flex flex-col gap-4 max-sm:items-center w-full "
        >
          <Typography variant="h5" fontWeight={"bold"}>
            Fecha
          </Typography>
          <Select
            value={selectedFecha.toString()}
            onChange={handleChange}
            className="w-56 max-sm:w-full"
          >
            {Array.from({ length: 15 }, (_, index) => index + 1).map(
              (item, index) => (
                <MenuItem
                  key={index}
                  value={`${item}`}
                >{`Fecha ${item}`}</MenuItem>
              )
            )}
          </Select>
        </FormControl>
        <PartidosAgrupados
          matches={matchesFechaActual || []}
          handleClickSeeMatch={handleClickSeeMatch}
          isLoadingMatch={isLoadingMatch}
          selectedMatch={
            [
              currentMatchSelected.current?.homeTeam,
              currentMatchSelected.current?.awayTeam,
            ].join("") || ""
          }
        />
      </div>
      <InfoMatchModal
        match={match || null}
        openMatchModal={openMatchModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};
