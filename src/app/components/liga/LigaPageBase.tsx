"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { Liga } from "@/app/models/Campeonato";
import { useCampeonatoQuery } from "@/repositories/CampeonatoRepository";
import { useSeasonPair } from "@/app/hooks/useSeasonPair";
import { tenantConfig } from "@/config/tenant";
import { SeasonSwitchBadge } from "../season/SeasonSwitchBadge";
import { SeasonTablaGeneralPanel } from "./SeasonTablaGeneralPanel";
import MiniLoading from "../loading/MiniLoading";

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

  const categorias = liga?.categories || [];
  const masculinas = categorias.filter((c) => c.gender === "male");
  const femeninas = categorias.filter((c) => c.gender === "female");

  const tabClass = (active: boolean) =>
    `cursor-pointer pb-3 text-sm font-medium whitespace-nowrap transition-colors ${active
      ? "text-white border-b-2"
      : "text-gray-400 hover:text-white border-b-2 border-transparent"
    }`;

  const chipLink = (catId: string, name: string) => (
    <Link
      key={catId}
      href={`/campeonatos/${id}/categorias/${catId}`}
      className="px-4 py-2 rounded-full text-sm text-gray-300 hover:text-white transition-colors"
      style={{ backgroundColor: "#111", border: "1px solid #2a2a2a" }}
    >
      Cat {name}
    </Link>
  );

  return (
    <div className="w-full" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Header */}
      <div
        className="w-full pt-24 pb-8 px-6 md:px-10"
        style={{
          background: "radial-gradient(ellipse at 80% 0%, rgba(var(--color-gradient),0.35) 0%, transparent 60%), #0a0a0a",
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#FFFFFF" }}>
          {tenantConfig.home.seasonLabel ?? "Temporada"}
        </p>
        <h1 className="text-white text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
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
        <div className="w-full border-b border-gray-800" style={{ backgroundColor: "#0a0a0a" }}>
          <div className="flex gap-6 px-6 md:px-10 overflow-x-auto">
            <button
              onClick={() => setSelectedTab(TabsEnum.CATEGORIAS)}
              className={tabClass(selectedTab === TabsEnum.CATEGORIAS)}
              style={selectedTab === TabsEnum.CATEGORIAS ? { borderColor: "var(--color-primary)" } : {}}
            >
              Categorías
            </button>
            <button
              onClick={() => setSelectedTab(TabsEnum.TABLA_GENERAL)}
              className={tabClass(selectedTab === TabsEnum.TABLA_GENERAL)}
              style={selectedTab === TabsEnum.TABLA_GENERAL ? { borderColor: "var(--color-primary)" } : {}}
            >
              Tabla General
            </button>
          </div>
        </div>
      )}

      <div className="w-full p-4 md:p-10" style={{ backgroundColor: "#0a0a0a" }}>
        {selectedTab === TabsEnum.CATEGORIAS && (
          <div className="flex flex-col gap-6">
            {masculinas.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                  Masculino
                </p>
                <div className="flex flex-wrap gap-3">
                  {masculinas.map((cat) => chipLink(cat.id, cat.name))}
                </div>
              </div>
            )}
            {femeninas.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                  Femenino
                </p>
                <div className="flex flex-wrap gap-3">
                  {femeninas.map((cat) => chipLink(cat.id, cat.name))}
                </div>
              </div>
            )}
            {categorias.length === 0 && (
              <p className="text-gray-500 text-sm">Todavía no hay categorías cargadas.</p>
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
