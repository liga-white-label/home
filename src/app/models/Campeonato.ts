import { Categoria } from "./Categoria";

export interface Campeonato {
  id: string;
  name: string;
  year: string;
  type: CampeonatoTypeEnum;
  discipline: string;
  enabled: boolean;
  current: boolean;
}

export enum CampeonatoTypeEnum {
  REGULAR = "league",
  COPA = "cup",
  ZONAL = "leaguewithzones",
}

export enum SeasonEnum {
  APERTURA = "apertura",
  CLAUSURA = "clausura",
}

export interface Liga extends Campeonato {
  categories: Categoria[];
  // "apertura" o "clausura", null si esta liga no forma parte de una temporada
  season: SeasonEnum | null;
  // id de la liga de la otra mitad de la temporada, null si no está vinculada
  linkedSeasonId: string | null;
}

export interface Copa extends Campeonato {
  phases: string[]; // ids de las fases
  teams: string[]; // ids de los equipos
}

export interface TorneoZonal extends Campeonato {
  zonesIds: string[];
}

export const getCampeonatoMapper = (x: any): Liga | Copa | TorneoZonal => {
  if (x.type === CampeonatoTypeEnum.REGULAR) {
    return {
      ...x,
      season: x.season ?? null,
      linkedSeasonId: x.linkedSeasonId ?? null,
    } as Liga;
  }
  if (x.type === CampeonatoTypeEnum.ZONAL) {
    return { ...x, zonesIds: x.zonesIds ?? [] } as TorneoZonal;
  }
  return x as Copa;
};
