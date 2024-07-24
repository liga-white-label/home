import { Inferencia } from "../components/Match";
import { Team } from "./Team";

export interface Match {
  team1: Team;
  team2: Team;
  time: string;
  score1?: number;
  score2?: number;
  details?: Inferencia[];
  cancha: string;
}
