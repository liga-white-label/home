import {
  faseCopaMapper,
  faseCopaMapperOnlyPositions,
  RoundCup,
} from "@/app/models/FaseCampeonato";
import { httpClient } from "@/app/utils/httpClient";
import { useQuery } from "@tanstack/react-query";
import { Copa } from "@/app/models/Campeonato";
import { Liga } from "@/app/models/Campeonato";
import { getCampeonatoMapper } from "@/app/models/Campeonato";
import { getPositionsMapper } from "@/app/models/FaseCampeonato";
import { partidoMapper } from "@/app/models/Match";
import { GeneroEnum } from "@/app/utils/enums/GeneroEnum";

interface FaseCopa {
  type: string;
  id: string;
  dates?: number[];
}

const normalizePhase = (p: any): FaseCopa => ({
  ...p,
  type: p.type?.toLowerCase(),
});

const playoffResponseToRounds = (data: any): RoundCup[] => {
  const isDouble = data.doubleMatch || false;
  return (data.rounds || []).map((round: any) => ({
    matchesPlayoff: (round.matches || []).map((match: any) => ({
      id: match.id,
      homeMatch: partidoMapper(match.homeMatch),
      awayMatch: partidoMapper(match.awayMatch),
      teamWinner: match.teamWinnerId
        ? {
            id: match.teamWinnerId,
            name: "",
            logoUrl: "",
            gender: GeneroEnum.MASCULINO,
            categoryName: null,
            leagueName: null,
            players: [],
          }
        : null,
      nextMatchId: "",
      homeTeamPenalties: match.penalties?.homeTeam ?? null,
      awayTeamPenalties: match.penalties?.awayTeam ?? null,
    })),
    roundNumber: round.roundNumber,
    doubleMatch: isDouble,
  }));
};

export class CampeonatoRepository {
  keys = {
    all: () => ["campeonatos"],
    one: (id: string) => ["campeonatos", id],
    fases: (id: string) => ["fases-copa", id],
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
    const { data } = await httpClient.get<any[]>("tournaments/");
    return data.map(getCampeonatoMapper);
  };

  get = async (id: string) => {
    const { data } = await httpClient.get<Liga | Copa>(`tournaments/${id}`);
    return getCampeonatoMapper(data);
  };

  allFases = async (cupId: string) => {
    const { data } = await httpClient.get<any[]>(`cups/${cupId}/phases`);
    return data.map(normalizePhase);
  };

  getOneFase = async (faseId: string) => {
    const { data } = await httpClient.get<any>(`phases/${faseId}`);
    return (data.groups || []).map(faseCopaMapper);
  };

  getOnePartidoPlayoff = async ({
    homeTeamId,
    awayTeamId,
    faseId,
  }: {
    homeTeamId: string;
    awayTeamId: string;
    faseId: string;
  }) => {
    const { data } = await httpClient.get<any>(`phases/${faseId}/playoff-match`, {
      params: { homeTeamId, awayTeamId },
    });
    return partidoMapper(data.homeMatch || data);
  };

  getOneFasePlayoff = async (faseId: string) => {
    const { data } = await httpClient.get<any>(`phases/${faseId}`);
    return playoffResponseToRounds(data);
  };

  getGoleadores = async (cupId: string) => {
    const { data } = await httpClient.get<any>(`stats/cups/${cupId}/scorers`);
    return data;
  };

  getAmarillas = async (cupId: string) => {
    const { data } = await httpClient.get<any>(
      `stats/cups/${cupId}/yellow-cards`
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
    const { data } = await httpClient.get<any>(`phases/${faseId}`);
    return (data.groups || []).map((group: any) => ({
      name: group.name,
      matches: (group.matches || [])
        .filter((m: any) => m.dateNumber === dateNumber)
        .map(partidoMapper),
    }));
  };

  getAllPositionsByFase = async (faseId: string) => {
    const { data } = await httpClient.get<any>(`phases/${faseId}`);
    return (data.groups || []).map(faseCopaMapperOnlyPositions);
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
    queryKey: repo.keys.fases(id),
    queryFn: () => repo.allFases(id),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

export const useOneFaseCampeonatoQuery = ({
  id,
  enabled = true,
}: {
  id: string;
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: repo.keys.oneFase(id),
    queryFn: () => repo.getOneFase(id),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    enabled: enabled && id !== "",
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
    enabled: enabled && id !== "",
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
    enabled: !!faseId,
  });

export const useGetAllPositionsByFaseQuery = ({ faseId }: { faseId: string }) =>
  useQuery({
    queryKey: repo.keys.allPositionsByFase(faseId),
    queryFn: () => repo.getAllPositionsByFase(faseId),
    enabled: !!faseId,
  });
