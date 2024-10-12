import Image from "next/image";
import StadiumOutlinedIcon from "@mui/icons-material/StadiumOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { abbreviateTeamName } from "../utils/stringUtils";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Team } from "../models/Team";

export interface RegularMatch {
  equipoLocal: Team;
  equipoVisitante: Team;
}
interface PartidosPorDiaProps {
  matches: RegularMatch[];
  handleClickSeeMatch: (match: RegularMatch) => void;
}
export const PartidosPorDiaV2: React.FC<PartidosPorDiaProps> = ({
  matches,
  handleClickSeeMatch,
}) => {
  return (
    <Table>
      <TableBody>
        {matches.map((match, index) => (
          <TableRow
            key={index}
            style={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white" }}
          >
            <TableCell
              sx={{
                px: { sm: "5%", md: "10%" },
              }}
            >
              <Box display="flex" alignItems="center">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                  gap="10px"
                  sx={{
                    width: {
                      sm: "30%",
                      md: "35%",
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    noWrap
                    sx={{ display: { xs: "none", sm: "block" } }}
                  >
                    {match.equipoLocal.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    noWrap
                    sx={{ display: { xs: "block", sm: "none" } }}
                  >
                    {abbreviateTeamName(match.equipoLocal.name || "")}
                  </Typography>
                  <Image
                    src={
                      match.equipoLocal.logoUrl.includes("https://")
                        ? match.equipoLocal.logoUrl
                        : "https://" + match.equipoLocal.logoUrl
                    }
                    height={20}
                    width={30}
                    alt={match.equipoLocal.name}
                  />
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ minWidth: 100, width: "fit-content", px: 1 }}
                >
                  {match?.score1 !== undefined ||
                  match?.score2 !== undefined ? (
                    <Box bgcolor="#A60000" px={2} py={1} borderRadius="4px">
                      <Typography
                        variant="body2"
                        color="white"
                        fontWeight="bold"
                        textAlign="center"
                      >{`${match?.score1} - ${match?.score2}`}</Typography>
                    </Box>
                  ) : (
                    <Box
                      bgcolor="gray"
                      px={2}
                      py={1}
                      borderRadius="4px"
                      width="56px"
                    >
                      <Typography
                        variant="body2"
                        color="white"
                        fontWeight="bold"
                        textAlign="center"
                      >
                        {match?.time}
                      </Typography>
                    </Box>
                  )}
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  gap="10px"
                  sx={{
                    width: {
                      sm: "30%",
                      md: "35%",
                    },
                  }}
                >
                  <Image
                    src={
                      match.equipoVisitante.logoUrl.includes("https://")
                        ? match.equipoVisitante.logoUrl
                        : "https://" + match.equipoVisitante.logoUrl
                    }
                    height={20}
                    width={30}
                    alt={match.equipoVisitante.name}
                  />
                  <Typography
                    variant="body1"
                    noWrap
                    sx={{ display: { xs: "none", sm: "block" } }}
                  >
                    {match.equipoVisitante.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    noWrap
                    sx={{ display: { xs: "block", sm: "none" } }}
                  >
                    {abbreviateTeamName(match.equipoVisitante.name || "")}
                  </Typography>
                </Box>

                <Box
                  display={{ xs: "none", md: "flex" }}
                  alignItems="center"
                  gap="10px"
                  width="20%"
                >
                  <StadiumOutlinedIcon />
                  <Typography variant="body2">{match.cancha}</Typography>
                </Box>

                <Box
                  alignItems="center"
                  gap="10px"
                  alignSelf={"flex-end"}
                  sx={{ width: "object-fit" }}
                  display={"flex"}
                >
                  <IconButton onClick={() => handleClickSeeMatch(match)}>
                    <VisibilityIcon />
                  </IconButton>
                  <Typography
                    variant="body2"
                    noWrap
                    display={{ xs: "none", sm: "block" }}
                  >
                    Ver
                  </Typography>
                </Box>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
