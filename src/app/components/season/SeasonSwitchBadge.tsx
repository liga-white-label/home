"use client";

import { FC } from "react";
import Link from "next/link";
import { SeasonEnum } from "@/app/models/Campeonato";
import { SEASON_LABEL, otherSeason } from "@/app/utils/seasonLabels";

interface SeasonSwitchBadgeProps {
  current: SeasonEnum;
  linkedId: string;
}

export const SeasonSwitchBadge: FC<SeasonSwitchBadgeProps> = ({
  current,
  linkedId,
}) => (
  <div className="flex items-center gap-3 text-sm mt-2">
    <span className="text-gray-400">
      Temporada: <span className="text-white font-medium">{SEASON_LABEL[current]}</span>
    </span>
    <Link
      href={`/campeonatos/${linkedId}`}
      className="font-medium hover:underline"
      style={{ color: "var(--color-primary)" }}
    >
      Ir al {SEASON_LABEL[otherSeason(current)]} →
    </Link>
  </div>
);
