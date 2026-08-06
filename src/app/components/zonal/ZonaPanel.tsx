"use client";

import { FC } from "react";
import Link from "next/link";
import {
  useZonaCategoriasQuery,
  useZonaPosicionesQuery,
} from "@/repositories/ZonaRepository";
import { TablaPosiciones } from "../TablaPosiciones";
import MiniLoading from "../loading/MiniLoading";
import { ZONE_PROMOTION_RULES } from "@/config/zonePromotionRules";

interface ZonaPanelProps {
  zoneId: string;
  torneoId: string;
}

export const ZonaPanel: FC<ZonaPanelProps> = ({ zoneId, torneoId }) => {
  const { data: categorias, isLoading: isLoadingCategorias } =
    useZonaCategoriasQuery(zoneId);
  const { data: posiciones, isLoading: isLoadingPosiciones } =
    useZonaPosicionesQuery(zoneId);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] mb-3">
          Categorías
        </p>
        {isLoadingCategorias ? (
          <MiniLoading />
        ) : categorias && categorias.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {categorias.map((cat) => (
              <Link
                key={cat.id}
                href={`/campeonatos/${torneoId}/categorias/${cat.id}`}
                className="px-4 py-2 rounded-full text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
                style={{ backgroundColor: "var(--color-surface-2)", border: "1px solid var(--color-border)" }}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-[var(--color-text-secondary)] text-sm">
            Todavía no hay categorías cargadas en esta zona.
          </p>
        )}
      </div>

      {isLoadingPosiciones ? (
        <div className="flex justify-center py-6">
          <MiniLoading />
        </div>
      ) : (
        <TablaPosiciones
          data={posiciones || []}
          serverOrdered
          showPromotionZones={false}
          zones={ZONE_PROMOTION_RULES[zoneId]}
          showNextMatch={false}
          title="Tabla General"
        />
      )}
    </div>
  );
};
