import { Box, Typography } from "@mui/material";
import StadiumOutlinedIcon from "@mui/icons-material/StadiumOutlined";
import { FC } from "react";

interface MatchFieldProps {
  field: string | null;
  isLessThanMd: boolean;
}

export const MatchField: FC<MatchFieldProps> = ({ field, isLessThanMd }) => {
  if (isLessThanMd) return null;

  return (
    <Box display="flex" alignItems="center" gap="10px" width="20%">
      <StadiumOutlinedIcon />
      <Typography variant="body2">{field || "A definir"}</Typography>
    </Box>
  );
};
