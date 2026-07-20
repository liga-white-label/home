"use client";

import { FC } from "react";
import { Campeonato } from "@/app/models/Campeonato";
import { ZonalTournamentView } from "../zonal/ZonalTournamentView";

interface ZonalHomeSectionProps {
  torneo: Campeonato;
}

export const ZonalHomeSection: FC<ZonalHomeSectionProps> = ({ torneo }) => (
  <section className="w-full px-6 md:px-10 py-8" style={{ backgroundColor: "var(--color-bg)" }}>
    <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--color-primary)" }}>
      Torneo Zonal
    </p>
    <h2 className="text-[var(--color-text)] text-xl md:text-2xl font-extrabold uppercase tracking-tight mb-4">
      {torneo.name}
    </h2>
    <ZonalTournamentView torneoId={torneo.id} />
  </section>
);
