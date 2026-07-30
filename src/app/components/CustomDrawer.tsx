"use client";
import { Drawer } from "@mui/material";
import { useSidebar } from "@/app/context/SideBarContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MiniLoading from "./loading/MiniLoading";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Campeonato } from "@/app/models/Campeonato";
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
  "https://drive.google.com/drive/folders/1ZVW8BcneNEgpIa2Y44BpIjiL61qW9kQ0?usp=sharing";

const INSTITUCIONAL_ITEMS = [
  { label: "Autoridades", href: "/institucional/autoridades" },
  { label: "Departamentos", href: "/institucional/departamentos" },
  { label: "Reglamento y Estatuto", href: "/institucional/reglamento-y-estatuto" },
];

export const CustomDrawer = () => {
  const { sidebarOpen, handleClose } = useSidebar();
  const path = usePathname();
  const [institucionalOpen, setInstitucionalOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const { isLoading, torneosGrupos } = useActiveCampeonatos();

  const toggleGroup = (label: string) =>
    setOpenGroups((groups) => ({ ...groups, [label]: !groups[label] }));

  const rootId = path.match(/^\/campeonatos\/([^/]+)\/?$/)?.[1];

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
          {/* Un accordion por disciplina, mostrando los campeonatos de esa disciplina */}
          {torneosGrupos.map((grupo) => {
            const isOpen = !!openGroups[grupo.label];
            return (
              <div key={grupo.label} className="border-b border-[var(--color-border)]">
                <button
                  onClick={() => toggleGroup(grupo.label)}
                  className="w-full flex items-center justify-between px-6 py-4 text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors"
                >
                  {grupo.label}
                  <ChevronDown open={isOpen} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`${grupo.label}-content`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="pb-2" style={{ backgroundColor: "var(--color-surface-2)" }}>
                        {grupo.items.map(renderTorneoLink)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {torneosGrupos.length === 0 && (
            <p className="px-6 py-4 text-sm text-[var(--color-text-secondary)]">No hay torneos</p>
          )}

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
