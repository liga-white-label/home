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

export interface TorneoGrupo {
  label: string;
  items: Campeonato[];
}

// Orden preferido de disciplinas en el nav. Cada tier matchea por substring
// (sin acentos, case-insensitive) contra el label real que manda la API, que
// puede variar ("Infantiles y Menores", "Menores e Infantiles", etc.).
const DISCIPLINA_ORDER: string[][] = [
  ["masculin"],
  ["femenin"],
  ["infantil", "menor"],
  ["futsal"],
  ["senior"],
];

const normalizeLabel = (label: string) =>
  label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const disciplinaRank = (label: string) => {
  const normalized = normalizeLabel(label);
  const rank = DISCIPLINA_ORDER.findIndex((keywords) =>
    keywords.some((k) => normalized.includes(k))
  );
  return rank === -1 ? DISCIPLINA_ORDER.length : rank;
};

// Ordena por DISCIPLINA_ORDER; las disciplinas sin match caen al final,
// manteniendo entre sí el orden de primera aparición en la API.
const sortTorneosGrupos = (grupos: TorneoGrupo[]): TorneoGrupo[] =>
  grupos
    .map((grupo, index) => ({ grupo, index }))
    .sort((a, b) => {
      const rankDiff = disciplinaRank(a.grupo.label) - disciplinaRank(b.grupo.label);
      return rankDiff !== 0 ? rankDiff : a.index - b.index;
    })
    .map(({ grupo }) => grupo);

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
  // torneosActivos agrupados por su campo `discipline`, ordenados según
  // DISCIPLINA_ORDER (masculino, femenino, infantiles/menores, futsal,
  // senior); disciplinas sin match caen al final por orden de aparición.
  torneosGrupos: TorneoGrupo[];
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

  const gruposPorDisciplina = new Map<string, Campeonato[]>();
  torneosActivos.forEach((t) => {
    const label = t.discipline || "Otros";
    const items = gruposPorDisciplina.get(label) ?? [];
    items.push(t);
    gruposPorDisciplina.set(label, items);
  });

  const torneosGrupos: TorneoGrupo[] = sortTorneosGrupos(
    Array.from(gruposPorDisciplina, ([label, items]) => ({ label, items }))
  );

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
    torneosGrupos,
    seasonPair,
  };
};
