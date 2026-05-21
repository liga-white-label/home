import { Novedad } from "@/app/models/Novedad";
import Image from "next/image";
import moment from "moment";
import "moment/dist/locale/es";

moment.locale("es");

interface NovedadCardHomeProps {
    novedad: Novedad;
    compact?: boolean;
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

const ImageArea: React.FC<{ novedad: Novedad }> = ({
    novedad,
}) => {
    return (
        <div className="relative w-full h-full overflow-hidden">

            <Image
                src={novedad.imagen}
                fill
                alt={novedad.titulo}
                className="object-cover"
                onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
            />
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

const NovedadCardHome: React.FC<NovedadCardHomeProps> = ({ novedad, compact = false }) => {

    return (
        <article
            className="group flex flex-col rounded-xl overflow-hidden h-full transition-colors"
            style={{ backgroundColor: "#1a1a1a" }}
        >
            {/* Image */}
            <div className={`relative flex-shrink-0 overflow-hidden ${compact ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                <ImageArea novedad={novedad} />
                {novedad.categoria && (
                    <div className="absolute top-3 left-3 z-20">
                        <CategoryBadge categoria={novedad.categoria} />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className={`flex flex-col gap-1.5 flex-1 ${compact ? "p-3" : "p-4 gap-2"}`}>
                <span className="text-[10px] text-gray-500 uppercase tracking-wide">
                    {moment(novedad.fecha).format("D MMM. YYYY")}
                </span>
                <h3 className={`font-bold text-white leading-snug line-clamp-2 uppercase ${compact ? "text-xs" : "text-sm"}`}>
                    {novedad.titulo}
                </h3>
                {!compact && (
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 flex-1">
                        {novedad.descripcion}
                    </p>
                )}
            </div>
        </article>
    );
};

export default NovedadCardHome;
