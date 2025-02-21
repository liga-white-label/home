"use client";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();

  const handleRetry = () => {
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center h-[70svh] pt-5 gap-5">
      <Typography variant="h3" color="text.primary">
        Error
      </Typography>
      <Typography variant="body1" color="text.secondary" textAlign="center">
        Ocurrió un error al cargar la página. Por favor, inténtelo de nuevo más
        tarde.
      </Typography>
      <Button
        variant="outlined"
        style={{ color: "#a60000", borderColor: "#a60000" }}
        onClick={handleRetry}
      >
        Reintentar
      </Button>
    </div>
  );
};

export default ErrorPage;
