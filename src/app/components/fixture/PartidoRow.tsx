"use client";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  TableCell,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FC } from "react";
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
  const theme = useTheme();
  const isLessThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TableRow
      style={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white" }}
    >
      <TableCell
        sx={{
          width: isSmallDevice ? "0%" : "15%",
          padding: isSmallDevice ? "8px 4px" : undefined,
        }}
      >
        <MatchDate date={match.date} isLessThanMd={isLessThanMd} />
      </TableCell>
      <TableCell
        sx={{
          width: isSmallDevice ? "28%" : "30%",
          pr: isSmallDevice ? 1 : 3,
          padding: isSmallDevice ? "8px 4px" : undefined,
          textAlign: "right",
        }}
      >
        <TeamInfo teamName={match.homeTeamName} teamLogo={match.homeTeamLogo} />
      </TableCell>
      <TableCell
        sx={{
          width: isSmallDevice ? "14%" : "10%",
          px: 0,
          padding: isSmallDevice ? "8px 2px" : undefined,
          textAlign: "center",
        }}
        onClick={
          isSmallDevice
            ? () => {
                if (
                  match.homeTeamId !== undefined &&
                  match.awayTeamId !== undefined
                ) {
                  handleClickSeeMatch(match);
                }
              }
            : undefined
        }
        style={
          isSmallDevice
            ? {
                cursor:
                  match.homeTeamId !== undefined &&
                  match.awayTeamId !== undefined
                    ? "pointer"
                    : "default",
              }
            : undefined
        }
      >
        <MatchScore
          status={match.status}
          date={match.date}
          homeTeamGoals={match.homeTeamGoals}
          awayTeamGoals={match.awayTeamGoals}
        />
      </TableCell>
      <TableCell
        sx={{
          width: isSmallDevice ? "28%" : "30%",
          pl: isSmallDevice ? 1 : 3,
          padding: isSmallDevice ? "8px 4px" : undefined,
          textAlign: "left",
        }}
      >
        <TeamInfo
          teamName={match.awayTeamName}
          teamLogo={match.awayTeamLogo}
          isReverse
        />
      </TableCell>
      <TableCell
        sx={{
          width: isSmallDevice ? "10%" : "10%",
          padding: isSmallDevice ? "8px 2px" : undefined,
          textAlign: "center",
          display: isSmallDevice ? "none" : "table-cell",
        }}
      >
        <MatchField field={match.field} isLessThanMd={isLessThanMd} />
      </TableCell>
      <TableCell
        sx={{
          width: isSmallDevice ? "5%" : "5%",
          padding: isSmallDevice ? "8px 2px" : undefined,
          textAlign: "right",
          display: isSmallDevice ? "none" : "table-cell",
        }}
      >
        <LoadingButton
          onClick={() => handleClickSeeMatch(match)}
          loading={isLoadingMatch}
          startIcon={<VisibilityIcon />}
          sx={{
            color: "black",
            minWidth: 0,
          }}
          disabled={
            match.homeTeamId === undefined || match.awayTeamId === undefined
          }
        >
          {!isSmallDevice && (
            <Typography
              variant="body2"
              noWrap
              display={{ xs: "none", sm: "block" }}
            >
              Ver
            </Typography>
          )}
        </LoadingButton>
      </TableCell>
    </TableRow>
  );
};
