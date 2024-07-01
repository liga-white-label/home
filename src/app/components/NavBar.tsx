"use client";
import { Menu } from "@mui/icons-material";
import { useSidebar } from "../context/SideBarContext";
import Image from "next/image";

export const NavBar = () => {
  const { switchSidebar, sidebarOpen } = useSidebar();

  return (
    <div
      className={`h-20 bg-[#a60000] w-full z-50 flex items-center justify-center ${
        sidebarOpen ? "shadow-none" : "shadow-2xl"
      }`}
    >
      <div
        className="self-center"
        style={{ position: "absolute", left: 20, zIndex: 99 }}
      >
        <Menu
          className="h-8 w-8 cursor-pointer"
          style={{ color: "white" }}
          onClick={switchSidebar}
        />
      </div>
      <Image
        src={"/assets/ligacubblogo.png"}
        alt={"LIGA CUBB 2024"}
        width={400}
        height={40}
      />
    </div>
  );
};
