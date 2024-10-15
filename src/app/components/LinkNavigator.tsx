"use client";
import {
  useAllCampeonatosQuery,
  useCampeonatoQuery,
} from "@/repositories/CampeonatoRepository";
import { Divider, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const LinkNavigator = () => {
  const path = usePathname();
  const { data: campeonatoActual, isLoading: isLoadingCampeonatoActual } =
    useCampeonatoQuery("66c7945cfbabb65891cfbdf1");
  const { data: allCampeonatos, isLoading: isLoadingAllCampeonatos } =
    useAllCampeonatosQuery();

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

  return (
    <div className="gap-10 text-lg text-white underline-offset-8 hidden lg:flex">
      <Link href={"/"}>
        <button
          className={`transition-opacity	hover:underline ${
            path === "/" ? "underline" : ""
          } hover:cursor-pointer`}
        >
          Inicio
        </button>
      </Link>
      <div className="relative">
        <button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className={`hover:underline ${
            path.includes("categoria") ? "underline" : ""
          } hover:cursor-pointer`}
        >
          Categorias
        </button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            className: "bg-[#A60000] text-white",
            "aria-labelledby": "basic-button",
          }}
        >
          {isLoadingCampeonatoActual || isLoadingAllCampeonatos ? (
            <MenuItem onClick={handleClose}>
              <p className="text-lg">Cargando...</p>
            </MenuItem>
          ) : (
            <>
              <Divider
                className="text-white"
                sx={{
                  "&::before, &::after": {
                    borderColor: "white",
                  },
                }}
              >
                Masculino
              </Divider>
              {campeonatoActual?.categories
                ?.filter((c) => c.gender === "male")
                .map((cat, index) => (
                  <MenuItem key={index} onClick={handleClose}>
                    <Link
                      href={`/campeonatos/${campeonatoActual.id}/categorias/${cat.id}`}
                    >
                      <p className="text-lg">
                        Categoria {cat.name} - Masculina
                      </p>
                    </Link>
                  </MenuItem>
                ))}
              {campeonatoActual?.categories?.filter((c) => c.gender === "male")
                .length === 0 && (
                <MenuItem onClick={handleClose}>
                  <p className="text-lg">No hay categorias masculinas</p>
                </MenuItem>
              )}
              <Divider
                className="text-white"
                sx={{
                  "&::before, &::after": {
                    borderColor: "white",
                  },
                }}
              >
                Femenino
              </Divider>
              {campeonatoActual?.categories
                ?.filter((c) => c.gender === "female")
                .map((cat, index) => (
                  <MenuItem key={index} onClick={handleClose}>
                    <Link
                      href={`/campeonatos/${campeonatoActual.id}/categorias/${cat.id}`}
                    >
                      <p className="text-lg">Categoria {cat.name} - Femenina</p>
                    </Link>
                  </MenuItem>
                ))}
              {campeonatoActual?.categories?.filter(
                (c) => c.gender === "female"
              ).length === 0 && (
                <MenuItem onClick={handleClose}>
                  <p className="text-lg">No hay categorias femeninas</p>
                </MenuItem>
              )}
            </>
          )}
        </Menu>
      </div>
      <p
        className={`hover:underline ${
          path.includes("novedades") ? "underline" : ""
        } hover:cursor-pointer`}
      >
        Novedades
      </p>
      <div className="relative">
        <button
          id="basic-button-copa"
          aria-controls={open ? "basic-menu-copa" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
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
            className: "bg-[#A60000] text-white",
            "aria-labelledby": "basic-button",
          }}
        >
          {isLoadingAllCampeonatos ? (
            <MenuItem onClick={handleClose}>
              <p className="text-lg">Cargando...</p>
            </MenuItem>
          ) : (
            allCampeonatos
              ?.filter((c) => c.type === "cup")
              .map((c, index) => (
                <MenuItem key={index} onClick={handleClose}>
                  <Link href={`/campeonatos/${c.id}`}>
                    <p className="text-lg">{c.name}</p>
                  </Link>
                </MenuItem>
              ))
          )}
        </Menu>
      </div>
    </div>
  );
};
