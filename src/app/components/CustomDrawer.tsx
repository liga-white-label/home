"use client";
import { Drawer } from "@mui/material";
import { useSidebar } from "@/app/context/SideBarContext";
import Link from "next/link";
import MiniLoading from "./loading/MiniLoading";
import { useState } from "react";
import { Liga, SeasonEnum } from "@/app/models/Campeonato";
import { Categoria } from "@/app/models/Categoria";
import { SEASON_LABEL } from "@/app/utils/seasonLabels";
import { useActiveCampeonatos } from "@/app/hooks/useActiveCampeonatos";

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
  const [torneosOpen, setTorneosOpen] = useState(false);

  const {
    isLoading,
    ligaActual,
    categorias,
    copasActivas,
    torneosActivos,
    seasonPair,
  } = useActiveCampeonatos();

  const masculinas = categorias.filter((c: Categoria) => c.gender === "male");
  const femeninas = categorias.filter((c: Categoria) => c.gender === "female");

  const renderCategoryLinks = (liga: Liga, cats: Categoria[]) =>
    cats.map((cat) => (
      <Link
        key={cat.id}
        href={`/campeonatos/${liga.id}/categorias/${cat.id}`}
        onClick={handleClose}
        className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
      >
        Cat {cat.name} — {cat.gender === "male" ? "Masculina" : "Femenina"}
      </Link>
    ));

  const renderLigaGroup = (liga: Liga) => {
    const masc = liga.categories.filter((c) => c.gender === "male");
    const fem = liga.categories.filter((c) => c.gender === "female");
    return (
      <>
        {masc.length > 0 && renderCategoryLinks(liga, masc)}
        {fem.length > 0 && renderCategoryLinks(liga, fem)}
      </>
    );
  };

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
          {(categorias.length > 0 || seasonPair.isPartOfSeason) && (
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
                  {seasonPair.isPartOfSeason ? (
                    <>
                      {seasonPair.apertura && (
                        <>
                          <p className="px-6 pt-3 pb-1 text-xs font-bold uppercase tracking-widest text-gray-500">
                            {SEASON_LABEL[SeasonEnum.APERTURA]}
                          </p>
                          {renderLigaGroup(seasonPair.apertura)}
                        </>
                      )}
                      {seasonPair.clausura && (
                        <>
                          <div className="mx-6 my-2 h-px bg-gray-800" />
                          <p className="px-6 pt-1 pb-1 text-xs font-bold uppercase tracking-widest text-gray-500">
                            {SEASON_LABEL[SeasonEnum.CLAUSURA]}
                          </p>
                          {renderLigaGroup(seasonPair.clausura)}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {masculinas.length > 0 && (
                        <>
                          <p className="px-6 pt-3 pb-1 text-xs font-bold uppercase tracking-widest text-gray-500">
                            Masculino
                          </p>
                          {ligaActual && renderCategoryLinks(ligaActual, masculinas)}
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
                          {ligaActual && renderCategoryLinks(ligaActual, femeninas)}
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Torneos accordion */}
          <div className="border-b border-gray-800">
            <button
              onClick={() => setTorneosOpen((v) => !v)}
              className="w-full flex items-center justify-between px-6 py-4 text-base font-medium text-white hover:bg-white/5 transition-colors"
            >
              Torneos
              <ChevronDown open={torneosOpen} />
            </button>
            {torneosOpen && (
              <div className="pb-2" style={{ backgroundColor: "#0e0e0e" }}>
                {torneosActivos.length > 0 ? (
                  torneosActivos.map((t) => (
                    <Link
                      key={t.id}
                      href={`/campeonatos/${t.id}`}
                      onClick={handleClose}
                      className="block px-6 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {t.name}
                    </Link>
                  ))
                ) : (
                  <p className="px-6 py-3 text-sm text-gray-500">No hay torneos</p>
                )}
              </div>
            )}
          </div>

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
                {copasActivas.length > 0 ? (
                  copasActivas.map((c) => (
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

          {/* Novedades */}
          <Link
            href="/novedades"
            onClick={handleClose}
            className="px-6 py-4 text-base font-medium text-white hover:bg-white/5 transition-colors border-b border-gray-800"
          >
            Novedades
          </Link>
        </nav>
      )}
    </Drawer>
  );
};
