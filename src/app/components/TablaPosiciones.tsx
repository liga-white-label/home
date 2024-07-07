import Image from "next/image";
import { FC } from "react";

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
  }[];
}

export const TablaPosiciones: FC<TablaPosicionesProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="w-full bg-gray-200">
            <th className="px-4 py-2 border-b border-gray-300">Pos</th>
            <th className="px-4 py-2 border-b border-gray-300">Equipo</th>
            <th className="px-4 py-2 border-b border-gray-300">Pts</th>
            <th className="px-4 py-2 border-b border-gray-300">PJ</th>
            <th className="px-4 py-2 border-b border-gray-300">PG</th>
            <th className="px-4 py-2 border-b border-gray-300">PE</th>
            <th className="px-4 py-2 border-b border-gray-300">PP</th>
            <th className="px-4 py-2 border-b border-gray-300">GF</th>
            <th className="px-4 py-2 border-b border-gray-300">GC</th>
            <th className="px-4 py-2 border-b border-gray-300">DG</th>
          </tr>
        </thead>
        <tbody>
          {data.map((team, index) => (
            <tr
              key={index}
              className={`w-full ${
                index === 0
                  ? "bg-green-300"
                  : index % 2 === 0
                  ? "bg-gray-100"
                  : "bg-white"
              }`}
            >
              <td
                className={`px-4 py-2 border-b border-gray-300 font-bold text-center ${calculatePositionColor(
                  team.pos
                )}`}
              >
                {team.pos}
              </td>
              <td className="px-4 py-2 border-b border-gray-300 flex items-center gap-4">
                <Image
                  src={"/assets/ultracuevafc.png"}
                  alt={team.equipo}
                  height={20}
                  width={30}
                />
                {team.equipo}
              </td>
              <td className="px-4 py-2 border-b border-gray-300 text-center">
                {team.pts}
              </td>
              <td className="px-4 py-2 border-b border-gray-300 text-center">
                {team.pj}
              </td>
              <td className="px-4 py-2 border-b border-gray-300 text-center">
                {team.pg}
              </td>
              <td className="px-4 py-2 border-b border-gray-300 text-center">
                {team.pe}
              </td>
              <td className="px-4 py-2 border-b border-gray-300 text-center">
                {team.pp}
              </td>
              <td className="px-4 py-2 border-b border-gray-300 text-center">
                {team.gf}
              </td>
              <td className="px-4 py-2 border-b border-gray-300 text-center">
                {team.gc}
              </td>
              <td className="px-4 py-2 border-b border-gray-300 text-center">
                {team.dg}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const calculatePositionColor = (position: number) => {
  if (position >= 1 && position <= 4) {
    return "bg-green-700 text-white";
  }

  if (position > 4 && position <= 12) {
    return "bg-green-500";
  }

  return "bg-red-500 text-white";
};
