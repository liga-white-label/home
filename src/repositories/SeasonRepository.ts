import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/app/utils/httpClient";
import { getPositionsMapper, TablePosition } from "@/app/models/FaseCampeonato";
import { faseFinalMapper, PhaseSeasonFinal } from "@/app/models/FaseFinal";

interface AccumulatedTableParams {
  aperturaLeagueId: string;
  clausuraLeagueId: string;
  categoryName: string;
}

export class SeasonRepository {
  keys = {
    accumulatedTable: ({
      aperturaLeagueId,
      clausuraLeagueId,
      categoryName,
    }: AccumulatedTableParams) => [
      "season-tabla-general",
      aperturaLeagueId,
      clausuraLeagueId,
      categoryName,
    ],
    seasonFinal: (phaseId: string) => ["season-final", phaseId],
  };

  getAccumulatedTable = async ({
    aperturaLeagueId,
    clausuraLeagueId,
    categoryName,
  }: AccumulatedTableParams) => {
    const { data } = await httpClient.get<any[]>(
      `season/accumulated-general-table?aperturaLeagueId=${aperturaLeagueId}&clausuraLeagueId=${clausuraLeagueId}&categoryName=${encodeURIComponent(
        categoryName
      )}`
    );
    return data.map(getPositionsMapper);
  };

  getSeasonFinal = async (phaseId: string) => {
    const { data } = await httpClient.get<any>(
      `season/get-phase-season-final?phaseId=${phaseId}`
    );
    return faseFinalMapper(data);
  };
}

const repo = new SeasonRepository();

export const useAccumulatedTableQuery = (params: AccumulatedTableParams) =>
  useQuery<TablePosition[]>({
    queryKey: repo.keys.accumulatedTable(params),
    queryFn: () => repo.getAccumulatedTable(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    enabled:
      !!params.aperturaLeagueId &&
      !!params.clausuraLeagueId &&
      !!params.categoryName,
  });

export const useSeasonFinalQuery = (phaseId: string) =>
  useQuery<PhaseSeasonFinal>({
    queryKey: repo.keys.seasonFinal(phaseId),
    queryFn: () => repo.getSeasonFinal(phaseId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    enabled: phaseId !== "",
  });
