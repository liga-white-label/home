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
  const isLive = status === MatchStatus.JUGANDO;

  return (
    <Box
      bgcolor={status === MatchStatus.JUGADO || isLive ? "var(--color-bg)" : "gray"}
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
        gap: isLive ? 1 : 0,
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
      {isLive && (
        <Box display="flex" alignItems="center" gap={0.5}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
          </span>
          <Typography
            variant="caption"
            fontWeight="bold"
            sx={{ color: "#ef4444", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}
          >
            Vivo
          </Typography>
        </Box>
      )}
      <Typography
        variant="body2"
        color="var(--color-text)"
        fontWeight="bold"
        textAlign="center"
      >
        {status === MatchStatus.JUGADO || isLive
          ? `${homeTeamGoals ?? 0} - ${awayTeamGoals ?? 0}`
          : !!date && moment(date).isValid()
          ? moment(date).format("HH:mm")
          : "-"}
      </Typography>
    </Box>
  );
};
