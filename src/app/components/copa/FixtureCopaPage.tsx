"use client";

import {
  useGetAllPositionsByFaseQuery,
  useGetAllGroupMatchesByFaseQuery,
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
import React, { useRef, useState, useMemo } from "react";
import { PartidosAgrupados } from "../fixture/PartidosAgrupados";
import LoadingScreen from "../loading/Loading";
import InfoMatchModal from "../InfoMatchModal";
import { SimplifiedMatch, convertToSimplifiedMatch } from "@/app/models/Match";
import ErrorPage from "../ErrorPage";

interface FixtureCopaPageProps {
  faseId: string;
  fromCategoria?: boolean;
  extraFechas?: number;
}

const calcularFechas = (equiposCount: number): number => {
  return Math.max(1, equiposCount - 1);
};

const FixtureCopaPage: React.FC<FixtureCopaPageProps> = ({
  faseId,
  fromCategoria = false,
  extraFechas = 0,
}) => {
  const currentMatchSelected = useRef<any | undefined>();
  const [selectedFecha, setSelectedFecha] = useState<number>(1);

  const {
    data: matchesData,
    isLoading: isLoadingMatches,
    isError: isErrorMatches,
  } = useGetAllGroupMatchesByFaseQuery({
    faseId: faseId,
    dateNumber: selectedFecha,
  });

  const {
    data: faseData,
    isLoading: isLoadingFase,
    isError: isErrorFase,
    refetch: refetchPosiciones,
  } = useGetAllPositionsByFaseQuery({
    faseId: faseId,
  });

  const { data: match, isLoading: matchLoading } = useOnePartidoCopaQuery(
    currentMatchSelected.current?.homeTeam,
    currentMatchSelected.current?.awayTeam,
    currentMatchSelected.current?.phaseId || "",
    !!currentMatchSelected.current
  );

  const fechasDisponibles = useMemo(() => {
    if (!faseData || faseData.length === 0) return [1];

    const primerGrupo = faseData[0];
    const cantidadEquipos = primerGrupo.positions?.length || 0;

    const numFechas = calcularFechas(cantidadEquipos) + extraFechas;

    return Array.from({ length: numFechas }, (_, index) => index + 1);
  }, [faseData, extraFechas]);

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

  if (isLoadingFase || isLoadingMatches) return <LoadingScreen />;
  if (isErrorFase || isErrorMatches) return <ErrorPage />;

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
            {fechasDisponibles.map((date, index) => (
              <MenuItem key={index} value={`${date}`}>
                {`Fecha ${date}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {faseData?.map((grupo, index) => (
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
                matchesData
                  ?.find((g: any) => g.name === grupo.name)
                  ?.matches.map(convertToSimplifiedMatch)
                  .sort((m1: any, m2: any) =>
                    m1.dateNumber < m2.dateNumber ? -1 : 1
                  ) || []
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
