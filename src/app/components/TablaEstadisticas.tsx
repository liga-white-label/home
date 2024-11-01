import Image from "next/image";
import { FC } from "react";
import { abbreviateTeamName } from "../utils/stringUtils";

interface TablaEstadisticasProps {
  data: {
    pos: number;
    jugador: string;
    equipo: string;
    escudo: string;
    goles?: number;
    tarjetas?: number;
  }[];
  tipo: "amarillas" | "goleadores";
}

export const TablaEstadisticas: FC<TablaEstadisticasProps> = ({
  data,
  tipo,
}) => {
  if (data.length === 0) {
    return (
      <div className="max-w-full overflow-x-hidden flex justify-center">
        <p>{`No hay información acerca de ${
          tipo === "amarillas" ? "las amarillas" : "los goleadores/as"
        }`}</p>
      </div>
    );
  }

  return (
    <div className="max-w-full overflow-x-hidden flex justify-center">
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-xs px-2 md:px-4 py-2">Pos</th>
            <th className="text-xs px-2 md:px-4 py-2">Jugador</th>
            <th className="text-xs px-2 md:px-4 py-2">Equipo</th>
            <th className="text-xs px-2 md:px-4 py-2">
              {tipo === "goleadores" ? "Goles" : "Amarillas"}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((team, index) => (
            <tr key={index} className={`max-w-full border-b border-gray-200`}>
              <td className={`px-2 md:px-4 py-2 font-bold text-center`}>
                {team.pos}
              </td>
              <td className={`px-2 md:px-4 py-2 text-center`}>
                {team.jugador}
              </td>
              <td className="px-2 md:px-4 items-center  gap-4 md:flex hidden">
                <Image
                  src={team.escudo}
                  alt={team.equipo}
                  height={20}
                  width={30}
                />
                {team.equipo}
              </td>
              <td className="px-1 md:px-4  md:hidden">
                <div className="flex items-center gap-4">
                  <Image
                    src={team.escudo}
                    alt={team.equipo}
                    height={20}
                    width={30}
                  />
                  <p className="max-[340px]:hidden">
                    {abbreviateTeamName(team.equipo || "")}
                  </p>
                </div>
              </td>
              <td className={`px-2 md:px-4 py-2 text-center`}>
                {tipo === "goleadores" ? team.goles : team.tarjetas}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
