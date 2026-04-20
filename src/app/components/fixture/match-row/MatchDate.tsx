import { CalendarMonth } from "@mui/icons-material";
import { TableCell, Box } from "@mui/material";
import moment from "moment";
import { FC } from "react";

interface MatchDateProps {
  date: moment.Moment | null;
  isLessThanMd: boolean;
}

export const MatchDate: FC<MatchDateProps> = ({ date, isLessThanMd }) => {
  if (isLessThanMd) return null;
  return (
    <TableCell sx={{ borderBottom: "none" }}>
      <Box display="flex" alignItems="center" gap={1} height="100%">
        <CalendarMonth sx={{ color: "#6b7280", fontSize: 18 }} />
        <Box
          component="span"
          sx={{ color: "#9ca3af", fontSize: "0.85rem", whiteSpace: "nowrap" }}
        >
          {!!date && moment(date).isValid()
            ? moment(date).format("DD/MM/YYYY")
            : "A definir"}
        </Box>
      </Box>
    </TableCell>
  );
};
