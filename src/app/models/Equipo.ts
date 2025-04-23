import { GeneroEnum } from "@/app/utils/enums/GeneroEnum";
import { Jugador } from "@/app/models/Jugador";

export interface Team {
  id: string;
  name: string;
  gender: GeneroEnum;
  logoUrl: string;
  categoryName: string | null;
  leagueName: string | null;
  players: Jugador[];
}
