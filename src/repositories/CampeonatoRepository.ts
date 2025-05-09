import {
  faseCopaMapper,
  faseCopaMapperOnlyMatches,
  faseCopaMapperOnlyPositions,
  RoundCup,
} from "@/app/models/FaseCampeonato";
import { httpClient } from "@/app/utils/httpClient";
import { useQuery } from "@tanstack/react-query";
import { Copa } from "@/app/models/Campeonato";
import { Liga } from "@/app/models/Campeonato";
import { getCampeonatoMapper } from "@/app/models/Campeonato";
import { playoffFaseMapper } from "@/app/models/FaseCampeonato";
import { partidoMapper } from "@/app/models/Match";

type FaseCopaType = "group" | "playoff";
interface FaseCopa {
  type: FaseCopaType;
  id: string;
}
export class CampeonatoRepository {
  keys = {
    all: () => ["campeonatos"],
    one: (id: string) => ["campeonatos", id],
    fases: () => ["fases-copa"],
    oneFase: (idFase: string) => ["fases-copa", idFase],
    partido: (idPartido: string) => [idPartido],
    goleadores: (idFase: string) => ["goleadores", idFase],
    amarillas: (idFase: string) => ["amarillas", idFase],
    allGroupMatchesByFase: (faseId: string, dateNumber: number) => [
      "fases-grupos",
      faseId,
      dateNumber,
    ],
    allPositionsByFase: (faseId: string) => ["fases-grupos", faseId],
  };

  getAll = async () => {
    const { data } = await httpClient.get<any[]>("tournament/all");
    return data.map(getCampeonatoMapper);
  };

  get = async (id: string) => {
    const { data } = await httpClient.get<Liga | Copa>(
      `tournament?tournamentId=${id}`
    );
    return getCampeonatoMapper(data);
  };

  allFases = async (cupId: string) => {
    const { data } = await httpClient.get<{ phases: FaseCopa[] }>(
      `tournament/cup/get-phases?cupId=${cupId}`
    );
    return data.phases;
  };

  getOneFase = async (faseId: string) => {
    const { data } = await httpClient.get<any[]>(
      `tournament/cup/get-all-groups?phaseId=${faseId}`
    );
    return data.map(faseCopaMapper);
  };

  getOnePartido = async ({
    homeTeamId,
    awayTeamId,
    faseId,
  }: {
    homeTeamId: string;
    awayTeamId: string;
    faseId: string;
  }) => {
    const { data } = await httpClient.get<any>(
      `tournament/cup/phase-group/get-match?phaseId=${faseId}&homeTeamId=${homeTeamId}&awayTeamId=${awayTeamId}`
    );
    return partidoMapper(data);
  };

  getOnePartidoPlayoff = async ({
    homeTeamId,
    awayTeamId,
    faseId,
    matchPlayoffId,
  }: {
    homeTeamId: string;
    awayTeamId: string;
    faseId: string;
    matchPlayoffId: string;
  }) => {
    const { data } = await httpClient.get<any>(
      `tournament/cup/phase-playoff/get-match?phaseId=${faseId}&homeTeamId=${homeTeamId}&awayTeamId=${awayTeamId}&matchPlayoffId=${matchPlayoffId}`
    );
    return partidoMapper(data);
  };

  getOneFasePlayoff = async (faseId: string) => {
    const { data } = await httpClient.get<RoundCup[]>(
      `tournament/cup/phase-playoff/get-rounds?phaseId=${faseId}`
    );
    return data.map(playoffFaseMapper);
  };

  getGoleadores = async (cupId: string) => {
    const { data } = await httpClient.get<any>(
      `tournament/cup/get-scorers?cupId=${cupId}`
    );
    return data;
  };

  getAmarillas = async (cupId: string) => {
    const { data } = await httpClient.get<any>(
      `tournament/cup/get-yellow-cards?cupId=${cupId}`
    );
    return data;
  };

  getAllGroupMatchesByFase = async ({
    faseId,
    dateNumber,
  }: {
    faseId: string;
    dateNumber: number;
  }) => {
    const { data } = await httpClient.get<any[]>(
      `tournament/phase/get-all-groups-matches?phaseId=${faseId}&dateNumber=${dateNumber}`
    );
    return data.map(faseCopaMapperOnlyMatches);
  };

  getAllPositionsByFase = async (faseId: string) => {
    const { data } = await httpClient.get<any[]>(
      `tournament/phase/get-all-groups-positions?phaseId=${faseId}`
    );
    return data.map(faseCopaMapperOnlyPositions);
  };
}

const repo = new CampeonatoRepository();

export const useAllCampeonatosQuery = () =>
  useQuery({
    queryKey: repo.keys.all(),
    queryFn: repo.getAll,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

export const useCampeonatoQuery = (id: string) =>
  useQuery({
    queryKey: repo.keys.one(id),
    queryFn: () => repo.get(id),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    enabled: id !== "",
  });

export const useAllFasesByCampeonato = (id: string) =>
  useQuery({
    queryKey: repo.keys.fases(),
    queryFn: () => repo.allFases(id),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

export const useOneFaseCampeonatoQuery = (id: string, enabled: boolean) =>
  useQuery({
    queryKey: repo.keys.oneFase(id),
    queryFn: () => repo.getOneFase(id),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    enabled: enabled && id !== "",
  });

export const useOnePartidoCopaQuery = (
  localId: string,
  awayId: string,
  faseId: string,
  enabled: boolean
) =>
  useQuery({
    queryKey: repo.keys.partido(localId + awayId + faseId),
    queryFn: () =>
      repo.getOnePartido({
        homeTeamId: localId,
        awayTeamId: awayId,
        faseId: faseId,
      }),
    enabled: enabled,
  });

export const useOnePartidoCopaPlayoffQuery = (
  localId: string,
  awayId: string,
  roundId: string,
  faseId: string,
  enabled: boolean
) =>
  useQuery({
    queryKey: repo.keys.partido(localId + awayId + faseId + roundId),
    queryFn: () =>
      repo.getOnePartidoPlayoff({
        homeTeamId: localId,
        awayTeamId: awayId,
        faseId: faseId,
        matchPlayoffId: roundId,
      }),
    enabled: enabled,
  });

export const useOneFasePlayoffCopaQuery = ({
  id,
  enabled = true,
}: {
  id: string;
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: repo.keys.oneFase(id),
    queryFn: () => repo.getOneFasePlayoff(id),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    enabled: enabled,
  });

export const useGoleadoresCopaQuery = (id: string) => {
  return useQuery({
    queryKey: repo.keys.goleadores(id),
    queryFn: () => repo.getGoleadores(id),
    enabled: id !== "",
  });
};

export const useAmarillasCopaQuery = (id: string) => {
  return useQuery({
    queryKey: repo.keys.amarillas(id),
    queryFn: () => repo.getAmarillas(id),
    enabled: id !== "",
  });
};

export const useGetAllGroupMatchesByFaseQuery = ({
  faseId,
  dateNumber,
}: {
  faseId: string;
  dateNumber: number;
}) =>
  useQuery({
    queryKey: repo.keys.allGroupMatchesByFase(faseId, dateNumber),
    queryFn: () => repo.getAllGroupMatchesByFase({ faseId, dateNumber }),
  });

export const useGetAllPositionsByFaseQuery = ({ faseId }: { faseId: string }) =>
  useQuery({
    queryKey: repo.keys.allPositionsByFase(faseId),
    queryFn: () => repo.getAllPositionsByFase(faseId),
  });
