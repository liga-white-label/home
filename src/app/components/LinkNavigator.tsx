"use client";
import {
  useAllCampeonatosQuery,
  useCampeonatoQuery,
} from "@/repositories/CampeonatoRepository";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Liga } from "@/app/models/Campeonato";
import MiniLoading from "./loading/MiniLoading";

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

  const { data: allCampeonatos, isLoading: isLoadingAllCampeonatos } =
    useAllCampeonatosQuery();

  const campeonatoActualVacio = allCampeonatos?.find((c) => c.current);

  const { data: campeonatoActual, isLoading: isLoadingCampeonatoActual } =
    useCampeonatoQuery(campeonatoActualVacio?.id || "");

  const ligaActual = campeonatoActual as Liga;

  const catDropdown = useDropdown();
  const copaDropdown = useDropdown();

  if (isLoadingAllCampeonatos || isLoadingCampeonatoActual) {
    return (
      <div className="hidden md:block">
        <MiniLoading />
      </div>
    );
  }

  const categorias = ligaActual?.categories || [];
  const allCopas = allCampeonatos?.filter((c) => c.type === "cup" && c.enabled) || [];

  const masculinas = categorias.filter((c) => c.gender === "male");
  const femeninas = categorias.filter((c) => c.gender === "female");

  const navLinkClass = (active: boolean) =>
    `text-base font-semibold transition-colors relative pb-0.5 ${active ? "text-white" : "text-gray-400 hover:text-white"
    }`;

  return (
    <div className="hidden lg:flex gap-8 items-center">
      {/* Inicio */}
      <Link href="/" className={navLinkClass(path === "/")}>
        Inicio
        {path === "/" && (
          <span
            className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
            style={{ backgroundColor: "#ef4444" }}
          />
        )}
      </Link>

      {/* Categorías dropdown */}
      {categorias.length > 0 && (
        <div className="relative" ref={catDropdown.ref}>
          <button
            onClick={() => {
              catDropdown.setOpen((v) => !v);
              copaDropdown.setOpen(false);
            }}
            className={navLinkClass(path.includes("categorias"))}
          >
            Categorías <ChevronDown />
            {path.includes("categorias") && (
              <span
                className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
                style={{ backgroundColor: "#ef4444" }}
              />
            )}
          </button>

          {catDropdown.open && (
            <div style={dropdownStyle}>
              {masculinas.length > 0 && (
                <>
                  <p style={sectionLabelStyle}>Masculino</p>
                  {masculinas.map((c) => (
                    <button
                      key={c.id}
                      style={itemStyle}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2a2a2a")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      onClick={() => {
                        catDropdown.setOpen(false);
                        router.push(`/campeonatos/${ligaActual.id}/categorias/${c.id}`);
                      }}
                    >
                      {`Cat ${c.name} — Masculina`}
                    </button>
                  ))}
                </>
              )}
              {femeninas.length > 0 && (
                <>
                  {masculinas.length > 0 && (
                    <div style={{ height: 1, backgroundColor: "#2a2a2a", margin: "4px 0" }} />
                  )}
                  <p style={sectionLabelStyle}>Femenino</p>
                  {femeninas.map((c) => (
                    <button
                      key={c.id}
                      style={itemStyle}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2a2a2a")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      onClick={() => {
                        catDropdown.setOpen(false);
                        router.push(`/campeonatos/${ligaActual.id}/categorias/${c.id}`);
                      }}
                    >
                      {`Cat ${c.name} — Femenina`}
                    </button>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Novedades */}
      <Link href="/novedades" className={navLinkClass(path.includes("novedades"))}>
        Novedades
        {path.includes("novedades") && (
          <span
            className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
            style={{ backgroundColor: "#ef4444" }}
          />
        )}
      </Link>

      {/* Copas dropdown */}
      <div className="relative" ref={copaDropdown.ref}>
        <button
          onClick={() => {
            copaDropdown.setOpen((v) => !v);
            catDropdown.setOpen(false);
          }}
          className={navLinkClass(
            path.includes("campeonatos") && !path.includes("categorias")
          )}
        >
          Copas <ChevronDown />
          {path.includes("campeonatos") && !path.includes("categorias") && (
            <span
              className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
              style={{ backgroundColor: "#ef4444" }}
            />
          )}
        </button>

        {copaDropdown.open && (
          <div style={dropdownStyle}>
            {allCopas.length > 0 ? (
              allCopas.map((c) => (
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
    </div>
  );
};
