import { ZoneMarker } from "@/app/components/TablaPosiciones";

// Reglas de colores para la tabla de posiciones de categorías de liga que no
// siguen la regla genérica (1° ascenso, 2° a 4° playoff). Se configuran por
// categoryId, igual que ZONE_PROMOTION_RULES para las zonas.

// El 1° clasifica a una final extra y además juega el playoff: se pinta mitad
// verde (campeón) y mitad color de playoff. Del 2° al 4°, playoff.
const FINAL_EXTRA_Y_PLAYOFF: ZoneMarker[] = [
  {
    count: 1,
    from: "top",
    color: "#22c55e",
    secondaryColor: "#f59e0b",
    label: "Final extra",
  },
  { count: 4, from: "top", color: "#f59e0b", label: "Playoff" },
];

export const CATEGORY_PROMOTION_RULES: Record<string, ZoneMarker[]> = {
  // Masculino - Primera División A y B (Apertura / Clausura)
  "6a4bf8852e34131a9d0998cf": FINAL_EXTRA_Y_PLAYOFF,
  "6a6b7c6c7c617046ec6214a5": FINAL_EXTRA_Y_PLAYOFF,
  "6a6b539b8eed1b34ec58ddb3": FINAL_EXTRA_Y_PLAYOFF,
  "6a6ba09f7c617046ec6215bb": FINAL_EXTRA_Y_PLAYOFF,
  // Reserva - Tercera División A y B (Apertura / Clausura)
  "6aaa9ae363c5ab397c197183": FINAL_EXTRA_Y_PLAYOFF,
  "6aaa9aee63c5ab397c197184": FINAL_EXTRA_Y_PLAYOFF,
  "6a85b6a5a5497b207b593cbf": FINAL_EXTRA_Y_PLAYOFF,
  "6a85b6b0a5497b207b593cc0": FINAL_EXTRA_Y_PLAYOFF,
  // Femenino - Primera División A y Tercera División A (Apertura / Clausura)
  "6a73b4340798d744f0856880": FINAL_EXTRA_Y_PLAYOFF,
  "6a9038359fbf8a0a9c59320e": FINAL_EXTRA_Y_PLAYOFF,
  "6a75e5610798d744f0856894": FINAL_EXTRA_Y_PLAYOFF,
  "6a9038ef9fbf8a0a9c593218": FINAL_EXTRA_Y_PLAYOFF,
};
