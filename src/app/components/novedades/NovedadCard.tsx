import { Novedad } from "@/app/models/Novedad";
import Image from "next/image";
import moment from "moment";
import "moment/dist/locale/es";

moment.locale("es");

interface NovedadCardProps {
  novedad: Novedad;
  featured?: boolean;
}

const DiagonalPattern = () => (
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 10px,
        rgba(255,255,255,0.03) 10px,
        rgba(255,255,255,0.03) 20px
      )`,
      backgroundColor: "#1c1c1c",
    }}
  />
);

const ImageArea: React.FC<{ novedad: Novedad; size?: "large" | "small" }> = ({
  novedad,
  size = "small",
}) => {
  const circleSize = size === "large" ? "w-28 h-28 text-3xl" : "w-20 h-20 text-xl";
  return (
    <div className="relative w-full h-full overflow-hidden">
      <DiagonalPattern />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`${circleSize} flex items-center justify-center font-bold text-gray-400 relative z-10 overflow-hidden rounded-full`}
        >
          <Image
            src={novedad.imagen}
            fill
            alt={novedad.titulo}
            className="object-cover"
            sizes={size === "large" ? "112px" : "80px"}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      </div>
    </div>
  );
};

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
      <article
        className="group flex flex-col md:flex-row rounded-xl overflow-hidden w-full transition-colors"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        {/* Image */}
        <div className="relative w-full md:w-[42%] aspect-[4/3] md:aspect-auto flex-shrink-0 min-h-[220px]">
          <ImageArea novedad={novedad} size="large" />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center gap-4 p-6 md:p-8 flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            {novedad.categoria && <CategoryBadge categoria={novedad.categoria} />}
            <span className="text-xs text-gray-500 uppercase tracking-wide">
              {moment(novedad.fecha).format("D [de] MMMM [de] YYYY")}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-extrabold text-white leading-tight uppercase line-clamp-3">
            {novedad.titulo}
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed line-clamp-4">
            {novedad.descripcion}
          </p>

        </div>
      </article>
    );
  }

  return (
    <article
      className="group flex flex-col rounded-xl overflow-hidden h-full transition-colors"
      style={{ backgroundColor: "#1a1a1a" }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] flex-shrink-0 overflow-hidden">
        <ImageArea novedad={novedad} size="small" />
        {novedad.categoria && (
          <div className="absolute top-3 left-3 z-20">
            <CategoryBadge categoria={novedad.categoria} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <span className="text-[11px] text-gray-500 uppercase tracking-wide">
          {moment(novedad.fecha).format("D MMM. YYYY")}
        </span>
        <h3 className="font-bold text-white text-sm leading-snug line-clamp-2 uppercase">
          {novedad.titulo}
        </h3>
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 flex-1">
          {novedad.descripcion}
        </p>
      </div>
    </article>
  );
};

export default NovedadCard;
