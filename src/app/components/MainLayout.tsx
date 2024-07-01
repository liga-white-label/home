import type { Metadata } from "next";
import "../globals.css";
import { CustomDrawer } from "./CustomDrawer";
import { quicksand } from "../utils/fonts";
import { NavBar } from "./NavBar";

export const metadata: Metadata = {
  title: "LIGA CUBB 2024",
};

export const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <div className="flex flex-col">
          <NavBar />
          {children}
        </div>
        <CustomDrawer />
      </body>
    </html>
  );
};
