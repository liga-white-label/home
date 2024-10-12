import { Box, Divider } from '@mui/material';
import { Team } from './CuadroPlayoff';
import { ResultBox, InvertedResultBox } from './ResultBox';

interface TeamBoxProps {
  homeTeam?: Team;
  resultHomeIda?: number | null;
  resultHomeVuelta?: number | null;
  awayTeam?: Team;
  resultAwayIda?: number | null;
  resultAwayVuelta?: number | null;
}

export const TeamBox: React.FC<TeamBoxProps> = ({
  homeTeam,
  resultHomeIda,
  resultHomeVuelta,
  awayTeam,
  resultAwayIda,
  resultAwayVuelta,
}) => (
  <Box className="flex flex-col bg-[#24598f] text-white w-48 relative">
    <ResultBox team={homeTeam} resultIda={resultHomeIda} resultVuelta={resultHomeVuelta} />
    <Divider className="bg-white" />
    <ResultBox team={awayTeam} resultIda={resultAwayIda} resultVuelta={resultAwayVuelta} />
  </Box>
);

export const InvertedTeamBox: React.FC<TeamBoxProps> = ({
  homeTeam,
  resultHomeIda,
  resultHomeVuelta,
  awayTeam,
  resultAwayIda,
  resultAwayVuelta,
}) => {
  return (
    <Box className="flex flex-col bg-[#24598f] text-white w-48 relative">
      <InvertedResultBox
        team={homeTeam}
        resultIda={resultHomeIda}
        resultVuelta={resultHomeVuelta}
      />
      <Divider className="bg-white" />
      <InvertedResultBox
        team={awayTeam}
        resultIda={resultAwayIda}
        resultVuelta={resultAwayVuelta}
      />
    </Box>
  );
};

export const FinalTeamBox: React.FC<{
  nameHome?: Team;
  resultHome?: number | null;
  penaltyResultHome?: number | null;
  nameAway?: Team;
  resultAway?: number | null;
  penaltyResultAway?: number | null;
}> = ({ nameHome, resultHome, penaltyResultHome, nameAway, resultAway, penaltyResultAway }) => (
  <Box className="flex flex-col bg-[#24598f] text-white w-48 relative">
    <ResultBox team={nameHome} resultIda={resultHome} resultPenales={penaltyResultHome} />
    <Divider className="bg-white" />
    <ResultBox team={nameAway} resultIda={resultAway} resultPenales={penaltyResultAway} />
  </Box>
);
