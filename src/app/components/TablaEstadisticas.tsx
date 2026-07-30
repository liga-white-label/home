import Image from "next/image";
import { FC } from "react";
import { abbreviateTeamName } from "../utils/stringUtils";
import { RowEstadisticas } from "../models/FaseCampeonato";

interface TablaEstadisticasProps {
  data: RowEstadisticas[];
  tipo: "amarillas" | "goleadores";
}

// Fixed width so the logo + name block is centered as a unit while its contents
// stay left-aligned — otherwise shorter team names shift the logo out of column.
const TEAM_BLOCK_WIDTH = "w-[190px]";
const TEAM_BLOCK_WIDTH_MOBILE = "w-[120px]";

const TH = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <th className={`text-xs font-semibold tracking-wider py-3 text-[var(--color-text-secondary)] uppercase ${className}`}>
    {children}
  </th>
);

export const TablaEstadisticas: FC<TablaEstadisticasProps> = ({ data, tipo }) => {
  if (data.length === 0) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-[var(--color-text-secondary)]">{`No hay información acerca de ${
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
    <div className="w-full rounded-lg overflow-hidden" style={{ backgroundColor: "var(--color-surface-2)" }}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" style={{ minWidth: 320 }}>
          <thead>
            <tr style={{ backgroundColor: "var(--color-surface)" }}>
              <TH className="text-left pl-4 pr-4 w-10">POS</TH>
              <TH className="text-left pl-6 pr-3">JUGADOR</TH>
              <TH className="text-center px-3">EQUIPO</TH>
              <TH className="text-center px-3">{tipo === "goleadores" ? "GOLES" : "AMARILLAS"}</TH>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr
                key={index}
                style={{ borderBottom: "1px solid var(--color-border)" }}
                className="transition-colors hover:bg-[var(--color-surface-hover)]"
              >
                <td className="py-3 pl-4 pr-4 text-[var(--color-text-secondary)] text-sm font-bold w-10">
                  {index + 1}
                </td>
                <td className="py-3 pl-6 pr-3 text-[var(--color-text)] text-sm font-medium">
                  {row.jugador}
                </td>
                {/* Desktop: logo + name */}
                <td className="py-3 px-3 hidden sm:table-cell">
                  <div className={`mx-auto flex items-center gap-2 ${TEAM_BLOCK_WIDTH}`}>
                    <span className="flex w-[30px] shrink-0 justify-center">
                      <Image src={row.escudo} alt={row.equipo} height={20} width={30} className="object-contain" />
                    </span>
                    <span className="text-[var(--color-text-secondary)] text-sm truncate">{row.equipo}</span>
                  </div>
                </td>
                {/* Mobile: abbreviated */}
                <td className="py-3 px-3 sm:hidden">
                  <div className={`mx-auto flex items-center gap-2 ${TEAM_BLOCK_WIDTH_MOBILE}`}>
                    <span className="flex w-[26px] shrink-0 justify-center">
                      <Image src={row.escudo} alt={row.equipo} height={18} width={26} className="object-contain" />
                    </span>
                    <span className="text-[var(--color-text-secondary)] text-xs truncate">{abbreviateTeamName(row.equipo)}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-center text-[var(--color-text)] font-bold text-sm">
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
