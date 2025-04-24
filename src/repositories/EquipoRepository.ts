import { GeneroEnum } from "@/app/utils/enums/GeneroEnum";
import { httpClient } from "@/app/utils/httpClient";
import { useQuery } from "@tanstack/react-query";
import { Team } from "@/app/models/Equipo";

export const getEquipoMapper = (x: any): Team => ({
  ...x,
  genero: x.gender === "male" ? GeneroEnum.MASCULINO : GeneroEnum.FEMENINO,
  jugadores: x.players,
});

export class EquipoRepository {
  keys = {
    all: () => ["equipos"],
    oneById: (id: string) => ["one-equipo", id],
    allByCategoria: (id: string) => ["equipos-by-cat", id],
    allByCopa: (id: string) => ["equipos-by-copa", id],
  };

  getAll = async () => {
    const { data } = await httpClient.get<any[]>("teams");
    return data.map(getEquipoMapper);
  };

  get = async (id: string) => {
    const { data } = await httpClient.get(`teams/get-team-by-id?teamId=${id}`);
    return getEquipoMapper(data);
  };

  getAllByCategoryId = async (id: string) => {
    const { data } = await httpClient.get<any>(
      `tournament/league/categories/get-teams-by-id?categoryId=${id}`
    );
    return data;
  };

  getAllByCopaId = async (id: string) => {
    const { data } = await httpClient.get<any>(
      `tournament/cup/get-teams-by-id?cupId=${id}`
    );
    return data;
  };
}

const repo = new EquipoRepository();

export const useAllEquiposQuery = () =>
  useQuery({ queryKey: repo.keys.all(), queryFn: repo.getAll });

export const useEquipoQuery = (id: string) =>
  useQuery({ queryKey: repo.keys.oneById(id), queryFn: () => repo.get(id) });

export const useAllEquiposByCategory = (id: string) =>
  useQuery({
    queryKey: repo.keys.allByCategoria(id),
    queryFn: () => repo.getAllByCategoryId(id),
  });

export const useAllEquiposByCopa = (id: string) =>
  useQuery({
    queryKey: repo.keys.allByCopa(id),
    queryFn: () => repo.getAllByCopaId(id),
  });
