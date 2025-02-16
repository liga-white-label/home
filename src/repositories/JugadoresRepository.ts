import { Jugador } from "@/app/models/Jugador";
import { GeneroEnum } from "@/app/utils/enums/GeneroEnum";
import { httpClient } from "@/app/utils/httpClient";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

export const getJugadorMapper = (x: any): Jugador => ({
  id: x.id,
  name: x.name,
  lastName: x.lastName,
  membershipNumber: x.membershipNumber,
  gender: x.gender || GeneroEnum.MASCULINO,
});

export class JugadoresRepository {
  keys = {
    all: () => ["jugadores"],
    one: (id: string) => ["jugadores", id],
    allByCategoria: (id: string) => ["jugadores-by-cat"],
  };

  getAll = async () => {
    const { data } = await httpClient.get<any[]>("players/get-all-players");
    return data.map(getJugadorMapper);
  };

  get = async (id: string) => {
    const { data } = await httpClient.get(`players/${id}`);
    return getJugadorMapper(data);
  };
}

const repo = new JugadoresRepository();

export const useAllJugadoresQuery = () =>
  useQuery({ queryKey: repo.keys.all(), queryFn: repo.getAll });

export const useJugadorQuery = (id: string) =>
  useQuery({ queryKey: repo.keys.one(id), queryFn: () => repo.get(id) });
