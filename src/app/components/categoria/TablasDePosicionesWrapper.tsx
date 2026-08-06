import { FC } from "react";
import { TablaPosiciones } from "../TablaPosiciones";
import { useGetPositionsFaseRegular } from "@/repositories/CategoriaRepository";
import LoadingScreen from "../loading/Loading";
import ErrorPage from "../ErrorPage";
interface TablaDePosicionesWrapperProps {
  faseId: string;
  showPromotionZones?: boolean;
}
export const TablaDePosicionesWrapper: FC<TablaDePosicionesWrapperProps> = ({
  faseId,
  showPromotionZones = true,
}) => {
  const { data, isLoading, isError } = useGetPositionsFaseRegular(faseId);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorPage />;

  if (!!data) {
    return <TablaPosiciones data={data} showPromotionZones={showPromotionZones} />;
  }

  return (
    <div className="flex justify-center py-10">
      <p className="text-[var(--color-text-secondary)]">
        No hay información de posiciones disponible.
      </p>
    </div>
  );
};
