"use client";
import { MainLayout } from "./components/MainLayout";
import { SidebarProvider } from "./context/SideBarContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <MainLayout>{children}</MainLayout>
    </SidebarProvider>
  );
}
