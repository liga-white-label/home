"use client";
import { MainLayout } from "./components/MainLayout";
import { SidebarProvider } from "./context/SideBarContext";
import ReactQueryProvider from "./utils/providers/ReactQueryProvider";

export default function RootLayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <SidebarProvider>
        <MainLayout>{children}</MainLayout>
      </SidebarProvider>
    </ReactQueryProvider>
  );
}
