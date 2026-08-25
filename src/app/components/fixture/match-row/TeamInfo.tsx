import { Box } from "@mui/material";
import Image from "next/image";
import { FC } from "react";
import { LOGO_DEFAULT_TEAM } from "@/app/utils/constants";

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
      minWidth={0}
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
        style={{ flexShrink: 0 }}
        alt={teamName || "Team Logo"}
      />
      <Box
        component="span"
        sx={{
          color: "var(--color-text)",
          fontSize: { xs: "0.8rem", sm: "0.95rem" },
          fontWeight: 500,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          minWidth: 0,
        }}
      >
        {teamName || "A definir"}
      </Box>
    </Box>
  );
};
