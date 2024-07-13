"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const LinkNavigator = () => {
  const path = usePathname();

  return (
    <div className="gap-10 text-lg text-white underline-offset-8 hidden lg:flex">
      <Link href={"/"}>
        <p
          className={`transition-opacity	hover:underline ${
            path === "/" ? "underline" : ""
          } hover:cursor-pointer`}
        >
          Inicio
        </p>
      </Link>
      <div className="relative">
        <p
          className={`hover:underline ${
            path.includes("categoria") ? "underline" : ""
          } hover:cursor-pointer`}
        >
          Categorias
        </p>
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
