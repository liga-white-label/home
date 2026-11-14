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

/** Groups matches by day; matches without a date go last. */
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

// Same as the backend's ACTUAL_DATE_HOLD_DAYS and NEXT_DATE_LEAD_DAYS
export const PLAYOFF_ROUND_HOLD_DAYS = 3;
export const PLAYOFF_NEXT_ROUND_LEAD_DAYS = 1;

const roundMatchDates = (round: RoundCup): Moment[] =>
  roundToSimplifiedMatches(round)
    .map((m) => (m.date ? moment(m.date) : null))
    .filter((d): d is Moment => !!d && d.isValid());

/**
 * Current round: the first unfinished one. The last finished round keeps showing
 * for a few days, unless the next one starts sooner.
 */
export const findMostAdvancedRound = (
  rounds: RoundCup[],
  now: Moment = moment()
): RoundCup | null => {
  if (rounds.length === 0) return null;

  const chronological = rounds.slice().sort((a, b) => b.roundNumber - a.roundNumber);

  const nextIndex = chronological.findIndex((r) => !isRoundComplete(r));
  if (nextIndex !== -1) {
    const nextToPlay = chronological[nextIndex];
    const lastCompleted = chronological
      .slice(0, nextIndex)
      .reverse()
      .find((r) => r.matchesPlayoff.length > 0);

    if (lastCompleted) {
      const lastDates = roundMatchDates(lastCompleted);
      if (lastDates.length > 0) {
        let holdUntil = moment.max(lastDates).clone().startOf("day").add(PLAYOFF_ROUND_HOLD_DAYS, "days");
        const nextDates = roundMatchDates(nextToPlay);
        if (nextDates.length > 0) {
          const lastHoldDayBeforeNext = moment
            .min(nextDates)
            .clone()
            .startOf("day")
            .subtract(PLAYOFF_NEXT_ROUND_LEAD_DAYS + 1, "days");
          if (lastHoldDayBeforeNext.isBefore(holdUntil)) holdUntil = lastHoldDayBeforeNext;
        }
        if (!now.clone().startOf("day").isAfter(holdUntil)) return lastCompleted;
      }
    }
    return nextToPlay;
  }

  return (
    chronological
      .slice()
      .reverse()
      .find((r) => r.matchesPlayoff.length > 0) ?? null
  );
};

export const roundToSimplifiedMatches = (round: RoundCup): SimplifiedMatch[] =>
  round.matchesPlayoff.flatMap((m) => {
    const matches: SimplifiedMatch[] = [convertToSimplifiedMatch(m.homeMatch)];
    if (round.doubleMatch && m.awayMatch) {
      matches.push(convertToSimplifiedMatch(m.awayMatch));
    }
    return matches;
  });

// Single match phases
export const SINGLE_MATCH_HOLD_DAYS = 3;
export const SINGLE_MATCH_LEAD_DAYS = 7;

export const singleMatchPhaseMatches = (rounds: RoundCup[]): SimplifiedMatch[] =>
  rounds.flatMap(roundToSimplifiedMatches);

/** Shown if it has a match close to today, or pending matches when no other phase is in progress. */
export const isSingleMatchPhaseCurrent = (
  matches: SimplifiedMatch[],
  noOtherPhaseInProgress: boolean,
  now: Moment = moment()
): boolean => {
  if (matches.length === 0) return false;
  const from = now.clone().startOf("day").subtract(SINGLE_MATCH_HOLD_DAYS, "days");
  const to = now.clone().endOf("day").add(SINGLE_MATCH_LEAD_DAYS, "days");
  const inWindow = matches.some((m) => {
    const d = m.date ? moment(m.date) : null;
    return !!d && d.isValid() && d.isBetween(from, to, undefined, "[]");
  });
  const hasPending = matches.some((m) => m.status !== MatchStatus.JUGADO);
  return inWindow || (hasPending && noOtherPhaseInProgress);
};
