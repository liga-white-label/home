import { Novedad } from "@/app/models/Novedad";
import { Card, Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import Image from "next/image";
import moment from "moment";
import "moment/dist/locale/es";

moment.locale("es");

interface NovedadCardProps {
  novedad: Novedad;
}

const NovedadCard: React.FC<NovedadCardProps> = ({ novedad }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card
      className={`flex ${
        isMobile ? "flex-col" : "flex-row"
      } gap-4 w-full p-4 rounded-xl`}
    >
      <Box
        style={{
          height: isMobile ? "200px" : "100%",
          width: isMobile ? "100%" : "40%",
        }}
      >
        <Image
          src={novedad.imagen}
          alt={novedad.titulo}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            borderRadius: "15px",
          }}
          height={200}
          width={200}
        />
      </Box>
      <Box className="flex flex-col gap-2 justify-between h-full w-full py-0 flex-1">
        <Typography variant="body2" color="text.secondary">
          {novedad.fecha.format("LL")}
        </Typography>

        <Typography variant="h5">{novedad.titulo}</Typography>
        <Typography variant="body1" color="text.secondary">
          {novedad.descripcion}
        </Typography>
      </Box>
    </Card>
  );
};

export default NovedadCard;
