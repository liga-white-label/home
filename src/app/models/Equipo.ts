import { GeneroEnum } from "../utils/enums/GeneroEnum";

export interface Equipo {
  id: string;
  name: string;
  logo: string;
  gender: string;
  jugadores: [];
}

export const EQUIPOS_MOCK: Equipo[] = [
  {
    id: '1',
    name: 'SIN CONTRATO',
    logo: 'https://ligacubb.com/imagenes/sincontrato.png',
    gender: GeneroEnum.MASCULINO,
    jugadores: []
  },
  {
    id: '2',
    name: 'RITMO Y SUSTANCIA',
    logo: 'https://ligacubb.com/imagenes/ritmoysustancia.png',
    gender: GeneroEnum.MASCULINO,
    jugadores: []
  },
  {
    id: '3',
    name: 'FUERTE AL MEDIO',
    logo: 'https://ligacubb.com/imagenes/fuertealmedio.png',
    gender: GeneroEnum.MASCULINO,
    jugadores: []
  },
  {
    id: '4',
    name: 'SUPERGEDIENTOS',
    logo: 'https://ligacubb.com/imagenes/supergedientos.png',
    gender: GeneroEnum.MASCULINO,
    jugadores: []
  },
  {
    id: '5',
    name: 'ANTIDEPORTIVO CACACIOLI',
    logo: 'https://ligacubb.com/imagenes/antideportivocacacioli.png',
    gender: GeneroEnum.MASCULINO,
    jugadores: []
  },
  {
    id: '6',
    name: 'LIVERFULL',
    logo: 'https://ligacubb.com/imagenes/liverfull.png',
    gender: GeneroEnum.MASCULINO,
    jugadores: []
  },
  {
    id: '7',
    name: 'REPO P.A.',
    logo: 'https://ligacubb.com/imagenes/repopa.png',
    gender: GeneroEnum.MASCULINO,
    jugadores: []
  },
  {
    id: '8',
    name: 'BAFANGULO',
    logo: 'https://ligacubb.com/imagenes/bafangulo.png',
    gender: GeneroEnum.MASCULINO,
    jugadores: []
  },
  {
    id: '9',
    name: 'THE BIRDS',
    logo: 'https://ligacubb.com/imagenes/thebirds.png',
    gender: GeneroEnum.MASCULINO,
    jugadores: []
  },
  {
    id: '10',
    name: 'ULTRA CUEVA FC',
    logo: 'https://ligacubb.com/imagenes/ultracuevafc.png',
    gender: GeneroEnum.MASCULINO,
    jugadores: []
  },
  {
    id: '11',
    name: 'LA BIGORNIA FC',
    logo: 'https://ligacubb.com/imagenes/labigorniafc.png',
    gender: GeneroEnum.MASCULINO,
    jugadores: []
  },
  {
    id: '12',
    name: 'FONDO BLANCO',
    logo: 'https://ligacubb.com/imagenes/fondoblanco.png',
    gender: GeneroEnum.MASCULINO,
    jugadores: []
  },
  {
    id: '13',
    name: 'MANDIYU´S REVENGE',
    logo: 'https://ligacubb.com/imagenes/mandiyusrevenge.png',
    gender: GeneroEnum.MASCULINO,
    jugadores: []
  },
  {
    id: '14',
    name: 'CUALQUIER FRUTA Y/O VERDURA',
    logo: 'https://ligacubb.com/imagenes/cualquierfrutayoverdura.png',
    gender: GeneroEnum.MASCULINO,
    jugadores: []
  },
  {
    id: '15',
    name: 'INQUI FC',
    logo: 'https://ligacubb.com/imagenes/inquifc.png',
    gender: GeneroEnum.MASCULINO,
    jugadores: []
  },
  {
    id: '16',
    name: 'FERNETBACHE',
    logo: 'https://ligacubb.com/imagenes/fernetbache.png',
    gender: GeneroEnum.MASCULINO,
    jugadores: []
  },
  // {
  //   id: 17,
  //   name: 'EL PINCHA',
  //   logo: 'https://ligacubb.com/imagenes/elpinchafc.png',
  //   gender: GeneroEnum.MASCULINO,
  // },
];
