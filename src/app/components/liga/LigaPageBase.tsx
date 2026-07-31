"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { Liga } from "@/app/models/Campeonato";
import { useCampeonatoQuery } from "@/repositories/CampeonatoRepository";
import { useSeasonPair } from "@/app/hooks/useSeasonPair";
import { tenantConfig } from "@/config/tenant";
import { SeasonSwitchBadge } from "../season/SeasonSwitchBadge";
import { SeasonTablaGeneralPanel } from "./SeasonTablaGeneralPanel";
import MiniLoading from "../loading/MiniLoading";
import Iconify from "../iconify";

interface LigaPageBaseProps {
  id: string;
  title: string;
}

enum TabsEnum {
  CATEGORIAS = 0,
  TABLA_GENERAL = 1,
}

export const LigaPageBase: FC<LigaPageBaseProps> = ({ id, title }) => {
  const { data: campeonatoData } = useCampeonatoQuery(id);
  const liga = campeonatoData as Liga | undefined;
  const seasonPair = useSeasonPair(liga);
  const [selectedTab, setSelectedTab] = useState<TabsEnum>(TabsEnum.CATEGORIAS);
  const [userSelectedTab, setUserSelectedTab] = useState(false);

  // Si el torneo es parte de una temporada (apertura/clausura), lo más relevante
  // al entrar es la tabla acumulada, no la lista de categorías.
  useEffect(() => {
    if (!userSelectedTab && seasonPair.isPartOfSeason) {
      setSelectedTab(TabsEnum.TABLA_GENERAL);
    }
  }, [seasonPair.isPartOfSeason, userSelectedTab]);

  const selectTab = (tab: TabsEnum) => {
    setUserSelectedTab(true);
    setSelectedTab(tab);
  };

  const categorias = liga?.categories || [];
  const masculinas = categorias.filter((c) => c.gender === "male");
  const femeninas = categorias.filter((c) => c.gender === "female");

  const tabClass = (active: boolean) =>
    `cursor-pointer pb-3 text-sm font-medium whitespace-nowrap transition-colors ${active
      ? "text-[var(--color-text)] border-b-2"
      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border-b-2 border-transparent"
    }`;

  const categoryCard = (catId: string, name: string) => (
    <Link
      key={catId}
      href={`/campeonatos/${id}/categorias/${catId}`}
      className="group flex items-center gap-4 rounded-xl p-4 transition-colors border border-[var(--color-border)] hover:border-[var(--color-primary)]"
      style={{ backgroundColor: "var(--color-surface-2)" }}
    >
      <div
        className="flex items-center justify-center rounded-full w-11 h-11 flex-shrink-0"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <Iconify icon="ion:trophy-outline" color="white" width={22} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[var(--color-text)] font-semibold text-sm truncate">{name}</p>
        <p className="text-[var(--color-text-secondary)] text-xs">Posiciones y fixture</p>
      </div>
      <Iconify
        icon="ion:chevron-forward"
        className="text-[var(--color-text-secondary)] transition-transform group-hover:translate-x-0.5"
        width={18}
      />
    </Link>
  );

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
        {seasonPair.isPartOfSeason && liga?.linkedSeasonId && seasonPair.currentSeason && (
          <div className="mt-3">
            <SeasonSwitchBadge current={seasonPair.currentSeason} linkedId={liga.linkedSeasonId} />
          </div>
        )}
      </div>

      {/* Tab bar */}
      {seasonPair.isPartOfSeason && (
        <div className="w-full border-b border-[var(--color-border)]" style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="flex gap-6 px-6 md:px-10 overflow-x-auto">
            <button
              onClick={() => selectTab(TabsEnum.CATEGORIAS)}
              className={tabClass(selectedTab === TabsEnum.CATEGORIAS)}
              style={selectedTab === TabsEnum.CATEGORIAS ? { borderColor: "var(--color-primary)" } : {}}
            >
              Categorías
            </button>
            <button
              onClick={() => selectTab(TabsEnum.TABLA_GENERAL)}
              className={tabClass(selectedTab === TabsEnum.TABLA_GENERAL)}
              style={selectedTab === TabsEnum.TABLA_GENERAL ? { borderColor: "var(--color-primary)" } : {}}
            >
              Tabla General
            </button>
          </div>
        </div>
      )}

      <div className="w-full p-4 md:p-10" style={{ backgroundColor: "var(--color-bg)" }}>
        {selectedTab === TabsEnum.CATEGORIAS && (
          <div className="flex flex-col gap-6">
            {masculinas.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] mb-3">
                  Masculino
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {masculinas.map((cat) => categoryCard(cat.id, cat.name))}
                </div>
              </div>
            )}
            {femeninas.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] mb-3">
                  Femenino
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {femeninas.map((cat) => categoryCard(cat.id, cat.name))}
                </div>
              </div>
            )}
            {categorias.length === 0 && (
              <p className="text-[var(--color-text-secondary)] text-sm">Todavía no hay categorías cargadas.</p>
            )}
          </div>
        )}
        {selectedTab === TabsEnum.TABLA_GENERAL &&
          seasonPair.isPartOfSeason &&
          (seasonPair.isLoadingLinked || !seasonPair.apertura || !seasonPair.clausura ? (
            <div className="flex justify-center py-10">
              <MiniLoading />
            </div>
          ) : (
            <SeasonTablaGeneralPanel
              apertura={seasonPair.apertura}
              clausura={seasonPair.clausura}
            />
          ))}
      </div>
    </div>
  );
};
