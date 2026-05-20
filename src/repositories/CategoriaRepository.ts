import { Categoria } from "@/app/models/Categoria";
import { GeneroEnum } from "@/app/utils/enums/GeneroEnum";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { httpClient } from "@/app/utils/httpClient";
import { matchResponseToSimplified, partidoMapper } from "@/app/models/Match";
import {
  getPositionsMapper,
  RoundCup,
} from "@/app/models/FaseCampeonato";

export const getCategoriaMapper = (x: any): Categoria => ({
  ...x,
  gender: x.gender?.toLowerCase() as GeneroEnum,
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

export class CategoriaRepository {
  keys = {
    all: () => ["categorias"],
    one: (idCat: string) => ["categorias", idCat],
    fases: (leagueId: string, idCat: string) => ["fases", leagueId, idCat],
    oneFase: (idFase: string, fecha?: number) => ["fases", idFase + fecha],
    partido: (idPartido: string) => [idPartido],
    lastTeams: (idFase: string) => ["lastTeams", idFase],
    goleadores: (leagueId: string, idCat: string) => ["goleadores", leagueId, idCat],
    amarillas: (leagueId: string, idCat: string) => ["amarillas", leagueId, idCat],
    currentDate: (idCat: string) => ["currentDate" + idCat],
    currentDateGroup: (phaseId: string) => ["currentDateGroup", phaseId],
    allMatches: (tournamentId: string, categoryId: string, faseId: string, fecha: number) => [
      "matches",
      tournamentId,
      categoryId,
      faseId,
      fecha,
    ],
  };

  allFases = async (leagueId: string, categoryId: string) => {
    const { data } = await httpClient.get<any[]>(
      `leagues/${leagueId}/categories/${categoryId}/phases`
    );
    return {
      phases: data.map((p: any) => ({ ...p, type: p.type?.toLowerCase() })),
    };
  };

  getAllLeagueMatches = async (
    tournamentId: string,
    categoryId: string,
    faseId: string,
    fecha: number
  ) => {
    const { data } = await httpClient.get<any[]>(
      `phases/${tournamentId}/${faseId}/matches`,
      { params: { date: fecha || 1, categoryId } }
    );
    return data.map(matchResponseToSimplified);
  };

  getOneFasePlayoff = async (faseId: string) => {
    const { data } = await httpClient.get<any>(`phases/${faseId}`);
    return playoffResponseToRounds(data);
  };

  getPositionsFaseRegular = async (faseId: string) => {
    const { data } = await httpClient.get<any>(`phases/${faseId}`);
    return (data.positions || []).map(getPositionsMapper);
  };

  getFaseCuadrangular = async (faseId: string) => {
    const { data } = await httpClient.get<any>(`phases/${faseId}`);
    return data.groups || [];
  };

  getGoleadores = async (leagueId: string, categoryId: string) => {
    const { data } = await httpClient.get<any>(
      `stats/leagues/${leagueId}/categories/${categoryId}/scorers`
    );
    return data;
  };

  getAmarillas = async (leagueId: string, categoryId: string) => {
    const { data } = await httpClient.get<any>(
      `stats/leagues/${leagueId}/categories/${categoryId}/yellow-cards`
    );
    return data;
  };

  getCurrentDate = async (phaseId: string) => {
    const { data } = await httpClient.get<number>(
      `phases/${phaseId}/actual-date`
    );
    return data;
  };

  getGroupCurrentDate = async (phaseId: string) => {
    const { data } = await httpClient.get<number>(
      `phases/group/${phaseId}/actual-date`
    );
    return data;
  };
}

const repo = new CategoriaRepository();

export const useAllFasesByCategory = (leagueId: string, id: string) =>
  useQuery({
    queryKey: repo.keys.fases(leagueId, id),
    queryFn: () => repo.allFases(leagueId, id),
    enabled: !!id && !!leagueId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

export const useAllMatchesByFaseQuery = (
  tournamentId: string,
  categoryId: string,
  id: string,
  fecha: number
) =>
  useQuery({
    queryKey: repo.keys.allMatches(tournamentId, categoryId, id, fecha),
    queryFn: () => repo.getAllLeagueMatches(tournamentId, categoryId, id, fecha),
    enabled: !!id && !!tournamentId && !!categoryId,
  });

export const useOneFasePlayoffQuery = ({
  id,
  enabled = true,
}: {
  id: string;
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: repo.keys.oneFase(id),
    queryFn: () => repo.getOneFasePlayoff(id),
    enabled: enabled && id !== "",
  });

export const useGetPositionsFaseRegular = (faseId: string) =>
  useQuery({
    queryKey: repo.keys.oneFase(faseId),
    queryFn: () => repo.getPositionsFaseRegular(faseId),
    enabled: !!faseId,
  });

export const useGetFaseCuadrangularQuery = (faseId: string) =>
  useSuspenseQuery({
    queryKey: repo.keys.oneFase(faseId),
    queryFn: () => repo.getFaseCuadrangular(faseId),
  });

export const useGoleadoresCategoriaQuery = (leagueId: string, id: string) => {
  return useQuery({
    queryKey: repo.keys.goleadores(leagueId, id),
    queryFn: () => repo.getGoleadores(leagueId, id),
    enabled: id !== "" && leagueId !== "",
  });
};

export const useAmarillasCategoriaQuery = (leagueId: string, id: string) => {
  return useQuery({
    queryKey: repo.keys.amarillas(leagueId, id),
    queryFn: () => repo.getAmarillas(leagueId, id),
    enabled: id !== "" && leagueId !== "",
  });
};

export const useCurrentDateQuery = (phaseId: string) =>
  useQuery({
    queryKey: repo.keys.currentDate(phaseId),
    queryFn: () => repo.getCurrentDate(phaseId),
    enabled: !!phaseId,
  });

export const useCurrentDateGroupQuery = (phaseId: string) =>
  useQuery({
    queryKey: repo.keys.currentDateGroup(phaseId),
    queryFn: () => repo.getGroupCurrentDate(phaseId),
    enabled: !!phaseId,
  });

// Non-suspense versions used by the home page summary section
export const useAllFasesByCategoryQuery = (leagueId: string, id: string) =>
  useQuery({
    queryKey: repo.keys.fases(leagueId, id),
    queryFn: () => repo.allFases(leagueId, id),
    enabled: !!id && !!leagueId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const useLeagueMatchesQuery = (
  tournamentId: string,
  categoryId: string,
  id: string,
  fecha: number | undefined
) =>
  useQuery({
    queryKey: repo.keys.allMatches(tournamentId, categoryId, id, fecha ?? 0),
    queryFn: () => repo.getAllLeagueMatches(tournamentId, categoryId, id, fecha!),
    enabled: !!id && !!fecha && !!tournamentId && !!categoryId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
