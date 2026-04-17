import { Novedad } from "@/app/models/Novedad";
import Image from "next/image";
import moment from "moment";
import "moment/dist/locale/es";

moment.locale("es");

interface NovedadCardProps {
  novedad: Novedad;
  featured?: boolean;
}

const NovedadCard: React.FC<NovedadCardProps> = ({
  novedad,
  featured = false,
}) => {
  if (featured) {
    return (
      <article className="group flex flex-col md:flex-row rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 w-full">
        {/* Image */}
        <div className="relative w-full md:w-[45%] aspect-[16/9] md:aspect-auto overflow-hidden flex-shrink-0">
          <Image
            src={novedad.imagen}
            fill
            alt={novedad.titulo}
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center gap-4 p-7 md:p-10 flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            {novedad.categoria && (
              <span
                className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                {novedad.categoria}
              </span>
            )}
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              {moment(novedad.fecha).format("D [de] MMMM [de] YYYY")}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight line-clamp-3">
            {novedad.titulo}
          </h2>

          <p className="text-gray-500 text-base leading-relaxed line-clamp-4">
            {novedad.descripcion}
          </p>

          <div
            className="w-12 h-1 rounded-full mt-1"
            style={{ backgroundColor: "var(--color-primary)" }}
          />
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden flex-shrink-0">
        <Image
          src={novedad.imagen}
          fill
          alt={novedad.titulo}
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {novedad.categoria && (
          <div className="absolute top-3 left-3">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white shadow"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              {novedad.categoria}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-5 flex-1">
        <span className="text-[11px] text-gray-400 uppercase tracking-wide">
          {moment(novedad.fecha).format("D MMM. YYYY")}
        </span>

        <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2">
          {novedad.titulo}
        </h3>

        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
          {novedad.descripcion}
        </p>

        <div
          className="w-8 h-0.5 rounded-full mt-2"
          style={{ backgroundColor: "var(--color-primary)" }}
        />
      </div>
    </article>
  );
};

export default NovedadCard;
