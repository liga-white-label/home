import Image from "next/image";
import { FC } from "react";
import { abbreviateTeamName } from "../utils/stringUtils";

interface TablaPosicionesProps {
  data: {
    pos: number;
    equipo: string;
    pts: number;
    pj: number;
    pg: number;
    pe: number;
    pp: number;
    gf: number;
    gc: number;
    dg: number;
    nextMatch: string;
  }[];
}

export const TablaPosiciones: FC<TablaPosicionesProps> = ({ data }) => {
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
          {data.map((team, index) => (
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
                  src={"/assets/ultracuevafc.png"}
                  alt={team.equipo}
                  height={20}
                  width={30}
                />
                {team.equipo}
              </td>
              <td className="px-1 md:px-4  md:hidden">
                <div className="flex items-center gap-4">
                  <Image
                    src={"/assets/ultracuevafc.png"}
                    alt={team.equipo}
                    height={20}
                    width={30}
                  />
                  <p className="max-[340px]:hidden">
                    {abbreviateTeamName(team.equipo)}
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
                <Image
                  src={team.nextMatch}
                  alt={team.nextMatch}
                  height={20}
                  width={30}
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
