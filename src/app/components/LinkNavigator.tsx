"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MiniLoading from "./loading/MiniLoading";
import { Categoria } from "@/app/models/Categoria";
import { Campeonato, Liga, SeasonEnum } from "@/app/models/Campeonato";
import { SEASON_LABEL } from "@/app/utils/seasonLabels";
import { useActiveCampeonatos } from "@/app/hooks/useActiveCampeonatos";

const ChevronDown = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="inline ml-1">
    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return { open, setOpen, ref };
}

const dropdownStyle: React.CSSProperties = {
  position: "absolute",
  top: "calc(100% + 12px)",
  right: 0,
  minWidth: 240,
  backgroundColor: "var(--color-surface)",
  borderRadius: 10,
  boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
  border: "1px solid var(--color-border)",
  zIndex: 100,
  overflow: "hidden",
};

const sectionLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.12em",
  color: "var(--color-text-secondary)",
  textTransform: "uppercase",
  padding: "12px 20px 6px",
};

const itemStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: "10px 20px",
  fontSize: 15,
  fontWeight: 500,
  color: "var(--color-text)",
  background: "none",
  border: "none",
  borderLeft: "3px solid transparent",
  cursor: "pointer",
};

export const LinkNavigator = () => {
  const path = usePathname();
  const router = useRouter();

  const {
    isLoading,
    ligaActual,
    categorias,
    torneosActivos,
    torneosGrupos,
    seasonPair,
  } = useActiveCampeonatos();

  const catDropdown = useDropdown();
  const torneosDropdown = useDropdown();
  const institucionalDropdown = useDropdown();

  const institucionalItems = [
    { label: "Autoridades", href: "/institucional/autoridades" },
    { label: "Departamentos", href: "/institucional/departamentos" },
    { label: "Reglamento y Estatuto", href: "/institucional/reglamento-y-estatuto" },
  ];

  if (isLoading) {
    return (
      <div className="hidden md:block">
        <MiniLoading />
      </div>
    );
  }

  const masculinas = categorias.filter((c) => c.gender === "male");
  const femeninas = categorias.filter((c) => c.gender === "female");

  const navLinkClass = (active: boolean) =>
    `text-base font-semibold transition-colors relative pb-0.5 ${active ? "text-[var(--color-text)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
    }`;

  const rootId = path.match(/^\/campeonatos\/([^/]+)\/?$/)?.[1];
  const isViewingTorneo =
    !!rootId && torneosActivos.some((t) => t.id === rootId);

  const categoriaMatch = path.match(
    /^\/campeonatos\/([^/]+)\/categorias\/([^/]+)\/?$/
  );
  const activeCategoriaLigaId = categoriaMatch?.[1];
  const activeCategoriaId = categoriaMatch?.[2];

  const closeAndPush = (href: string) => {
    catDropdown.setOpen(false);
    router.push(href);
  };

  const renderCategoryButtons = (liga: Liga, cats: Categoria[]) =>
    cats.map((c) => {
      const active =
        liga.id === activeCategoriaLigaId && c.id === activeCategoriaId;
      return (
        <button
          key={c.id}
          style={{
            ...itemStyle,
            borderLeftColor: active ? "var(--color-primary)" : "transparent",
            backgroundColor: active ? "var(--color-surface-hover)" : "transparent",
            fontWeight: active ? 700 : itemStyle.fontWeight,
          }}
          onMouseEnter={(e) => {
            if (!active) e.currentTarget.style.backgroundColor = "var(--color-surface-hover)";
          }}
          onMouseLeave={(e) => {
            if (!active) e.currentTarget.style.backgroundColor = "transparent";
          }}
          onClick={() => closeAndPush(`/campeonatos/${liga.id}/categorias/${c.id}`)}
        >
          {c.name}
        </button>
      );
    });

  const renderLigaGroup = (liga: Liga) => {
    const masc = liga.categories.filter((c) => c.gender === "male");
    const fem = liga.categories.filter((c) => c.gender === "female");
    return (
      <>
        {masc.length > 0 && renderCategoryButtons(liga, masc)}
        {fem.length > 0 && renderCategoryButtons(liga, fem)}
      </>
    );
  };

  const renderTorneoButton = (t: Campeonato) => {
    const active = t.id === rootId;
    return (
      <button
        key={t.id}
        style={{
          ...itemStyle,
          borderLeftColor: active ? "var(--color-primary)" : "transparent",
          backgroundColor: active ? "var(--color-surface-hover)" : "transparent",
          fontWeight: active ? 700 : itemStyle.fontWeight,
        }}
        onMouseEnter={(e) => {
          if (!active) e.currentTarget.style.backgroundColor = "var(--color-surface-hover)";
        }}
        onMouseLeave={(e) => {
          if (!active) e.currentTarget.style.backgroundColor = "transparent";
        }}
        onClick={() => {
          torneosDropdown.setOpen(false);
          router.push(`/campeonatos/${t.id}`);
        }}
      >
        {t.name}
      </button>
    );
  };

  return (
    <div className="hidden lg:flex gap-8 items-center">
      {/* Categorías dropdown */}
      {(categorias.length > 0 || seasonPair.isPartOfSeason) && (
        <div className="relative" ref={catDropdown.ref}>
          <button
            onClick={() => {
              catDropdown.setOpen((v) => !v);
              torneosDropdown.setOpen(false);
              institucionalDropdown.setOpen(false);
            }}
            className={navLinkClass(path.includes("categorias"))}
          >
            Categorías <ChevronDown />
            {path.includes("categorias") && (
              <span
                className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
                style={{ backgroundColor: "rgba(var(--color-gradient),1)" }}
              />
            )}
          </button>

          <AnimatePresence>
            {catDropdown.open && (
              <motion.div
                key="categorias-dropdown"
                style={dropdownStyle}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {seasonPair.isPartOfSeason ? (
                  <>
                    {seasonPair.apertura && (
                      <>
                        <p style={sectionLabelStyle}>{SEASON_LABEL[SeasonEnum.APERTURA]}</p>
                        {renderLigaGroup(seasonPair.apertura)}
                      </>
                    )}
                    {seasonPair.clausura && (
                      <>
                        <div style={{ height: 1, backgroundColor: "var(--color-border)", margin: "4px 0" }} />
                        <p style={sectionLabelStyle}>{SEASON_LABEL[SeasonEnum.CLAUSURA]}</p>
                        {renderLigaGroup(seasonPair.clausura)}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {masculinas.length > 0 && (
                      <>
                        <p style={sectionLabelStyle}>Masculino</p>
                        {ligaActual && renderCategoryButtons(ligaActual, masculinas)}
                      </>
                    )}
                    {femeninas.length > 0 && (
                      <>
                        {masculinas.length > 0 && (
                          <div style={{ height: 1, backgroundColor: "var(--color-border)", margin: "4px 0" }} />
                        )}
                        <p style={sectionLabelStyle}>Femenino</p>
                        {ligaActual && renderCategoryButtons(ligaActual, femeninas)}
                      </>
                    )}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Torneos dropdown */}
      <div className="relative" ref={torneosDropdown.ref}>
        <button
          onClick={() => {
            torneosDropdown.setOpen((v) => !v);
            catDropdown.setOpen(false);
            institucionalDropdown.setOpen(false);
          }}
          className={navLinkClass(isViewingTorneo)}
        >
          Torneos <ChevronDown />
          {isViewingTorneo && (
            <span
              className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
              style={{ backgroundColor: "rgba(var(--color-gradient),1)" }}
            />
          )}
        </button>

        <AnimatePresence>
          {torneosDropdown.open && (
            <motion.div
              key="torneos-dropdown"
              style={dropdownStyle}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              {torneosGrupos.length > 0 ? (
                torneosGrupos.map((grupo, i) => (
                  <div key={grupo.label ?? `otros-${i}`}>
                    {i > 0 && (
                      <div style={{ height: 1, backgroundColor: "var(--color-border)", margin: "4px 0" }} />
                    )}
                    {grupo.label && <p style={sectionLabelStyle}>{grupo.label}</p>}
                    {grupo.items.map(renderTorneoButton)}
                  </div>
                ))
              ) : (
                <p style={{ ...itemStyle, color: "var(--color-text-secondary)", cursor: "default" }}>
                  No hay torneos
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Institucional dropdown */}
      <div className="relative" ref={institucionalDropdown.ref}>
        <button
          onClick={() => {
            institucionalDropdown.setOpen((v) => !v);
            catDropdown.setOpen(false);
            torneosDropdown.setOpen(false);
          }}
          className={navLinkClass(path.includes("institucional"))}
        >
          Institucional <ChevronDown />
          {path.includes("institucional") && (
            <span
              className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
              style={{ backgroundColor: "rgba(var(--color-gradient),1)" }}
            />
          )}
        </button>

        <AnimatePresence>
          {institucionalDropdown.open && (
            <motion.div
              key="institucional-dropdown"
              style={dropdownStyle}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              {institucionalItems.map((item) => (
                <button
                  key={item.href}
                  style={itemStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-surface-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  onClick={() => {
                    institucionalDropdown.setOpen(false);
                    router.push(item.href);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
