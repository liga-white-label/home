import { Table, TableBody, Box } from "@mui/material";
import { PartidoRow } from "./PartidoRow";
import { SimplifiedMatch } from "@/app/models/Match";
import { useMediaQuery, useTheme } from "@mui/material";

interface PartidosAgrupadosProps {
  matches: SimplifiedMatch[];
  handleClickSeeMatch: (match: SimplifiedMatch) => void;
  isLoadingMatch: boolean;
  selectedMatch: string;
}
export const PartidosAgrupados: React.FC<PartidosAgrupadosProps> = ({
  matches,
  handleClickSeeMatch,
  isLoadingMatch,
  selectedMatch,
}) => {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        msOverflowStyle: "-ms-autohiding-scrollbar",
        "&::-webkit-scrollbar": {
          height: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#A60000",
          borderRadius: "4px",
        },
      }}
    >
      <Table sx={{ minWidth: isSmallDevice ? 500 : "auto" }}>
        <TableBody>
          {matches.map((match, index) => (
            <PartidoRow
              key={index}
              match={match}
              handleClickSeeMatch={handleClickSeeMatch}
              isLoadingMatch={
                isLoadingMatch &&
                selectedMatch === [match.homeTeamId, match.awayTeamId].join("")
              }
              index={index}
            />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
