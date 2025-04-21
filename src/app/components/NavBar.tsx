"use client";
import Image from "next/image";
import { LinkNavigator } from "./LinkNavigator";
import { Icon } from "@mui/material";
import { Menu } from "@mui/icons-material";
import Link from "next/link";
import { useSidebar } from "../context/SideBarContext";

export const NavBar = () => {
  const { switchSidebar } = useSidebar();
  return (
    <div
      className={`h-20 bg-[#a60000] w-full z-50 flex items-center justify-center`}
    >
      <Link href="/" className="md:absolute md:left-10">
        <Image
          src={"/assets/logo_2025.png"}
          alt={"LIGA CUBB 2025"}
          width={200}
          height={100}
        />
      </Link>
      <LinkNavigator />
      <div className="lg:hidden flex absolute right-5" onClick={switchSidebar}>
        <Menu className="text-white h-10 w-10" />
      </div>
    </div>
  );
};
