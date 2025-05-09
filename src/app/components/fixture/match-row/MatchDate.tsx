import { CalendarMonth } from "@mui/icons-material";
import { TableCell, Typography, Box } from "@mui/material";
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
      <Box display="flex" alignItems="center" gap={2} height="100%">
        <CalendarMonth />
        <Typography>
          {!!date && moment(date).isValid()
            ? moment(date)?.format("DD/MM/YYYY")
            : "A definir"}
        </Typography>
      </Box>
    </TableCell>
  );
};
