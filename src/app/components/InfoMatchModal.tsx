import { Close, CalendarMonth, AccessTime } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  Box,
  DialogContent,
  Divider,
} from "@mui/material";
import React from "react";
import { abbreviateTeamName } from "../utils/stringUtils";
import { Incidencia, IncidenciaByTeam } from "./InferenciaByTeam";
import Image from "next/image";
import { Match, MatchStatus } from "../models/Match";

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
    handleCloseModal();
    return <></>;
  }

  const golesLocal: Incidencia[] = match.homeTeamPlayerGoals.map(
    (goleador) => ({
      type: "gol",
      player_name: goleador.name + " " + goleador.lastName,
      team: "home",
    })
  );

  const golesVisitante: Incidencia[] = match.awayTeamPlayerGoals.map(
    (goleador) => ({
      type: "gol",
      player_name: goleador.name + " " + goleador.lastName,
      team: "away",
    })
  );

  const amarillasLocal: Incidencia[] = match.homeTeamYellowCards.map(
    (amarilla) => ({
      type: "amarilla",
      player_name: amarilla.name + " " + amarilla.lastName,
      team: "home",
    })
  );

  const amarillasVisitante: Incidencia[] = match.awayTeamYellowCards.map(
    (amarilla) => ({
      type: "amarilla",
      player_name: amarilla.name + " " + amarilla.lastName,
      team: "away",
    })
  );

  const rojasLocal: Incidencia[] = match.homeTeamRedCards.map((roja) => ({
    type: "expulsion",
    player_name: roja.name + " " + roja.lastName,
    team: "home",
  }));

  const rojasVisitante: Incidencia[] = match.awayTeamRedCards.map((roja) => ({
    type: "expulsion",
    player_name: roja.name + " " + roja.lastName,
    team: "away",
  }));

  const incidenciasLocal = [...golesLocal, ...amarillasLocal, ...rojasLocal];

  const incidenciasVisitante = [
    ...golesVisitante,
    ...amarillasVisitante,
    ...rojasVisitante,
  ];

  return (
    <Dialog
      open={openMatchModal}
      onClose={handleCloseModal}
      maxWidth="lg"
      PaperProps={{
        sx: { width: { md: "50%", xs: "80%" }, maxWidth: "100%" },
      }}
    >
      <DialogTitle className="flex justify-between items-center text-white bg-[#A60000]">
        <p className="text-2xl">Detalles del Partido</p>
        <Close onClick={handleCloseModal} className="cursor-pointer" />
      </DialogTitle>
      <DialogTitle className="flex items-center justify-center gap-10 bg-slate-200">
        <Box className="flex gap-2 items-center">
          <CalendarMonth />
          <p>
            {match.date ? match.date.format("DDD dd MMM YYYY") : "A definir"}
          </p>
        </Box>
        <Box className="flex gap-2 items-center">
          <AccessTime />
          <p>{match.date ? match.date.format("HH:mm") : "A definir"}</p>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box className="flex items-center justify-between mt-5">
          <Box
            className="flex items-center gap-2 h-20 flex-shrink-0  overflow-hidden justify-end"
            sx={{ width: "40%" }}
          >
            <p className="max-[600px]:hidden flex line-clamp-2 text-center text-ellipsis font-extrabold">
              {match.homeTeam.name}
            </p>
            <p className="max-[600px]:flex hidden font-extrabold">
              {abbreviateTeamName(match.homeTeam.name || "")}
            </p>
            <Image
              src={match.homeTeam.logo}
              height={60}
              width={60}
              alt={match.homeTeam.name}
            />
          </Box>

          <Box className="flex-grow-0 flex-shrink-0 mx-auto ">
            {match.status === MatchStatus.PLAYED ? (
              <div className="w-24 bg-[#A60000] px-2 py-1 rounded-md items-center flex justify-center">
                <p className="text-white font-bold text-2xl">{`${match.homeTeamGoals} - ${match.awayTeamGoals}`}</p>
              </div>
            ) : (
              <div className="w-24 bg-gray-500 px-2 py-1 rounded-md items-center flex justify-center">
                <p className="text-white font-bold">
                  {match.date ? match.date.format("HH:mm") : "A definir"}
                </p>
              </div>
            )}
          </Box>

          <Box
            className="flex items-center gap-2 h-20 flex-shrink-0 overflow-hidden justify-start"
            sx={{ width: "40%" }}
          >
            <Image
              src={match.awayTeam.logo}
              height={60}
              width={60}
              alt={match.awayTeam.name}
            />
            <p className="max-[600px]:hidden flex line-clamp-2 text-center text-ellipsis font-extrabold">
              {match.awayTeam.name}
            </p>
            <p className="max-[600px]:flex hidden font-extrabold">
              {abbreviateTeamName(match.awayTeam.name || "")}
            </p>
          </Box>
        </Box>
        <Divider
          className="text-[#A60000] py-2"
          sx={{
            "&::before, &::after": {
              borderColor: "#A60000",
            },
          }}
        />
        {
          <Box className="flex justify-center items-start gap-24 pt-2">
            <Box className=" w-full">
              {incidenciasLocal.map((detail, index) => (
                <IncidenciaByTeam key={index} incidencia={detail} />
              ))}
            </Box>
            <Divider
              orientation="vertical"
              className="text-[#A60000] "
              sx={{
                "&::before, &::after": {
                  borderColor: "#A60000",
                },
              }}
            />
            <Box className=" w-full">
              {incidenciasVisitante.map((detail, index) => (
                <IncidenciaByTeam key={index} incidencia={detail} />
              ))}
            </Box>
          </Box>
        }
      </DialogContent>
      <DialogTitle className="flex justify-between items-center text-white bg-[#A60000]">
        <Box className="flex flex-col items-center justify-center gap-2 w-full bg-[#A60000] rounded-sm p-2 text-white">
          <Box className="flex items-center  w-full">
            <p className="font-extrabold text-xl w-4/12">Cancha:</p>
            <p>{match.field || "A definir"}</p>
          </Box>

          <Box className="flex items-center  w-full">
            <p className="font-extrabold text-xl w-4/12 ">Equipo Planillero:</p>
            {match.scorer ? (
              <Box className="flex gap-2 items-center justify-between">
                <Image
                  src={match.scorer.logo}
                  height={40}
                  width={40}
                  alt={match.scorer.name || ""}
                />
                <p>{match.scorer.name || ""}</p>
              </Box>
            ) : (
              <p>A definir</p>
            )}
          </Box>
          <Box className="flex items-center  w-full">
            <p className="font-extrabold text-xl w-4/12 ">Equipo Linea:</p>
            {match.linemenTeam ? (
              <Box className="flex gap-2 items-center justify-between">
                <Image
                  src={match.linemenTeam.logo}
                  height={40}
                  width={40}
                  alt={match.linemenTeam.name}
                />
                <p>{match.linemenTeam.name}</p>
              </Box>
            ) : (
              <p>A definir</p>
            )}
          </Box>
        </Box>
      </DialogTitle>
    </Dialog>
  );
};

export default InfoMatchModal;
