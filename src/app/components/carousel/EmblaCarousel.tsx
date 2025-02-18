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

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item, index) => {
            return (
              <Box
                className="embla__slide h-svh cursor-default transform transition-transform duration-300 hover:scale-105 bg-center"
                key={index}
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${item.asset})`,
                }}
              >
                <div className="embla__slide__text text-white text-center">
                  {item.title}
                </div>
              </Box>
            );
          })}
        </div>
        <button
          className="absolute left-0 top-1/2 transform h-10 rounded-xl hover:bg-[#1a222f] mx-1 mt-10 bg-[#111927] text-white p-2 group"
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
        >
          <ChevronLeft className="text-gray-400 group-hover:text-white" />
        </button>
        <button
          className="absolute right-0 top-1/2 transform h-10 rounded-xl hover:bg-[#1a222f] mx-1 mt-10  bg-[#111927] text-white p-2 group"
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
        >
          <ChevronRight className="text-gray-400 group-hover:text-white" />
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
