"use client";
import Image from "next/image";
import { WelcomeGifContainer } from "./WelcomeGifContainer";
import EmblaCarousel from "./carousel/EmblaCarousel";
import MiniLoading from "./loading/MiniLoading";
import { tenantConfig } from "@/config/tenant";
import LatestResultsSection from "./home/LatestResultsSection";
import NewsCarousel from "./home/NewsCarousel";
import { ZonalHomeSection } from "./home/ZonalHomeSection";
import { SeasonSwitchBadge } from "./season/SeasonSwitchBadge";
import { useActiveCampeonatos } from "@/app/hooks/useActiveCampeonatos";

const HomeContent = () => {
  const {
    isLoading,
    ligaActual,
    categorias,
    isLiga,
    copaPrincipal,
    zonalPrincipal,
    seasonPair,
  } = useActiveCampeonatos();

  const getSlideLink = (categoryName: string, gender: "male" | "female") => {
    const catFound = categorias.find(
      (cat) =>
        cat.name.toLowerCase() === categoryName.toLowerCase() &&
        cat.gender === gender
    );
    if (!catFound || !ligaActual) return "/";
    return `/campeonatos/${ligaActual.id}/categorias/${catFound.id}`;
  };

  const SLIDES = tenantConfig.home.slides.length > 0
    ? tenantConfig.home.slides.map((slide) => ({
      title: slide.title,
      asset: slide.imagePath,
      link: slide.link ?? getSlideLink(slide.categoryName, slide.gender),
    }))
    : categorias.map((cat) => ({
      title: `${cat.name}`,
      asset: "",
      link: `/campeonatos/${ligaActual?.id}/categorias/${cat.id}`,
    }));

  if (isLoading) {
    return (
      <div
        className="flex flex-col w-full items-center justify-center py-10 h-screen"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <MiniLoading />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor: "var(--color-bg)" }}>
      {/* Hero masthead */}
      <div
        className="relative w-full min-h-[300px] md:min-h-[500px] flex flex-col justify-end pt-16 pb-6 px-6 md:px-10 overflow-hidden"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        {tenantConfig.home.heroBannerPath && (
          <Image
            src={tenantConfig.home.heroBannerPath}
            alt=""
            fill
            priority
            className="object-cover"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background: tenantConfig.home.heroBannerPath
              ? "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.75) 100%)"
              : "radial-gradient(ellipse at 80% 0%, rgba(var(--color-gradient),0.35) 0%, transparent 60%)",
          }}
        />

        <div className="relative">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "var(--color-text)" }}
          >
            {tenantConfig.home.seasonLabel ?? "Temporada"}
          </p>
          <h1 className="text-[var(--color-text)] text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none mb-3">
            {tenantConfig.brand.name}
          </h1>
          <p className="text-[var(--color-text-secondary)] text-sm md:text-base">
            {tenantConfig.brand.subtitle}
          </p>
        </div>
      </div>

      <NewsCarousel />

      {seasonPair.isPartOfSeason && ligaActual?.linkedSeasonId && seasonPair.currentSeason && (
        <div className="w-full px-6 md:px-10 pb-4">
          <SeasonSwitchBadge
            current={seasonPair.currentSeason}
            linkedId={ligaActual.linkedSeasonId}
          />
        </div>
      )}

      {/* Latest results — solo el torneo marcado como principal (current) */}
      {(isLiga || !!copaPrincipal) && (
        <LatestResultsSection
          liga={isLiga && ligaActual ? ligaActual : null}
          cups={!isLiga && copaPrincipal ? [copaPrincipal] : []}
        />
      )}

      {zonalPrincipal && <ZonalHomeSection torneo={zonalPrincipal} />}

      <WelcomeGifContainer />

      <section className="w-full" style={{ backgroundColor: "var(--color-bg)" }}>
        <EmblaCarousel slides={SLIDES} options={{ align: "start" }} />
      </section>
    </div>
  );
};

export default HomeContent;
