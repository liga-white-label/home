import { MatchStatus, SimplifiedMatch, convertToSimplifiedMatch } from "@/app/models/Match";
import { RoundCup } from "@/app/models/FaseCampeonato";

export const getRoundLabel = (roundNumber: number): string => {
  switch (roundNumber) {
    case 32: return "32avos de final";
    case 16: return "16avos de final";
    case 8:  return "Octavos de final";
    case 4:  return "Cuartos de final";
    case 2:  return "Semifinal";
    case 1:  return "Final";
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
