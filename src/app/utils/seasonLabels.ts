import { SeasonEnum } from "@/app/models/Campeonato";

export const SEASON_LABEL: Record<SeasonEnum, string> = {
  [SeasonEnum.APERTURA]: "Apertura",
  [SeasonEnum.CLAUSURA]: "Clausura",
};

export const otherSeason = (season: SeasonEnum): SeasonEnum =>
  season === SeasonEnum.APERTURA ? SeasonEnum.CLAUSURA : SeasonEnum.APERTURA;
