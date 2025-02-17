import { FC } from "react";
import { TablaPosiciones } from "./TablaPosiciones";
import { useGetPositionsFaseRegular } from "@/repositories/CategoriaRepository";
import LoadingScreen from "./loading/Loading";
import ErrorPage from "./ErrorPage";
interface TablaDePosicionesWrapperProps {
  faseId: string;
}
export const TablaDePosicionesWrapper: FC<TablaDePosicionesWrapperProps> = ({
  faseId,
}) => {
  const { data, isLoading, isError } = useGetPositionsFaseRegular(faseId);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorPage />;

  if (!!data) {
    return <TablaPosiciones data={data} />;
  }

  return <></>;
};
