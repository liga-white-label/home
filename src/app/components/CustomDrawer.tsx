"use client";
import { Drawer } from "@mui/material";
import { useSidebar } from "@/app/context/SideBarContext";
import Link from "next/link";
import {
  useAllCampeonatosQuery,
  useCampeonatoQuery,
} from "@/repositories/CampeonatoRepository";
import { Liga } from "@/app/models/Campeonato";
import { Categoria } from "@/app/models/Categoria";
import MiniLoading from "./loading/MiniLoading";
import { useState } from "react";

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    className="inline ml-1 transition-transform"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
  >
    <path
      d="M2.5 4.5L6 8L9.5 4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CustomDrawer = () => {
  const { sidebarOpen, handleClose } = useSidebar();
  const [catOpen, setCatOpen] = useState(false);
  const [copaOpen, setCopaOpen] = useState(false);

  const { data: allCampeonatos, isLoading: isLoadingAllCampeonatos } =
    useAllCampeonatosQuery();

  const campeonatoActualVacio = allCampeonatos?.find((c) => c.current);

  const { data: campeonatoActualData, isLoading: isLoadingCampeonatoActual } =
    useCampeonatoQuery(campeonatoActualVacio?.id || "");

  const ligaActual = campeonatoActualData as Liga;
  const categorias = ligaActual?.categories || [];
  const allCopas = allCampeonatos?.filter((c) => c.type === "cup" && c.enabled) || [];
  const masculinas = categorias.filter((c: Categoria) => c.gender === "male");
  const femeninas = categorias.filter((c: Categoria) => c.gender === "female");

  const isLoading = isLoadingAllCampeonatos || isLoadingCampeonatoActual;

  return (
    <Drawer
      open={sidebarOpen}
      onClose={handleClose}
      anchor="right"
      PaperProps={{
        style: {
          backgroundColor: "#111",
          width: 280,
          paddingTop: 64,
          borderLeft: "1px solid #1f1f1f",
        },
      }}
    >
      {isLoading ? (
        <div className="flex justify-center pt-10">
          <MiniLoading />
        </div>
      ) : (
        <nav className="flex flex-col">
          {/* Inicio */}
          <Link
            href="/"
            onClick={handleClose}
            className="px-6 py-4 text-base font-medium text-white hover:bg-white/5 transition-colors border-b border-gray-800"
          >
            Inicio
          </Link>

          {/* Categorías accordion */}
          {categorias.length > 0 && (
            <div className="border-b border-gray-800">
              <button
                onClick={() => setCatOpen((v) => !v)}
                className="w-full flex items-center justify-between px-6 py-4 text-base font-medium text-white hover:bg-white/5 transition-colors"
              >
                Categorías
                <ChevronDown open={catOpen} />
              </button>
              {catOpen && (
                <div className="pb-2" style={{ backgroundColor: "#0e0e0e" }}>
                  {masculinas.length > 0 && (
                    <>
                      <p className="px-6 pt-3 pb-1 text-xs font-bold uppercase tracking-widest text-gray-500">
                        Masculino
                      </p>
                      {masculinas.map((cat: Categoria) => (
                        <Link
                          key={cat.id}
                          href={`/campeonatos/${ligaActual.id}/categorias/${cat.id}`}
                          onClick={handleClose}
                          className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          Cat {cat.name} — Masculina
                        </Link>
                      ))}
                    </>
                  )}
                  {femeninas.length > 0 && (
                    <>
                      {masculinas.length > 0 && (
                        <div className="mx-6 my-2 h-px bg-gray-800" />
                      )}
                      <p className="px-6 pt-1 pb-1 text-xs font-bold uppercase tracking-widest text-gray-500">
                        Femenino
                      </p>
                      {femeninas.map((cat: Categoria) => (
                        <Link
                          key={cat.id}
                          href={`/campeonatos/${ligaActual.id}/categorias/${cat.id}`}
                          onClick={handleClose}
                          className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          Cat {cat.name} — Femenina
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Novedades */}
          <Link
            href="/novedades"
            onClick={handleClose}
            className="px-6 py-4 text-base font-medium text-white hover:bg-white/5 transition-colors border-b border-gray-800"
          >
            Novedades
          </Link>

          {/* Copas accordion */}
          <div className="border-b border-gray-800">
            <button
              onClick={() => setCopaOpen((v) => !v)}
              className="w-full flex items-center justify-between px-6 py-4 text-base font-medium text-white hover:bg-white/5 transition-colors"
            >
              Copas
              <ChevronDown open={copaOpen} />
            </button>
            {copaOpen && (
              <div className="pb-2" style={{ backgroundColor: "#0e0e0e" }}>
                {allCopas.length > 0 ? (
                  allCopas.map((c) => (
                    <Link
                      key={c.id}
                      href={`/campeonatos/${c.id}`}
                      onClick={handleClose}
                      className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))
                ) : (
                  <p className="px-6 py-3 text-sm text-gray-500">No hay copas</p>
                )}
              </div>
            )}
          </div>
        </nav>
      )}
    </Drawer>
  );
};
