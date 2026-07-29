"use client";
import React, { useCallback, useEffect, useState } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";

import useEmblaCarousel from "embla-carousel-react";
import "../carousel/embla.css";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box } from "@mui/material";

type PropType = {
  slides: { title: string; asset: string; link: string }[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const {
    onPrevButtonClick,
    onNextButtonClick,
    nextBtnDisabled,
    prevBtnDisabled,
  } = usePrevNextButtons(emblaApi);

  // Center slides when they don't fill the viewport at each breakpoint
  // sm threshold: 2 slides (50% each), lg threshold: 4 slides (25% each)
  const centerSm = slides.length < 2 ? "embla--center-sm" : "";
  const centerLg = slides.length < 4 ? "embla--center-lg" : "";
  const sectionClass = ["embla", centerSm, centerLg].filter(Boolean).join(" ");

  return (
    <section className={sectionClass}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item, index) => {
            return (
              <Box
                className="embla__slide h-[var(--slide-height)] rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105 bg-center"
                key={index}
                style={{
                  background: item.asset
                    ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${item.asset})`
                    : "radial-gradient(ellipse at 80% 0%, rgba(var(--color-gradient),0.35) 0%, transparent 60%), var(--color-bg)",
                  cursor: item.link !== "/" ? "pointer" : "default",
                }}
                onClick={() => {
                  if (item.link !== "/") {
                    window.location.href = item.link;
                  }
                }}
              >
                <div
                  className={`embla__slide__text text-center ${
                    item.asset ? "text-white" : "text-[var(--color-text)]"
                  }`}
                >
                  {item.title}
                </div>
              </Box>
            );
          })}
        </div>
        <button
          className="absolute left-0 top-1/2 transform h-10 rounded-xl hover:bg-[var(--color-surface-hover)] mx-1 mt-10 bg-[var(--color-surface)] text-[var(--color-text)] p-2 group disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[var(--color-surface)]"
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
        >
          <ChevronLeft className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)]" />
        </button>
        <button
          className="absolute right-0 top-1/2 transform h-10 rounded-xl hover:bg-[var(--color-surface-hover)] mx-1 mt-10  bg-[var(--color-surface)] text-[var(--color-text)] p-2 group disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[var(--color-surface)]"
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
        >
          <ChevronRight className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)]" />
        </button>
      </div>
    </section>
  );
};

export default EmblaCarousel;

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};
