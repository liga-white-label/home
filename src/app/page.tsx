"use client";
import { WelcomeGifContainer } from "./components/WelcomeGifContainer";
import EmblaCarousel from "./components/carousel/EmblaCarousel";

export default function Home() {
  const SLIDES = [
    {
      title: "Categoria A - Masculina",
      asset: "/assets/cat_a_mas.jpg",
      link: "/categoria-a",
    },
    {
      title: "Categoria A - Femenina",
      asset: "/assets/cat_a_fem.jpg",
      link: "/categoria-a-fem",
    },
    {
      title: "Categoria B - Masculina",
      asset: "/assets/cat_b_mas.jpg",
      link: "/categoria-b",
    },
    {
      title: "Categoria B - Femenina",
      asset: "/assets/cat_b_fem.jpg",
      link: "/categoria-b-fem",
    },
    {
      title: "Categoria C - Masculina",
      asset: "/assets/cat_c_mas.jpg",
      link: "/categoria-c",
    },
    {
      title: "Categoria C - Femenina",
      asset: "/assets/cat_c_fem.jpg",
      link: "/categoria-c-fem",
    },
    {
      title: "Categoria D - Masculina",
      asset: "/assets/cat_d_mas.jpg",
      link: "/categoria-d",
    },
    {
      title: "Categoria E - Masculina",
      asset: "/assets/cat_e_mas.jpg",
      link: "/categoria-e",
    },
  ];
  return (
    <>
      <WelcomeGifContainer />
      <div className="bg-red-100 w-full">
        <EmblaCarousel slides={SLIDES} options={{ align: "start" }} />
      </div>
    </>
  );
}

{
  /* <main className="flex flex-col items-center justify-between p-4 md:p-24">
<Container className="w-full flex flex-col items-center justify-center gap-5">
  <FechaSelector hideFechas disableMove />
  <div className="flex flex-col justify-center items-center gap-5 w-full">
    <div className="flex flex-row gap-5 w-full justify-between">
      <h2
        onClick={() => setDia(0)}
        className={`text-center  text-xl p-2 shadow-lg ${
          dia === 0 ? "bg-red-300 shadow-black" : "bg-gray-100"
        } rounded-lg  cursor-pointer border-black border-[1px]`}
      >
        Sábado, 29 de Junio de 2024
      </h2>
      <h2
        onClick={() => setDia(1)}
        className={`text-center  text-xl p-2 shadow-lg ${
          dia === 1 ? "bg-red-300 shadow-black" : "bg-gray-100"
        } rounded-lg  cursor-pointer border-black border-[1px]`}
      >
        Domingo, 30 de Junio de 2024
      </h2>
    </div>
    {partidos_por_dia.map((p) => (
      <Section title={p.title} matches={p.matches} />
    ))}
  </div>
</Container>
</main> */
}
