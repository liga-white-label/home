// Partido decisivo de la Fase Final de Etapa (ganador fase regular vs ganador playoff).
// Tipado a partir del documento Match real del backend — homeTeamId/awayTeamId son
// ids crudos, se resuelven con useEquipoQuery.
export interface StageFinalMatch {
  date: string | null;
  dateNumber: number;
  field: string | null;
  homeTeamId: string;
  awayTeamId: string;
  homeTeamGoals: number;
  awayTeamGoals: number;
  status: string;
}

export interface PhaseSeasonFinalRaw {
  id: string;
  type: string; // "seasonfinal"
  regularStagePhaseId: string;
  playoffPhaseId: string;
  regularStageWinnerId: string | null;
  playoffWinnerId: string | null;
  stageFinalMatchNeeded: boolean;
  stageFinalMatch: StageFinalMatch | null;
  stageFinalWinnerId: string | null;
}

export const faseFinalMapper = (x: any): PhaseSeasonFinalRaw => ({ ...x });
