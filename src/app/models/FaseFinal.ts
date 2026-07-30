import { Team } from "./Equipo";
import { Match, partidoMapper } from "./Match";

export interface PhaseSeasonFinal {
  id: string;
  type: string; // "seasonFinal"
  doubleMatch: boolean;
  matchId: string;
  homeMatch: Match | null;
  awayMatch: Match | null;
  homeTeamPenalties: number | null;
  awayTeamPenalties: number | null;
  teamWinner: Team | null;
}

export const faseFinalMapper = (x: any): PhaseSeasonFinal => ({
  id: x.id,
  type: x.type,
  doubleMatch: x.doubleMatch,
  matchId: x.matchId,
  homeMatch: x.homeMatch ? partidoMapper(x.homeMatch) : null,
  awayMatch: x.awayMatch ? partidoMapper(x.awayMatch) : null,
  homeTeamPenalties: x.homeTeamPenalties ?? null,
  awayTeamPenalties: x.awayTeamPenalties ?? null,
  teamWinner: x.teamWinner ?? null,
});