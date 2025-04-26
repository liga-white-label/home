import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { FC } from "react";
import { LOGO_DEFAULT_TEAM } from "@/app/utils/constants";
import { abbreviateTeamName } from "@/app/utils/stringUtils";

interface TeamInfoProps {
  teamName: string | null;
  teamLogo: string | null;
  isReverse?: boolean;
}

export const TeamInfo: FC<TeamInfoProps> = ({
  teamName,
  teamLogo,
  isReverse = false,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      flexDirection={isReverse ? "row" : "row-reverse"}
    >
      <Image
        src={
          teamLogo
            ? teamLogo.includes("https://")
              ? teamLogo
              : "https://" + teamLogo
            : LOGO_DEFAULT_TEAM
        }
        height={20}
        width={30}
        alt={teamName || "Team Logo"}
      />
      <Typography
        variant="body1"
        noWrap
        sx={{
          display: { xs: "none", sm: "block" },
        }}
      >
        {teamName || "A definir"}
      </Typography>
      <Typography
        variant="body2"
        noWrap
        sx={{
          display: { xs: "block", sm: "none" },
          fontSize: { xs: "0.7rem", sm: "0.875rem" },
          maxWidth: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {teamName || "A definir"}
      </Typography>
    </Box>
  );
};
