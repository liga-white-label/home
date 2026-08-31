import { FC } from "react";
import Image from "next/image";
import { abbreviateTeamName } from "@/app/utils/stringUtils";
import { NextTeamInfo } from "./NextTeamInfo";

// Marca un bloque de filas (desde el primer o último puesto) con un color propio.
// Permite que cada tabla defina sus propias zonas de ascenso/descenso en lugar
// de depender de una única regla genérica: distintos torneos/zonas necesitan
// distinta cantidad de cupos y colores.
export interface ZoneMarker {
  count: number;
  from: "top" | "bottom";
  color: string;
  label: string;
}

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
  // El backend ya ordena (aplica desempate cabeza-a-cabeza que no se puede
  // recalcular en el cliente) — usado por tablas de zona/temporada.
  serverOrdered?: boolean;
  showPromotionZones?: boolean;
  // Zonas a medida (ver ZoneMarker). Si se pasa, tiene prioridad sobre
  // showPromotionZones/getZone para esta tabla en particular.
  zones?: ZoneMarker[];
  showNextMatch?: boolean;
  title?: string;
}

function getZone(pos: number, total: number): "ascenso" | "playoff" | "descenso" | "none" {
  if (pos == 1) return "ascenso"
  if (pos <= 4) return "playoff";
  // if (total >= 6 && pos >= total - 1) return "descenso";
  return "none";
}

// Zonas para la Tabla General (acumulado Apertura + Clausura): último
// puesto en descenso directo, anteúltimo en zona de promoción.
export const TABLA_GENERAL_ZONES: ZoneMarker[] = [
  { count: 1, from: "bottom", color: "#ef4444", label: "Descenso directo" },
  { count: 2, from: "bottom", color: "#f97316", label: "Promoción" },
];

const ZONE_COLORS = {
  ascenso: { border: "#22c55e", text: "#22c55e" },
  playoff: { border: "#f59e0b", text: "#f59e0b" },
  descenso: { border: "#ef4444", text: "#ef4444" },
  none: { border: "transparent", text: "var(--color-text-secondary)" },
};

const DG_COLOR = (dg: number) =>
  dg > 0 ? "#22c55e" : dg < 0 ? "#ef4444" : "var(--color-text-secondary)";

function resolveCustomZone(
  pos: number,
  total: number,
  zones: ZoneMarker[]
): { color: string; label: string } | null {
  for (const zone of zones) {
    if (zone.from === "top" && pos <= zone.count) {
      return { color: zone.color, label: zone.label };
    }
    if (zone.from === "bottom" && pos > total - zone.count) {
      return { color: zone.color, label: zone.label };
    }
  }
  return null;
}

const TH = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <th
    className={`text-xs font-semibold tracking-wider py-3 px-2 md:px-3 text-[var(--color-text-secondary)] uppercase ${className}`}
  >
    {children}
  </th>
);

export const TablaPosiciones: FC<TablaPosicionesProps> = ({
  data,
  ignoreLines,
  serverOrdered = false,
  showPromotionZones = true,
  zones,
  showNextMatch = true,
  title = "Tabla de posiciones",
}) => {
  const calculatedPositions = serverOrdered
    ? data.map((team, index) => ({ ...team, pos: index + 1 }))
    : [...data]
      .sort((a, b) => {
        if (a.pts !== b.pts) return b.pts - a.pts;
        if (a.dg !== b.dg) return b.dg - a.dg;
        if (a.gf !== b.gf) return b.gf - a.gf;
        return a.equipo?.localeCompare(b.equipo);
      })
      .map((team, index) => ({ ...team, pos: index + 1 }));

  const total = calculatedPositions.length;

  return (
    <div className="w-full rounded-lg overflow-hidden" style={{ backgroundColor: "var(--color-surface-2)" }}>
      {/* Legend header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: "var(--color-surface-2)" }}>
        <span className="text-xs font-semibold tracking-widest text-[var(--color-text-secondary)] uppercase">
          {title}
        </span>
        {zones && zones.length > 0 ? (
          <div className="flex items-center gap-4 text-xs text-[var(--color-text-secondary)]">
            {zones.map((zone) => (
              <span key={zone.label} className="flex items-center gap-1">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: zone.color }}
                />
                {zone.label}
              </span>
            ))}
          </div>
        ) : (
          showPromotionZones && (
            <div className="flex items-center gap-4 text-xs text-[var(--color-text-secondary)]">
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
          )
        )}
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse" style={{ minWidth: showNextMatch ? 480 : 400 }}>
          <thead>
            <tr style={{ backgroundColor: "var(--color-surface)" }}>
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
              {showNextMatch && <TH className="hidden md:table-cell">PRÓXIMO</TH>}
            </tr>
          </thead>
          <tbody>
            {calculatedPositions.map((team) => {
              const customZone =
                zones && zones.length > 0
                  ? resolveCustomZone(team.pos, total, zones)
                  : null;
              const zone = !zones && showPromotionZones ? getZone(team.pos, total) : "none";
              const zoneColor = customZone
                ? { border: customZone.color, text: customZone.color }
                : ZONE_COLORS[zone];
              return (
                <tr
                  key={team.pos}
                  className="transition-colors hover:bg-[var(--color-surface-hover)]"
                  style={{ borderBottom: "1px solid var(--color-border)" }}
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
                      <span className="text-[var(--color-text)] text-sm font-medium uppercase hidden sm:block">
                        {team.equipo}
                      </span>
                      <span className="text-[var(--color-text)] text-xs font-medium uppercase sm:hidden">
                        {abbreviateTeamName(team.equipo)}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-2 md:px-3 text-center text-[var(--color-text-secondary)] text-sm">{team.pj}</td>
                  <td className="py-3 px-2 md:px-3 text-center text-[var(--color-text-secondary)] text-sm">{team.pg}</td>
                  <td className="py-3 px-2 md:px-3 text-center text-[var(--color-text-secondary)] text-sm">{team.pe}</td>
                  <td className="py-3 px-2 md:px-3 text-center text-[var(--color-text-secondary)] text-sm">{team.pp}</td>
                  <td className="py-3 px-2 md:px-3 text-center text-[var(--color-text-secondary)] text-sm hidden md:table-cell">{team.gf}</td>
                  <td className="py-3 px-2 md:px-3 text-center text-[var(--color-text-secondary)] text-sm hidden md:table-cell">{team.gc}</td>
                  <td
                    className="py-3 px-2 md:px-3 text-center text-sm font-medium"
                    style={{ color: DG_COLOR(team.dg) }}
                  >
                    {team.dg > 0 ? `+${team.dg}` : team.dg}
                  </td>
                  <td className="py-3 px-2 md:px-3 text-center text-[var(--color-text)] text-sm font-bold">
                    {team.pts}
                  </td>
                  {showNextMatch && (
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
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
