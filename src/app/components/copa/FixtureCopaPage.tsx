"use client";

import {
  useGetAllPositionsByFaseQuery,
  useGetAllGroupMatchesByFaseQuery,
} from "@/repositories/CampeonatoRepository";
import { useCurrentDateGroupQuery } from "@/repositories/CategoriaRepository";
import Box from "@mui/material/Box";
import React, { useState, useMemo, useEffect } from "react";
import { PartidosAgrupados } from "../fixture/PartidosAgrupados";
import LoadingScreen from "../loading/Loading";
import InfoMatchModal from "../InfoMatchModal";
import { Match, SimplifiedMatch, convertToSimplifiedMatch } from "@/app/models/Match";
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
  const { data: currentDate, isLoading: isLoadingCurrentDate } =
    useCurrentDateGroupQuery(faseId);

  const [selectedFecha, setSelectedFecha] = useState<number>(currentDate || 1);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  useEffect(() => {
    if (currentDate && !isLoadingCurrentDate) {
      setSelectedFecha(currentDate);
    }
  }, [currentDate, isLoadingCurrentDate]);
  const [openMatchModal, setOpenMatchModal] = useState<boolean>(false);

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
  } = useGetAllPositionsByFaseQuery({
    faseId: faseId,
  });

  const fechasDisponibles = useMemo(() => {
    if (!faseData || faseData.length === 0) return [1];

    const primerGrupo = faseData[0];
    const cantidadEquipos = primerGrupo.positions?.length || 0;

    const numFechas = calcularFechas(cantidadEquipos) + extraFechas;

    return Array.from({ length: numFechas }, (_, index) => index + 1);
  }, [faseData, extraFechas]);

  const handleClickSeeMatch = (match: SimplifiedMatch) => {
    setSelectedMatch(match.matchDetail || null);
    setOpenMatchModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMatch(null);
    setOpenMatchModal(false);
  };

  if (isLoadingCurrentDate || isLoadingFase || isLoadingMatches) return <LoadingScreen />;
  if (isErrorFase || isErrorMatches) return <ErrorPage />;

  return (
    <>
      <div className="flex flex-col gap-2 mb-5">
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Fecha
        </label>
        <div className="flex gap-2 flex-wrap">
          {fechasDisponibles.map((date) => (
            <button
              key={date}
              onClick={() => setSelectedFecha(date)}
              className="px-3 py-1.5 rounded text-sm font-medium transition-colors"
              style={{
                backgroundColor: selectedFecha === date ? "var(--color-primary)" : "#1a1a1a",
                color: selectedFecha === date ? "white" : "#9ca3af",
                border: "1px solid",
                borderColor: selectedFecha === date ? "var(--color-primary)" : "#2a2a2a",
              }}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      {faseData?.map((grupo: any, index: number) => (
        <Box key={index}>
          <div
            style={{
              display: "flex",
              width: "100%",
              padding: "0.5rem 1rem",
              backgroundColor: "#1a1a1a",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1px",
            }}
          >
            <span style={{ color: "white", fontWeight: "bold", fontSize: "1rem" }}>
              {`${fromCategoria ? "" : "Grupo"} ${grupo.name}`}
            </span>
          </div>
          {
            <PartidosAgrupados
              matches={
                (matchesData as any[])
                  ?.find((g: any) => g.name === grupo.name)
                  ?.matches.map(convertToSimplifiedMatch)
                  .sort((m1: any, m2: any) =>
                    m1.dateNumber < m2.dateNumber ? -1 : 1
                  ) || []
              }
              handleClickSeeMatch={handleClickSeeMatch}
              isLoadingMatch={false}
              selectedMatch=""
            />
          }
          <InfoMatchModal
            match={selectedMatch}
            openMatchModal={openMatchModal}
            handleCloseModal={handleCloseModal}
          />
        </Box>
      ))}
    </>
  );
};

export default FixtureCopaPage;
