import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { Campeonato } from "@/app/models/Campeonato";
import { httpClient } from "@/app/utils/httpClient";
import { Match } from "@/app/models/Match";
import { Team } from "@/app/models/Team";
import { RoundMatch } from "./CategoriaRepository";

interface ICreateCampeonato {
  name: string;
  year: number;
  type: string;
}

interface IEditCampeonato {
  id: string;
  name: string;
}

interface RoundCup {
  matchesPlayoff: RoundMatch[];
  roundNumber: number;
  doubleMatch: boolean;
}

export const partidoMapper = (x: any): Match => ({
  ...x,
  date: !!x?.date ? moment(x?.date) : null,
  homeTeamPlayerGoals: x?.homeTeamPlayerGoals.map((p: any) => p.id) || [],
  awayTeamPlayerGoals: x?.awayTeamPlayerGoals.map((p: any) => p.id) || [],
  homeTeamYellowCards: x?.homeTeamYellowCards.map((p: any) => p.id) || [],
  awayTeamYellowCards: x?.awayTeamYellowCards.map((p: any) => p.id) || [],
  homeTeamRedCards: x?.homeTeamRedCards.map((p: any) => p.id) || [],
  awayTeamRedCards: x?.awayTeamRedCards.map((p: any) => p.id) || [],
});

export const playoffFaseMapper = (data: any): RoundCup => {
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
    doubleMatch: data.doubleMatch,
  };
};

export const getCampeonatoMapper = (x: any): Campeonato => x;

export const createCampeonatoMapper = (x: ICreateCampeonato) => x;

const getTeamMapper = (x: any): Team => ({ ...x });

const faseCopaMapper = (
  x: any
): { matches: Match[]; name: string; teams: Team[]; positions: any[] } => ({
  matches: x.matches,
  name: x.name,
  teams: x.teams.map(getTeamMapper),
  positions: x.positions,
});

export class CampeonatoRepository {
  keys = {
    all: () => ["campeonatos"],
    one: (id: string) => ["campeonatos", id],
    fases: () => ["fases-copa"],
    oneFase: (idFase: string) => ["fases-copa", idFase],
    partido: (idPartido: string) => [idPartido],
  };

  getAll = async () => {
    const { data } = await httpClient.get<any[]>("tournament/all");
    //return CAMPEONATOS_MOCK;
    return data.map(getCampeonatoMapper);
  };

  get = async (id: string) => {
    const { data } = await httpClient.get<Campeonato>(
      `tournament?tournamentId=${id}`
    );
    //const data = CAMPEONATOS_MOCK.find((c) => c.id === id);
    return data;
  };

  allFases = async (cupId: string) => {
    const { data } = await httpClient.get<any>(
      `tournament/cup/get-phases?cupId=${cupId}`
    );
    return data;
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
    //const data = partidoData;
    return partidoMapper(data);
  };

  getOneFasePlayoff = async (faseId: string) => {
    const { data } = await httpClient.get<RoundCup[]>(
      `tournament/cup/phase-playoff/get-rounds?phaseId=${faseId}`
    );
    return data.map(playoffFaseMapper);
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
}

const repo = new CampeonatoRepository();

export const useAllCampeonatosQuery = () =>
  useQuery({ queryKey: repo.keys.all(), queryFn: repo.getAll });

export const useCampeonatoQuery = (id: string) =>
  useQuery({ queryKey: repo.keys.one(id), queryFn: () => repo.get(id) });

export const useAllFasesByCampeonato = (id: string) =>
  useQuery({ queryKey: repo.keys.fases(), queryFn: () => repo.allFases(id) });

export const useOneFaseCampeonatoQuery = (id: string) =>
  useQuery({
    queryKey: repo.keys.oneFase(id),
    queryFn: () => repo.getOneFase(id),
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

export const useOneFasePlayoffCopaQuery = (id: string) =>
  useQuery({
    queryKey: repo.keys.oneFase(id),
    queryFn: () => repo.getOneFasePlayoff(id),
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
