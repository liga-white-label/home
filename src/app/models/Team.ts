export interface Team {
  id: string;
  name: string;
  gender: string;
  logo: string;
  categoryName: string | null;
  leagueName: string | null;
  players: {
    gender: string;
    name: string;
    lastName: string;
    membershipNumber: string;
    id: string;
  }[];
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
