"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface LayoutContextType {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

const LayoutContext = createContext<LayoutContextType>({
  isSidebarCollapsed: false,
  toggleSidebar: () => {},
});

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <LayoutContext.Provider value={{ isSidebarCollapsed, toggleSidebar }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  return useContext(LayoutContext);
}
