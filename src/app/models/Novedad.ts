import { Moment } from "moment";

export interface Novedad {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: Moment;
  imagen: string;
  categoria?: string;
}
