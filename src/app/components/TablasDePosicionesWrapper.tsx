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

  // if (!!dataZonas) {
  //   return (
  //     <div className="flex flex-col gap-4">
  //       {dataZonas.map((zona, i) => (
  //         <>
  //           <p className="text-center">{`Zona ${i + 1}`}</p>
  //           <TablaPosiciones data={zona} />
  //         </>
  //       ))}
  //     </div>
  //   );
  // }

  if (!!data) {
    return <TablaPosiciones data={data} />;
  }

  return <></>;
};
