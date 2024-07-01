"use client";
import { createContext, useContext, useState } from "react";

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

  const switchSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleClose = () => {
    setSidebarOpen(false);
  };
  const handleOpen = () => {
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
  return useContext(SidebarContext);
}
