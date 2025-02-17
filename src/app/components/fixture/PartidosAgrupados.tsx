import { Table, TableBody } from "@mui/material";
import { PartidoRow } from "./PartidoRow";
import { SimplifiedMatch } from "@/app/models/Match";
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
