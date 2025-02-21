import React from "react";
import { Box } from "@mui/material";
import { FinalTeamBox, InvertedTeamBox, TeamBox } from "./TeamBox";
import {
  calculateLeftPosition,
  calculateRightPosition,
  calculateScreenHeight,
  getFinalPosition,
} from "./CuadroPlayoffUtils";
import { RoundCup, RoundMatch } from "@/app/models/FaseCampeonato";
import { MatchStatus } from "@/app/models/Match";
import PlayoffArrows from "./PlayoffArrows";

interface CuadroPlayoffProps {
  rondas: RoundCup[];
}

const CuadroPlayoff: React.FC<CuadroPlayoffProps> = ({ rondas }) => {
  if (!rondas || !Array.isArray(rondas) || rondas.length === 0) {
    return <div>No hay rondas disponibles</div>;
  }

  const firstRound = rondas[0];
  if (!firstRound || !firstRound.matchesPlayoff) {
    return <div>Formato de ronda inválido</div>;
  }

  const doubleMatch = firstRound.doubleMatch || false;
  const finalMatch = firstRound.matchesPlayoff[0] || {
    homeMatch: {},
    awayMatch: {},
  };

  const roundsWithoutFinal = rondas
    .slice(1)
    .reverse()
    .map((ronda) => ronda?.matchesPlayoff || []);

  /**
   * Divide the left brach rounds from the rigth branch rounds
   */
  const divideRounds = (
    rounds: RoundMatch[][]
  ): { leftRounds: RoundMatch[][]; rightRounds: RoundMatch[][] } => {
    const leftRounds: RoundMatch[][] = [];
    let rightRounds: RoundMatch[][] = [];

    rounds.forEach((roundMatches) => {
      const midIndex = Math.ceil(roundMatches.length / 2); // Find the middle point
      leftRounds.push(roundMatches.slice(0, midIndex));
      rightRounds.push(roundMatches.slice(midIndex));
    });

    rightRounds = rightRounds.slice().reverse();

    return { leftRounds, rightRounds };
  };

  const { leftRounds, rightRounds } = divideRounds(roundsWithoutFinal);

  const screenHeight = calculateScreenHeight(leftRounds.length);
  const screenClassName = `bg-cover overflow-x-scroll overflow-y-scroll relative w-full`;

  const getLeftForCenterElements = () => {
    const options = {
      semi: `${150}px`,
      final: `${400}px`,
    };

    if (leftRounds.length === 1) {
      // semis
      return options.semi;
    } else if (leftRounds.length === 0) {
      // final
      return options.final;
    } else {
      return "";
    }
  };

  return (
    <>
      <Box
        className={screenClassName}
        style={{
          height: `${screenHeight}px`,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/assets/category_banner.jpg')`,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            position: "relative",
            minWidth: "fit-content",
            width: "100%",
            height: "100%",
          }}
        >
          {leftRounds.map((matches, roundIndex) =>
            matches.map((match, matchIndex) => (
              <Box
                component="div"
                id={`match-${match.id}`}
                key={`round-${roundIndex}-match-${matchIndex}`}
                className="absolute"
                style={calculateLeftPosition(
                  matchIndex,
                  roundIndex,
                  leftRounds.length
                )}
              >
                <TeamBox
                  doubleMatch={doubleMatch}
                  homeTeam={
                    match.teamWinner
                      ? match.teamWinner
                      : match.homeMatch?.homeTeam
                  }
                  awayTeam={match.homeMatch?.awayTeam}
                  resultHomeIda={
                    match.homeMatch?.status === MatchStatus.JUGADO
                      ? match.homeMatch?.homeTeamGoals
                      : null
                  }
                  resultHomeVuelta={
                    match.awayMatch?.status === MatchStatus.JUGADO
                      ? match.awayMatch?.homeTeamGoals
                      : null
                  }
                  resultAwayIda={
                    match.homeMatch?.status === MatchStatus.JUGADO
                      ? match.homeMatch?.awayTeamGoals
                      : null
                  }
                  resultAwayVuelta={
                    match.awayMatch?.status === MatchStatus.JUGADO
                      ? match.awayMatch?.awayTeamGoals
                      : null
                  }
                  resultHomePenales={match.homeTeamPenalties}
                  resultAwayPenales={match.awayTeamPenalties}
                  idaMatchStatus={match.homeMatch?.status}
                  vueltaMatchStatus={match.awayMatch?.status}
                />
              </Box>
            ))
          )}

          {finalMatch && (
            <Box
              component="div"
              id={`match-${finalMatch.id}`}
              className="absolute"
              style={getFinalPosition(leftRounds.length)}
            >
              <FinalTeamBox
                doubleMatch={doubleMatch}
                nameHome={finalMatch.homeMatch?.homeTeam}
                nameAway={finalMatch.homeMatch?.awayTeam}
                resultHomeIda={
                  finalMatch.homeMatch?.status === MatchStatus.JUGADO
                    ? finalMatch.homeMatch?.homeTeamGoals
                    : null
                }
                resultHomeVuelta={
                  finalMatch.awayMatch?.status === MatchStatus.JUGADO
                    ? finalMatch.awayMatch?.homeTeamGoals
                    : null
                }
                resultAwayIda={
                  finalMatch.homeMatch?.status === MatchStatus.JUGADO
                    ? finalMatch.homeMatch?.awayTeamGoals
                    : null
                }
                resultAwayVuelta={
                  finalMatch.awayMatch?.status === MatchStatus.JUGADO
                    ? finalMatch.awayMatch?.awayTeamGoals
                    : null
                }
                penaltyResultHome={finalMatch.homeTeamPenalties}
                penaltyResultAway={finalMatch.awayTeamPenalties}
                idaMatchStatus={finalMatch.homeMatch?.status}
                vueltaMatchStatus={finalMatch.awayMatch?.status}
              />
            </Box>
          )}

          {rightRounds.map((matches, roundIndex) =>
            matches.map((match, matchIndex) => (
              <Box
                component="div"
                id={`match-${match.id}`}
                key={`round-${roundIndex}-match-${matchIndex}`}
                className="absolute"
                style={calculateRightPosition(
                  matchIndex,
                  roundIndex,
                  leftRounds.length
                )}
              >
                <InvertedTeamBox
                  doubleMatch={doubleMatch}
                  homeTeam={
                    match.teamWinner
                      ? match.teamWinner
                      : match.homeMatch?.homeTeam
                  }
                  awayTeam={match.homeMatch?.awayTeam}
                  resultHomeIda={
                    match.homeMatch?.status === MatchStatus.JUGADO
                      ? match.homeMatch?.homeTeamGoals
                      : null
                  }
                  resultHomeVuelta={
                    match.awayMatch?.status === MatchStatus.JUGADO
                      ? match.awayMatch?.homeTeamGoals
                      : null
                  }
                  resultAwayIda={
                    match.homeMatch?.status === MatchStatus.JUGADO
                      ? match.homeMatch?.awayTeamGoals
                      : null
                  }
                  resultAwayVuelta={
                    match.awayMatch?.status === MatchStatus.JUGADO
                      ? match.awayMatch?.awayTeamGoals
                      : null
                  }
                  resultHomePenales={match.homeTeamPenalties}
                  resultAwayPenales={match.awayTeamPenalties}
                  idaMatchStatus={match.homeMatch?.status}
                  vueltaMatchStatus={match.awayMatch?.status}
                />
              </Box>
            ))
          )}

          <PlayoffArrows
            leftRounds={leftRounds}
            rightRounds={rightRounds}
            finalMatchId={finalMatch?.id}
          />
        </div>
      </Box>
    </>
  );
};

export default CuadroPlayoff;
