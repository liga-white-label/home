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
import { MatchStatus } from "../models/Match";

export interface RegularMatch {
  equipoLocal: Team;
  equipoVisitante: Team;
}
interface PartidosPorDiaProps {
  matches: any[];
  handleClickSeeMatch: (match: any) => void;
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
              <Box
                display="flex"
                alignItems="center"
                justifyContent={"space-between"}
              >
                <Box width={"100%"} className="flex ">
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
                      width={"40px"}
                      sx={{ display: { xs: "block", sm: "none" } }}
                    >
                      {abbreviateTeamName(match.equipoLocal.name || "")}
                    </Typography>
                    <Image
                      src={
                        match.equipoLocal.logo.includes("https://")
                          ? match.equipoLocal.logo
                          : "https://" + match.equipoLocal.logo
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
                    {match.status === MatchStatus.PLAYED ? (
                      <Box bgcolor="#A60000" px={2} py={1} borderRadius="4px">
                        <Typography
                          variant="body2"
                          color="white"
                          fontWeight="bold"
                          textAlign="center"
                        >{`${match?.golesLocal} - ${match?.golesVisitante}`}</Typography>
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
                          fontSize={8}
                        >
                          {/* reemplazar por hora */}
                          {"A definir"}
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
                        match.equipoVisitante.logo.includes("https://")
                          ? match.equipoVisitante.logo
                          : "https://" + match.equipoVisitante.logo
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
                      width={"40px"}
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
                    <Typography variant="body2">
                      {!!match.cancha ? match.cancha : "A definir"}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  alignItems="center"
                  gap="10px"
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                      borderRadius: "4px",
                    },
                  }}
                  onClick={() => handleClickSeeMatch(match)}
                >
                  <VisibilityIcon />
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
