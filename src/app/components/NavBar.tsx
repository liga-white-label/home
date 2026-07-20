"use client";
import Image from "next/image";
import { LinkNavigator } from "./LinkNavigator";
import { Menu, LightMode, DarkMode } from "@mui/icons-material";
import Link from "next/link";
import { useSidebar } from "../context/SideBarContext";
import { useThemeMode } from "../context/ThemeModeContext";
import { tenantConfig } from "@/config/tenant";

export const NavBar = () => {
  const { switchSidebar } = useSidebar();
  const { mode, toggleMode } = useThemeMode();
  const { logoPath, logoWidth, logoHeight, name } = tenantConfig.brand;

  return (
    <div
      className="h-16 w-full z-50 flex items-center justify-between px-4 md:px-8 relative"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* Red bottom glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(var(--color-gradient),0.6) 0%, transparent 70%)",
          height: 1,
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: 24,
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(var(--color-gradient),0.25) 0%, transparent 70%)",
        }}
      />

      <Link href="/" className="flex-shrink-0 relative inline-block">
        <Image
          src={logoPath}
          alt={name}
          width={logoWidth}
          height={logoHeight}
          className="h-10 w-auto object-contain"
        />
      </Link>

      <LinkNavigator />

      <div className="flex items-center gap-3">
        <button
          className="flex items-center justify-center h-9 w-9 rounded-full transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
          onClick={toggleMode}
          aria-label={mode === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
        >
          {mode === "light" ? (
            <DarkMode className="h-5 w-5" />
          ) : (
            <LightMode className="h-5 w-5" />
          )}
        </button>

        <button
          className="lg:hidden flex items-center text-[var(--color-text)]"
          onClick={switchSidebar}
          aria-label="Abrir menú"
        >
          <Menu className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
};
