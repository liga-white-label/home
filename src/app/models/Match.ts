import moment from "moment";
import { Moment } from "moment";
import { Team } from "./Equipo";
import { Jugador } from "./Jugador";
export interface Match {
  date: Moment | null;
  dateNumber: number;
  field: string | null;
  linemenTeam: Team | null;
  scorer: Team | null;
  comments: string | null;
  homeTeam: Team;
  awayTeam: Team;
  homeTeamGoals: number | null;
  awayTeamGoals: number | null;
  homeTeamPlayerGoals: Jugador[];
  awayTeamPlayerGoals: Jugador[];
  homeTeamYellowCards: Jugador[];
  awayTeamYellowCards: Jugador[];
  homeTeamRedCards: Jugador[];
  awayTeamRedCards: Jugador[];
  status: MatchStatus;
  homeTeamPenalties: number | null;
  awayTeamPenalties: number | null;
}

export enum MatchStatus {
  PENDIENTE = "Upcoming",
  JUGADO = "Played",
  SUSPENDIDO = "Suspended",
}

export interface MatchToGenerate {
  id?: string;
  equipoLocal: Team;
  equipoVisitante: Team;
}

export interface MatchData {
  date: Moment | "";
  dateNumber: number;
  field: string | null;
  homeTeamId: string;
  awayTeamId: string;
  linemenTeamId: string | null;
  scorerTeamId: string | null; //planillero
  comments: string | null;
  homeTeamGoals: string;
  awayTeamGoals: string;
  homeTeamPlayerGoalsIds: string[];
  awayTeamPlayerGoalsIds: string[];
  homeTeamYellowCardsIds: string[];
  awayTeamYellowCardsIds: string[];
  homeTeamRedCardsIds: string[];
  awayTeamRedCardsIds: string[];
  status: MatchStatus;
  homeTeamPenalties: string | null;
  awayTeamPenalties: string | null;
}

export const partidoMapper = (x: any): Match => ({
  ...x,
  date: !!x?.date ? moment(x?.date) : null,
  homeTeamPlayerGoals: x?.homeTeamPlayerGoals || [],
  awayTeamPlayerGoals: x?.awayTeamPlayerGoals || [],
  homeTeamYellowCards: x?.homeTeamYellowCards || [],
  awayTeamYellowCards: x?.awayTeamYellowCards || [],
  homeTeamRedCards: x?.homeTeamRedCards || [],
  awayTeamRedCards: x?.awayTeamRedCards || [],
  homeTeamPenalties: x?.homeTeamPenalties || null,
  awayTeamPenalties: x?.awayTeamPenalties || null,
});

export interface SimplifiedMatch {
  homeTeamId: string;
  awayTeamId: string;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  status: MatchStatus;
  homeTeamGoals: number | null;
  awayTeamGoals: number | null;
  date: Moment | null;
  dateNumber: number;
  field: string | null;
}
