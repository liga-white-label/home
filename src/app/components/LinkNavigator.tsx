"use client";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MiniLoading from "./loading/MiniLoading";
import { Campeonato } from "@/app/models/Campeonato";
import { useActiveCampeonatos } from "@/app/hooks/useActiveCampeonatos";
import { useClickOutside } from "@/app/hooks/useClickOutside";

const ChevronDown = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="inline ml-1">
    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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

const INSTITUCIONAL_KEY = "institucional";
const disciplinaKey = (label: string) => `disciplina:${label}`;

export const LinkNavigator = () => {
  const path = usePathname();
  const router = useRouter();

  const { isLoading, torneosActivos, torneosGrupos } = useActiveCampeonatos();

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  useClickOutside(navRef, () => setOpenMenu(null));

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

  const navLinkClass = (active: boolean) =>
    `text-base font-semibold transition-colors relative pb-0.5 ${active ? "text-[var(--color-text)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
    }`;

  const rootId = path.match(/^\/campeonatos\/([^/]+)\/?$/)?.[1];

  const toggleMenu = (key: string) =>
    setOpenMenu((current) => (current === key ? null : key));

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
          setOpenMenu(null);
          router.push(`/campeonatos/${t.id}`);
        }}
      >
        {t.name}
      </button>
    );
  };

  return (
    <div className="hidden lg:flex gap-8 items-center" ref={navRef}>
      {/* Un dropdown por disciplina, mostrando los campeonatos de esa disciplina */}
      {torneosGrupos.map((grupo) => {
        const key = disciplinaKey(grupo.label);
        const isOpen = openMenu === key;
        const isActive = grupo.items.some((t) => t.id === rootId);
        return (
          <div className="relative" key={key}>
            <button
              onClick={() => toggleMenu(key)}
              className={navLinkClass(isActive)}
            >
              {grupo.label} <ChevronDown />
              {isActive && (
                <span
                  className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
                  style={{ backgroundColor: "rgba(var(--color-gradient),1)" }}
                />
              )}
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  key={`${key}-dropdown`}
                  style={dropdownStyle}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  {grupo.items.map(renderTorneoButton)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {torneosActivos.length === 0 && (
        <span className={navLinkClass(false)}>No hay torneos</span>
      )}

      {/* Institucional dropdown */}
      <div className="relative">
        <button
          onClick={() => toggleMenu(INSTITUCIONAL_KEY)}
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
          {openMenu === INSTITUCIONAL_KEY && (
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
                    setOpenMenu(null);
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
