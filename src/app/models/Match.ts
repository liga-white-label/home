import { Moment } from "moment";
import { Incidencia } from "../components/InferenciaByTeam";
import { Team } from "./Team";
import moment from "moment";
export enum MatchStatus {
  PENDING = "Upcoming",
  PLAYED = "Played",
  IN_PROGRESS = "Suspended",
}

export interface Match {
  date: Moment | null;
  dateNumber: number;
  field: string | null;
  linemenTeam: Team | null;
  scorer: Team | null;
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

export type IndexMatch = Omit<
  Match,
  | "linemenTeam"
  | "scorer"
  | "comments"
  | "homeTeamRedCards"
  | "homeTeamYellowCards"
  | "homeTeamPlayerGoals"
  | "awayTeamRedCards"
  | "awayTeamYellowCards"
  | "awayTeamPlayerGoals"
  | "homeTeam"
  | "awayTeam"
> & {
  homeTeamId: string;
  awayTeamId: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  homeTeamName: string;
  awayTeamName: string;
};

export const indexMatchMapper = (x: Match): IndexMatch => {
  return {
    homeTeamId: x.homeTeam?.id,
    awayTeamId: x.awayTeam?.id,
    homeTeamLogo: x.homeTeam?.logo,
    awayTeamLogo: x.awayTeam?.logo,
    homeTeamName: x.homeTeam?.name,
    awayTeamName: x.awayTeam?.name,
    date: !!x.date ? moment(x.date) : null,
    dateNumber: x.dateNumber,
    field: x.field,
    homeTeamGoals: x.homeTeamGoals,
    awayTeamGoals: x.awayTeamGoals,
    status: x.status,
  };
};
