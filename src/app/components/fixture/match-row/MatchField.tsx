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
      <StadiumOutlinedIcon sx={{ color: "var(--color-text-secondary)", fontSize: 18 }} />
      <Box component="span" sx={{ color: "var(--color-text-secondary)", fontSize: "0.85rem" }}>
        {field || "A definir"}
      </Box>
    </Box>
  );
};
