"use client";

import { FC, useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAllFasesByCampeonato } from "@/repositories/CampeonatoRepository";
import { FaseGruposWrapper } from "./FaseGruposWrapper";
import FixtureCopaPage from "./FixtureCopaPage";
import PlayoffsCopaPage from "../playoffs/PlayoffsCopaPage";
import { EstadisticasCopaPage } from "./EstadisticasCopaPage";
import LoadingScreen from "../loading/Loading";
import ErrorPage from "../ErrorPage";
import { tenantConfig } from "@/config/tenant";

interface CopaPageBaseProps {
  id: string;
  title: string;
}
export enum TabsEnum {
  GRUPOS = 0,
  FIXTURE = 1,
  PLAYOFFS = 2,
  ESTADISTICAS = 3,
}

export const CopaPageBase: FC<CopaPageBaseProps> = ({ id, title }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab");
  const initialTab = tabParam ? parseInt(tabParam, 10) : TabsEnum.GRUPOS;
  const [selectedTab, setSelectedTab] = useState<TabsEnum>(initialTab);

  const { data: fases = [], isLoading, isError } = useAllFasesByCampeonato(id);

  const faseGrupos = fases.find((f) => f.type === "group") || null;
  const fasesPlayoff = useMemo(
    () => fases.filter((f) => f.type === "playoff") || [],
    [fases]
  );

  useEffect(() => {
    if (tabParam) {
      setSelectedTab(parseInt(tabParam, 10));
    }
  }, [tabParam]);

  const handleChangeTab = (newValue: TabsEnum) => {
    setSelectedTab(newValue);
    router.push(`?tab=${newValue}`, undefined);
  };

  useEffect(() => {
    if (tabParam) {
      setSelectedTab(parseInt(tabParam, 10));
    } else if (faseGrupos) {
      setSelectedTab(TabsEnum.GRUPOS);
    } else if (fasesPlayoff.length > 0) {
      setSelectedTab(TabsEnum.PLAYOFFS);
    } else {
      setSelectedTab(TabsEnum.FIXTURE);
    }
  }, [faseGrupos, fasesPlayoff, tabParam]);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorPage />;

  const tabClass = (active: boolean) =>
    `cursor-pointer pb-3 text-sm font-medium whitespace-nowrap transition-colors ${active
      ? "text-[var(--color-text)] border-b-2"
      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border-b-2 border-transparent"
    }`;

  return (
    <div className="w-full" style={{ backgroundColor: "var(--color-bg)" }}>
      {/* Header */}
      <div
        className="w-full pt-24 pb-8 px-6 md:px-10"
        style={{
          background: "radial-gradient(ellipse at 80% 0%, rgba(var(--color-gradient),0.35) 0%, transparent 60%), var(--color-bg)",
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-text)" }}>
          {tenantConfig.home.seasonLabel ?? "Temporada"}
        </p>
        <h1 className="text-[var(--color-text)] text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
          {title}
        </h1>
      </div>

      {/* Tab bar */}
      <div className="w-full border-b border-[var(--color-border)]" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="flex gap-6 px-6 md:px-10 overflow-x-auto">
          {!!faseGrupos && (
            <button
              onClick={() => handleChangeTab(TabsEnum.GRUPOS)}
              className={tabClass(selectedTab === TabsEnum.GRUPOS)}
              style={selectedTab === TabsEnum.GRUPOS ? { borderColor: "var(--color-primary)" } : {}}
            >
              Fase de Grupos
            </button>
          )}
          {!!faseGrupos && (
            <button
              onClick={() => handleChangeTab(TabsEnum.FIXTURE)}
              className={tabClass(selectedTab === TabsEnum.FIXTURE)}
              style={selectedTab === TabsEnum.FIXTURE ? { borderColor: "var(--color-primary)" } : {}}
            >
              Fixture
            </button>
          )}
          {!!fasesPlayoff && (
            <button
              onClick={() => handleChangeTab(TabsEnum.PLAYOFFS)}
              className={tabClass(selectedTab === TabsEnum.PLAYOFFS)}
              style={selectedTab === TabsEnum.PLAYOFFS ? { borderColor: "var(--color-primary)" } : {}}
            >
              Playoffs
            </button>
          )}
          <button
            onClick={() => handleChangeTab(TabsEnum.ESTADISTICAS)}
            className={tabClass(selectedTab === TabsEnum.ESTADISTICAS)}
            style={selectedTab === TabsEnum.ESTADISTICAS ? { borderColor: "var(--color-primary)" } : {}}
          >
            Estadísticas
          </button>
        </div>
      </div>

      <div className="w-full p-4 md:p-10" style={{ backgroundColor: "var(--color-bg)" }}>
      <AnimatePresence mode="wait">
      <motion.div
        key={selectedTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        {selectedTab === TabsEnum.GRUPOS && (
          <FaseGruposWrapper faseId={faseGrupos?.id || ""} />
        )}
        {selectedTab === TabsEnum.FIXTURE && (
          <FixtureCopaPage faseId={faseGrupos?.id || ""} />
        )}
        {selectedTab === TabsEnum.PLAYOFFS && (
          <PlayoffsCopaPage faseId={fasesPlayoff[0]?.id || ""} />
        )}
        {selectedTab === TabsEnum.ESTADISTICAS && (
          <EstadisticasCopaPage cupId={id} />
        )}
        {fases.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <p className="text-xl text-center text-[var(--color-text-secondary)]">
              Todavía no hay información disponible para esta copa.
            </p>
          </div>
        )}
      </motion.div>
      </AnimatePresence>
      </div>
    </div>
  );
};
