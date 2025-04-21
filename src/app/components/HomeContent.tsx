"use client";
import { WelcomeGifContainer } from "./WelcomeGifContainer";
import EmblaCarousel from "./carousel/EmblaCarousel";
import {
  useAllCampeonatosQuery,
  useCampeonatoQuery,
} from "@/repositories/CampeonatoRepository";
import { Liga } from "@/app/models/Campeonato";
import MiniLoading from "./loading/MiniLoading";

const SLIDE_DATA = [
  {
    title: "Categoria A - Masculina",
    asset: "/assets/cat_a_mas.jpg",
    categoria: "A",
    genero: "Masculina",
  },
  {
    title: "Categoria A - Femenina",
    asset: "/assets/cat_a_fem.jpg",
    categoria: "A",
    genero: "Femenina",
  },
  {
    title: "Categoria B - Masculina",
    asset: "/assets/cat_b_mas.jpg",
    categoria: "B",
    genero: "Masculina",
  },
  {
    title: "Categoria B - Femenina",
    asset: "/assets/cat_b_fem.jpg",
    categoria: "B",
    genero: "Femenina",
  },
  {
    title: "Categoria C - Masculina",
    asset: "/assets/cat_c_mas.jpg",
    categoria: "C",
    genero: "Masculina",
  },
  {
    title: "Categoria C - Femenina",
    asset: "/assets/cat_c_fem.jpg",
    categoria: "C",
    genero: "Femenina",
  },
  {
    title: "Categoria D - Masculina",
    asset: "/assets/cat_d_mas.jpg",
    categoria: "D",
    genero: "Masculina",
  },
  {
    title: "Categoria E - Masculina",
    asset: "/assets/cat_e_mas.jpg",
    categoria: "E",
    genero: "Masculina",
  },
];

const HomeContent = () => {
  const { data: allCampeonatos, isLoading: isLoadingAllCampeonatos } =
    useAllCampeonatosQuery();

  const campeonatoActualVacio = allCampeonatos?.find((c) => c.current);

  const { data: campeonatoActual, isLoading: isLoadingCampeonatoActual } =
    useCampeonatoQuery(campeonatoActualVacio?.id || "");

  const ligaActual = campeonatoActual as Liga;
  const categorias = ligaActual?.categories || [];

  const isCategoriaSoportada = (categoria: string, genero: string) => {
    const catFound = categorias.find(
      (cat) =>
        cat.name.toLowerCase() === categoria.toLowerCase() &&
        cat.gender === (genero === "Masculina" ? "male" : "female")
    );

    return catFound;
  };

  const getSlideLink = (categoria: string, genero: string) => {
    if (!isCategoriaSoportada(categoria, genero)) return "/";

    const catFound = categorias.find(
      (cat) =>
        cat.name.toLowerCase() === categoria.toLowerCase() &&
        cat.gender === (genero === "Masculina" ? "male" : "female")
    );
    return `/campeonatos/${ligaActual.id}/categorias/${catFound!.id}`;
  };

  const SLIDES = SLIDE_DATA.map((item) => ({
    title: item.title,
    asset: item.asset,
    link: getSlideLink(item.categoria, item.genero),
  }));

  if (isLoadingAllCampeonatos || isLoadingCampeonatoActual) {
    return (
      <div className="flex flex-col w-full items-center justify-center py-10">
        <MiniLoading />
      </div>
    );
  }

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
