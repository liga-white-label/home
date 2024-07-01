import { Container, Grid } from "@mui/material";
import { FechaSelector } from "../components/FechaSelector";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <Container className="w-full flex flex-col items-center justify-center gap-5">
        <FechaSelector />
      </Container>
    </main>
  );
}
