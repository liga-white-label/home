import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FC, useEffect, useState } from "react";
import { MatchDate } from "./match-row/MatchDate";
import { TeamInfo } from "./match-row/TeamInfo";
import { MatchScore } from "./match-row/MatchScore";
import { MatchField } from "./match-row/MatchField";
import { SimplifiedMatch } from "@/app/models/Match";

interface PartidoRowProps {
  match: SimplifiedMatch;
  handleClickSeeMatch: (match: SimplifiedMatch) => void;
  isLoadingMatch: boolean;
  index: number;
}

export const PartidoRow: FC<PartidoRowProps> = ({
  match,
  handleClickSeeMatch,
  isLoadingMatch,
  index,
}) => {
  const [isLessThanMd, setIsLessThanMd] = useState(window.innerWidth < 960);

  useEffect(() => {
    const handleResize = () => {
      setIsLessThanMd(window.innerWidth < 960);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <TableRow
      style={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white" }}
    >
      <TableCell width="15%">
        <MatchDate date={match.date} isLessThanMd={isLessThanMd} />
      </TableCell>
      <TableCell width="30%" align="right" sx={{ pr: 3 }}>
        <TeamInfo teamName={match.homeTeamName} teamLogo={match.homeTeamLogo} />
      </TableCell>
      <TableCell width="10%" align="center" sx={{ px: 0 }}>
        <MatchScore
          status={match.status}
          date={match.date}
          homeTeamGoals={match.homeTeamGoals}
          awayTeamGoals={match.awayTeamGoals}
        />
      </TableCell>
      <TableCell width="30%" align="left" sx={{ pl: 3 }}>
        <TeamInfo
          teamName={match.awayTeamName}
          teamLogo={match.awayTeamLogo}
          isReverse
        />
      </TableCell>
      <TableCell width="10%" align="center">
        <MatchField field={match.field} isLessThanMd={isLessThanMd} />
      </TableCell>
      <TableCell width="5%" align="right">
        <LoadingButton
          onClick={() => handleClickSeeMatch(match)}
          loading={isLoadingMatch}
          startIcon={<VisibilityIcon />}
          sx={{ color: "black", minWidth: 0 }}
          disabled={
            match.homeTeamId === undefined || match.awayTeamId === undefined
          }
        >
          <Typography
            variant="body2"
            noWrap
            display={{ xs: "none", sm: "block" }}
          >
            Ver
          </Typography>
        </LoadingButton>
      </TableCell>
    </TableRow>
  );
};
