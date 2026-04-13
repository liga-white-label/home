import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
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
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      bgcolor={status === MatchStatus.JUGADO ? "black" : "gray"}
      px={isSmallDevice ? 1 : 2}
      py={isSmallDevice ? 0.5 : 1}
      borderRadius="4px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minWidth={isSmallDevice ? 50 : 70}
      sx={{
        transition: "all 0.2s ease",
        position: "relative",
        "&:after": isSmallDevice
          ? {
              content: "''",
              position: "absolute",
              bottom: -2,
              left: "50%",
              transform: "translateX(-50%)",
              width: "30%",
              height: 2,
              backgroundColor: "var(--color-primary)",
              borderRadius: 1,
            }
          : {},
      }}
    >
      <Typography
        variant="body2"
        color="white"
        fontWeight="bold"
        textAlign="center"
      >
        {status === MatchStatus.JUGADO
          ? `${homeTeamGoals ?? 0} - ${awayTeamGoals ?? 0}`
          : !!date && moment(date).isValid()
          ? moment(date).format("HH:mm")
          : "-"}
      </Typography>
    </Box>
  );
};
