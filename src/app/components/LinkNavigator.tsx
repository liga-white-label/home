"use client";
import { Divider, Menu, MenuItem, Popover } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const LinkNavigator = () => {
  const path = usePathname();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
          <MenuItem onClick={handleClose}>
            <Link href={"/categoria-a"}>
              <p className="text-lg">Categoria A - Masculina</p>
            </Link>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Link href={"/categoria-b"}>
              <p className="text-lg">Categoria B - Masculina</p>
            </Link>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Link href={"/categoria-c"}>
              <p className="text-lg">Categoria C - Masculina</p>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href={"/categoria-d"}>
              <p className="text-lg">Categoria D - Masculina</p>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href={"/categoria-e"}>
              <p className="text-lg">Categoria E - Masculina</p>
            </Link>
          </MenuItem>
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
          <MenuItem onClick={handleClose}>
            <Link href={"/categoria-a-fem"}>
              <p className="text-lg">Categoria A - Femenina</p>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href={"/categoria-b-fem"}>
              <p className="text-lg">Categoria B - Femenina</p>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href={"/categoria-c-fem"}>
              <p className="text-lg">Categoria C - Femenina</p>
            </Link>
          </MenuItem>
        </Menu>
      </div>
      <p
        className={`hover:underline ${
          path.includes("novedades") ? "underline" : ""
        } hover:cursor-pointer`}
      >
        Novedades
      </p>
      <p
        className={`hover:underline ${
          path.includes("/copas") ? "underline" : ""
        } hover:cursor-pointer`}
      >
        Copas
      </p>
    </div>
  );
};
