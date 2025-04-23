import { Jugador } from "@/app/models/Jugador";
import { httpClient } from "@/app/utils/httpClient";
import { useQuery } from "@tanstack/react-query";

export class JugadoresRepository {
  keys = {
    all: () => ["jugadores"],
    one: (id: string) => ["jugadores", id],
    allByCategoria: (id: string) => ["jugadores-by-cat"],
  };

  getAll = async () => {
    const { data } = await httpClient.get<Jugador[]>("players/get-all-players");
    return data;
  };

  get = async (id: string) => {
    const { data } = await httpClient.get<Jugador>(`players/${id}`);
    return data;
  };
}

const repo = new JugadoresRepository();

export const useAllJugadoresQuery = () =>
  useQuery({ queryKey: repo.keys.all(), queryFn: repo.getAll });

export const useJugadorQuery = (id: string) =>
  useQuery({ queryKey: repo.keys.one(id), queryFn: () => repo.get(id) });
