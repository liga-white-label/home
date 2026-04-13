"use client";
import { WelcomeGifContainer } from "./WelcomeGifContainer";
import EmblaCarousel from "./carousel/EmblaCarousel";
import {
  useAllCampeonatosQuery,
  useCampeonatoQuery,
} from "@/repositories/CampeonatoRepository";
import { Liga } from "@/app/models/Campeonato";
import MiniLoading from "./loading/MiniLoading";
import { tenantConfig } from "@/config/tenant";
import LatestResultsSection from "./home/LatestResultsSection";

const HomeContent = () => {
  const { data: allCampeonatos, isLoading: isLoadingAllCampeonatos } =
    useAllCampeonatosQuery();

  const campeonatoActualVacio = allCampeonatos?.find((c) => c.current);

  const { data: campeonatoActual, isLoading: isLoadingCampeonatoActual } =
    useCampeonatoQuery(campeonatoActualVacio?.id || "");

  const ligaActual = campeonatoActual as Liga;
  const categorias = ligaActual?.categories || [];
  const copasActivas =
    allCampeonatos?.filter((c) => c.type === "cup" && c.enabled) ?? [];

  const getSlideLink = (categoryName: string, gender: "male" | "female") => {
    const catFound = categorias.find(
      (cat) =>
        cat.name.toLowerCase() === categoryName.toLowerCase() &&
        cat.gender === gender
    );
    if (!catFound) return "/";
    return `/campeonatos/${ligaActual.id}/categorias/${catFound.id}`;
  };

  const SLIDES = tenantConfig.home.slides.map((slide) => ({
    title: slide.title,
    asset: slide.imagePath,
    link: getSlideLink(slide.categoryName, slide.gender),
  }));

  if (isLoadingAllCampeonatos || isLoadingCampeonatoActual) {
    return (
      <div className="flex flex-col w-full items-center justify-center py-10 h-screen">
        <MiniLoading />
      </div>
    );
  }

  const isLiga = !!ligaActual?.categories?.length;

  return (
    <div className="flex flex-col w-full">
      {(isLiga || copasActivas.length > 0) && (
        <LatestResultsSection
          liga={isLiga ? ligaActual : null}
          cups={copasActivas}
        />
      )}
      <WelcomeGifContainer />
      <section className="w-full bg-red-100">
        <EmblaCarousel slides={SLIDES} options={{ align: "start" }} />
      </section>
    </div>
  );
};

export default HomeContent;
