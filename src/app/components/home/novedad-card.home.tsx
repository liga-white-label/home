import { Novedad } from "@/app/models/Novedad";
import Image from "next/image";
import Link from "next/link";
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
            backgroundColor: "var(--color-surface)",
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
        <Link href={`/novedades/${novedad.id}`} className="block group h-full">
        <article
            className="group flex flex-col rounded-xl overflow-hidden h-full transition-colors"
            style={{ backgroundColor: "var(--color-surface)" }}
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
                <span className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wide">
                    {moment(novedad.fecha).format("D MMM. YYYY")}
                </span>
                <h3 className={`font-bold text-[var(--color-text)] leading-snug line-clamp-2 uppercase ${compact ? "text-xs" : "text-sm"}`}>
                    {novedad.titulo}
                </h3>
                {!compact && (
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-3 flex-1">
                        {novedad.descripcion}
                    </p>
                )}
            </div>
        </article>
        </Link>
    );
};

export default NovedadCardHome;
