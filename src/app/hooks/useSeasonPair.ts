import { Liga, SeasonEnum } from "@/app/models/Campeonato";
import { useCampeonatoQuery } from "@/repositories/CampeonatoRepository";

export interface SeasonPairResult {
  isPartOfSeason: boolean;
  currentSeason: SeasonEnum | null;
  apertura: Liga | undefined;
  clausura: Liga | undefined;
  isLoadingLinked: boolean;
}

// Dada una Liga, si forma parte de una temporada (season + linkedSeasonId),
// resuelve la otra mitad y devuelve ambas ya etiquetadas como apertura/clausura
// (el endpoint de tabla acumulada pide explícitamente aperturaLeagueId/clausuraLeagueId,
// no "actual/vinculada").
export const useSeasonPair = (liga: Liga | undefined): SeasonPairResult => {
  const isPartOfSeason = !!liga?.season && !!liga?.linkedSeasonId;
  const linkedId = isPartOfSeason ? liga!.linkedSeasonId! : "";

  const { data: linkedCampeonato, isLoading: isLoadingLinked } =
    useCampeonatoQuery(linkedId);

  if (!isPartOfSeason) {
    return {
      isPartOfSeason: false,
      currentSeason: null,
      apertura: undefined,
      clausura: undefined,
      isLoadingLinked: false,
    };
  }

  const linked = linkedCampeonato as Liga | undefined;
  const apertura =
    liga!.season === SeasonEnum.APERTURA ? liga : (linked as Liga | undefined);
  const clausura =
    liga!.season === SeasonEnum.CLAUSURA ? liga : (linked as Liga | undefined);

  return {
    isPartOfSeason: true,
    currentSeason: liga!.season,
    apertura,
    clausura,
    isLoadingLinked,
  };
};
