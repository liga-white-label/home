import Image from "next/image";
import { FC } from "react";
import { abbreviateTeamName } from "../utils/stringUtils";
import { NextTeamInfo } from "./NextTeamInfo";

interface TablaPosicionesProps {
  data: {
    pos: number;
    equipo: string;
    escudo: string;
    pts: number;
    pj: number;
    pg: number;
    pe: number;
    pp: number;
    gf: number;
    gc: number;
    dg: number;
    nextMatch: { name: string; logo: string } | null;
  }[];
  ignoreLines?: boolean;
}

export const TablaPosiciones: FC<TablaPosicionesProps> = ({
  data,
  ignoreLines,
}) => {
  const calculatedPositions = data
    ?.sort((a, b) => {
      if (a.pts !== b.pts) return b.pts - a.pts;
      if (a.dg !== b.dg) return b.dg - a.dg;
      if (a.gf !== b.gf) return b.gf - a.gf;
      return a.equipo?.localeCompare(b.equipo);
    })
    .map((team, index) => ({
      ...team,
      pos: index + 1,
    }));

  return (
    <div className="max-w-full overflow-x-hidden">
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-xs px-2 md:px-4 py-2">Pos</th>
            <th className="text-xs px-2 md:px-4 py-2">Equipo</th>
            <th className="text-xs px-2 md:px-4 py-2">PJ</th>
            <th className="text-xs px-2 md:px-4 py-2">PG</th>
            <th className="text-xs px-2 md:px-4 py-2">PE</th>
            <th className="text-xs px-2 md:px-4 py-2">PP</th>
            <th className="text-xs px-2 md:px-4 py-2 md:table-cell hidden">
              GF
            </th>
            <th className="text-xs px-2 md:px-4 py-2 md:table-cell hidden">
              GC
            </th>
            <th className="text-xs px-2 md:px-4 py-2">DG</th>
            <th className="text-xs px-2 md:px-4 py-2">Pts</th>
            <th className="text-xs px-2 md:px-4 py-2 md:table-cell hidden">
              Próximo
            </th>
          </tr>
        </thead>
        <tbody>
          {calculatedPositions.map((team, index) => (
            <tr
              key={index}
              className={`max-w-full 
                border-b
                ${calculateBorderBottomColor(team.pos)}
               `}
            >
              <td className={`px-2 md:px-4 py-2 font-bold text-center`}>
                {team.pos}
              </td>
              <td className="px-2 md:px-4 items-center gap-4 md:flex hidden">
                <Image
                  src={team.escudo}
                  alt={team.equipo}
                  width={40} // Adjusted width
                  height={40} // Adjusted height
                  className="object-contain h-10 w-10"
                />
                {team.equipo}
              </td>
              <td className="px-1 md:px-4 md:hidden">
                <div className="flex items-center gap-4">
                  <Image
                    src={team.escudo}
                    alt={team.equipo}
                    width={40} // Adjusted width
                    height={40} // Adjusted height
                    className="object-contain h-10 w-10"
                  />
                  <p className="max-[340px]:hidden">
                    {abbreviateTeamName(team.equipo || "")}
                  </p>
                </div>
              </td>
              <td className="px-2 md:px-4 py-3  text-center">{team.pj}</td>
              <td className="px-2 md:px-4 py-3  text-center">{team.pg}</td>
              <td className="px-2 md:px-4 py-3  text-center">{team.pe}</td>
              <td className="px-2 md:px-4 py-3  text-center">{team.pp}</td>
              <td className="px-2 md:px-4 py-3 md:table-cell hidden text-center">
                {team.gf}
              </td>
              <td className="px-2 md:px-4 py-3 md:table-cell hidden text-center">
                {team.gc}
              </td>
              <td className="px-2 md:px-4 py-3  text-center">{team.dg}</td>
              <td className="px-2 md:px-4 py-3  text-center font-bold">
                {team.pts}
              </td>
              <td className="justify-center px-2 md:px-4 py-2  text-center font-bold md:flex hidden">
                <NextTeamInfo
                  data={{
                    escudo: team.escudo,
                    nextTeam: team.nextMatch?.logo || null,
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const calculateBorderBottomColor = (
  position: number,
  tieneAscensoPlayoff?: boolean
) => {
  if (position === 1 || (tieneAscensoPlayoff && position === 4)) {
    return "border-green-500";
  }

  if (position === 12) {
    return "border-red-500";
  }

  return "border-gray-200";
};
