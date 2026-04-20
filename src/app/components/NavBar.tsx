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
      className="h-16 w-full z-50 flex items-center justify-between px-4 md:px-8 relative"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Red bottom glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(180,0,0,0.6) 0%, transparent 70%)",
          height: 1,
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: 24,
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(140,0,0,0.25) 0%, transparent 70%)",
        }}
      />

      <Link href="/" className="flex-shrink-0">
        <Image
          src={logoPath}
          alt={name}
          width={logoWidth}
          height={logoHeight}
          className="h-10 w-auto object-contain"
        />
      </Link>

      <LinkNavigator />

      <button
        className="lg:hidden flex items-center text-white"
        onClick={switchSidebar}
        aria-label="Abrir menú"
      >
        <Menu className="h-7 w-7" />
      </button>
    </div>
  );
};
