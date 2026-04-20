import { Box } from "@mui/material";
import StadiumOutlinedIcon from "@mui/icons-material/StadiumOutlined";
import { FC } from "react";

interface MatchFieldProps {
  field: string | null;
  isLessThanMd: boolean;
}

export const MatchField: FC<MatchFieldProps> = ({ field, isLessThanMd }) => {
  if (isLessThanMd) return null;

  return (
    <Box display="flex" alignItems="center" gap="8px">
      <StadiumOutlinedIcon sx={{ color: "#6b7280", fontSize: 18 }} />
      <Box component="span" sx={{ color: "#9ca3af", fontSize: "0.85rem" }}>
        {field || "A definir"}
      </Box>
    </Box>
  );
};
