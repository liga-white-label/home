"use client";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import "../carousel/embla.css";
import Link from "next/link";

type PropType = {
  slides: { title: string; asset: string }[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item, index) => {
            return (
              <Link
                href="/categoria-a"
                className="embla__slide h-svh cursor-pointer transform transition-transform duration-300 hover:scale-105 bg-center"
                key={index}
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${item.asset})`,
                }}
              >
                <div className="embla__slide__text text-white text-center">
                  {item.title}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
