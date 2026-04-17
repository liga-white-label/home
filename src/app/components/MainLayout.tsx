import "../globals.css";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { CustomDrawer } from "./CustomDrawer";

export const MainLayout = ({
  children,
  primaryColor,
  secondaryColor,
}: Readonly<{
  children: React.ReactNode;
  primaryColor: string;
  secondaryColor: string;
}>) => {
  return (
    <html
      lang="en"
      style={{
        ["--color-primary" as string]: primaryColor,
        ["--color-secondary" as string]: secondaryColor,
      }}
    >
      <body>
        <div className="flex flex-col">
          <NavBar />
          <main>{children}</main>
          <Footer />
          <CustomDrawer />
        </div>
      </body>
    </html>
  );
};
