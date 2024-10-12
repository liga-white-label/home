import React from 'react';
import { Box, Typography, Grid, Paper, Divider, Container } from '@mui/material';
import {Moment} from 'moment';
import { TeamBox, FinalTeamBox, InvertedTeamBox } from './TeamBox';

export enum MatchStatus {
  PENDING = 'Upcoming',
  PLAYED = 'Played',
  IN_PROGRESS = 'Suspended',
}

export interface Match {
  date: Moment;
  dateNumber: number;
  field: string;
  linemenTeam: string;
  scorer: string;
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

export interface Team {
  id: string;
  name: string;
  gender: string;
  logo: string;
  categoryName: string | null;
  leagueName: string | null;
}

export interface RoundMatch {
  id: string;
  awayMatch: Match;
  homeMatch: Match;
  teamWinner?: Team | null;
  nextMatchId: string;
}

export interface Round {
  matchesPlayoff: RoundMatch[];
}

interface CuadroPlayoffProps {
  rondas: Round[];
}

const CuadroPlayoff: React.FC<CuadroPlayoffProps> = ({ rondas }) => {
  const teams = {
    r16_left: rondas[3].matchesPlayoff.filter((_, i) => i < 4),
    r16_right: rondas[3].matchesPlayoff.filter((_, i) => i >= 4),
    qf_left: rondas[2].matchesPlayoff.filter((_, i) => i < 2),
    qf_right: rondas[2].matchesPlayoff.filter((_, i) => i >= 2),
    sf_left: rondas[1].matchesPlayoff.filter((_, i) => i < 1),
    sf_right: rondas[1].matchesPlayoff.filter((_, i) => i >= 1),
    f: rondas[0],
  };

  return (
    <>
      <Box className="bg-[url('/assets/background/soccer_background.jpg')] bg-cover overflow-auto">
        <Box className="relative h-[600px] w-[1350px] ">
          {/* Round of 16 - Left */}
          {teams.r16_left.map((match, i) => (
            <Box
              key={`r16-left-${i}`}
              className="absolute"
              style={{ top: `${i * 110 + 20}px`, left: '10px' }}
            >
              <TeamBox
                homeTeam={match.teamWinner ? match.teamWinner : match.homeMatch?.homeTeam}
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
          {teams.qf_left.map((match, i) => (
            <Box
              key={`qf-left-${i}`}
              className="absolute"
              style={{ top: `${i * 220 + 75}px`, left: '240px' }}
            >
              <TeamBox
                homeTeam={match.teamWinner ? match.teamWinner : match.homeMatch?.homeTeam}
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
          {teams.sf_left.map((match, i) => (
            <Box
              key={`sf-left-${i}`}
              className="absolute"
              style={{ top: `${i * 440 + 185}px`, left: '400px' }}
            >
              <TeamBox
                homeTeam={match.teamWinner ? match.teamWinner : match.homeMatch?.homeTeam}
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
          <Box className="absolute" style={{ top: '90px', left: '580px' }}>
            <FinalTeamBox
              nameHome={teams.f.matchesPlayoff[0].homeMatch?.homeTeam}
              nameAway={teams.f.matchesPlayoff[0].homeMatch?.awayTeam}
              resultHome={teams.f.matchesPlayoff[0].homeMatch?.homeTeamGoals}
              resultAway={teams.f.matchesPlayoff[0].awayMatch?.homeTeamGoals}
            />
          </Box>

          {/* Semi-finals - Right */}
          {teams.sf_right.map((match, i) => (
            <Box
              key={`sf-right-${i}`}
              className="absolute"
              style={{ top: `${i * 440 + 185}px`, left: '760px' }}
            >
              <InvertedTeamBox
                homeTeam={match.teamWinner ? match.teamWinner : match.homeMatch?.homeTeam}
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

          {/* Quarter-finals - Right */}
          {teams.qf_right.map((match, i) => (
            <Box
              key={`qf-right-${i}`}
              className="absolute"
              style={{ top: `${i * 220 + 75}px`, left: '900px' }}
            >
              <InvertedTeamBox
                homeTeam={match.teamWinner ? match.teamWinner : match.homeMatch?.homeTeam}
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

          {/* Round of 16 - Right */}
          {teams.r16_right.map((match, i) => (
            <Box
              key={`r16-right-${i}`}
              className="absolute"
              style={{ top: `${i * 110 + 20}px`, left: '1150px' }}
            >
              <InvertedTeamBox
                homeTeam={!!match.teamWinner ? match.teamWinner : match.homeMatch?.homeTeam}
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
        </Box>
      </Box>
    </>
  );
};

export default CuadroPlayoff;
