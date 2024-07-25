"use client";
import { PartidosPorDia } from "./PartidosPorDia";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { Match } from "../models/Match";
import Image from "next/image";
import { abbreviateTeamName } from "../utils/stringUtils";
import { AccessTime, CalendarMonth, Close, X } from "@mui/icons-material";
import { useWidth } from "../utils/useResponsive";
import { IncidenciaByTeam } from "./InferenciaByTeam";
import { PartidosPorDiaV2 } from "./PartidosPorDiaV2";

interface FixturePageProps {
  matches: Match[];
}

export const FixturePage: React.FC<FixturePageProps> = ({ matches }) => {
  const [selectedFecha, setSelectedFecha] = useState<string>("1");
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [openMatchModal, setOpenMatchModal] = useState<boolean>(false);
  const viewport = useWidth();

  const handleClickSeeMatch = (match: Match) => {
    setCurrentMatch(match);
    setOpenMatchModal(true);
  };

  const handleCloseModal = () => {
    setOpenMatchModal(false);
    setCurrentMatch(null);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedFecha(event.target.value as string);
  };

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
            value={selectedFecha}
            onChange={handleChange}
            className="w-56 max-sm:w-full"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => (
              <MenuItem value={`${item}`}>{`Fecha ${item}`}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="max-w-full overflow-x-hidden flex flex-col gap-5 justify-center">
          <p className="font-bold max-sm:text-center">Sabado 13 de Julio</p>
          <PartidosPorDiaV2
            matches={matches.filter((_, index) => index < 4)}
            handleClickSeeMatch={handleClickSeeMatch}
          />
          <p className="font-bold max-sm:text-center">Domingo 14 de Julio</p>
          <PartidosPorDiaV2
            matches={matches.filter((_, index) => index >= 4)}
            handleClickSeeMatch={handleClickSeeMatch}
          />
        </div>
      </div>
      <Dialog open={openMatchModal} onClose={handleCloseModal} maxWidth="lg">
        {!!currentMatch && (
          <>
            <DialogTitle className="flex justify-between items-center text-white bg-[#A60000]">
              <p className="text-2xl">Detalles del Partido</p>
              <Close onClick={handleCloseModal} className="cursor-pointer" />
            </DialogTitle>
            <DialogTitle className="flex items-center justify-center gap-10 bg-slate-200">
              <Box className="flex gap-2 items-center">
                <CalendarMonth />
                <p>Dom 14 Jul 2024</p>
              </Box>
              <Box className="flex gap-2 items-center">
                <AccessTime />
                <p>{currentMatch.time}</p>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box className="flex items-center justify-between mt-5">
                <Box className="flex items-center gap-5 h-20 pr-10">
                  <p className="max-[600px]:hidden flex line-clamp-1 text-ellipsis whitespace-nowrap font-extrabold">
                    {currentMatch.team1.name}
                  </p>
                  <p className="max-[600px]:flex hidden font-extrabold">
                    {abbreviateTeamName(currentMatch.team1.name)}
                  </p>
                  <Image
                    src={currentMatch.team1.logoUrl}
                    height={80}
                    width={80}
                    alt={currentMatch.team1.name}
                  />
                </Box>

                <Box>
                  {currentMatch.score1 !== undefined ||
                  currentMatch.score2 !== undefined ? (
                    <div className="w-24 bg-[#A60000] px-2 py-1 rounded-md items-center flex justify-center">
                      <p className="text-white font-bold text-2xl">{`${currentMatch.score1} - ${currentMatch.score2}`}</p>
                    </div>
                  ) : (
                    <div className="w-24 bg-gray-500 px-2 py-1 rounded-md items-center flex justify-center">
                      <p className="text-white font-bold">
                        {currentMatch.time}
                      </p>
                    </div>
                  )}
                </Box>

                <Box className="flex items-center gap-5 h-20 pl-10">
                  <Image
                    src={currentMatch.team2.logoUrl}
                    height={80}
                    width={80}
                    alt={currentMatch.team2.name}
                  />
                  <p className="max-[600px]:hidden flex line-clamp-1 text-ellipsis whitespace-nowrap font-extrabold">
                    {currentMatch.team2.name}
                  </p>
                  <p className="max-[600px]:flex hidden font-extrabold">
                    {abbreviateTeamName(currentMatch.team2.name)}
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
              {currentMatch.details && (
                <Box className="flex justify-center items-start gap-24 pt-2">
                  <Box className=" w-full">
                    {currentMatch.details
                      ?.filter((d) => d.team === "team1")
                      .map((detail) => (
                        <IncidenciaByTeam incidencia={detail} />
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
                    {currentMatch.details
                      ?.filter((d) => d.team === "team2")
                      .map((detail) => (
                        <IncidenciaByTeam incidencia={detail} />
                      ))}
                  </Box>
                </Box>
              )}
            </DialogContent>
            <DialogTitle className="flex justify-between items-center text-white bg-[#A60000]">
              <Box className="flex flex-col items-center justify-center gap-2 w-full bg-[#A60000] rounded-sm p-2 text-white">
                <Box className="flex items-center  w-full">
                  <p className="font-extrabold text-xl w-4/12 ">
                    Equipo Planillero:
                  </p>
                  <Box className="flex gap-2 items-center justify-between">
                    <Image
                      src={currentMatch.planillero.logoUrl}
                      height={40}
                      width={40}
                      alt={currentMatch.planillero.name}
                    />
                    <p>{currentMatch.planillero.name}</p>
                  </Box>
                </Box>
                <Box className="flex items-center  w-full">
                  <p className="font-extrabold text-xl w-4/12 ">
                    Equipo Linea:
                  </p>
                  <Box className="flex gap-2 items-center justify-between">
                    <Image
                      src={currentMatch.linea.logoUrl}
                      height={40}
                      width={40}
                      alt={currentMatch.linea.name}
                    />
                    <p>{currentMatch.linea.name}</p>
                  </Box>
                </Box>
              </Box>
            </DialogTitle>
          </>
        )}
      </Dialog>
    </>
  );
};
