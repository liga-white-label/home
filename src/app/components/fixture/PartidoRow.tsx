"use client";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { TableCell, TableRow, useMediaQuery, useTheme } from "@mui/material";
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

  const rowBg = index % 2 === 0 ? "#111" : "#151515";

  return (
    <TableRow
      style={{ backgroundColor: rowBg }}
      sx={{
        "&:hover": { backgroundColor: "#1a1a1a" },
        transition: "background-color 0.15s ease",
      }}
    >
      <TableCell
        sx={{
          width: isSmallDevice ? "0%" : "15%",
          padding: isSmallDevice ? "8px 4px" : undefined,
          borderBottom: "1px solid #1f1f1f",
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
          borderBottom: "1px solid #1f1f1f",
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
          borderBottom: "1px solid #1f1f1f",
        }}
        onClick={
          isSmallDevice
            ? () => {
                if (match.homeTeamId !== undefined && match.awayTeamId !== undefined) {
                  handleClickSeeMatch(match);
                }
              }
            : undefined
        }
        style={
          isSmallDevice
            ? {
                cursor:
                  match.homeTeamId !== undefined && match.awayTeamId !== undefined
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
          borderBottom: "1px solid #1f1f1f",
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
          borderBottom: "1px solid #1f1f1f",
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
          borderBottom: "1px solid #1f1f1f",
        }}
      >
        <LoadingButton
          onClick={() => handleClickSeeMatch(match)}
          loading={isLoadingMatch}
          startIcon={<VisibilityIcon />}
          sx={{
            color: "#9ca3af",
            minWidth: 0,
            "&:hover": { color: "white" },
          }}
          disabled={match.homeTeamId === undefined || match.awayTeamId === undefined}
        >
          {!isSmallDevice && (
            <span style={{ fontSize: "0.875rem", display: isSmallDevice ? "none" : "block" }}>
              Ver
            </span>
          )}
        </LoadingButton>
      </TableCell>
    </TableRow>
  );
};
