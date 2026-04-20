import { Table, TableBody, Box } from "@mui/material";
import { PartidoRow } from "./PartidoRow";
import { SimplifiedMatch } from "@/app/models/Match";
import { useMediaQuery, useTheme } from "@mui/material";
import { useRef, useEffect } from "react";
import moment from "moment";

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      scrollContainerRef.current.scrollLeft =
        scrollWidth / 2 - scrollContainerRef.current.clientWidth / 2;
    }
  }, [matches]);

  return (
    <Box
      ref={scrollContainerRef}
      sx={{
        width: "100%",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        borderRadius: "8px",
        backgroundColor: "#111",
        msOverflowStyle: "-ms-autohiding-scrollbar",
        "&::-webkit-scrollbar": { height: "6px" },
        "&::-webkit-scrollbar-track": { background: "#1a1a1a", borderRadius: "4px" },
        "&::-webkit-scrollbar-thumb": { background: "#333", borderRadius: "4px" },
      }}
    >
      <Table
        sx={{
          minWidth: isSmallDevice ? 500 : "auto",
          backgroundColor: "#111",
        }}
      >
        <TableBody>
          {matches
            .sort((a, b) => {
              if (!a.date || !b.date) return 0;
              return moment(a.date).diff(moment(b.date)) > 0 ? 1 : -1;
            })
            .map((match, index) => (
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
