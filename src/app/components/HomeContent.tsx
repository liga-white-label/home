"use client";
import { WelcomeGifContainer } from "./WelcomeGifContainer";
import EmblaCarousel from "./carousel/EmblaCarousel";

const HomeContent = () => {
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
    <div className="flex flex-col w-full">
      <WelcomeGifContainer />
      <section className="w-full bg-red-100">
        <EmblaCarousel slides={SLIDES} options={{ align: "start" }} />
      </section>
    </div>
  );
};

export default HomeContent;
