import moment from "moment";
import "moment/locale/es";
import { MatchStatus, SimplifiedMatch, convertToSimplifiedMatch } from "@/app/models/Match";
import { RoundCup } from "@/app/models/FaseCampeonato";
import { Moment } from "moment";

export interface DayGroup {
  /** YYYY-MM-DD — used for stable sort */
  dayKey: string;
  /** e.g. "Sábado 18 de abril" */
  dayLabel: string;
  datetime: Moment;
  matches: SimplifiedMatch[];
}

/**
 * Groups matches by calendar day, sorted chronologically.
 * Matches without a date are collected under a single trailing group.
 */
export const groupMatchesByDay = (matches: SimplifiedMatch[]): DayGroup[] => {
  const map = new Map<string, DayGroup>();


  for (const match of matches) {
    const d = match.date ? moment(match.date) : null;
    const key = d?.isValid() ? d.format("YYYY-MM-DD") : "9999-99-99";
    if (!map.has(key)) {
      const label = d?.isValid()
        ? d.locale("es").format("dddd D [de] MMMM")
        : "Fecha a confirmar";
      map.set(key, {
        dayKey: key,
        dayLabel: label.charAt(0).toUpperCase() + label.slice(1),
        datetime: d?.isValid() ? moment(d.format("YYYY-MM-DDTHH:mm")) : moment(),
        matches: [],
      });
    }
    map.get(key)!.matches.push(match);
  }

  return Array.from(map.values())
    .sort((a, b) => moment(a.dayKey).valueOf() - moment(b.dayKey).valueOf())
    .map((group) => ({
      ...group,
      matches: group.matches.slice().sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
        return moment(a.date).valueOf() - moment(b.date).valueOf();
      }),
    }));
};

export const getRoundLabel = (roundNumber: number): string => {
  switch (roundNumber) {
    case 32: return "32avos de final";
    case 16: return "16avos de final";
    case 8: return "Octavos de final";
    case 4: return "Cuartos de final";
    case 2: return "Semifinal";
    case 1: return "Final";
    default: return `Ronda de ${roundNumber}`;
  }
};

/**
 * Returns the most advanced round (smallest roundNumber) that has
 * at least one played home match. Returns null if no round is active yet.
 */
export const findMostAdvancedRound = (rounds: RoundCup[]): RoundCup | null => {
  const active = rounds.filter((r) =>
    r.matchesPlayoff.some((m) => m.homeMatch?.status === MatchStatus.JUGADO)
  );
  if (active.length === 0) return null;
  return active.sort((a, b) => a.roundNumber - b.roundNumber)[0];
};

/**
 * Converts all matches in a round to SimplifiedMatch[].
 * Includes both legs (homeMatch + awayMatch) for double-match rounds.
 */
export const roundToSimplifiedMatches = (round: RoundCup): SimplifiedMatch[] =>
  round.matchesPlayoff.flatMap((m) => {
    const matches: SimplifiedMatch[] = [convertToSimplifiedMatch(m.homeMatch)];
    if (round.doubleMatch && m.awayMatch) {
      matches.push(convertToSimplifiedMatch(m.awayMatch));
    }
    return matches;
  });
