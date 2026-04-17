"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { tenantConfig } from "@/config/tenant";

const theme = createTheme({
  palette: {
    primary: {
      main: tenantConfig.brand.primaryColor,
    },
    secondary: {
      main: tenantConfig.brand.secondaryColor,
    },
  },
});

export default function MuiThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
