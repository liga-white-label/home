import {
  Campeonato,
  CampeonatoTypeEnum,
  Copa,
  Liga,
  TorneoZonal,
} from "@/app/models/Campeonato";
import { Categoria } from "@/app/models/Categoria";
import {
  useAllCampeonatosQuery,
  useCampeonatoQuery,
} from "@/repositories/CampeonatoRepository";
import { useSeasonPair, SeasonPairResult } from "./useSeasonPair";

export interface UseActiveCampeonatosResult {
  isLoading: boolean;
  isError: boolean;
  allCampeonatos: Campeonato[] | undefined;
  ligaActual: Liga | undefined;
  categorias: Categoria[];
  isLiga: boolean;
  copasActivas: Copa[];
  copaPrincipal: Copa | undefined;
  zonalesActivos: TorneoZonal[];
  zonalPrincipal: TorneoZonal | undefined;
  torneosActivos: Campeonato[];
  seasonPair: SeasonPairResult;
}

// Reemplaza la lógica de "liga marcada current + lista de copas" que estaba
// triplicada en HomeContent/LinkNavigator/CustomDrawer, sumando torneos Zonales
// y el par de temporada (Apertura/Clausura) de la liga actual, si aplica.
export const useActiveCampeonatos = (): UseActiveCampeonatosResult => {
  const {
    data: allCampeonatos,
    isLoading: isLoadingAll,
    isError,
  } = useAllCampeonatosQuery();

  // Sin el chequeo de type, una Zonal marcada `current` por error se leería
  // como la liga actual y rompería nav/home enteros.
  const actual = allCampeonatos?.find(
    (c) => c.current && c.type === CampeonatoTypeEnum.REGULAR
  );

  const { data: campeonatoActual, isLoading: isLoadingActual } =
    useCampeonatoQuery(actual?.id || "");

  const ligaActual = campeonatoActual as Liga | undefined;
  const categorias = ligaActual?.categories || [];
  const isLiga = !!ligaActual?.categories?.length;

  const copasActivas =
    (allCampeonatos?.filter(
      (c) => c.type === CampeonatoTypeEnum.COPA && c.enabled
    ) as Copa[]) || [];

  // La Copa que el admin marcó como principal (current), si la hubiera.
  const copaPrincipal = copasActivas.find((c) => c.current);

  const zonalesActivos =
    (allCampeonatos?.filter(
      (c) => c.type === CampeonatoTypeEnum.ZONAL && c.enabled
    ) as TorneoZonal[]) || [];

  // El torneo Zonal que el admin marcó como principal (current), si lo hubiera.
  const zonalPrincipal = zonalesActivos.find((z) => z.current);

  const torneosActivos = allCampeonatos?.filter((c) => c.enabled) || [];

  const seasonPair = useSeasonPair(ligaActual);

  return {
    isLoading: isLoadingAll || isLoadingActual,
    isError,
    allCampeonatos,
    ligaActual,
    categorias,
    isLiga,
    copasActivas,
    copaPrincipal,
    zonalesActivos,
    zonalPrincipal,
    torneosActivos,
    seasonPair,
  };
};
