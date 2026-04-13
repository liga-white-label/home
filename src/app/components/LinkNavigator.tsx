"use client";
import {
  useAllCampeonatosQuery,
  useCampeonatoQuery,
} from "@/repositories/CampeonatoRepository";
import { Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Liga } from "@/app/models/Campeonato";
import MiniLoading from "./loading/MiniLoading";

export const LinkNavigator = () => {
  const path = usePathname();

  const { data: allCampeonatos, isLoading: isLoadingAllCampeonatos } =
    useAllCampeonatosQuery();

  const campeonatoActualVacio = allCampeonatos?.find((c) => c.current);

  const { data: campeonatoActual, isLoading: isLoadingCampeonatoActual } =
    useCampeonatoQuery(campeonatoActualVacio?.id || "");

  const ligaActual = campeonatoActual as Liga;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [anchorElCopa, setAnchorElCopa] = useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickCopas = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElCopa(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElCopa(null);
  };

  const open = Boolean(anchorEl);
  const openCopa = Boolean(anchorElCopa);

  if (isLoadingAllCampeonatos || isLoadingCampeonatoActual) {
    return (
      <div className="hidden md:block">
        <MiniLoading />
      </div>
    );
  }

  const categorias = ligaActual?.categories || [];
  const allCopas =
    allCampeonatos?.filter((c) => c.type === "cup" && c.enabled) || [];

  return (
    <div className="hidden lg:flex gap-10 text-white text-lg">
      <Link
        href={"/"}
        className={`hover:underline ${
          path === "/" ? "underline" : ""
        } hover:cursor-pointer`}
      >
        Inicio
      </Link>
      {categorias.length > 0 && (
        <div className="relative">
          <button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className={`hover:underline ${
              path.includes("categorias") ? "underline" : ""
            } hover:cursor-pointer`}
          >
            Categorías
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              style: { backgroundColor: "var(--color-primary)" },
              className: "text-white",
              "aria-labelledby": "basic-button",
            }}
          >
            {categorias.map((c, index) => (
              <MenuItem key={index} onClick={handleClose}>
                <Link href={`/campeonatos/${ligaActual.id}/categorias/${c.id}`}>
                  <p className="text-lg">{`Categoria ${c.name} - ${
                    c.gender === "male" ? "Masculina" : "Femenina"
                  }`}</p>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </div>
      )}
      <Link href={"/novedades"}>
        <p
          className={`hover:underline ${
            path.includes("novedades") ? "underline" : ""
          } hover:cursor-pointer`}
        >
          Novedades
        </p>
      </Link>
      <div className="relative">
        <button
          id="basic-button-copa"
          aria-controls={openCopa ? "basic-menu-copa" : undefined}
          aria-haspopup="true"
          aria-expanded={openCopa ? "true" : undefined}
          onClick={handleClickCopas}
          className={`hover:underline ${
            path.includes("campeonatos") && !path.includes("categorias")
              ? "underline"
              : ""
          } hover:cursor-pointer`}
        >
          Copas
        </button>
        <Menu
          id="basic-menu-copa"
          anchorEl={anchorElCopa}
          open={openCopa}
          onClose={handleClose}
          MenuListProps={{
            style: { backgroundColor: "var(--color-primary)" },
            className: "text-white",
            "aria-labelledby": "basic-button",
          }}
        >
          {allCopas?.length > 0 ? (
            allCopas?.map((c, index) => (
              <MenuItem key={index} onClick={handleClose}>
                <Link href={`/campeonatos/${c.id}`}>
                  <p className="text-lg">{c.name}</p>
                </Link>
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled onClick={handleClose}>
              <p className="text-lg">No hay copas</p>
            </MenuItem>
          )}
        </Menu>
      </div>
    </div>
  );
};
