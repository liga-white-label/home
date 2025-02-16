import { Box, Typography } from "@mui/material";
import moment from "moment";
import { FC } from "react";
import { MatchStatus } from "@/app/models/Match";

interface MatchScoreProps {
  status: MatchStatus;
  date: moment.Moment | null;
  homeTeamGoals: number | null;
  awayTeamGoals: number | null;
}

export const MatchScore: FC<MatchScoreProps> = ({
  status,
  date,
  homeTeamGoals,
  awayTeamGoals,
}) => {
  return (
    <Box
      bgcolor={status === MatchStatus.JUGADO ? "black" : "gray"}
      px={2}
      py={1}
      borderRadius="4px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minWidth={70}
    >
      <Typography
        variant="body2"
        color="white"
        fontWeight="bold"
        textAlign="center"
      >
        {status === MatchStatus.JUGADO
          ? `${homeTeamGoals ?? 0} - ${awayTeamGoals ?? 0}`
          : date && moment(date).isValid()
          ? date?.format("HH:mm")
          : "A definir"}
      </Typography>
    </Box>
  );
};
