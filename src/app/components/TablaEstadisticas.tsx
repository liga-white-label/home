import Image from "next/image";
import { FC } from "react";
import { abbreviateTeamName } from "../utils/stringUtils";
import { RowEstadisticas } from "../models/FaseCampeonato";

interface TablaEstadisticasProps {
  data: RowEstadisticas[];
  tipo: "amarillas" | "goleadores";
}

const TH = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <th className={`text-xs font-semibold tracking-wider py-3 px-3 text-gray-400 uppercase text-center ${className}`}>
    {children}
  </th>
);

export const TablaEstadisticas: FC<TablaEstadisticasProps> = ({ data, tipo }) => {
  if (data.length === 0) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">{`No hay información acerca de ${
          tipo === "amarillas" ? "las amarillas" : "los goleadores/as"
        }`}</p>
      </div>
    );
  }

  const sortedData = [...data].sort((a, b) => {
    if (tipo === "goleadores") return (b.goles || 0) - (a.goles || 0);
    return (b.tarjetas || 0) - (a.tarjetas || 0);
  });

  return (
    <div className="w-full rounded-lg overflow-hidden" style={{ backgroundColor: "#111" }}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" style={{ minWidth: 320 }}>
          <thead>
            <tr style={{ backgroundColor: "#1a1a1a" }}>
              <TH className="text-left pl-4 w-10">POS</TH>
              <TH className="text-left">JUGADOR</TH>
              <TH>EQUIPO</TH>
              <TH>{tipo === "goleadores" ? "GOLES" : "AMARILLAS"}</TH>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr
                key={index}
                style={{ borderBottom: "1px solid #1f1f1f" }}
                className="transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1a1a1a")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <td className="py-3 pl-4 pr-2 text-gray-400 text-sm font-bold w-10">
                  {index + 1}
                </td>
                <td className="py-3 px-3 text-white text-sm font-medium">
                  {row.jugador}
                </td>
                {/* Desktop: logo + name */}
                <td className="py-3 px-3 hidden sm:table-cell">
                  <div className="flex items-center justify-center gap-2">
                    <Image src={row.escudo} alt={row.equipo} height={20} width={30} className="object-contain" />
                    <span className="text-gray-300 text-sm">{row.equipo}</span>
                  </div>
                </td>
                {/* Mobile: abbreviated */}
                <td className="py-3 px-3 sm:hidden text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Image src={row.escudo} alt={row.equipo} height={18} width={26} className="object-contain" />
                    <span className="text-gray-300 text-xs">{abbreviateTeamName(row.equipo)}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-center text-white font-bold text-sm">
                  {tipo === "goleadores" ? row.goles : row.tarjetas}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
