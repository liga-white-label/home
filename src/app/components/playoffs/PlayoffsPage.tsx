import React from "react";
import { Box } from "@mui/material";
import { TeamBox, FinalTeamBox } from "./TeamBox";
import {
  RoundMatch,
  useOneFasePlayoffQuery,
} from "@/repositories/CategoriaRepository";
import LoadingScreen from "../loading/Loading";
import { MatchStatus } from "@/app/models/Match";
import ErrorPage from "../ErrorPage";
interface CuadroPlayoffProps {
  faseId: string;
}

const CuadroPlayoffV2: React.FC<CuadroPlayoffProps> = ({ faseId }) => {
  const { data: fase, isLoading, isError } = useOneFasePlayoffQuery(faseId);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorPage />;

  console.log(fase);

  const matches: Record<string, RoundMatch[]> = {
    r16: fase[3]?.matchesPlayoff || null,
    qf: fase[2]?.matchesPlayoff || null,
    sf: fase[1]?.matchesPlayoff || null,
    f: fase[0]?.matchesPlayoff || null,
  };

  return (
    <>
      <Box className="bg-[url('/assets/background/soccer_background.jpg')] bg-cover overflow-scroll relative h-[950px] ">
        {/* Round of 16 - Left */}
        {matches.r16.map((match, i) => (
          <Box
            key={`r16-left-${i}`}
            className="absolute"
            style={{ top: `${i * 110 + 60}px`, left: "100px" }}
          >
            <TeamBox
              homeTeam={
                match.teamWinner ? match.teamWinner : match.homeMatch?.homeTeam
              }
              awayTeam={match.homeMatch?.awayTeam}
              resultHomeIda={
                match.homeMatch?.status !== MatchStatus.PLAYED
                  ? undefined
                  : match.homeMatch?.homeTeamGoals
              }
              resultHomeVuelta={
                match.homeMatch?.status !== MatchStatus.PLAYED
                  ? undefined
                  : match.homeMatch?.awayTeamGoals
              }
              resultAwayIda={
                match.awayMatch?.status !== MatchStatus.PLAYED
                  ? undefined
                  : match.awayMatch?.homeTeamGoals
              }
              resultAwayVuelta={
                match.awayMatch?.status !== MatchStatus.PLAYED
                  ? undefined
                  : match.awayMatch?.awayTeamGoals
              }
            />
          </Box>
        ))}

        {/* Quarter-finals - Left */}
        {matches.qf.map((match, i) => (
          <Box
            key={`qf-left-${i}`}
            className="absolute"
            style={{ top: `${i * 220 + 115}px`, left: "350px" }}
          >
            <TeamBox
              homeTeam={
                match.teamWinner ? match.teamWinner : match.homeMatch?.homeTeam
              }
              awayTeam={match.homeMatch?.awayTeam}
              resultHomeIda={
                match.homeMatch?.status !== MatchStatus.PLAYED
                  ? undefined
                  : match.homeMatch?.homeTeamGoals
              }
              resultHomeVuelta={
                match.homeMatch?.status !== MatchStatus.PLAYED
                  ? undefined
                  : match.homeMatch?.awayTeamGoals
              }
              resultAwayIda={
                match.awayMatch?.status !== MatchStatus.PLAYED
                  ? undefined
                  : match.awayMatch?.homeTeamGoals
              }
              resultAwayVuelta={
                match.awayMatch?.status !== MatchStatus.PLAYED
                  ? undefined
                  : match.awayMatch?.awayTeamGoals
              }
            />
          </Box>
        ))}

        {/* Semi-finals - Left */}
        {matches.sf.map((match, i) => (
          <Box
            key={`sf-left-${i}`}
            className="absolute"
            style={{ top: `${i * 440 + 225}px`, left: "600px" }}
          >
            <TeamBox
              homeTeam={
                match.teamWinner ? match.teamWinner : match.homeMatch?.homeTeam
              }
              awayTeam={match.homeMatch?.awayTeam}
              resultHomeIda={
                match.homeMatch?.status !== MatchStatus.PLAYED
                  ? undefined
                  : match.homeMatch?.homeTeamGoals
              }
              resultHomeVuelta={
                match.homeMatch?.status !== MatchStatus.PLAYED
                  ? undefined
                  : match.homeMatch?.awayTeamGoals
              }
              resultAwayIda={
                match.awayMatch?.status !== MatchStatus.PLAYED
                  ? undefined
                  : match.awayMatch?.homeTeamGoals
              }
              resultAwayVuelta={
                match.awayMatch?.status !== MatchStatus.PLAYED
                  ? undefined
                  : match.awayMatch?.awayTeamGoals
              }
            />
          </Box>
        ))}

        {/* Final */}
        <Box
          className="absolute"
          style={{ top: "440px", left: "800px", paddingRight: "100px" }}
        >
          <FinalTeamBox
            nameHome={matches.f[0].homeMatch?.homeTeam}
            nameAway={matches.f[0].homeMatch?.awayTeam}
            resultHome={matches.f[0].homeMatch?.homeTeamGoals}
            resultAway={matches.f[0].awayMatch?.homeTeamGoals}
          />
        </Box>
      </Box>
    </>
  );
};

export default CuadroPlayoffV2;
