import { Table, TableBody } from "@mui/material";
import { IndexMatch } from "../../models/Match";
import { PartidoRow } from "./PartidoRow";

interface PartidosAgrupadosProps {
  matches: IndexMatch[];
  handleClickSeeMatch: (match: any) => void;
  isLoadingMatch: boolean;
  selectedMatch: string;
}
export const PartidosAgrupados: React.FC<PartidosAgrupadosProps> = ({
  matches,
  handleClickSeeMatch,
  isLoadingMatch,
  selectedMatch,
}) => {
  return (
    <Table>
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
  );
};
