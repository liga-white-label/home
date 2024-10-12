import { GeneroEnum } from "../utils/enums/GeneroEnum";

export interface Jugador {
  id: string;
  nro_socio: string;
  nombre: string;
  apellido: string;
  genero: GeneroEnum;
}

export const JUGADORES_MOCK: Jugador[] = [
  {
    id: '1',
    nombre: 'Joaquin',
    apellido: 'Franciscutti',
    nro_socio: '118524',
    genero: GeneroEnum.MASCULINO,
  },
  {
    id: '2',
    nombre: 'Martin',
    apellido: 'Palermo',
    nro_socio: '118521',
    genero: GeneroEnum.MASCULINO,
  },
  {
    id: '3',
    nombre: 'Edinson',
    apellido: 'Cavani',
    nro_socio: '118522',
    genero: GeneroEnum.MASCULINO,
  },
  {
    id: '4',
    nombre: 'Miguel Angel',
    apellido: 'Merentiel',
    nro_socio: '118523',
    genero: GeneroEnum.MASCULINO,
  },
  {
    id: '5',
    nombre: 'Milton',
    apellido: 'Giménez',
    nro_socio: '118525',
    genero: GeneroEnum.MASCULINO,
  },
];
