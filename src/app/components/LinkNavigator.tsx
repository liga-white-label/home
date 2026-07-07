"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import MiniLoading from "./loading/MiniLoading";
import { Categoria } from "@/app/models/Categoria";
import { Liga, SeasonEnum } from "@/app/models/Campeonato";
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
  backgroundColor: "#1c1c1c",
  borderRadius: 10,
  boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
  border: "1px solid #2a2a2a",
  zIndex: 100,
  overflow: "hidden",
};

const sectionLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.12em",
  color: "#6b7280",
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
  color: "#e5e7eb",
  background: "none",
  border: "none",
  cursor: "pointer",
};

export const LinkNavigator = () => {
  const path = usePathname();
  const router = useRouter();

  const {
    isLoading,
    ligaActual,
    categorias,
    copasActivas,
    torneosActivos,
    seasonPair,
  } = useActiveCampeonatos();

  const catDropdown = useDropdown();
  const copaDropdown = useDropdown();
  const torneosDropdown = useDropdown();

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
    `text-base font-semibold transition-colors relative pb-0.5 ${active ? "text-white" : "text-gray-400 hover:text-white"
    }`;

  // El link activo se compara por id real de la URL, no por substring. Como
  // "Torneos" ahora lista TODOS los campeonatos habilitados (incluidas las
  // copas), puede iluminarse junto con "Copas" para un mismo /campeonatos/{id}.
  const rootId = path.match(/^\/campeonatos\/([^/]+)\/?$/)?.[1];
  const isViewingCopa = !!rootId && copasActivas.some((c) => c.id === rootId);
  const isViewingTorneo =
    !!rootId && torneosActivos.some((t) => t.id === rootId);

  const closeAndPush = (href: string) => {
    catDropdown.setOpen(false);
    router.push(href);
  };

  const renderCategoryButtons = (liga: Liga, cats: Categoria[]) =>
    cats.map((c) => (
      <button
        key={c.id}
        style={itemStyle}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2a2a2a")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        onClick={() => closeAndPush(`/campeonatos/${liga.id}/categorias/${c.id}`)}
      >
        {`Cat ${c.name} — ${c.gender === "male" ? "Masculina" : "Femenina"}`}
      </button>
    ));

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

  return (
    <div className="hidden lg:flex gap-8 items-center">
      {/* Inicio */}
      <Link href="/" className={navLinkClass(path === "/")}>
        Inicio
        {path === "/" && (
          <span
            className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
            style={{ backgroundColor: "rgba(var(--color-gradient),1)" }}
          />
        )}
      </Link>

      {/* Categorías dropdown */}
      {(categorias.length > 0 || seasonPair.isPartOfSeason) && (
        <div className="relative" ref={catDropdown.ref}>
          <button
            onClick={() => {
              catDropdown.setOpen((v) => !v);
              copaDropdown.setOpen(false);
              torneosDropdown.setOpen(false);
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

          {catDropdown.open && (
            <div style={dropdownStyle}>
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
                      <div style={{ height: 1, backgroundColor: "#2a2a2a", margin: "4px 0" }} />
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
                        <div style={{ height: 1, backgroundColor: "#2a2a2a", margin: "4px 0" }} />
                      )}
                      <p style={sectionLabelStyle}>Femenino</p>
                      {ligaActual && renderCategoryButtons(ligaActual, femeninas)}
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Torneos dropdown */}
      <div className="relative" ref={torneosDropdown.ref}>
        <button
          onClick={() => {
            torneosDropdown.setOpen((v) => !v);
            catDropdown.setOpen(false);
            copaDropdown.setOpen(false);
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

        {torneosDropdown.open && (
          <div style={dropdownStyle}>
            {torneosActivos.length > 0 ? (
              torneosActivos.map((t) => (
                <button
                  key={t.id}
                  style={itemStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2a2a2a")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  onClick={() => {
                    torneosDropdown.setOpen(false);
                    router.push(`/campeonatos/${t.id}`);
                  }}
                >
                  {t.name}
                </button>
              ))
            ) : (
              <p style={{ ...itemStyle, color: "#6b7280", cursor: "default" }}>
                No hay torneos
              </p>
            )}
          </div>
        )}
      </div>

      {/* Copas dropdown */}
      <div className="relative" ref={copaDropdown.ref}>
        <button
          onClick={() => {
            copaDropdown.setOpen((v) => !v);
            catDropdown.setOpen(false);
            torneosDropdown.setOpen(false);
          }}
          className={navLinkClass(isViewingCopa)}
        >
          Copas <ChevronDown />
          {isViewingCopa && (
            <span
              className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
              style={{ backgroundColor: "rgba(var(--color-gradient),1)" }}
            />
          )}
        </button>

        {copaDropdown.open && (
          <div style={dropdownStyle}>
            {copasActivas.length > 0 ? (
              copasActivas.map((c) => (
                <button
                  key={c.id}
                  style={itemStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2a2a2a")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  onClick={() => {
                    copaDropdown.setOpen(false);
                    router.push(`/campeonatos/${c.id}`);
                  }}
                >
                  {c.name}
                </button>
              ))
            ) : (
              <p style={{ ...itemStyle, color: "#6b7280", cursor: "default" }}>
                No hay copas
              </p>
            )}
          </div>
        )}
      </div>

      {/* Novedades */}
      <Link href="/novedades" className={navLinkClass(path.includes("novedades"))}>
        Novedades
        {path.includes("novedades") && (
          <span
            className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
            style={{ backgroundColor: "rgba(var(--color-gradient),1)" }}
          />
        )}
      </Link>
    </div>
  );
};
