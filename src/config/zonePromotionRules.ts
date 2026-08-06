import { ZoneMarker } from "@/app/components/TablaPosiciones";

// Reglas de ascenso/descenso para las tablas de "Zona" (torneos con zonas).
// Cada zona puede necesitar una cantidad de cupos y colores distintos según
// el torneo, así que se configuran acá por zoneId en lugar de aplicar una
// única regla genérica a todas las tablas.
export const ZONE_PROMOTION_RULES: Record<string, ZoneMarker[]> = {
  // Torneo Juveniles - Zona A: 2 descensos
  "f4d5092d-0d51-4444-ba65-2ededcef4553": [
    { count: 2, from: "bottom", color: "#ef4444", label: "Descenso" },
  ],
  // Torneo Juveniles - Zona B: 2 ascensos
  "2062cc16-1f72-4fa7-aef2-f421decfd66b": [
    { count: 2, from: "top", color: "#22c55e", label: "Ascenso" },
  ],
};
