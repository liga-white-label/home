"use client";

import { useRef, useState } from "react";
import { PartidosAgrupados } from "../fixture/PartidosAgrupados";
import {
  useAllMatchesByFaseQuery,
  useCurrentDateQuery,
  useDatesCountQuery,
  useOnePartidoQuery,
} from "@/repositories/CategoriaRepository";
import InfoMatchModal from "../InfoMatchModal";
import LoadingScreen from "../loading/Loading";
import { SimplifiedMatch } from "../../models/Match";

interface FixturePageProps {
  faseId: string;
}

export const FixturePage: React.FC<FixturePageProps> = ({ faseId }) => {
  const { data: currentDate, isLoading: isLoadingCurrentDate } =
    useCurrentDateQuery(faseId);
  const { data: datesCount, isLoading: isLoadingDatesCount } =
    useDatesCountQuery(faseId);

  if (isLoadingCurrentDate || isLoadingDatesCount) {
    return <LoadingScreen />;
  }

  return (
    <FixtureContent
      key={faseId}
      faseId={faseId}
      initialFecha={currentDate || 1}
      totalFechas={datesCount || currentDate || 1}
    />
  );
};

interface FixtureContentProps {
  faseId: string;
  initialFecha: number;
  totalFechas: number;
}

const FixtureContent: React.FC<FixtureContentProps> = ({
  faseId,
  initialFecha,
  totalFechas,
}) => {
  const [selectedFecha, setSelectedFecha] = useState<number>(initialFecha);
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

  if (isLoading) {
    return <LoadingScreen />;
  }

  const fechas = Array.from({ length: totalFechas }, (_, i) => i + 1);

  const fechaButtonStyle = (item: number) => ({
    backgroundColor: selectedFecha === item ? "var(--color-primary)" : "var(--color-surface)",
    color: selectedFecha === item ? "white" : "var(--color-text-secondary)",
    border: "1px solid",
    borderColor: selectedFecha === item ? "var(--color-primary)" : "var(--color-border)",
  });

  return (
    <>
      <div className="flex flex-col h-full w-full gap-5">
        {/* Fecha selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
            Fecha
          </label>
          <div className="flex gap-2 items-center overflow-x-auto pb-1 -mx-1 px-1">
            {fechas.map((item) => (
              <button
                key={item}
                onClick={() => setSelectedFecha(item)}
                className="px-3 py-1.5 rounded text-sm font-medium transition-colors flex-shrink-0"
                style={fechaButtonStyle(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

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
