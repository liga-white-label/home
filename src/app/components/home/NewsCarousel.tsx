"use client";

import Link from "next/link";
import Image from "next/image";
import { useAllNovedadesQuery } from "@/repositories/NovedadRepository";
import moment from "moment";
import "moment/dist/locale/es";

moment.locale("es");

const NewsCarousel = () => {
  const { data: novedades = [], isLoading } = useAllNovedadesQuery();

  const latest = novedades.slice(0, 8);

  if (isLoading || latest.length === 0) return null;

  return (
    <div className="w-full border-b border-[var(--color-border)]" style={{ backgroundColor: "var(--color-surface-2)" }}>
      <div className="flex items-center justify-between px-4 md:px-10 pt-4 pb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">
          Novedades
        </span>
        <Link
          href="/novedades"
          className="text-[10px] font-semibold uppercase tracking-widest hover:opacity-80 transition-opacity"
          style={{ color: "var(--color-text)" }}
        >
          Ver todas →
        </Link>
      </div>

      {/* Filmstrip */}
      <div className="overflow-x-auto scrollbar-hide px-4 md:px-10 pb-4">
        <div className="flex gap-3" style={{ width: "max-content" }}>
          {latest.map((novedad) => (
            <Link
              key={novedad.id}
              href="/novedades"
              className="flex-shrink-0 group"
              style={{ width: "160px" }}
            >
              {/* Image */}
              <div
                className="relative w-full overflow-hidden rounded-lg mb-2"
                style={{ aspectRatio: "16/9" }}
              >
                <Image
                  src={novedad.imagen}
                  fill
                  alt={novedad.titulo}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <div
                  className="absolute inset-0 rounded-lg"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }}
                />
              </div>

              {/* Title */}
              <p className="text-[var(--color-text)] text-xs font-semibold leading-snug line-clamp-2 group-hover:text-gray-300 transition-colors">
                {novedad.titulo}
              </p>
              <p className="text-[var(--color-text-secondary)] text-[10px] mt-1">
                {moment(novedad.fecha).format("D MMM. YYYY")}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsCarousel;
