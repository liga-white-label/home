"use client";

import { FC } from "react";
import Image from "next/image";
import { useSeasonFinalQuery } from "@/repositories/SeasonRepository";
import MiniLoading from "../loading/MiniLoading";
import { Match, MatchStatus } from "@/app/models/Match";
import { Jugador } from "@/app/models/Jugador";

interface FaseFinalDeEtapaPageProps {
  faseId: string;
}

const goleadoresAgrupados = (jugadores: Jugador[]) => {
  const porJugador = new Map<string, { name: string; goles: number }>();
  jugadores.forEach((jugador) => {
    const actual = porJugador.get(jugador.id);
    if (actual) actual.goles += 1;
    else porJugador.set(jugador.id, { name: jugador.fullName, goles: 1 });
  });
  return Array.from(porJugador.values());
};

const Goleadores: FC<{ match: Match }> = ({ match }) => {
  const local = goleadoresAgrupados(match.homeTeamPlayerGoals);
  const visitante = goleadoresAgrupados(match.awayTeamPlayerGoals);

  if (local.length === 0 && visitante.length === 0) return null;

  return (
    <div className="flex justify-between gap-4 pt-1">
      <div className="flex flex-col gap-1 items-end text-right">
        {local.map((g) => (
          <span key={g.name} className="text-[var(--color-text-secondary)] text-xs">
            {g.name}
            {g.goles > 1 ? ` x${g.goles}` : ""}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-1 items-start text-left">
        {visitante.map((g) => (
          <span key={g.name} className="text-[var(--color-text-secondary)] text-xs">
            {g.name}
            {g.goles > 1 ? ` x${g.goles}` : ""}
          </span>
        ))}
      </div>
    </div>
  );
};

const EquipoRow: FC<{ label: string; logoUrl?: string; name?: string }> = ({
  label,
  logoUrl,
  name,
}) => (
  <div className="rounded-lg p-4 flex flex-col gap-3" style={{ backgroundColor: "var(--color-surface-2)" }}>
    <span className="text-xs font-semibold tracking-widest text-[var(--color-text-secondary)] uppercase">
      {label}
    </span>
    {name ? (
      <div className="flex items-center gap-3">
        {logoUrl && (
          <Image src={logoUrl} alt={name} width={32} height={32} className="object-contain" />
        )}
        <span className="text-[var(--color-text)] text-sm font-medium uppercase">{name}</span>
      </div>
    ) : (
      <span className="text-[var(--color-text-secondary)] text-sm">Todavía sin definir</span>
    )}
  </div>
);

export const FaseFinalDeEtapaPage: FC<FaseFinalDeEtapaPageProps> = ({
  faseId,
}) => {
  const { data: faseFinal, isLoading } = useSeasonFinalQuery(faseId);

  if (isLoading || !faseFinal) {
    return (
      <div className="flex justify-center py-10">
        <MiniLoading />
      </div>
    );
  }

  const {
    homeMatch,
    awayMatch,
    doubleMatch,
    homeTeamPenalties,
    awayTeamPenalties,
    teamWinner,
  } = faseFinal;
  const homeTeam = homeMatch?.homeTeam || null;
  const awayTeam = homeMatch?.awayTeam || null;
  const idaJugado = homeMatch?.status === MatchStatus.JUGADO;
  const vueltaJugado = awayMatch?.status === MatchStatus.JUGADO;

  // "Vuelta" invierte localía: el gol del local queda en awayMatch.awayTeamGoals.
  const golesLocal =
    (homeMatch?.homeTeamGoals ?? 0) + (doubleMatch ? awayMatch?.awayTeamGoals ?? 0 : 0);
  const golesVisitante =
    (homeMatch?.awayTeamGoals ?? 0) + (doubleMatch ? awayMatch?.homeTeamGoals ?? 0 : 0);
  const partidoDefinitorioJugado = doubleMatch ? idaJugado && vueltaJugado : idaJugado;
  const huboPenales = partidoDefinitorioJugado && golesLocal === golesVisitante;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EquipoRow label="Local" name={homeTeam?.name} logoUrl={homeTeam?.logoUrl} />
        <EquipoRow label="Visitante" name={awayTeam?.name} logoUrl={awayTeam?.logoUrl} />
      </div>

      {homeMatch && (
        <div className="rounded-lg p-4 flex flex-col gap-2" style={{ backgroundColor: "var(--color-surface-2)" }}>
          <span className="text-xs font-semibold tracking-widest text-[var(--color-text-secondary)] uppercase">
            {doubleMatch ? "Ida" : "Partido final"}
          </span>
          {idaJugado ? (
            <>
              <span className="text-[var(--color-text)] text-sm">
                {homeTeam?.name || "Local"} {homeMatch.homeTeamGoals} - {homeMatch.awayTeamGoals}{" "}
                {awayTeam?.name || "Visitante"}
              </span>
              <Goleadores match={homeMatch} />
            </>
          ) : (
            <span className="text-[var(--color-text-secondary)] text-sm">
              A definir{homeMatch.date ? ` — ${homeMatch.date.format("DD/MM/YYYY HH:mm")}` : ""}
              {homeMatch.field ? ` en ${homeMatch.field}` : ""}
            </span>
          )}
        </div>
      )}

      {doubleMatch && awayMatch && (
        <div className="rounded-lg p-4 flex flex-col gap-2" style={{ backgroundColor: "var(--color-surface-2)" }}>
          <span className="text-xs font-semibold tracking-widest text-[var(--color-text-secondary)] uppercase">
            Vuelta
          </span>
          {vueltaJugado ? (
            <>
              <span className="text-[var(--color-text)] text-sm">
                {awayTeam?.name || "Visitante"} {awayMatch.homeTeamGoals} - {awayMatch.awayTeamGoals}{" "}
                {homeTeam?.name || "Local"}
              </span>
              <Goleadores
                match={{
                  ...awayMatch,
                  homeTeamPlayerGoals: awayMatch.awayTeamPlayerGoals,
                  awayTeamPlayerGoals: awayMatch.homeTeamPlayerGoals,
                }}
              />
            </>
          ) : (
            <span className="text-[var(--color-text-secondary)] text-sm">
              A definir{awayMatch.date ? ` — ${awayMatch.date.format("DD/MM/YYYY HH:mm")}` : ""}
              {awayMatch.field ? ` en ${awayMatch.field}` : ""}
            </span>
          )}
        </div>
      )}

      {huboPenales && (
        <div className="rounded-lg p-4 flex flex-col gap-2" style={{ backgroundColor: "var(--color-surface-2)" }}>
          <span className="text-xs font-semibold tracking-widest text-[var(--color-text-secondary)] uppercase">
            Penales
          </span>
          <span className="text-[var(--color-text)] text-sm">
            {homeTeam?.name || "Local"} {homeTeamPenalties} - {awayTeamPenalties} {awayTeam?.name || "Visitante"}
          </span>
        </div>
      )}

      {teamWinner && (
        <div
          className="rounded-lg p-4 flex items-center gap-3"
          style={{ backgroundColor: "var(--color-surface-2)", border: "1px solid var(--color-primary)" }}
        >
          {teamWinner.logoUrl && (
            <Image src={teamWinner.logoUrl} alt={teamWinner.name} width={40} height={40} className="object-contain" />
          )}
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-widest text-[var(--color-text-secondary)] uppercase">
              Campeón de la etapa
            </span>
            <span className="text-[var(--color-text)] text-lg font-bold uppercase">
              {teamWinner.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
