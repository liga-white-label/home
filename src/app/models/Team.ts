export interface Team {
  name: string;
  logoUrl: string;
  gender: string;
  category_id: number;
}

export interface EquipoTablaPosicion {
  pos: number;
  equipo: string;
  escudo: string;
  pts: number;
  pj: number;
  pg: number;
  pe: number;
  pp: number;
  gf: number;
  gc: number;
  dg: number;
  nextMatch: string;
}
