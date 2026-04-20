"use client";
import { TablaEstadisticas } from "../TablaEstadisticas";
import { useState } from "react";
import LoadingScreen from "../loading/Loading";
import {
  useAmarillasCopaQuery,
  useGoleadoresCopaQuery,
} from "@/repositories/CampeonatoRepository";
import { GoleadoresMapper, AmarillasMapper } from "@/app/models/FaseCampeonato";

interface EstadisticasCopaPageProps {
  cupId: string;
}

const OPTIONS = [
  { value: "0", label: "Goleadores" },
  { value: "1", label: "Amarillas" },
];

export const EstadisticasCopaPage: React.FC<EstadisticasCopaPageProps> = ({
  cupId = "",
}) => {
  const { data: goleadores = [], isLoading: goleadoresLoading } =
    useGoleadoresCopaQuery(cupId);

  const { data: amarillas = [], isLoading: amarillasLoading } =
    useAmarillasCopaQuery(cupId);

  const [selectedOption, setSelectedOption] = useState<string>("0");

  if (goleadoresLoading || amarillasLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col h-full w-full gap-5">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Tipo de estadística
        </label>
        <div className="flex gap-2">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelectedOption(opt.value)}
              className="px-4 py-2 rounded text-sm font-medium transition-colors"
              style={{
                backgroundColor:
                  selectedOption === opt.value ? "var(--color-primary)" : "#1a1a1a",
                color: selectedOption === opt.value ? "white" : "#9ca3af",
                border: "1px solid",
                borderColor:
                  selectedOption === opt.value ? "var(--color-primary)" : "#2a2a2a",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <TablaEstadisticas
        data={
          selectedOption === "0"
            ? goleadores.map(GoleadoresMapper)
            : amarillas.map(AmarillasMapper).filter((a: any) => a.tarjetas > 0)
        }
        tipo={selectedOption === "0" ? "goleadores" : "amarillas"}
      />
    </div>
  );
};
