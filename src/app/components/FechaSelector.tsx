"use client";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { FC, useState } from "react";

const fechas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

interface FechaSelectorProps {
  hideFechas?: boolean;
  disableMove?: boolean;
}

export const FechaSelector: FC<FechaSelectorProps> = ({
  hideFechas = false,
  disableMove = false,
}) => {
  const [fechaActual, setFechaActual] = useState<number>(9);

  return (
    <div className="flex flex-col justify-center w-full items-center gap-2">
      <div
        className={`flex ${
          disableMove ? "justify-center" : "justify-between"
        } w-1/2 items-center bg-white rounded-lg`}
      >
        {!disableMove && (
          <ChevronLeftIcon
            className="h-10 w-10 cursor-pointer"
            onClick={() => {
              if (fechaActual !== 1) {
                setFechaActual(fechaActual - 1);
              }
            }}
          />
        )}
        <div className="flex justify-center font-bold text-xl  text-center">{`Fecha ${fechaActual}`}</div>
        {!disableMove && (
          <ChevronRightIcon
            className="h-10 w-10 cursor-pointer"
            onClick={() => {
              if (fechaActual !== fechas.length) {
                setFechaActual(fechaActual + 1);
              }
            }}
          />
        )}
      </div>
      {/* {!hideFechas && (
        <div className="flex lg:w-1/2 max-w-full justify-between gap-2">
          {fechas.map((f, i) => (
            <div
              key={i}
              onClick={() => setFechaActual(f)}
              className={`rounded-lg h-8 w-8 shadow-lg transition duration-300 ease-in-out ${
                fechaActual === f
                  ? "bg-red-400 shadow-xl"
                  : "bg-red-200 hover:bg-red-300 hover:shadow-2xl hover:cursor-pointer"
              }`}
            >
              <p className="text-2xl  text-center">{f}</p>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};
