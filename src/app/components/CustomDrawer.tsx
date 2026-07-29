"use client";
import { Drawer } from "@mui/material";
import { useSidebar } from "@/app/context/SideBarContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MiniLoading from "./loading/MiniLoading";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Campeonato, Liga, SeasonEnum } from "@/app/models/Campeonato";
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

const DOCUMENTOS_URL =
  "https://drive.google.com/drive/folders/1S72DG7TJO6mNopEVqkk-lscnusQTbgRg";

const INSTITUCIONAL_ITEMS = [
  { label: "Autoridades", href: "/institucional/autoridades" },
  { label: "Departamentos", href: "/institucional/departamentos" },
  { label: "Reglamento y Estatuto", href: "/institucional/reglamento-y-estatuto" },
];

export const CustomDrawer = () => {
  const { sidebarOpen, handleClose } = useSidebar();
  const path = usePathname();
  const [catOpen, setCatOpen] = useState(false);
  const [institucionalOpen, setInstitucionalOpen] = useState(false);
  const [torneosOpen, setTorneosOpen] = useState(false);

  const {
    isLoading,
    ligaActual,
    categorias,
    torneosGrupos,
    seasonPair,
  } = useActiveCampeonatos();

  const rootId = path.match(/^\/campeonatos\/([^/]+)\/?$/)?.[1];
  const categoriaMatch = path.match(
    /^\/campeonatos\/([^/]+)\/categorias\/([^/]+)\/?$/
  );
  const activeCategoriaLigaId = categoriaMatch?.[1];
  const activeCategoriaId = categoriaMatch?.[2];

  const masculinas = categorias.filter((c: Categoria) => c.gender === "male");
  const femeninas = categorias.filter((c: Categoria) => c.gender === "female");

  const renderCategoryLinks = (liga: Liga, cats: Categoria[]) =>
    cats.map((cat) => {
      const active =
        liga.id === activeCategoriaLigaId && cat.id === activeCategoriaId;
      return (
        <Link
          key={cat.id}
          href={`/campeonatos/${liga.id}/categorias/${cat.id}`}
          onClick={handleClose}
          className={`block px-6 py-2.5 text-sm border-l-2 transition-colors ${
            active
              ? "border-[var(--color-primary)] bg-[var(--color-surface-hover)] text-[var(--color-text)] font-semibold"
              : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
          }`}
        >
          {cat.name}
        </Link>
      );
    });

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

  const renderTorneoLink = (t: Campeonato) => {
    const active = t.id === rootId;
    return (
      <Link
        key={t.id}
        href={`/campeonatos/${t.id}`}
        onClick={handleClose}
        className={`block px-6 py-2.5 text-sm border-l-2 transition-colors ${
          active
            ? "border-[var(--color-primary)] bg-[var(--color-surface-hover)] text-[var(--color-text)] font-semibold"
            : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
        }`}
      >
        {t.name}
      </Link>
    );
  };

  return (
    <Drawer
      open={sidebarOpen}
      onClose={handleClose}
      anchor="right"
      PaperProps={{
        style: {
          backgroundColor: "var(--color-surface-2)",
          width: 280,
          paddingTop: 64,
          borderLeft: "1px solid var(--color-border)",
        },
      }}
    >
      {isLoading ? (
        <div className="flex justify-center pt-10">
          <MiniLoading />
        </div>
      ) : (
        <nav className="flex flex-col">
          {/* Categorías accordion */}
          {(categorias.length > 0 || seasonPair.isPartOfSeason) && (
            <div className="border-b border-[var(--color-border)]">
              <button
                onClick={() => setCatOpen((v) => !v)}
                className="w-full flex items-center justify-between px-6 py-4 text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors"
              >
                Categorías
                <ChevronDown open={catOpen} />
              </button>
              <AnimatePresence initial={false}>
                {catOpen && (
                  <motion.div
                    key="categorias-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="pb-2" style={{ backgroundColor: "var(--color-surface-2)" }}>
                      {seasonPair.isPartOfSeason ? (
                        <>
                          {seasonPair.apertura && (
                            <>
                              <p className="px-6 pt-3 pb-1 text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">
                                {SEASON_LABEL[SeasonEnum.APERTURA]}
                              </p>
                              {renderLigaGroup(seasonPair.apertura)}
                            </>
                          )}
                          {seasonPair.clausura && (
                            <>
                              <div className="mx-6 my-2 h-px bg-[var(--color-border)]" />
                              <p className="px-6 pt-1 pb-1 text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">
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
                              <p className="px-6 pt-3 pb-1 text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">
                                Masculino
                              </p>
                              {ligaActual && renderCategoryLinks(ligaActual, masculinas)}
                            </>
                          )}
                          {femeninas.length > 0 && (
                            <>
                              {masculinas.length > 0 && (
                                <div className="mx-6 my-2 h-px bg-[var(--color-border)]" />
                              )}
                              <p className="px-6 pt-1 pb-1 text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">
                                Femenino
                              </p>
                              {ligaActual && renderCategoryLinks(ligaActual, femeninas)}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Torneos accordion */}
          <div className="border-b border-[var(--color-border)]">
            <button
              onClick={() => setTorneosOpen((v) => !v)}
              className="w-full flex items-center justify-between px-6 py-4 text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors"
            >
              Torneos
              <ChevronDown open={torneosOpen} />
            </button>
            <AnimatePresence initial={false}>
              {torneosOpen && (
                <motion.div
                  key="torneos-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="pb-2" style={{ backgroundColor: "var(--color-surface-2)" }}>
                    {torneosGrupos.length > 0 ? (
                      torneosGrupos.map((grupo, i) => (
                        <div key={grupo.label ?? `otros-${i}`}>
                          {i > 0 && <div className="mx-6 my-2 h-px bg-[var(--color-border)]" />}
                          {grupo.label && (
                            <p className="px-6 pt-3 pb-1 text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">
                              {grupo.label}
                            </p>
                          )}
                          {grupo.items.map(renderTorneoLink)}
                        </div>
                      ))
                    ) : (
                      <p className="px-6 py-3 text-sm text-[var(--color-text-secondary)]">No hay torneos</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Institucional accordion */}
          <div className="border-b border-[var(--color-border)]">
            <button
              onClick={() => setInstitucionalOpen((v) => !v)}
              className="w-full flex items-center justify-between px-6 py-4 text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors"
            >
              Institucional
              <ChevronDown open={institucionalOpen} />
            </button>
            <AnimatePresence initial={false}>
              {institucionalOpen && (
                <motion.div
                  key="institucional-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="pb-2" style={{ backgroundColor: "var(--color-surface-2)" }}>
                    {INSTITUCIONAL_ITEMS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleClose}
                        className="block px-6 py-2.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Documentos */}
          <a
            href={DOCUMENTOS_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="px-6 py-4 text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors border-b border-[var(--color-border)]"
          >
            Documentos
          </a>
        </nav>
      )}
    </Drawer>
  );
};
