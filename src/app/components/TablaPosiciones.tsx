import { FC } from "react";
import Image from "next/image";
import { abbreviateTeamName } from "@/app/utils/stringUtils";
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

function getZone(pos: number, total: number): "ascenso" | "playoff" | "descenso" | "none" {
  if (pos <= 3) return "ascenso";
  if (pos === 4) return "playoff";
  if (total >= 6 && pos >= total - 1) return "descenso";
  return "none";
}

const ZONE_COLORS = {
  ascenso: { border: "#22c55e", text: "#22c55e" },
  playoff: { border: "#f59e0b", text: "#f59e0b" },
  descenso: { border: "#ef4444", text: "#ef4444" },
  none: { border: "transparent", text: "#9ca3af" },
};

const DG_COLOR = (dg: number) =>
  dg > 0 ? "#22c55e" : dg < 0 ? "#ef4444" : "#9ca3af";

const TH = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <th
    className={`text-xs font-semibold tracking-wider py-3 px-2 md:px-3 text-gray-400 uppercase ${className}`}
  >
    {children}
  </th>
);

export const TablaPosiciones: FC<TablaPosicionesProps> = ({ data, ignoreLines }) => {
  const calculatedPositions = [...data]
    .sort((a, b) => {
      if (a.pts !== b.pts) return b.pts - a.pts;
      if (a.dg !== b.dg) return b.dg - a.dg;
      if (a.gf !== b.gf) return b.gf - a.gf;
      return a.equipo?.localeCompare(b.equipo);
    })
    .map((team, index) => ({ ...team, pos: index + 1 }));

  const total = calculatedPositions.length;

  return (
    <div className="w-full rounded-lg overflow-hidden" style={{ backgroundColor: "#111" }}>
      {/* Legend header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: "#111" }}>
        <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
          Tabla de posiciones
        </span>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
            Ascenso
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400" />
            Playoff
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
            Descenso
          </span>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse" style={{ minWidth: 480 }}>
          <thead>
            <tr style={{ backgroundColor: "#1a1a1a" }}>
              <TH className="text-left pl-4 w-10">POS</TH>
              <TH className="text-left">EQUIPO</TH>
              <TH>PJ</TH>
              <TH>PG</TH>
              <TH>PE</TH>
              <TH>PP</TH>
              <TH className="hidden md:table-cell">GF</TH>
              <TH className="hidden md:table-cell">GC</TH>
              <TH>DG</TH>
              <TH>PTS</TH>
              <TH className="hidden md:table-cell">PRÓXIMO</TH>
            </tr>
          </thead>
          <tbody>
            {calculatedPositions.map((team) => {
              const zone = getZone(team.pos, total);
              const zoneColor = ZONE_COLORS[zone];
              return (
                <tr
                  key={team.pos}
                  className="transition-colors"
                  style={{ borderBottom: "1px solid #1f1f1f" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#1a1a1a")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  {/* Position with colored left bar */}
                  <td className="py-3 pl-0 pr-2 w-10">
                    <div className="flex items-center">
                      <div
                        className="w-1 self-stretch rounded-r mr-3"
                        style={{ backgroundColor: zoneColor.border, minHeight: 40 }}
                      />
                      <span
                        className="font-bold text-sm"
                        style={{ color: zoneColor.text }}
                      >
                        {team.pos}
                      </span>
                    </div>
                  </td>

                  {/* Team */}
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                        <Image
                          src={team.escudo}
                          alt={team.equipo}
                          width={32}
                          height={32}
                          className="object-contain w-8 h-8"
                        />
                      </div>
                      <span className="text-white text-sm font-medium uppercase hidden sm:block">
                        {team.equipo}
                      </span>
                      <span className="text-white text-xs font-medium uppercase sm:hidden">
                        {abbreviateTeamName(team.equipo)}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-2 md:px-3 text-center text-gray-300 text-sm">{team.pj}</td>
                  <td className="py-3 px-2 md:px-3 text-center text-gray-300 text-sm">{team.pg}</td>
                  <td className="py-3 px-2 md:px-3 text-center text-gray-300 text-sm">{team.pe}</td>
                  <td className="py-3 px-2 md:px-3 text-center text-gray-300 text-sm">{team.pp}</td>
                  <td className="py-3 px-2 md:px-3 text-center text-gray-300 text-sm hidden md:table-cell">{team.gf}</td>
                  <td className="py-3 px-2 md:px-3 text-center text-gray-300 text-sm hidden md:table-cell">{team.gc}</td>
                  <td
                    className="py-3 px-2 md:px-3 text-center text-sm font-medium"
                    style={{ color: DG_COLOR(team.dg) }}
                  >
                    {team.dg > 0 ? `+${team.dg}` : team.dg}
                  </td>
                  <td className="py-3 px-2 md:px-3 text-center text-white text-sm font-bold">
                    {team.pts}
                  </td>
                  <td className="py-3 px-2 md:px-3 text-center hidden md:table-cell">
                    <div className="flex justify-center">
                      <NextTeamInfo
                        data={{
                          escudo: team.escudo,
                          nextTeam: team.nextMatch?.logo || null,
                          nombreEquipo: abbreviateTeamName(team.equipo),
                          nombreEquipoRival: abbreviateTeamName(team.nextMatch?.name || ""),
                        }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
