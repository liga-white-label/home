import { Categoria } from "@/app/models/Categoria";
import { IndexMatch, Match } from "@/app/models/Match";
import { Team } from "@/app/models/Team";
import { GeneroEnum } from "@/app/utils/enums/GeneroEnum";
import { httpClient } from "@/app/utils/httpClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";

export interface Round {
  matchesPlayoff: RoundMatch[];
  roundNumber: number;
}

export interface RoundMatch {
  id: string;
  awayMatch: Match;
  homeMatch: Match;
  teamWinner?: Team | null;
  nextMatchId: string;
}

export const getCategoriaMapper = (x: any): Categoria => x;

export const faseMapper = (data: any): IndexMatch => ({
  ...data,
  date: moment(data.date),
});

export const partidoMapper = (x: any): Match => ({
  ...x,
  date: !!x?.date ? moment(x?.date) : null,
});

export const playoffFaseMapper = (data: any): Round => {
  const matchesPlayoff: RoundMatch[] = data.matchesPlayoff.map((x: any) => ({
    id: x.id,
    awayMatch: partidoMapper(x.awayMatch),
    homeMatch: partidoMapper(x.homeMatch),
    teamWinner: x.teamWinner,
    nextMatchId: x.nextMatchId,
  }));

  return {
    matchesPlayoff: matchesPlayoff,
    roundNumber: data.roundNumber,
  };
};

export const getPositionsMapper = (
  data: any
): {
  pos: number;
  equipo: string;
  escudo: string;
  pts: number;
  pj: number;
  pg: number;
  pe: number;
  pp: number;
  gf: number;
  gc: number;
  dg: number;
  nextMatch: {
    name: string;
    logo: string;
  } | null;
} => ({
  pos: 0,
  equipo: data.teamName,
  escudo: data.teamLogo,
  pts: data.totalPoints,
  pj: data.matchDraw + data.matchLoss + data.matchWin,
  pg: data.matchWin,
  pe: data.matchDraw,
  pp: data.matchLoss,
  gf: data.goalsFor,
  gc: data.goalsAgainst,
  dg: data.goalsFor - data.goalsAgainst,
  nextMatch: !!data.nextOpponent
    ? { name: data.nextOpponent.name, logo: data.nextOpponent.logo }
    : null,
});
export class CategoriaRepository {
  keys = {
    all: () => ["categorias"],
    one: (idCat: string) => ["categorias", idCat],
    fases: (idCat: string) => ["fases", idCat],
    oneFase: (idFase: string, fecha?: number) => ["fases", idFase + fecha],
    partido: (idPartido: string) => [idPartido],
    goleadores: (idFase: string) => ["goleadores", idFase],
  };

  allFases = async (categoryId: string) => {
    const { data } = await httpClient.get<any>(
      `tournament/league/categories/get-phases?categoryId=${categoryId}`
    );
    return data;
  };

  getOneFase = async (faseId: string, fecha: number) => {
    const { data } = await httpClient.get<any>(
      `tournament/league/categories/phase-general/get-all-matches?phaseId=${faseId}&dateNumber=${
        fecha || 1
      }`
    );
    //const data = fechasData;
    return data.map(faseMapper);
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

  createFasePlayoff = async ({
    partidos,
    categoryId,
  }: {
    partidos: any[];
    categoryId: string;
  }) =>
    await httpClient.post(`tournament/league/categories/create-phase-playoff`, {
      categoryId: categoryId,
      round: { roundNumber: partidos.length, matchesPlayoff: partidos },
    });

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

  getGoleadores = async (faseId: string) => {
    const { data } = await httpClient.get<any>(
      `tournament/league/categories/phase-general/get-scorers?phaseId=${faseId}`
    );
    return data;
  };
}

const repo = new CategoriaRepository();

export const useAllFasesByCategory = (id: string) =>
  useQuery({ queryKey: repo.keys.fases(id), queryFn: () => repo.allFases(id) });

export const useOneFaseQuery = (id: string, fecha: number) =>
  useQuery({
    queryKey: repo.keys.oneFase(id, fecha),
    queryFn: () => repo.getOneFase(id, fecha),
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

export const useCreateFasePlayoffMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.createFasePlayoff,
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: repo.keys.one(vars.categoryId) });
    },
  });
};

export const useOneFasePlayoffQuery = (id: string) =>
  useQuery({
    queryKey: repo.keys.oneFase(id),
    queryFn: () => repo.getOneFasePlayoff(id),
  });

export const usePositionsFaseRegular = (id: string) =>
  useQuery({
    queryKey: repo.keys.oneFase(id),
    queryFn: () => repo.getPositionsFaseRegular(id),
  });

export const useGoleadoresQuery = (id: string) => {
  return useQuery({
    queryKey: repo.keys.goleadores(id),
    queryFn: () => repo.getGoleadores(id),
    enabled: id !== "",
  });
};
