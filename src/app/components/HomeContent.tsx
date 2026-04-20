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
import NewsCarousel from "./home/NewsCarousel";

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
      <div
        className="flex flex-col w-full items-center justify-center py-10 h-screen"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <MiniLoading />
      </div>
    );
  }

  const isLiga = !!ligaActual?.categories?.length;

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Hero masthead */}
      <div
        className="w-full pt-24 pb-10 px-6 md:px-10"
        style={{
          background:
            "radial-gradient(ellipse at 80% 0%, rgba(180,0,0,0.35) 0%, transparent 60%), #0a0a0a",
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: "var(--color-primary)" }}
        >
          {tenantConfig.home.seasonLabel ?? "Temporada"}
        </p>
        <h1 className="text-white text-4xl md:text-6xl font-extrabold uppercase tracking-tight leading-none mb-3">
          {tenantConfig.brand.name}
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          {tenantConfig.brand.subtitle}
        </p>
      </div>

      {/* Latest results */}
      {(isLiga || copasActivas.length > 0) && (
        <LatestResultsSection
          liga={isLiga ? ligaActual : null}
          cups={copasActivas}
        />
      )}

      <NewsCarousel />
      <WelcomeGifContainer />

      <section className="w-full" style={{ backgroundColor: "#0a0a0a" }}>
        <EmblaCarousel slides={SLIDES} options={{ align: "start" }} />
      </section>
    </div>
  );
};

export default HomeContent;
