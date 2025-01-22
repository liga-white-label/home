import { Novedad } from "@/app/models/Novedad";
import { httpClient } from "@/app/utils/httpClient";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

export const getNovedadMapper = (x: any): Novedad => ({
  id: x.id || "",
  titulo: x.title,
  descripcion: x.description,
  imagen: x.imageUrl || "",
  fecha: moment(x.created_at),
});

export class NovedadRepository {
  keys = {
    all: () => ["novedades"],
  };

  getAll = async () => {
    const { data } = await httpClient.get<any[]>(
      "announcements/get-all-announcements"
    );
    return data.filter((x) => x.enabled).map(getNovedadMapper);
  };
}

const repo = new NovedadRepository();

export const useAllNovedadesQuery = () =>
  useQuery({ queryKey: repo.keys.all(), queryFn: repo.getAll });
