import { Categoria } from "./Categoria";

export interface Campeonato {
  id: string;
  name: string;
  year: string;
  type: CampeonatoTypeEnum;
  enabled: boolean;
  current: boolean;
}

export enum CampeonatoTypeEnum {
  REGULAR = "league",
  COPA = "cup",
}

export interface Liga extends Campeonato {
  categories: Categoria[];
}

export interface Copa extends Campeonato {
  phases: string[]; // ids de las fases
  teams: string[]; // ids de los equipos
}

export const getCampeonatoMapper = (x: any): Liga | Copa => {
  const type = x.type?.toLowerCase();
  const normalized = {
    ...x,
    type,
    categories: x.categories?.map((c: any) => ({
      ...c,
      gender: c.gender?.toLowerCase(),
    })),
  };
  if (type === CampeonatoTypeEnum.REGULAR) {
    return normalized as Liga;
  }
  return normalized as Copa;
};
