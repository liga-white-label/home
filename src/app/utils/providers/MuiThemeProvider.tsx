"use client";

import { useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { tenantConfig } from "@/config/tenant";
import { useThemeMode } from "@/app/context/ThemeModeContext";

export default function MuiThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode } = useThemeMode();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: tenantConfig.brand.primaryColor,
          },
          secondary: {
            main: tenantConfig.brand.secondaryColor,
          },
          background: {
            default: "var(--color-bg)",
            paper: "var(--color-surface-2)",
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
