"use client";
import { WelcomeGifContainer } from "./components/WelcomeGifContainer";
import EmblaCarousel from "./components/carousel/EmblaCarousel";

export default function Home() {
  const SLIDES = [
    {
      title: "Categoria A - Masculina",
      asset: "/assets/cat_a_mas.jpg",
      link: "/",
    },
    {
      title: "Categoria A - Femenina",
      asset: "/assets/cat_a_fem.jpg",
      link: "/",
    },
    {
      title: "Categoria B - Masculina",
      asset: "/assets/cat_b_mas.jpg",
      link: "/",
    },
    {
      title: "Categoria B - Femenina",
      asset: "/assets/cat_b_fem.jpg",
      link: "/",
    },
    {
      title: "Categoria C - Masculina",
      asset: "/assets/cat_c_mas.jpg",
      link: "/",
    },
    {
      title: "Categoria C - Femenina",
      asset: "/assets/cat_c_fem.jpg",
      link: "/",
    },
    {
      title: "Categoria D - Masculina",
      asset: "/assets/cat_d_mas.jpg",
      link: "/",
    },
    {
      title: "Categoria E - Masculina",
      asset: "/assets/cat_e_mas.jpg",
      link: "/",
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
