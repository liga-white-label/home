import { Categoria } from "@/app/models/Categoria";
import { GeneroEnum } from "@/app/utils/enums/GeneroEnum";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { httpClient } from "@/app/utils/httpClient";
import { partidoMapper, SimplifiedMatch } from "@/app/models/Match";
import { Team } from "@/app/models/Equipo";
import {
  playoffFaseMapper,
  getPositionsMapper,
} from "@/app/models/FaseCampeonato";

interface ICreateCategoria {
  name: string;
  gender: string;
  leagueName: string;
}

interface IEditCategoria {
  id: string;
  name: string;
}

export const getCategoriaMapper = (x: any): Categoria => ({
  ...x,
  gender: x.gender as GeneroEnum,
});

export const createCategoriaMapper = (x: ICreateCategoria) => x;

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

  getOneFasePlayoff = async (faseId: string) => {
    const { data } = await httpClient.get<any>(
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

export const useOneFasePlayoffQuery = (id: string) =>
  useSuspenseQuery({
    queryKey: repo.keys.oneFase(id),
    queryFn: () => repo.getOneFasePlayoff(id),
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
