"use client";
import { MainLayout } from "./components/MainLayout";
import { SidebarProvider } from "./context/SideBarContext";
import ReactQueryProvider from "./utils/providers/ReactQueryProvider";
import { useEffect, useState } from "react";

export default function RootLayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ReactQueryProvider>
      <SidebarProvider>
        <MainLayout>{children}</MainLayout>
      </SidebarProvider>
    </ReactQueryProvider>
  );
}
