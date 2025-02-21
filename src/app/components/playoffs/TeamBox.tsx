import { Box, Divider } from "@mui/material";
import { ResultBox, InvertedResultBox } from "./ResultBox";
import { Team } from "@/app/models/Equipo";
import { MatchStatus } from "@/app/models/Match";

interface TeamBoxProps {
  homeTeam?: Team;
  resultHomeIda?: number | null;
  resultHomeVuelta?: number | null;
  awayTeam?: Team;
  resultAwayIda?: number | null;
  resultAwayVuelta?: number | null;
  doubleMatch?: boolean;
  resultHomePenales?: number | null;
  resultAwayPenales?: number | null;
  idaMatchStatus?: MatchStatus;
  vueltaMatchStatus?: MatchStatus;
}

const isDrawInMatches = (
  resultHomeIda?: number | null,
  resultAwayIda?: number | null,
  resultHomeVuelta?: number | null,
  resultAwayVuelta?: number | null,
  doubleMatch?: boolean,
  idaMatchStatus?: MatchStatus,
  vueltaMatchStatus?: MatchStatus
): boolean => {
  if (doubleMatch) {
    return (
      resultHomeIda === resultAwayIda &&
      resultHomeVuelta === resultAwayVuelta &&
      idaMatchStatus === MatchStatus.JUGADO &&
      vueltaMatchStatus === MatchStatus.JUGADO
    );
  }

  return (
    resultHomeIda === resultAwayIda && idaMatchStatus === MatchStatus.JUGADO
  );
};

export const TeamBox: React.FC<TeamBoxProps> = ({
  homeTeam,
  resultHomeIda,
  resultHomeVuelta,
  awayTeam,
  resultAwayIda,
  resultAwayVuelta,
  resultHomePenales,
  resultAwayPenales,
  doubleMatch,
  idaMatchStatus,
  vueltaMatchStatus,
}) => {
  return (
    <Box className="flex flex-col bg-[#a60000cd] text-white w-48 relative">
      <ResultBox
        team={homeTeam}
        resultIda={resultHomeIda}
        resultVuelta={resultHomeVuelta}
        showVuelta={doubleMatch}
        resultPenales={resultHomePenales}
        showPenales={isDrawInMatches(
          resultHomeIda,
          resultAwayIda,
          resultHomeVuelta,
          resultAwayVuelta,
          doubleMatch,
          idaMatchStatus,
          vueltaMatchStatus
        )}
      />
      <Divider className="bg-white" />
      <ResultBox
        team={awayTeam}
        resultIda={resultAwayIda}
        resultVuelta={resultAwayVuelta}
        showVuelta={doubleMatch}
        resultPenales={resultAwayPenales}
        showPenales={isDrawInMatches(
          resultAwayIda,
          resultHomeIda,
          resultAwayVuelta,
          resultHomeVuelta,
          doubleMatch,
          idaMatchStatus,
          vueltaMatchStatus
        )}
      />
    </Box>
  );
};

export const InvertedTeamBox: React.FC<TeamBoxProps> = ({
  homeTeam,
  resultHomeIda,
  resultHomeVuelta,
  awayTeam,
  resultAwayIda,
  resultAwayVuelta,
  resultHomePenales,
  resultAwayPenales,
  doubleMatch,
  idaMatchStatus,
  vueltaMatchStatus,
}) => {
  return (
    <Box className="flex flex-col bg-[#a60000cd] text-white w-48 relative">
      <InvertedResultBox
        team={homeTeam}
        resultIda={resultHomeIda}
        resultVuelta={resultHomeVuelta}
        resultPenales={resultHomePenales}
        showVuelta={doubleMatch}
        showPenales={isDrawInMatches(
          resultHomeIda,
          resultAwayIda,
          resultHomeVuelta,
          resultAwayVuelta,
          doubleMatch,
          idaMatchStatus,
          vueltaMatchStatus
        )}
      />
      <Divider className="bg-white" />
      <InvertedResultBox
        team={awayTeam}
        resultIda={resultAwayIda}
        resultVuelta={resultAwayVuelta}
        resultPenales={resultAwayPenales}
        showVuelta={doubleMatch}
        showPenales={isDrawInMatches(
          resultAwayIda,
          resultHomeIda,
          resultAwayVuelta,
          resultHomeVuelta,
          doubleMatch,
          idaMatchStatus,
          vueltaMatchStatus
        )}
      />
    </Box>
  );
};

export const FinalTeamBox: React.FC<{
  nameHome?: Team;
  resultHomeIda?: number | null;
  resultHomeVuelta?: number | null;
  penaltyResultHome?: number | null;
  nameAway?: Team;
  resultAwayIda?: number | null;
  resultAwayVuelta?: number | null;
  penaltyResultAway?: number | null;
  doubleMatch?: boolean;
  idaMatchStatus?: MatchStatus;
  vueltaMatchStatus?: MatchStatus;
}> = ({
  nameHome,
  resultHomeIda,
  resultHomeVuelta,
  penaltyResultHome,
  nameAway,
  resultAwayIda,
  resultAwayVuelta,
  penaltyResultAway,
  doubleMatch,
  idaMatchStatus,
  vueltaMatchStatus,
}) => (
  <Box className="flex flex-col bg-[#a60000cd] text-white w-48 relative">
    <ResultBox
      team={nameHome}
      resultIda={resultHomeIda}
      resultVuelta={resultHomeVuelta}
      resultPenales={penaltyResultHome}
      showVuelta={doubleMatch}
      showPenales={isDrawInMatches(
        resultHomeIda,
        resultAwayIda,
        resultHomeVuelta,
        resultAwayVuelta,
        doubleMatch,
        idaMatchStatus,
        vueltaMatchStatus
      )}
    />
    <Divider className="bg-white" />
    <ResultBox
      team={nameAway}
      resultIda={resultAwayIda}
      resultVuelta={resultAwayVuelta}
      resultPenales={penaltyResultAway}
      showVuelta={doubleMatch}
      showPenales={isDrawInMatches(
        resultAwayIda,
        resultHomeIda,
        resultAwayVuelta,
        resultHomeVuelta,
        doubleMatch,
        idaMatchStatus,
        vueltaMatchStatus
      )}
    />
  </Box>
);
