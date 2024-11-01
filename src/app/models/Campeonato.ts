import { GeneroEnum } from "../utils/enums/GeneroEnum";
import { Categoria } from "./Categoria";

export interface Campeonato {
  id: string;
  name: string;
  year: string;
  type: CampeonatoTypeEnum;
  categories?: Categoria[];
  current: boolean;
  enabled: boolean;
}

export enum CampeonatoTypeEnum {
  REGULAR = "league",
  COPA = "cup",
}
