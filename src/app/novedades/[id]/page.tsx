"use client";

import { useParams, useRouter } from "next/navigation";
import { useNovedadQuery } from "@/repositories/NovedadRepository";
import Image from "next/image";
import moment from "moment";
import "moment/dist/locale/es";
import MiniLoading from "@/app/components/loading/MiniLoading";
import { tenantConfig } from "@/config/tenant";

moment.locale("es");

export default function NovedadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: novedad, isLoading } = useNovedadQuery(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
        <MiniLoading />
      </div>
    );
  }

  if (!novedad) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4" style={{ backgroundColor: "#0a0a0a" }}>
        <p className="text-gray-400 text-lg">Novedad no encontrada.</p>
        <button
          onClick={() => router.push("/novedades")}
          className="text-sm font-semibold uppercase tracking-widest px-5 py-2 rounded transition-opacity hover:opacity-80"
          style={{ backgroundColor: "var(--color-primary)", color: "white" }}
        >
          Volver a novedades
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Masthead */}
      <div
        className="w-full pt-24 pb-8 px-6 md:px-10"
        style={{
          background:
            "radial-gradient(ellipse at 80% 0%, rgba(180,0,0,0.35) 0%, transparent 60%), #0a0a0a",
        }}
      >
        <button
          onClick={() => router.push("/novedades")}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-6 transition-opacity hover:opacity-70"
          style={{ color: "white" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Novedades
        </button>

        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: "white" }}
        >
          {tenantConfig.brand.name}
        </p>

        <div className="flex items-center gap-3 mb-4 flex-wrap">
          {novedad.categoria && (
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded text-white"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              {novedad.categoria}
            </span>
          )}
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {moment(novedad.fecha).format("D [de] MMMM [de] YYYY")}
          </span>
        </div>

        <h1 className="text-white text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight max-w-3xl">
          {novedad.titulo}
        </h1>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto w-full px-4 md:px-6 py-8 flex flex-col gap-8">
        {/* Image */}
        {novedad.imagen && (
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
            <Image
              src={novedad.imagen}
              fill
              alt={novedad.titulo}
              className="object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).parentElement!.style.display = "none";
              }}
            />
          </div>
        )}

        {/* Description */}
        {novedad.descripcion && (
          <div
            className="rounded-xl p-6 md:p-8"
            style={{ backgroundColor: "#1a1a1a" }}
          >
            <p className="text-gray-300 text-base leading-relaxed whitespace-pre-wrap">
              {novedad.descripcion}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
