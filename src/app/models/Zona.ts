export interface Zona {
  id: string;
  name: string;
  label: string;
  gender: string;
  teamIds: string[];
  categoryIds: string[];
}

export const zonaMapper = (x: any): Zona => ({ ...x });
