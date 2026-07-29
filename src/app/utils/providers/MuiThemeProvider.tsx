"use client";

import { useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { tenantConfig } from "@/config/tenant";

export default function MuiThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          // "dark" para que los componentes nativos de MUI (Typography, iconos,
          // dividers) usen texto claro por defecto, acorde al fondo gris del tema.
          mode: "dark",
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
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
