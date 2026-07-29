import { GeneroEnum } from "../utils/enums/GeneroEnum";
import { Team } from "./Equipo";

export interface Categoria {
  id: string;
  name: string;
  gender: string;
  enabled: boolean;
  showTable?: boolean | null;
}

export interface CategoriaConEquipos extends Categoria {
  teams: Team[];
}
