import { forwardRef } from "react";
// icons
import { Icon } from "@iconify/react";
// @mui
import { Box, BoxProps } from "@mui/material";

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  icon: string;
}

const Iconify = forwardRef<SVGElement, Props>(
  ({ icon, width = 20, sx, ...other }, ref) => (
    <Box
      ref={ref}
      sx={{ width: width, height: width, display: "inline-flex", ...sx }}
      {...other}
    >
      <Icon icon={icon} width={Number(width)} height={Number(width)} />
    </Box>
  )
);

Iconify.displayName = "Iconify";

export default Iconify;
