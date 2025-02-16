"use client";
import { createContext, useContext, useState, useEffect } from "react";

export interface SideBarContextType {
  sidebarOpen: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  switchSidebar: () => void;
}

const SidebarContext = createContext<SideBarContextType>({
  sidebarOpen: false,
  handleClose: () => {},
  handleOpen: () => {},
  switchSidebar: () => {},
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    setIsInitialized(true);
    return () => {
      setIsInitialized(false);
    };
  }, []);

  const switchSidebar = () => {
    if (!isInitialized) return;
    setSidebarOpen(!sidebarOpen);
  };

  const handleClose = () => {
    if (!isInitialized) return;
    setSidebarOpen(false);
  };

  const handleOpen = () => {
    if (!isInitialized) return;
    setSidebarOpen(true);
  };

  return (
    <SidebarContext.Provider
      value={{
        sidebarOpen,
        switchSidebar,
        handleOpen,
        handleClose,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
