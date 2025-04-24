"use client";

import {
  useOneFaseCampeonatoQuery,
  useOnePartidoCopaQuery,
} from "@/repositories/CampeonatoRepository";
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import Box from "@mui/material/Box";
import React, { useRef, useState } from "react";
import { PartidosAgrupados } from "../fixture/PartidosAgrupados";
import LoadingScreen from "../loading/Loading";
import InfoMatchModal from "../InfoMatchModal";
import { SimplifiedMatch, convertToSimplifiedMatch } from "@/app/models/Match";
import ErrorPage from "../ErrorPage";

interface FixtureCopaPageProps {
  faseId: string;
  fromCategoria?: boolean;
}

const FixtureCopaPage: React.FC<FixtureCopaPageProps> = ({
  faseId,
  fromCategoria = false,
}) => {
  const currentMatchSelected = useRef<any | undefined>();
  const [selectedFecha, setSelectedFecha] = useState<number | null>(1);

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

  const handleChangeFecha = (event: SelectChangeEvent) => {
    setSelectedFecha(Number(event.target.value));
  };

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorPage />;

  // Obtener todas las fechas disponibles del conjunto de datos
  const allDates =
    data?.flatMap((grupo) => grupo.matches.map((match) => match.dateNumber)) ||
    [];

  // Eliminar duplicados y ordenar
  const uniqueDates = Array.from(new Set(allDates)).sort((a, b) => a - b);

  const filteredData = data?.map((grupo) => ({
    ...grupo,
    matches:
      selectedFecha !== null
        ? grupo.matches.filter((match) => match.dateNumber === selectedFecha)
        : grupo.matches,
  }));

  return (
    <>
      <Box className="flex flex-col h-full w-full gap-5 mb-4">
        <FormControl
          fullWidth
          className="flex flex-col gap-4 max-sm:items-center w-full"
        >
          <Typography variant="h5" fontWeight="bold">
            Fecha
          </Typography>
          <Select
            value={selectedFecha?.toString()}
            onChange={handleChangeFecha}
            className="w-56 max-sm:w-full"
          >
            {uniqueDates.map((date, index) => (
              <MenuItem key={index} value={`${date}`}>
                {`Fecha ${date}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {filteredData?.map((grupo, index) => (
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
              {`${fromCategoria ? "" : "Grupo"} ${grupo.name}`}
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
          <InfoMatchModal
            match={match || null}
            openMatchModal={openMatchModal}
            handleCloseModal={handleCloseModal}
          />
        </Box>
      ))}
    </>
  );
};

export default FixtureCopaPage;
