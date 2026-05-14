import { GeneroEnum } from "@/app/utils/enums/GeneroEnum";
import { httpClient } from "@/app/utils/httpClient";
import { useQuery } from "@tanstack/react-query";
import { Team } from "@/app/models/Equipo";

export const getEquipoMapper = (x: any): Team => ({
  ...x,
  genero:
    x.gender?.toLowerCase() === "male" ? GeneroEnum.MASCULINO : GeneroEnum.FEMENINO,
  jugadores: x.players,
});

export class EquipoRepository {
  keys = {
    all: () => ["equipos"],
    oneById: (id: string) => ["one-equipo", id],
    allByCategoria: (leagueId: string, id: string) => ["equipos-by-cat", leagueId, id],
    allByCopa: (id: string) => ["equipos-by-copa", id],
  };

  getAll = async () => {
    const { data } = await httpClient.get<any[]>("teams/");
    return data.map(getEquipoMapper);
  };

  get = async (id: string) => {
    const { data } = await httpClient.get(`teams/${id}`);
    return getEquipoMapper(data);
  };

  getAllByCategoryId = async (leagueId: string, categoryId: string) => {
    const { data } = await httpClient.get<any>(
      `leagues/${leagueId}/categories/${categoryId}/teams`
    );
    return data;
  };

  getAllByCopaId = async (id: string) => {
    const { data } = await httpClient.get<any>(`cups/${id}/teams`);
    return data;
  };
}

const repo = new EquipoRepository();

export const useAllEquiposQuery = () =>
  useQuery({ queryKey: repo.keys.all(), queryFn: repo.getAll });

export const useEquipoQuery = (id: string) =>
  useQuery({ queryKey: repo.keys.oneById(id), queryFn: () => repo.get(id) });

export const useAllEquiposByCategory = (leagueId: string, id: string) =>
  useQuery({
    queryKey: repo.keys.allByCategoria(leagueId, id),
    queryFn: () => repo.getAllByCategoryId(leagueId, id),
  });

export const useAllEquiposByCopa = (id: string) =>
  useQuery({
    queryKey: repo.keys.allByCopa(id),
    queryFn: () => repo.getAllByCopaId(id),
  });
