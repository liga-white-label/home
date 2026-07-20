"use client";
import { TablaEstadisticas } from "../TablaEstadisticas";
import { useState } from "react";
import LoadingScreen from "../loading/Loading";
import {
  useAmarillasCategoriaQuery,
  useGoleadoresCategoriaQuery,
} from "@/repositories/CategoriaRepository";
import { GoleadoresMapper, AmarillasMapper } from "@/app/models/FaseCampeonato";

interface EstadisticasPageProps {
  categoryId: string;
}

const OPTIONS = [
  { value: "0", label: "Goleadores" },
  { value: "1", label: "Amarillas" },
];

export const EstadisticasPage: React.FC<EstadisticasPageProps> = ({
  categoryId = "",
}) => {
  const { data: goleadores = [], isLoading: goleadoresLoading } =
    useGoleadoresCategoriaQuery(categoryId);

  const { data: amarillas = [], isLoading: amarillasLoading } =
    useAmarillasCategoriaQuery(categoryId);

  const [selectedOption, setSelectedOption] = useState<string>("0");

  if (goleadoresLoading || amarillasLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col h-full w-full gap-5">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
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
                  selectedOption === opt.value ? "var(--color-primary)" : "var(--color-surface)",
                color: selectedOption === opt.value ? "white" : "var(--color-text-secondary)",
                border: "1px solid",
                borderColor:
                  selectedOption === opt.value ? "var(--color-primary)" : "var(--color-border)",
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
