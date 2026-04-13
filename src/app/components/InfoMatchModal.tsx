import { Close, CalendarMonth, AccessTime } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  Box,
  DialogContent,
  Divider,
  capitalize,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { abbreviateTeamName } from "../utils/stringUtils";
import { Incidencia, IncidenciaByTeam } from "./InferenciaByTeam";
import Image from "next/image";
import { Match, MatchStatus } from "../models/Match";
import moment from "moment";
import "moment/locale/es";
import { getGeneroLabel } from "../models/Jugador";

interface InfoMatchModalProps {
  openMatchModal: boolean;
  handleCloseModal: () => void;
  match: Match | null;
}

const InfoMatchModal: React.FC<InfoMatchModalProps> = ({
  openMatchModal,
  handleCloseModal,
  match,
}) => {
  if (match === null) {
    return <></>;
  }
  moment.locale("es");

  const golesLocal: Incidencia[] = match.homeTeamPlayerGoals.map(
    (goleador) => ({
      type: "gol",
      playerFullName: goleador.fullName,
      team: "home",
    })
  );

  const golesVisitante: Incidencia[] = match.awayTeamPlayerGoals.map(
    (goleador) => ({
      type: "gol",
      playerFullName: goleador.fullName,
      team: "away",
    })
  );

  const amarillasLocal: Incidencia[] = match.homeTeamYellowCards.map(
    (amarilla) => ({
      type: "amarilla",
      playerFullName: amarilla.fullName,
      team: "home",
    })
  );

  const amarillasVisitante: Incidencia[] = match.awayTeamYellowCards.map(
    (amarilla) => ({
      type: "amarilla",
      playerFullName: amarilla.fullName,
      team: "away",
    })
  );

  const rojasLocal: Incidencia[] = match.homeTeamRedCards.map((roja) => ({
    type: "expulsion",
    playerFullName: roja.fullName,
    team: "home",
  }));

  const rojasVisitante: Incidencia[] = match.awayTeamRedCards.map((roja) => ({
    type: "expulsion",
    playerFullName: roja.fullName,
    team: "away",
  }));

  const incidenciasLocal = [...golesLocal, ...amarillasLocal, ...rojasLocal];

  const incidenciasVisitante = [
    ...golesVisitante,
    ...amarillasVisitante,
    ...rojasVisitante,
  ];

  const canchaLabel = match.field || "A definir";

  const getPlanilleroLabel = () => {
    if (match.status === MatchStatus.JUGADO && !match.scorer) {
      return <p className="text-sm md:text-base">Subcomisión</p>;
    }

    if (match.scorer) {
      return (
        <Box className="flex gap-2 items-center justify-between">
          <Image
            src={match.scorer.logoUrl}
            height={30}
            width={30}
            alt={match.scorer.name || ""}
          />
          <p className="text-xs md:text-sm">
            {match.scorer.name +
              " (" +
              getGeneroLabel(match.scorer.gender) +
              ")"}
          </p>
        </Box>
      );
    } else {
      return <p className="text-sm md:text-base">A definir</p>;
    }
  };

  const getLineaLabel = () => {
    if (match.status === MatchStatus.JUGADO && !match.scorer) {
      return <p className="text-sm md:text-base">Subcomisión</p>;
    }

    if (match.linemenTeam) {
      return (
        <Box className="flex gap-2 items-center justify-between">
          <Image
            src={match.linemenTeam.logoUrl}
            height={40}
            width={40}
            alt={match.linemenTeam.name}
          />
          <p className="text-xs md:text-sm">
            {match.linemenTeam.name +
              " (" +
              getGeneroLabel(match.linemenTeam.gender) +
              ")"}
          </p>
        </Box>
      );
    } else {
      return <p className="text-sm md:text-base">A definir</p>;
    }
  };
  return (
    <Dialog
      open={openMatchModal}
      onClose={handleCloseModal}
      maxWidth="lg"
      PaperProps={{
        sx: { width: { md: "50%", xs: "80%" }, maxWidth: "100%" },
      }}
    >
      <DialogTitle className="flex justify-between items-center text-white" style={{ backgroundColor: "var(--color-primary)" }}>
        <p className="text-xl md:text-2xl">
          Detalles del Partido{" "}
          <span className="text-xs md:text-sm">
            {match.status === MatchStatus.JUGADO
              ? "(Resultado sujeto a modificaciones)"
              : ""}
          </span>
        </p>
        <Close onClick={handleCloseModal} className="cursor-pointer" />
      </DialogTitle>
      <DialogTitle className="flex items-center justify-center gap-10 bg-slate-200">
        <Box className="flex gap-2 items-center">
          <CalendarMonth className="text-sm md:text-base" />
          <p className="sm:flex hidden text-sm md:text-base">
            {match.date
              ? capitalize(match.date.format("dddd")) +
                " " +
                match.date.format("LL")
              : "A definir"}
          </p>
          <p className="sm:hidden flex text-xs">
            {match.date ? match.date.format("DD/MM/YYYY") : "A definir"}
          </p>
        </Box>
        <Box className="flex gap-2 items-center">
          <AccessTime className="text-sm md:text-base" />
          <p className="text-sm md:text-base">
            {match.date ? match.date.format("HH:mm ") : "A definir"}
          </p>
        </Box>
      </DialogTitle>
      <DialogContent className="w-full">
        <Box className="flex items-center justify-between mt-5">
          <Box
            className="flex flex-col items-center gap-2 h-20 flex-shrink-0 overflow-hidden"
            sx={{ width: "40%" }}
          >
            <p className="line-clamp-2 text-center text-ellipsis font-extrabold text-xs md:text-base">
              {match.homeTeam?.name || ""}
            </p>
            <Box className="flex items-center justify-center overflow-hidden">
              <Image
                src={match.homeTeam?.logoUrl || ""}
                height={50}
                width={50}
                alt={match.homeTeam?.name || ""}
                className="object-contain rounded-full"
              />
            </Box>
          </Box>

          <Box className="flex-grow-0 flex-shrink-0 mx-auto ">
            {match.status === MatchStatus.JUGADO ? (
              <div className="w-18 px-2 py-1 rounded-md items-center flex justify-center" style={{ backgroundColor: "var(--color-primary)" }}>
                <p className="text-white font-bold text-xl md:text-2xl">{`${match.homeTeamGoals} - ${match.awayTeamGoals}`}</p>
              </div>
            ) : (
              <div className="w-10 bg-gray-500 px-2 py-1 rounded-md items-center flex justify-center">
                <p className="text-white font-bold text-sm md:text-base">
                  {"-"}
                </p>
              </div>
            )}
          </Box>

          <Box
            className="flex flex-col items-center gap-2 h-20 flex-shrink-0 overflow-hidden"
            sx={{ width: "40%" }}
          >
            <p className="line-clamp-2 text-center text-ellipsis font-extrabold text-xs md:text-base">
              {match.awayTeam?.name || ""}
            </p>
            <Box className="flex items-center justify-center overflow-hidden ">
              <Image
                src={match.awayTeam?.logoUrl || ""}
                height={50}
                width={50}
                alt={match.awayTeam?.name || ""}
                className="object-contain rounded-full"
              />
            </Box>
          </Box>
        </Box>
        <Divider
          className="py-2"
          sx={{
            color: "var(--color-primary)",
            "&::before, &::after": {
              borderColor: "var(--color-primary)",
            },
          }}
        />
        <Box className="flex justify-center items-start gap-2 pt-2 w-full ">
          <Box className="pl-2 w-full">
            {incidenciasLocal.map((detail, index) => (
              <IncidenciaByTeam key={index} incidencia={detail} />
            ))}
          </Box>
          <Divider
            orientation="vertical"
            sx={{
              color: "var(--color-primary)",
              "&::before, &::after": {
                borderColor: "var(--color-primary)",
              },
            }}
          />
          <Box className="pr-2 w-full">
            {incidenciasVisitante.map((detail, index) => (
              <IncidenciaByTeam key={index} incidencia={detail} />
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogTitle className="flex justify-between items-center text-white" style={{ backgroundColor: "var(--color-primary)" }}>
        <Box className="flex flex-col items-center justify-center gap-2 w-full rounded-sm p-2 text-white" style={{ backgroundColor: "var(--color-primary)" }}>
          <Box className="flex items-center justify-between w-full">
            <p className="font-extrabold text-sm md:text-md">Cancha:</p>
            <p className="text-sm md:text-base">{canchaLabel}</p>
          </Box>

          <Box className="flex items-center justify-between w-full">
            <p className="font-extrabold text-sm md:text-md">Planillero:</p>
            {getPlanilleroLabel()}
          </Box>
          <Box className="flex items-center justify-between w-full">
            <p className="font-extrabold text-sm md:text-md">Linea:</p>
            {getLineaLabel()}
          </Box>
          <Box
            sx={{ display: match.comments ? "flex" : "none" }}
            className="flex-col items-center justify-between w-full gap-2"
          >
            <p className="font-extrabold text-sm md:text-md">Comentarios:</p>
            <p className="text-xs md:text-base">{match.comments || ""}</p>
          </Box>
        </Box>
      </DialogTitle>
    </Dialog>
  );
};

export default InfoMatchModal;
