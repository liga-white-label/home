import { FC } from "react";
import { TablaPosiciones } from "./TablaPosiciones";
import { usePositionsFaseRegular } from "@/repositories/CategoriaRepository";
import LoadingScreen from "./loading/Loading";

interface TablaDePosicionesWrapperProps {
  faseId: string;
}
export const TablaDePosicionesWrapper: FC<TablaDePosicionesWrapperProps> = ({
  faseId,
}) => {
  const { data, isLoading, isError } = usePositionsFaseRegular(faseId);
  console.log(data);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <div>Error...</div>;

  if (!!data) {
    return <TablaPosiciones data={data} />;
  }

  return <></>;
};
