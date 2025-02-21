"use client";
import React, { useCallback, useEffect, useState } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import "./embla.css";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box } from "@mui/material";
import Image from "next/image";

type PropType = {
  slides: { title: string; asset: string; link: string }[];
  options?: EmblaOptionsType;
};

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <Link href={slide.link}>
                <div className="embla__slide__img">
                  <Image
                    src={slide.asset}
                    alt={slide.title}
                    width={1920}
                    height={1080}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div className="embla__slide__overlay">
                    <h2 className="embla__slide__title">{slide.title}</h2>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Box className="embla__buttons">
        <button
          className="embla__button embla__button--prev"
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
        >
          <ChevronLeft />
        </button>
        <button
          className="embla__button embla__button--next"
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
        >
          <ChevronRight />
        </button>
      </Box>
    </div>
  );
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

export default EmblaCarousel;
