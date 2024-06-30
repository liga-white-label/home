import { AddBox, Bookmark, Rectangle, SportsSoccer } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import { InferenciasContainer } from "./InferenciasContainer";
import Image from "next/image";

export interface Inferencia {
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
  details?: Inferencia[];
  fem?: boolean;
  cancha?: string;
}

const inferencias_mock: Inferencia[] = [
  { type: "gol", player_name: "Joaquin Franciscutti", team: "team1" },
  { type: "expulsion", player_name: "Edinson Cavani", team: "team2" },
  { type: "gol", player_name: "Joaquin Franciscutti", team: "team1" },
];

const Match: React.FC<MatchProps> = ({
  cancha = "",
  fem = false,
  time,
  team1,
  team2,
  score1 = 0,
  score2 = 0,
  details,
}) => {
  return (
    <div className="text-black border-black shadow-inner">
      <Grid
        container
        xs={12}
        className="flex items-center border-y-2 border-black"
      >
        <Grid container xs={12} className="border-black border-b-2">
          <Grid
            item
            xs={2}
            className="items-center justify-center flex flex-col bg-gray-300 border-black border-r-2"
          >
            <Typography className="font-bold text-center">{time}</Typography>
            <Typography className="font-bold text-center" fontSize={14}>
              {cancha}
            </Typography>
          </Grid>
          <Grid
            container
            xs={10}
            className={`w-full flex justify-between ${
              fem ? "bg-red-200" : "bg-blue-200"
            }`}
          >
            <Grid item xs={6} className="flex border-black border-r-2">
              <div className="flex flex-col w-full items-center justify-center py-2 overflow-hidden text-ellipsis">
                <Image
                  src={"/assets/ultracuevafc.png"}
                  alt={team1}
                  width={40}
                  height={40}
                />
                <Typography className="text-center font-bold" fontSize={14}>
                  {team1}
                </Typography>
              </div>
              <div className="min-w-8 flex items-center justify-center border-black border-l-2 h-full bg-gray-200">
                <Typography>{score1 || "-"}</Typography>
              </div>
            </Grid>

            <Grid item xs={6} className="flex justify-start items-start ">
              <div className="min-w-8 flex items-center justify-center border-black border-r-2 h-full bg-gray-200">
                <Typography>{score2 || "-"}</Typography>
              </div>
              <div className="flex flex-col w-full items-center justify-center py-2 overflow-hidden text-ellipsis">
                <Image
                  src={"/assets/ultracuevafc.png"}
                  alt={team2}
                  width={40}
                  height={40}
                />
                <Typography className="text-center font-bold" fontSize={14}>
                  {team2}
                </Typography>
              </div>
              <div className="cursor-pointer flex items-center justify-center px-1 border-black border-l-2 h-full min-w-8">
                <AddBox color={fem ? "error" : "info"} />
              </div>
            </Grid>
          </Grid>
        </Grid>
        {!!inferencias_mock && (
          <InferenciasContainer inferencias={inferencias_mock} />
        )}
      </Grid>
    </div>
  );
};

export default Match;
