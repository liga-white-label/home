import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/app/utils/httpClient";
import { Zona, zonaMapper } from "@/app/models/Zona";
import { getPositionsMapper, TablePosition } from "@/app/models/FaseCampeonato";
import { getCategoriaMapper } from "./CategoriaRepository";
import { Categoria } from "@/app/models/Categoria";

export class ZonaRepository {
  keys = {
    zonas: (tournamentId: string) => ["zonas", tournamentId],
    zonaCategorias: (zoneId: string) => ["zona-categorias", zoneId],
    zonaPosiciones: (zoneId: string) => ["zona-posiciones", zoneId],
    allZonaCategorias: (tournamentId: string) => [
      "zona-categorias-all",
      tournamentId,
    ],
  };

  getZonas = async (tournamentId: string) => {
    const { data } = await httpClient.get<any[]>(
      `tournament/league-with-zones/zones?tournamentId=${tournamentId}`
    );
    return data.map(zonaMapper);
  };

  getZonaCategorias = async (zoneId: string) => {
    const { data } = await httpClient.get<any[]>(
      `tournament/league-with-zones/zone/categories?zoneId=${zoneId}`
    );
    return data.map(getCategoriaMapper);
  };

  getAllZonaCategorias = async (tournamentId: string) => {
    const zonas = await this.getZonas(tournamentId);
    const categoriasPerZona = await Promise.all(
      zonas.map((zona) => this.getZonaCategorias(zona.id))
    );
    return categoriasPerZona.flat();
  };

  getZonaPosiciones = async (zoneId: string) => {
    const { data } = await httpClient.get<any[]>(
      `tournament/league-with-zones/zone/general-positions?zoneId=${zoneId}`
    );
    return data.map(getPositionsMapper);
  };
}

const repo = new ZonaRepository();

export const useZonasQuery = (tournamentId: string) =>
  useQuery<Zona[]>({
    queryKey: repo.keys.zonas(tournamentId),
    queryFn: () => repo.getZonas(tournamentId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    enabled: tournamentId !== "",
  });

export const useZonaCategoriasQuery = (zoneId: string) =>
  useQuery<Categoria[]>({
    queryKey: repo.keys.zonaCategorias(zoneId),
    queryFn: () => repo.getZonaCategorias(zoneId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    enabled: zoneId !== "",
  });

export const useZonaPosicionesQuery = (zoneId: string) =>
  useQuery<TablePosition[]>({
    queryKey: repo.keys.zonaPosiciones(zoneId),
    queryFn: () => repo.getZonaPosiciones(zoneId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    enabled: zoneId !== "",
  });

export const useAllZonaCategoriasQuery = (tournamentId: string) =>
  useQuery<Categoria[]>({
    queryKey: repo.keys.allZonaCategorias(tournamentId),
    queryFn: () => repo.getAllZonaCategorias(tournamentId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    enabled: tournamentId !== "",
  });
