import { FC } from "react";
import { EquipoTablaPosicion } from "../models/Team";
import { TablaPosiciones } from "./TablaPosiciones";

interface TablaDePosicionesWrapperProps {
  data?: EquipoTablaPosicion[];
  dataZonas?: EquipoTablaPosicion[][];
}
export const TablaDePosicionesWrapper: FC<TablaDePosicionesWrapperProps> = ({
  data,
  dataZonas,
}) => {
  if (!!dataZonas) {
    return (
      <div className="flex flex-col gap-4">
        {dataZonas.map((zona, i) => (
          <>
            <p className="text-center">{`Zona ${i + 1}`}</p>
            <TablaPosiciones data={zona} />
          </>
        ))}
      </div>
    );
  }

  if (!!data) {
    return <TablaPosiciones data={data} />;
  }

  return <></>;
};
