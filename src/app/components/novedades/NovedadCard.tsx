import { Novedad } from "@/app/models/Novedad";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import "moment/dist/locale/es";

moment.locale("es");

interface NovedadCardProps {
  novedad: Novedad;
  featured?: boolean;
}

const CategoryBadge: React.FC<{ categoria: string }> = ({ categoria }) => (
  <span
    className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded text-white"
    style={{ backgroundColor: "var(--color-primary)" }}
  >
    {categoria}
  </span>
);

const NovedadCard: React.FC<NovedadCardProps> = ({ novedad, featured = false }) => {
  if (featured) {
    return (
      <Link href={`/novedades/${novedad.id}`} className="block group">
        <article
          className="flex flex-col md:flex-row rounded-xl overflow-hidden w-full transition-opacity group-hover:opacity-90"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          {/* Image */}
          <div className="relative w-full md:w-[42%] aspect-[4/3] md:aspect-auto flex-shrink-0 min-h-[220px]">
            <Image
              src={novedad.imagen}
              fill
              alt={novedad.titulo}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center gap-4 p-6 md:p-8 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              {novedad.categoria && <CategoryBadge categoria={novedad.categoria} />}
              <span className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide">
                {moment(novedad.fecha).format("D [de] MMMM [de] YYYY")}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-[var(--color-text)] leading-tight uppercase line-clamp-3">
              {novedad.titulo}
            </h2>
            {novedad.descripcion && (
              <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed line-clamp-4">
                {novedad.descripcion}
              </p>
            )}
            <span
              className="text-xs font-semibold uppercase tracking-widest self-start mt-1"
              style={{ color: "var(--color-text)" }}
            >
              Leer más →
            </span>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/novedades/${novedad.id}`} className="block group h-full">
      <article
        className="flex flex-col rounded-xl overflow-hidden h-full transition-opacity group-hover:opacity-90"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] flex-shrink-0 overflow-hidden">
          <Image
            src={novedad.imagen}
            fill
            alt={novedad.titulo}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          {novedad.categoria && (
            <div className="absolute top-3 left-3 z-20">
              <CategoryBadge categoria={novedad.categoria} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 p-4 flex-1">
          <span className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wide">
            {moment(novedad.fecha).format("D MMM. YYYY")}
          </span>
          <h3 className="font-bold text-[var(--color-text)] text-sm leading-snug line-clamp-2 uppercase">
            {novedad.titulo}
          </h3>
          {novedad.descripcion && (
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-3 flex-1">
              {novedad.descripcion}
            </p>
          )}
          <span
            className="text-[10px] font-semibold uppercase tracking-widest mt-auto pt-1"
            style={{ color: "var(--color-text)" }}
          >
            Leer más →
          </span>
        </div>
      </article>
    </Link>
  );
};

export default NovedadCard;
