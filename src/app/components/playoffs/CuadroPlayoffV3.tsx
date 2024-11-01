import React from "react";
import { Box } from "@mui/material";
import { FinalTeamBox, TeamBox } from "./TeamBox";
import { MatchStatus } from "@/app/models/Match";
import { RoundMatch } from "@/repositories/CategoriaRepository";

export interface Round {
  matchesPlayoff: RoundMatch[];
  roundNumber?: number; // Indicates the number of RoundMatch that will have this Round
}

interface CuadroPlayoffProps {
  rondas: Round[];
}

const CuadroPlayoffV3: React.FC<CuadroPlayoffProps> = ({ rondas }) => {
  const finalMatch = rondas[0]?.matchesPlayoff[0] || {
    homeMatch: {},
    awayMatch: {},
  }; // At least always will have the final
  const otherRounds = rondas
    .slice(1)
    .reverse()
    .map((ronda) => ronda?.matchesPlayoff || []); // Remove the final and reverse
  const otherRounds2 = otherRounds.slice(1);

  const matches = {
    r32:
      rondas[3]?.matchesPlayoff.concat(rondas[3]?.matchesPlayoff || []) || [],
    r16: rondas[3]?.matchesPlayoff || [],
    qf: rondas[2]?.matchesPlayoff || [],
    sf: rondas[1]?.matchesPlayoff || [],
    f: rondas[0]?.matchesPlayoff[0] || { homeMatch: {}, awayMatch: {} },
  };

  const calculatePosition = (matchIndex: number, roundIndex: number) => {
    const leftOffset = 100 + roundIndex * 250; // Adjust horizontal space between rounds
    const initialTopPos = 110 * Math.pow(2, roundIndex);
    const midTopCalculatedPos = initialTopPos / 2 + 5;
    const topOffset = matchIndex * initialTopPos + midTopCalculatedPos; // Dynamic vertical spacing based on round and match
    return { left: `${leftOffset}px`, top: `${topOffset}px` };
  };

  const totalRounds = otherRounds.length + 1;
  const getFinalPosition = () => {
    const leftOffset = 100 + (totalRounds - 1) * 250; // Horizontal space based on number of rounds
    const topOffset =
      totalRounds === 1 ? 110 : 110 * Math.pow(2, totalRounds - 2);
    return {
      left: `${leftOffset}px`,
      top: `${topOffset}px`,
      paddingRight: "100px",
    };
  };

  const calculateScreenHeight = () => {
    const initialRoundMatches =
      totalRounds === 1 ? 2 : Math.pow(2, totalRounds - 1);
    const matchHeight = 120;

    return initialRoundMatches * matchHeight + matchHeight / 2;
  };

  const screenHeight = calculateScreenHeight();
  const screenClassName = `bg-[url('/assets/soccer_background.jpg')] bg-cover overflow-x-scroll overflow-y-scroll relative w-full`;

  return (
    <>
      <Box className={screenClassName} style={{ height: `${screenHeight}px` }}>
        {otherRounds.map((matches, roundIndex) =>
          matches.map((match, matchIndex) => (
            <Box
              key={`round-${roundIndex}-match-${matchIndex}`}
              className="absolute"
              style={calculatePosition(matchIndex, roundIndex)}
            >
              <TeamBox
                homeTeam={
                  match.teamWinner
                    ? match.teamWinner
                    : match.homeMatch?.homeTeam
                }
                awayTeam={match.homeMatch?.awayTeam}
                resultHomeIda={
                  match.homeMatch?.status !== MatchStatus.PLAYED
                    ? undefined
                    : match.homeMatch?.homeTeamGoals
                    ? match.homeMatch?.homeTeamGoals
                    : 0
                }
                resultHomeVuelta={
                  match.homeMatch?.status !== MatchStatus.PLAYED
                    ? undefined
                    : match.awayMatch?.awayTeamGoals
                    ? match.awayMatch?.awayTeamGoals
                    : 0
                }
                resultAwayIda={
                  match.awayMatch?.status !== MatchStatus.PLAYED
                    ? undefined
                    : match.awayMatch?.homeTeamGoals
                    ? match.awayMatch?.homeTeamGoals
                    : 0
                }
                resultAwayVuelta={
                  match.awayMatch?.status !== MatchStatus.PLAYED
                    ? undefined
                    : match.awayMatch?.awayTeamGoals
                    ? match.awayMatch?.awayTeamGoals
                    : 0
                }
              />
            </Box>
          ))
        )}

        {finalMatch && (
          <Box className="absolute" style={getFinalPosition()}>
            <FinalTeamBox
              nameHome={finalMatch.homeMatch?.homeTeam}
              nameAway={finalMatch.homeMatch?.awayTeam}
              resultHome={finalMatch.homeMatch?.homeTeamGoals}
              resultAway={finalMatch.awayMatch?.homeTeamGoals}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default CuadroPlayoffV3;
