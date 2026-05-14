"use client";

import NovedadCard from "./NovedadCard";
import { tenantConfig } from "@/config/tenant";
import { useState } from "react";
import { useAllNovedadesQuery } from "@/repositories/NovedadRepository";
import MiniLoading from "../loading/MiniLoading";

const PAGE_SIZE = 4;

const NovedadesContent = () => {
  const { data: novedades = [], isLoading } = useAllNovedadesQuery();
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(novedades.length / PAGE_SIZE);
  const paginated = novedades.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const [featured, ...rest] = paginated;

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
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: "var(--color-primary)" }}
        >
          {tenantConfig.brand.name}
        </p>
        <h1 className="text-white text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
          Novedades
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-6 py-8">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <MiniLoading />
          </div>
        ) : novedades.length === 0 ? (
          <p className="text-center text-gray-500 py-20">
            No hay novedades disponibles.
          </p>
        ) : (
          <>
            {featured && (
              <div className="mb-10">
                <NovedadCard novedad={featured} featured />
              </div>
            )}

            {rest.length > 0 && (
              <>
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Más noticias
                  </span>
                  <div className="flex-1 h-px" style={{ backgroundColor: "#1f1f1f" }} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {rest.map((novedad) => (
                    <NovedadCard key={novedad.id} novedad={novedad} />
                  ))}
                </div>
              </>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 pt-4 pb-10">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setPage(p);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-9 h-9 rounded text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: page === p ? "var(--color-primary)" : "#1a1a1a",
                      color: page === p ? "white" : "#9ca3af",
                      border: "1px solid",
                      borderColor: page === p ? "var(--color-primary)" : "#2a2a2a",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NovedadesContent;
