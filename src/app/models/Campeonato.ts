import { GeneroEnum } from "../utils/enums/GeneroEnum";
import { Categoria } from "./Categoria";

export interface Campeonato {
  id: string;
  name: string;
  year: string;
  type: CampeonatoTypeEnum;
  categories?: Categoria[];
}

export enum CampeonatoTypeEnum {
  REGULAR = 'league',
  COPA = 'cup',
}

export const CAMPEONATOS_MOCK: Campeonato[] = [
  {
    id: '1',
    name: 'Liga 2024',
    year: '2024',
    type: CampeonatoTypeEnum.REGULAR,
    categories: [
      {
        id: '1',
        name: 'A',
        gender: GeneroEnum.MASCULINO,
      },
    ],
  },
  {
    id: '2',
    name: 'Copa Preparación 2024',
    year: '2024',
    type: CampeonatoTypeEnum.COPA,
  },
];
