import { AddBox, Bookmark, Rectangle, SportsSoccer } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import Image from "next/image";
import { IncidenciasContainer } from "./InferenciasContainer";

export interface Incidencia {
  type: "expulsion" | "gol";
  player_name: string;
  team: "team1" | "team2";
}

export interface MatchProps {
  time: string;
  team1: string;
  team2: string;
  score1?: number;
  score2?: number;
  details?: Incidencia[];
  fem?: boolean;
  cancha?: string;
}

const Incidencias_mock: Incidencia[] = [
  { type: "gol", player_name: "Joaquin Franciscutti", team: "team1" },
  { type: "expulsion", player_name: "Edinson Cavani", team: "team2" },
  { type: "gol", player_name: "Joaquin Franciscutti", team: "team1" },
];

const Match: React.FC<MatchProps & { last: boolean }> = ({
  cancha = "",
  fem = false,
  time,
  team1,
  team2,
  score1 = 0,
  score2 = 0,
  details,
  last,
}) => {
  return (
    <div className="text-black border-black shadow-inner">
      <Grid container xs={12} className="flex items-center  border-black">
        <Grid
          container
          xs={12}
          className={`border-black ${last ? "" : "border-b-[1px]"}`}
        >
          <Grid
            item
            xs={2}
            className="items-center justify-center flex flex-col bg-gray-300 border-black border-r-[1px]"
          >
            <p className="font-bold text-center">{time}</p>
            <p className=" text-center text-sm">{cancha}</p>
          </Grid>
          <Grid
            container
            xs={10}
            className={`w-full flex justify-between ${
              fem ? "bg-red-200" : "bg-blue-200"
            }`}
          >
            <Grid item xs={6} className="flex border-black border-r-[1px]">
              <div className="flex flex-col w-full items-center justify-center py-2 overflow-hidden text-ellipsis">
                <Image
                  src={"/assets/ultracuevafc.png"}
                  alt={team1}
                  width={40}
                  height={40}
                />
                <p className="text-center  text-sm">{team1}</p>
              </div>
              <div className="min-w-8 flex items-center justify-center border-black border-l-[1px] h-full bg-gray-200">
                <p>{score1 || "-"}</p>
              </div>
            </Grid>

            <Grid item xs={6} className="flex justify-start items-start ">
              <div className="min-w-8 flex items-center justify-center border-black border-r-[1px] h-full bg-gray-200">
                <p>{score2 || "-"}</p>
              </div>
              <div className="flex flex-col w-full items-center justify-center py-2 overflow-hidden text-ellipsis">
                <Image
                  src={"/assets/ultracuevafc.png"}
                  alt={team2}
                  width={40}
                  height={40}
                />
                <p className="text-center  text-sm">{team2}</p>
              </div>
              <div className="cursor-pointer flex items-center justify-center px-1 border-black border-l-[1px] h-full min-w-8">
                <AddBox color={fem ? "error" : "info"} />
              </div>
            </Grid>
          </Grid>
        </Grid>
        {false && <IncidenciasContainer incidencias={Incidencias_mock} />}
      </Grid>
    </div>
  );
};

export default Match;
