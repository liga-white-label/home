"use client";
import Image from "next/image";
import { LinkNavigator } from "./LinkNavigator";
import { Menu } from "@mui/icons-material";
import Link from "next/link";
import { useSidebar } from "../context/SideBarContext";
import { tenantConfig } from "@/config/tenant";

export const NavBar = () => {
  const { switchSidebar } = useSidebar();
  const { logoPath, logoWidth, logoHeight, name } = tenantConfig.brand;

  return (
    <div
      className="h-20 w-full z-50 flex items-center justify-center"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <Link href="/" className="md:absolute md:left-10">
        <Image
          src={logoPath}
          alt={name}
          width={logoWidth}
          height={logoHeight}
        />
      </Link>
      <LinkNavigator />
      <div className="lg:hidden flex absolute right-5" onClick={switchSidebar}>
        <Menu className="text-white h-10 w-10" />
      </div>
    </div>
  );
};
