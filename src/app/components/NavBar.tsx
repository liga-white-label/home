"use client";
import Image from "next/image";
import { LinkNavigator } from "./LinkNavigator";
import { Icon } from "@mui/material";
import { Menu } from "@mui/icons-material";

export const NavBar = () => {
  return (
    <div
      className={`h-20 bg-[#a60000] w-full z-50 flex items-center justify-center`}
    >
      <div style={{ position: "absolute", left: 20, zIndex: 99 }}>
        <Image
          src={"/assets/liga_cubb_logo_v2.png"}
          alt={"LIGA CUBB 2024"}
          width={200}
          height={100}
        />
      </div>
      <LinkNavigator />
      <div
        style={{ position: "absolute", right: 20, zIndex: 99 }}
        className="lg:hidden flex"
      >
        <Menu className="text-white h-10 w-10" />
      </div>
    </div>
  );
};
