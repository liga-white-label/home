import { Categoria } from "@/app/models/Categoria";
import { GeneroEnum } from "@/app/utils/enums/GeneroEnum";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { httpClient } from "@/app/utils/httpClient";
import { partidoMapper, SimplifiedMatch } from "@/app/models/Match";
import { Team } from "@/app/models/Equipo";
import {
  playoffFaseMapper,
  getPositionsMapper,
  RoundCup,
} from "@/app/models/FaseCampeonato";

export const getCategoriaMapper = (x: any): Categoria => ({
  ...x,
  gender: x.gender as GeneroEnum,
});

export const faseMapper = (data: any) => {
  return {
    equipoLocal: {
      id: data.homeTeamId,
      name: data.homeTeamName,
      logoUrl: data.homeTeamLogo,
      gender: GeneroEnum.MASCULINO,
    },
    equipoVisitante: {
      id: data.awayTeamId,
      name: data.awayTeamName,
      logoUrl: data.awayTeamLogo,
      gender: GeneroEnum.MASCULINO,
    },
  };
};

export class CategoriaRepository {
  keys = {
    all: () => ["categorias"],
    one: (idCat: string) => ["categorias", idCat],
    fases: (idCat: string) => ["fases", idCat],
    oneFase: (idFase: string, fecha?: number) => ["fases", idFase + fecha],
    partido: (idPartido: string) => [idPartido],
    lastTeams: (idFase: string) => ["lastTeams", idFase],
    goleadores: (idFase: string) => ["goleadores", idFase],
    amarillas: (idFase: string) => ["amarillas", idFase],
    currentDate: (idCat: string) => ["currentDate" + idCat],
  };

  allFases = async (categoryId: string) => {
    const { data } = await httpClient.get<any>(
      `tournament/league/categories/get-phases?categoryId=${categoryId}`
    );
    return data;
  };

  getAllLeagueMatches = async (faseId: string, fecha: number) => {
    const { data } = await httpClient.get<SimplifiedMatch[]>(
      `tournament/league/categories/phase-general/get-all-matches?phaseId=${faseId}&dateNumber=${
        fecha || 1
      }`
    );
    return data;
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
      `tournament/league/categories/phase-general/get-match?phaseId=${faseId}&homeTeamId=${homeTeamId}&awayTeamId=${awayTeamId}`
    );
    return partidoMapper(data);
  };

  getOnePartidoDescenso = async (
    faseId: string,
    homeTeamId: string,
    awayTeamId: string
  ) => {
    const { data } = await httpClient.get<any>(
      `tournament/league/categories/phase-relegated/get-match?phaseId=${faseId}&homeTeamId=${homeTeamId}&awayTeamId=${awayTeamId}`
    );
    return partidoMapper(data);
  };

  getOneFasePlayoff = async (faseId: string) => {
    const { data } = await httpClient.get<RoundCup[]>(
      `tournament/league/categories/phase-playoff/get-rounds?phaseId=${faseId}`
    );
    return data.map(playoffFaseMapper);
  };

  getPositionsFaseRegular = async (faseId: string) => {
    const { data } = await httpClient.get<any>(
      `tournament/league/categories/phase-general/get-positions?phaseId=${faseId}`
    );
    return data.map(getPositionsMapper);
  };

  getLastTeamsOfPhase = async (faseId: string) => {
    const { data } = await httpClient.get<Team[]>(
      `tournament/league/categories/phase-general/get-last-four-teams?phaseId=${faseId}`
    );
    return data;
  };

  getFaseCuadrangular = async (faseId: string) => {
    const { data } = await httpClient.get<any>(
      `tournament/league/categories/phase-cuadrangular/get-groups?phaseId=${faseId}`
    );
    return data;
  };

  getGoleadores = async (categoryId: string) => {
    const { data } = await httpClient.get<any>(
      `tournament/league/categories/get-scorers?categoryId=${categoryId}`
    );
    return data;
  };

  getAmarillas = async (categoryId: string) => {
    const { data } = await httpClient.get<any>(
      `tournament/league/categories/get-yellow-cards?categoryId=${categoryId}`
    );
    return data;
  };

  getCurrentDate = async (phaseId: string) => {
    const { data } = await httpClient.get<any>(
      `tournament/league/categories/phase-general/get-actual-date`,
      {
        params: {
          phaseId: phaseId,
        },
      }
    );
    return data;
  };
}

const repo = new CategoriaRepository();

export const useAllFasesByCategory = (id: string) =>
  useSuspenseQuery({
    queryKey: repo.keys.fases(id),
    queryFn: () => repo.allFases(id),
  });

export const useAllMatchesByFaseQuery = (id: string, fecha: number) =>
  useSuspenseQuery({
    queryKey: repo.keys.oneFase(id, fecha),
    queryFn: () => repo.getAllLeagueMatches(id, fecha),
  });

export const useOnePartidoQuery = (
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
    enabled: enabled,
  });

export const useGetPositionsFaseRegular = (faseId: string) =>
  useQuery({
    queryKey: repo.keys.oneFase(faseId),
    queryFn: () => repo.getPositionsFaseRegular(faseId),
    enabled: !!faseId,
  });

export const useLastTeamsOfPhaseQuery = (faseId: string) =>
  useQuery({
    queryKey: repo.keys.lastTeams(faseId),
    queryFn: () => repo.getLastTeamsOfPhase(faseId),
    enabled: !!faseId,
  });

export const useGetFaseCuadrangularQuery = (faseId: string) =>
  useSuspenseQuery({
    queryKey: repo.keys.oneFase(faseId),
    queryFn: () => repo.getFaseCuadrangular(faseId),
  });

export const useGoleadoresCategoriaQuery = (id: string) => {
  return useQuery({
    queryKey: repo.keys.goleadores(id),
    queryFn: () => repo.getGoleadores(id),
    enabled: id !== "",
  });
};

export const useAmarillasCategoriaQuery = (id: string) => {
  return useQuery({
    queryKey: repo.keys.amarillas(id),
    queryFn: () => repo.getAmarillas(id),
    enabled: id !== "",
  });
};

export const useOnePartidoDescensoQuery = (
  homeTeamId: string,
  awayTeamId: string,
  faseId: string,
  enabled: boolean
) =>
  useQuery({
    queryKey: repo.keys.partido(homeTeamId + awayTeamId + faseId),
    queryFn: () => repo.getOnePartidoDescenso(faseId, homeTeamId, awayTeamId),
    enabled: enabled,
  });

export const useCurrentDateQuery = (phaseId: string) =>
  useQuery({
    queryKey: repo.keys.currentDate(phaseId),
    queryFn: () => repo.getCurrentDate(phaseId),
    enabled: !!phaseId,
  });

// Non-suspense versions used by the home page summary section
export const useAllFasesByCategoryQuery = (id: string) =>
  useQuery({
    queryKey: repo.keys.fases(id),
    queryFn: () => repo.allFases(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const useLeagueMatchesQuery = (
  id: string,
  fecha: number | undefined
) =>
  useQuery({
    queryKey: repo.keys.oneFase(id, fecha),
    queryFn: () => repo.getAllLeagueMatches(id, fecha!),
    enabled: !!id && !!fecha,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
