import type { Metadata } from "next";
import "../globals.css";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { CustomDrawer } from "./CustomDrawer";

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
      <body className={"font-sans"}>
        <div className="flex flex-col min-w-full">
          <NavBar />
          {children}
          <Footer />
          <CustomDrawer />
        </div>
      </body>
    </html>
  );
};
