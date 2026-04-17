"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Link from "next/link";
import { useAllNovedadesQuery } from "@/repositories/NovedadRepository";
import NovedadCard from "../novedades/NovedadCard";
import { usePrevNextButtons } from "../carousel/EmblaCarousel";

const NewsCarousel = () => {
  const { data: novedades = [], isLoading } = useAllNovedadesQuery();
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", dragFree: true });
  const { onPrevButtonClick, onNextButtonClick, prevBtnDisabled, nextBtnDisabled } =
    usePrevNextButtons(emblaApi);

  const latest = novedades.slice(0, 6);

  if (isLoading || latest.length === 0) return null;

  return (
    <section className="w-full px-4 md:px-10 py-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">
          Novedades
        </h2>
        <Link
          href="/novedades"
          className="text-sm font-medium hover:underline"
          style={{ color: "var(--color-primary)" }}
        >
          Ver todas →
        </Link>
      </div>

      <div className="relative">
        {/* Embla viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {latest.map((novedad) => (
              <div
                key={novedad.id}
                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 min-w-0"
              >
                <NovedadCard novedad={novedad} />
              </div>
            ))}
          </div>
        </div>

        {/* Prev button */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center disabled:opacity-30 transition-opacity"
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          aria-label="Anterior"
        >
          <ChevronLeft fontSize="small" />
        </button>

        {/* Next button */}
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center disabled:opacity-30 transition-opacity"
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          aria-label="Siguiente"
        >
          <ChevronRight fontSize="small" />
        </button>
      </div>
    </section>
  );
};

export default NewsCarousel;
