import Image from "next/image";
import StadiumOutlinedIcon from "@mui/icons-material/StadiumOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FC, useEffect, useState } from "react";
import moment from "moment";
import { IndexMatch, MatchStatus } from "@/app/models/Match";
import { LOGO_DEFAULT_TEAM } from "@/app/utils/constants";
import { abbreviateTeamName } from "@/app/utils/stringUtils";
import { CalendarMonth } from "@mui/icons-material";

interface PartidoRowProps {
  match: IndexMatch;
  handleClickSeeMatch: (match: any) => void;
  isLoadingMatch: boolean;
  index: number;
}

export const PartidoRow: FC<PartidoRowProps> = ({
  match,
  handleClickSeeMatch,
  isLoadingMatch,
  index,
}) => {
  const [isLessThanMd, setIsLessThanMd] = useState(window.innerWidth < 960);

  useEffect(() => {
    const handleResize = () => {
      setIsLessThanMd(window.innerWidth < 960);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <TableRow
      style={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white" }}
    >
      <TableCell sx={{ width: "10%", display: isLessThanMd ? "none" : "flex" }}>
        <Box className="flex gap-2 items-center">
          <CalendarMonth />
          <Typography>
            {moment(match.date).isValid()
              ? match?.date?.format("DD/MM/YYYY")
              : "A definir"}
          </Typography>
        </Box>
      </TableCell>
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
          <Box width={"100%"} className="flex">
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
                {match.homeTeamName || "A definir"}
              </Typography>
              <Typography
                variant="body2"
                noWrap
                width={"40px"}
                sx={{ display: { xs: "block", sm: "none" } }}
              >
                {abbreviateTeamName(match.homeTeamName || "")}
              </Typography>
              <Image
                src={
                  match.homeTeamLogo
                    ? match.homeTeamLogo.includes("https://")
                      ? match.homeTeamLogo
                      : "https://" + match.homeTeamLogo
                    : LOGO_DEFAULT_TEAM
                }
                height={20}
                width={30}
                alt={match.homeTeamName}
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
                  >{`${match?.homeTeamGoals} - ${match?.awayTeamGoals}`}</Typography>
                </Box>
              ) : (
                <Box
                  bgcolor="gray"
                  px={2}
                  py={1}
                  borderRadius="4px"
                  width="56px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography
                    variant="body2"
                    color="white"
                    fontWeight="bold"
                    textAlign="center"
                    fontSize={moment(match.date).isValid() ? 12 : 8}
                  >
                    {moment(match.date).isValid()
                      ? match?.date?.format("HH:mm")
                      : "A definir"}
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
                  match.awayTeamLogo
                    ? match.awayTeamLogo.includes("https://")
                      ? match.awayTeamLogo
                      : "https://" + match.awayTeamLogo
                    : LOGO_DEFAULT_TEAM
                }
                height={20}
                width={30}
                alt={match.awayTeamName}
              />
              <Typography
                variant="body1"
                noWrap
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                {match.awayTeamName || "A definir"}
              </Typography>
              <Typography
                variant="body2"
                noWrap
                width={"40px"}
                sx={{ display: { xs: "block", sm: "none" } }}
              >
                {abbreviateTeamName(match.awayTeamName || "")}
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
                {!!match.field ? match.field : "A definir"}
              </Typography>
            </Box>
          </Box>

          <LoadingButton
            onClick={() => handleClickSeeMatch(match)}
            loading={isLoadingMatch}
            startIcon={<VisibilityIcon />}
            sx={{ color: "black" }}
            disabled={
              match.homeTeamId === undefined || match.awayTeamId === undefined
            }
          >
            <Typography
              variant="body2"
              noWrap
              display={{ xs: "none", sm: "block" }}
            >
              Ver
            </Typography>
          </LoadingButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};
