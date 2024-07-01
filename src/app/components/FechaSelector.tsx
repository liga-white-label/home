"use client";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";

const fechas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export const FechaSelector = () => {
  const [fechaActual, setFechaActual] = useState<number>(1);

  return (
    <div className="flex flex-col justify-center w-full items-center gap-2">
      <div className="flex justify-between w-1/2 items-center bg-white rounded-lg">
        <ChevronLeftIcon
          className="h-10 w-10 cursor-pointer"
          onClick={() => {
            if (fechaActual !== 1) {
              setFechaActual(fechaActual - 1);
            }
          }}
        />
        <div className="flex justify-center font-bold text-xl text-center">{`Fecha ${fechaActual}`}</div>
        <ChevronRightIcon
          className="h-10 w-10 cursor-pointer"
          onClick={() => {
            if (fechaActual !== fechas.length) {
              setFechaActual(fechaActual + 1);
            }
          }}
        />
      </div>
      <div className="flex w-1/2 justify-between">
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
            <p className="text-2xl font-extrabold text-center">{f}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
