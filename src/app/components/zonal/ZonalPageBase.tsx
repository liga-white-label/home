"use client";

import { FC } from "react";
import { tenantConfig } from "@/config/tenant";
import { ZonalTournamentView } from "./ZonalTournamentView";

interface ZonalPageBaseProps {
  id: string;
  title: string;
}

export const ZonalPageBase: FC<ZonalPageBaseProps> = ({ id, title }) => (
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
    </div>

    <div className="w-full p-4 md:p-10" style={{ backgroundColor: "#0a0a0a" }}>
      <ZonalTournamentView torneoId={id} />
    </div>
  </div>
);
