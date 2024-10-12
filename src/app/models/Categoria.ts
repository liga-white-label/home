import { GeneroEnum } from "../utils/enums/GeneroEnum";
import { Equipo } from "./Equipo";


export interface Categoria {
  id: string;
  name: string;
  gender: string;
}

export interface CategoriaConEquipos extends Categoria {
  teams: Equipo[];
}
