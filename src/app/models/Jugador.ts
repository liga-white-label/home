import { GeneroEnum } from "../utils/enums/GeneroEnum";

export interface Jugador {
  id: string;
  gender: GeneroEnum;
  name: string;
  lastName: string;
  membershipNumber: string;
}

export const getGeneroLabel = (genero: GeneroEnum) => {
  return genero === GeneroEnum.MASCULINO ? "Masculino" : "Femenino";
};
