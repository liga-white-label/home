import { Team } from "./Equipo";
import { Match, partidoMapper } from "./Match";

export interface RoundCup {
  matchesPlayoff: RoundMatch[];
  roundNumber: number;
  doubleMatch: boolean;
}

export interface FaseGruposCopa {
  matches: Match[];
  name: string;
  teams: Team[];
  positions: TablePosition[];
}

export interface PositionsGruposCopa {
  name: string;
  positions: TablePosition[];
}

export interface FaseGruposCopaOnlyMatches {
  matches: Match[];
  name: string;
}

export interface TablePosition {
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
  nextMatch: {
    name: string;
    logo: string;
  } | null;
}

export const faseCopaMapper = (x: any): FaseGruposCopa => ({
  matches: (x.matches || []).map((match: any) => partidoMapper(match)),
  name: x.name,
  teams: x.teams || [],
  positions: x.positions?.map(getPositionsMapper) || [],
});

export const faseCopaMapperOnlyPositions = (x: any): PositionsGruposCopa => ({
  name: x.name,
  positions: x.positions?.map(getPositionsMapper) || [],
});

export const faseCopaMapperOnlyMatches = (
  x: any
): FaseGruposCopaOnlyMatches => ({
  matches: x.matches.map((match: any) => partidoMapper(match)),
  name: x.name,
});

export const playoffFaseMapper = (data: any): RoundCup => {
  const matchesPlayoff: RoundMatch[] = data.matchesPlayoff.map((x: any) => ({
    id: x.id,
    awayMatch: partidoMapper(x.awayMatch),
    homeMatch: partidoMapper(x.homeMatch),
    teamWinner: x.teamWinner,
    nextMatchId: x.nextMatchId,
    homeTeamPenalties: x.homeTeamPenalties,
    awayTeamPenalties: x.awayTeamPenalties,
  }));

  return {
    matchesPlayoff: matchesPlayoff,
    roundNumber: data.roundNumber,
    doubleMatch: data.doubleMatch,
  };
};

export interface RoundMatch {
  id: string;
  awayMatch: Match;
  homeMatch: Match;
  teamWinner?: Team | null;
  nextMatchId: string;
  homeTeamPenalties: number | null;
  awayTeamPenalties: number | null;
}

export const getPositionsMapper = (data: any): TablePosition => ({
  pos: 0,
  equipo: data.teamName,
  escudo: data.teamLogo,
  pts: data.totalPoints,
  pj: data.matchDraw + data.matchLoss + data.matchWin,
  pg: data.matchWin,
  pe: data.matchDraw,
  pp: data.matchLoss,
  gf: data.goalsFor,
  gc: data.goalsAgainst,
  dg: data.goalsFor - data.goalsAgainst,
  nextMatch: !!data.nextOpponent
    ? { name: data.nextOpponent.name, logo: data.nextOpponent.logoUrl }
    : null,
});

export interface RowEstadisticas {
  jugador: string;
  equipo: string;
  escudo: string;
  goles?: number;
  tarjetas?: number;
}
export const GoleadoresMapper = (g: any): RowEstadisticas => ({
  jugador: g.playerFullName,
  equipo: g.teamName,
  escudo: g.teamLogo,
  goles: g.goals,
});

export const AmarillasMapper = (a: any): RowEstadisticas => ({
  jugador: a.playerFullName,
  equipo: a.teamName,
  escudo: a.teamLogo,
  tarjetas: a.yellowCards,
});
