"use client";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import { useRef, useState } from "react";
import { PartidosPorDiaV2, RegularMatch } from "./PartidosPorDiaV2";
import {
  useOneFaseQuery,
  useOnePartidoQuery,
} from "@/repositories/CategoriaRepository";
import InfoMatchModal from "./InfoMatchModal";
import LoadingScreen from "./loading/Loading";

interface FixturePageProps {
  faseId: string;
}

export const FixturePage: React.FC<FixturePageProps> = ({ faseId }) => {
  const [selectedFecha, setSelectedFecha] = useState<number>(1);
  const currentMatchSelected = useRef<any | undefined>();

  const {
    data: matchesFechaActual,
    isLoading,
    isError,
  } = useOneFaseQuery(faseId, selectedFecha);

  const { data: match } = useOnePartidoQuery(
    currentMatchSelected.current?.homeTeam,
    currentMatchSelected.current?.awayTeam,
    currentMatchSelected.current?.phaseId || "",
    !!currentMatchSelected.current
  );
  const [openMatchModal, setOpenMatchModal] = useState<boolean>(false);

  const handleClickSeeMatch = (match: RegularMatch) => {
    currentMatchSelected.current = {
      homeTeam: match.equipoLocal.id,
      awayTeam: match.equipoVisitante.id,
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
        <PartidosPorDiaV2
          matches={matchesFechaActual || []}
          handleClickSeeMatch={handleClickSeeMatch}
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
