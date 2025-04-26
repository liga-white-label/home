import { GeneroEnum } from "../utils/enums/GeneroEnum";

export interface Jugador {
  id: string;
  dni: string;
  fullName: string;
  membershipNumber: string;
}

export const getGeneroLabel = (genero: GeneroEnum) => {
  return genero === GeneroEnum.MASCULINO ? "MAS" : "FEM";
};
