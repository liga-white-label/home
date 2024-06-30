import { Box, Container, Grid, Icon } from "@mui/material";
import Section from "./components/Section";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function HomeV2() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Container className="w-full flex flex-col items-center justify-center gap-5 px-12">
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
            title="12:45 hs"
            matches={[
              {
                time: "Sintetico 1",
                team1: "ATRA-K-LADAS",
                team2: "QUIERO VALE 4",
                fem: true,
              },
              {
                time: "Sintetico 2",
                team1: "INTERMIDOR",
                team2: "DETO FC",
                fem: true,
              },
              { time: "Sintetico 3", team1: "LA M", team2: "HANGOVER" },
              {
                time: "Sintetico 4",
                team1: "FONDO BLANCO",
                team2: "LA NATTIONALE",
                fem: true,
              },
              {
                time: "Cancha 9",
                team1: "CORCHONETA",
                team2: "YAYO VALLECANO",
              },
            ]}
          />
          <Section
            title="14:00 hs"
            matches={[
              {
                time: "Sintetico 1",
                team1: "EL PINCHA",
                team2: "METEPELO",
                fem: true,
              },
              {
                time: "Sintetico 2",
                team1: "FIASCO DA DAMA",
                team2: "ASTON BIRRA",
                fem: true,
              },
              {
                time: "Sintetico 3",
                team1: "MEDIA PINTA",
                team2: "EQVIPO POTA",
              },
              {
                time: "Sintetico 4",
                team1: "CSKA BIA",
                team2: "ANTIDEPORTIVO CACACIOLI",
                fem: true,
              },
              {
                time: "Cancha 9",
                team1: "FLUPRINGLENSE",
                team2: "SESENTA TREINTA",
              },
              {
                time: "Cancha 1",
                team1: "ANKARA",
                team2: "REAL COHOLICOS",
              },
              {
                time: "Cancha 2",
                team1: "TROTTENHAM",
                team2: "SIN ANESTESIA FC",
              },
              {
                time: "Cancha 4",
                team1: "CA WACHIPATO",
                team2: "SANTAS MASCULINO",
              },
              {
                time: "Cancha 5",
                team1: "BARCELOBAS",
                team2: "MATE AMARGO",
                fem: true,
              },
              {
                time: "Cancha 6",
                team1: "MORATORIA",
                team2: "EQVIPO POTA",
                fem: true,
              },
              {
                time: "Cancha 7",
                team1: "A TODO RITMO FC",
                team2: "MEDIA PINTA FEM",
                fem: true,
              },
              {
                time: "Cancha 8",
                team1: "LA 9NA BORRACHA",
                team2: "LA ESQUINA",
              },
              {
                time: "Cancha 10",
                team1: "MATE AMARGO",
                team2: "METEPELO",
              },
              {
                time: "Cancha 11",
                team1: "AVES RAPACES",
                team2: "MORATORIA",
              },
            ]}
          />
        </div>
      </Container>
    </main>
  );
}
