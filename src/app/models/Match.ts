import { Moment } from "moment";
import { Incidencia } from "../components/InferenciaByTeam";
import { Team } from "./Team";
export enum MatchStatus {
  PENDING = "Upcoming",
  PLAYED = "Played",
  IN_PROGRESS = "Suspended",
}

export interface Match {
  date: Moment;
  dateNumber: number;
  field: string;
  linemenTeam: Team;
  scorer: Team;
  comments: string;
  homeTeam: Team;
  awayTeam: Team;
  homeTeamGoals: number | null;
  awayTeamGoals: number | null;
  homeTeamPlayerGoals: any[];
  awayTeamPlayerGoals: any[];
  homeTeamYellowCards: any[];
  awayTeamYellowCards: any[];
  homeTeamRedCards: any[];
  awayTeamRedCards: any[];
  status: MatchStatus;
}
