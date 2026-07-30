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

const isRoundComplete = (round: RoundCup): boolean => {
  if (round.matchesPlayoff.length === 0) return true;
  return round.matchesPlayoff.every((m) => {
    const homePlayed = m.homeMatch?.status === MatchStatus.JUGADO;
    const awayPlayed =
      !round.doubleMatch || !m.awayMatch || m.awayMatch.status === MatchStatus.JUGADO;
    return homePlayed && awayPlayed;
  });
};

/**
 * Returns the round to show as "current": the earliest round (in tournament
 * order, i.e. largest roundNumber first) that hasn't been fully played yet.
 * If every round is complete, falls back to the most advanced round that has
 * matches (the Final), so completed results keep showing. Returns null if no
 * round has any data at all.
 */
export const findMostAdvancedRound = (rounds: RoundCup[]): RoundCup | null => {
  if (rounds.length === 0) return null;

  const chronological = rounds.slice().sort((a, b) => b.roundNumber - a.roundNumber);

  const nextToPlay = chronological.find((r) => !isRoundComplete(r));
  if (nextToPlay) return nextToPlay;

  return (
    chronological
      .slice()
      .reverse()
      .find((r) => r.matchesPlayoff.length > 0) ?? null
  );
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
