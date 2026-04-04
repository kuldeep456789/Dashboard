"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRole } from "@/context/RoleContext";
import { useNotification } from "@/context/NotificationContext";
import { useTheme } from "@/context/ThemeContext";
import { useLayout } from "@/context/LayoutContext";

const tabs = [
  { label: "Overview", href: "/" },
  { label: "Transactions", href: "/transactions" },
  { label: "Insights", href: "/insights" },
];

export function TopHeader() {
  const pathname = usePathname();
  const { role, setRole } = useRole();
  const { showToast } = useNotification();
  const { theme, cycleTheme } = useTheme();
  const { isSidebarCollapsed } = useLayout();
  const desktopSidebarWidth = isSidebarCollapsed ? 80 : 256;

  const handleThemeToggle = () => {
    cycleTheme();
    showToast("Theme Updated", "Switched theme mode.", "info");
  };

  return (
    <header
      className="fixed top-3 sm:top-5 left-1/2 lg:left-[var(--header-desktop-left)] -translate-x-1/2 z-[60] flex justify-between items-center px-3 sm:px-4 lg:px-6 h-14 lg:h-16 rounded-2xl transition-all duration-300 w-[var(--header-mobile-width)] lg:w-[var(--header-desktop-width)]"
      style={{
        "--header-mobile-width": "min(1120px, calc(100vw - 1rem))",
        "--header-desktop-width": `min(1120px, calc(100vw - ${desktopSidebarWidth}px - 1rem))`,
        "--header-desktop-left": `calc(${desktopSidebarWidth}px + (100vw - ${desktopSidebarWidth}px) / 2)`,
        background: "color-mix(in srgb, var(--theme-surface-bright) 92%, transparent)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid color-mix(in srgb, var(--theme-outline-variant) 85%, transparent)",
        boxShadow: "0 8px 24px rgba(2, 8, 23, 0.14)",
      } as CSSProperties}
    >
      <div className="flex items-center gap-2 lg:gap-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Go to overview">
          <svg
            width="30"
            height="30"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform hover:scale-105 duration-200"
          >
            <path d="M4 16C9 8 18 8 26 12C20 18 12 18 4 16Z" fill="url(#gradient-logo-1)" />
            <path d="M28 16C23 24 14 24 6 20C12 14 20 14 28 16Z" fill="url(#gradient-logo-2)" />
            <defs>
              <linearGradient id="gradient-logo-1" x1="4" y1="8" x2="26" y2="18" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--theme-primary)" />
                <stop offset="1" stopColor="var(--theme-primary-container)" />
              </linearGradient>
              <linearGradient id="gradient-logo-2" x1="6" y1="14" x2="28" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--theme-secondary)" />
                <stop offset="1" stopColor="var(--theme-on-surface-variant)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="hidden sm:block leading-tight">
            <p
              style={{
                margin: 0,
                fontSize: "0.62rem",
                letterSpacing: "0.16em",
                fontWeight: 700,
                color: "var(--theme-primary)",
              }}
            >
              AETHERIS
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "0.68rem",
                letterSpacing: "0.02em",
                color: "var(--theme-on-surface-variant)",
              }}
            >
              Finance Board
            </p>
          </div>
        </Link>

        <div
          className="hidden lg:flex items-center gap-1 p-1 rounded-xl"
          style={{ background: "var(--theme-surface-container-low)" }}
        >
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="text-sm font-medium transition-colors duration-200 px-3 py-1.5 rounded-lg"
                style={
                  isActive
                    ? {
                        color: "var(--theme-primary)",
                        background: "color-mix(in srgb, var(--theme-primary) 12%, transparent)",
                        border: "1px solid color-mix(in srgb, var(--theme-primary) 22%, transparent)",
                      }
                    : {
                        color: "var(--theme-on-surface-variant)",
                        border: "1px solid transparent",
                      }
                }
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-3">
        <div
          className="p-1 rounded-lg hidden md:flex items-center relative"
          style={{
            background: "var(--theme-surface-container-low)",
            border: "1px solid color-mix(in srgb, var(--theme-outline-variant) 85%, transparent)",
          }}
        >
          <div
            className="absolute h-8 rounded-md transition-all duration-300"
            style={{
              width: 66,
              background: "var(--theme-surface-container-highest)",
              left: role === "admin" ? 4 : 70,
              boxShadow: "0 1px 6px rgba(2, 8, 23, 0.16)",
            }}
          />
          <button
            onClick={() => setRole("admin")}
            className="relative z-10 px-3 py-1 text-xs font-semibold transition-colors duration-200"
            style={{ color: role === "admin" ? "var(--theme-primary)" : "var(--theme-on-surface-variant)" }}
          >
            Admin
          </button>
          <button
            onClick={() => setRole("viewer")}
            className="relative z-10 px-3 py-1 text-xs font-semibold transition-colors duration-200"
            style={{ color: role === "viewer" ? "var(--theme-secondary)" : "var(--theme-on-surface-variant)" }}
          >
            Viewer
          </button>
        </div>

        <button
          onClick={handleThemeToggle}
          aria-label="Toggle theme"
          className="w-9 h-9 rounded-lg transition-colors flex items-center justify-center cursor-pointer hover:text-[var(--theme-primary)]"
          style={{
            color: "var(--theme-on-surface-variant)",
            border: "1px solid color-mix(in srgb, var(--theme-outline-variant) 75%, transparent)",
            background: "var(--theme-surface-container-low)",
          }}
          title={`Current Theme: ${theme}`}
        >
          <span className="material-symbols-outlined">
            {theme === "light" ? "light_mode" : theme === "dark" ? "dark_mode" : "contrast"}
          </span>
        </button>

        <button
          onClick={() => showToast("No New Notifications", "You are all caught up.", "info")}
          aria-label="Show notifications"
          className="w-9 h-9 rounded-lg transition-colors relative flex items-center justify-center"
          style={{
            color: "var(--theme-on-surface-variant)",
            border: "1px solid color-mix(in srgb, var(--theme-outline-variant) 75%, transparent)",
            background: "var(--theme-surface-container-low)",
          }}
        >
          <span className="material-symbols-outlined">notifications</span>
          <div
            style={{
              position: "absolute",
              top: 7,
              right: 7,
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--theme-error)",
              border: "2px solid var(--theme-surface)",
            }}
          />
        </button>

        <Link href="/settings" aria-label="Open settings profile">
          <div
            className="w-9 h-9 rounded-lg overflow-hidden transition-all duration-200 hover:scale-[1.03]"
            style={{
              border: "1px solid color-mix(in srgb, var(--theme-primary) 30%, transparent)",
              background: "linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))",
              cursor: "pointer",
            }}
          >
            <div className="w-full h-full flex items-center justify-center text-xs font-bold" style={{ color: "var(--theme-on-primary)" }}>
              JS
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}
