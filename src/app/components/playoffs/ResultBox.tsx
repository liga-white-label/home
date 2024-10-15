import { Box, Typography, Divider } from "@mui/material";
import { Team } from "./CuadroPlayoff";
import { abbreviateTeamName } from "@/app/utils/stringUtils";
import Image from "next/image";

interface ResultBoxProps {
  team?: Team;
  resultIda?: number | null;
  resultVuelta?: number | null;
  resultPenales?: number | null;
}

const logo_size = 40;

export const ResultBox: React.FC<ResultBoxProps> = ({
  team,
  resultIda,
  resultPenales,
  resultVuelta,
}) => (
  <Box className="flex gap-2 items-center">
    <Image
      src={
        !!team
          ? team?.logo
          : "https://www.citypng.com/public/uploads/preview/gray-outline-soccer-ball-icon-transparent-background-701751694971930nnc2aptsvc.png"
      }
      height={logo_size}
      width={logo_size}
      className={!!team ? "bg-gray-200" : "bg-black"}
      alt={""}
    />
    <Typography
      variant="body2"
      className="max-w-24 overflow-hidden text-ellipsis line-clamp-1 w-full font-bold capitalize"
    >
      {abbreviateTeamName(team?.name || "")}
    </Typography>
    <Box className="flex items-center">
      <Typography variant="body2" className="absolute right-8">
        {resultIda ?? "-"}
      </Typography>
      <Divider orientation="vertical" flexItem className="bg-white mx-1" />
      <Typography variant="body2" className="absolute right-2">
        {resultVuelta ?? "-"}
      </Typography>
    </Box>
  </Box>
);

export const InvertedResultBox: React.FC<ResultBoxProps> = ({
  team,
  resultIda,
  resultPenales,
  resultVuelta,
}) => (
  <Box className="flex flex-row-reverse gap-2 items-center">
    <Image
      src={
        !!team
          ? team?.logo
          : "https://www.citypng.com/public/uploads/preview/gray-outline-soccer-ball-icon-transparent-background-701751694971930nnc2aptsvc.png"
      }
      height={logo_size}
      width={logo_size}
      className={!!team ? "bg-gray-200" : "bg-black"}
      alt={""}
    />
    <Typography
      variant="body2"
      className="max-w-24 overflow-hidden text-ellipsis line-clamp-1 w-full"
    >
      {abbreviateTeamName(team?.name || "")}
    </Typography>
    <Typography variant="body2" className="absolute left-2">
      {resultIda ?? "-"}
    </Typography>
    <Typography variant="body2" className="absolute left-8">
      {resultVuelta ?? "-"}
    </Typography>
  </Box>
);
