import { Container, Grid } from "@mui/material";
import Section from "./components/Section";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function Home() {
  // return <HomeV2 />;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <Container className="w-full flex flex-col items-center justify-center gap-5">
        <div className="flex justify-between w-1/2 items-center bg-white rounded-lg">
          <Grid item xs={1}>
            <ChevronLeftIcon className="h-10 w-10 cursor-pointer" />
          </Grid>
          <Grid item xs={8}>
            <div className="flex justify-center  text-center">Fecha actual</div>
          </Grid>
          <Grid item xs={1}>
            <ChevronRightIcon className="h-10 w-10 cursor-pointer" />
          </Grid>
        </div>

        <div className="flex flex-col justify-center items-center gap-5 w-full">
          <h2 className="text-center font-bold text-xl p-2 bg-gray-100 rounded-lg">
            Sábado, 29 de Junio de 2024
          </h2>
          <Section
            title="CATEGORIA A - MASCULINO"
            matches={[
              {
                cancha: "Cancha 9",
                time: "15:15",
                team1: "ULTRACUEVA FC",
                team2: "LA BIGORNIA",
              },
              {
                time: "16:30",
                cancha: "Sintetico 3",
                team1: "SUPERGEDIENTOS",
                team2: "FUERTE AL MEDIO",
              },
              {
                time: "16:30",
                cancha: "Cancha 9",
                team1: "THE BIRDS",
                team2: "FERNETBACHE",
              },
            ]}
          />
          <Section
            title="CATEGORIA B - MASCULINO"
            matches={[
              {
                cancha: "Sintetico 3",
                time: "14:00",
                team1: "MEDIA PINTA FC",
                team2: "EQVIPO POTA",
              },
              {
                time: "14:00",
                cancha: "Cancha 11",
                team1: "AVES RAPACES FC",
                team2: "MORATORIA",
              },
              {
                time: "15:15",
                cancha: "Sintetico 3",
                team1: "LAS MULAS",
                team2: "ALTOS CAÑOS",
              },
              {
                cancha: "Cancha 11",
                time: "15:15",
                team1: "TOBAS HUAINAS CLUB",
                team2: "MARADONIANOS",
              },
              {
                time: "16:30",
                cancha: "Sintetico 1",
                team1: "ALL BLACKS",
                team2: "REAL DEPORTIVO COLOMBIA Y ALEM",
              },
              {
                time: "16:30",
                cancha: "Sintetico 4",
                team1: "DEPORTIVO CHANFLE",
                team2: "WINECHESTER",
              },
            ]}
          />
        </div>
      </Container>
    </main>
  );
}
