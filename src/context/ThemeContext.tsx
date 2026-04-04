"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  resolvedTheme: "light" | "dark";
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => {},
  resolvedTheme: "dark",
  cycleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "system";
    const saved = localStorage.getItem("aetheris-theme");
    return saved === "light" || saved === "dark" || saved === "system"
      ? saved
      : "system";
  });
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");

  // Sync with document classes and system preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateDOM = (mode: ThemeMode) => {
      const isSystemDark = mediaQuery.matches;
      const isDark = mode === "dark" || (mode === "system" && isSystemDark);

      if (isDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
        setResolvedTheme("dark");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
        setResolvedTheme("light");
      }
    };

    updateDOM(theme);

    const listener = () => updateDOM(theme);
    mediaQuery.addEventListener("change", listener);

    return () => mediaQuery.removeEventListener("change", listener);
  }, [theme]);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    localStorage.setItem("aetheris-theme", mode);
  };

  const cycleTheme = () => {
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("system");
    else setTheme("dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
