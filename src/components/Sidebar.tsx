"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRole } from "@/context/RoleContext";
import { useNotification } from "@/context/NotificationContext";
import { useLayout } from "@/context/LayoutContext";

const mainNav = [
  { icon: "dashboard", label: "Overview", href: "/" },
  { icon: "payments", label: "Transactions", href: "/transactions" },
  { icon: "insights", label: "Insights", href: "/insights" },
  { icon: "settings", label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { role } = useRole();
  const { showToast } = useNotification();
  const { isSidebarCollapsed, toggleSidebar } = useLayout();

  const handleAddTransaction = () => {
    if (role === "viewer") {
      showToast("Access Denied", "Viewer roles cannot add transactions.", "error");
    } else {
      showToast("Action Initiated", "Opening transaction form...", "success");
    }
  };

  return (
    <aside
      className="fixed left-0 h-full hidden lg:flex flex-col py-8 px-4 transition-all duration-300 z-40"
      style={{
        background: "color-mix(in srgb, var(--theme-surface-container-low) 92%, transparent)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderRight: "1px solid color-mix(in srgb, var(--theme-outline-variant) 85%, transparent)",
        boxShadow: "8px 0 24px rgba(2, 8, 23, 0.12)",
        paddingTop: "6rem",
        width: isSidebarCollapsed ? "80px" : "256px",
      }}
    >
      <div className={`flex items-center mb-6 ${isSidebarCollapsed ? "justify-center" : "px-3 gap-2"}`}>
        {!isSidebarCollapsed && (
          <div className="mr-auto">
            <p
              style={{
                fontSize: "0.625rem",
                letterSpacing: "0.14em",
                fontWeight: 700,
                color: "var(--theme-primary)",
                margin: 0,
              }}
            >
              NAVIGATION
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--theme-on-surface-variant)",
                margin: 0,
              }}
            >
              Workspace
            </p>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          style={{
            background: "var(--theme-surface-container-low)",
            border: "1px solid color-mix(in srgb, var(--theme-outline-variant) 80%, transparent)",
            color: "var(--theme-on-surface-variant)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px",
            borderRadius: "10px",
            transition: "background 0.2s, color 0.2s",
          }}
          className="hover:bg-[var(--theme-surface-container-highest)] hover:text-[var(--theme-primary)]"
          title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "1.4rem" }}>
            {isSidebarCollapsed ? "right_panel_open" : "left_panel_close"}
          </span>
        </button>
      </div>

      <nav className="flex-1 space-y-1.5">
        {mainNav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center transition-all duration-200 ${
                isSidebarCollapsed ? "px-0 justify-center w-12 h-12 mx-auto rounded-xl" : "px-3 py-2.5 gap-3 rounded-xl"
              }`}
              style={
                isActive
                  ? {
                      color: "var(--theme-primary)",
                      background: "color-mix(in srgb, var(--theme-primary) 10%, transparent)",
                      border: "1px solid color-mix(in srgb, var(--theme-primary) 22%, transparent)",
                      boxShadow: "inset 3px 0 0 var(--theme-primary)",
                      fontWeight: 600,
                    }
                  : {
                      color: "var(--theme-on-surface-variant)",
                      border: "1px solid transparent",
                    }
              }
              title={isSidebarCollapsed ? item.label : undefined}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>
                {item.icon}
              </span>
              {!isSidebarCollapsed && <span style={{ fontSize: "0.9rem" }}>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className={isSidebarCollapsed ? "px-1" : "px-3"}>
        <button
          onClick={handleAddTransaction}
          className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center transition-all duration-200 active:scale-95 hover:-translate-y-0.5 ${
            !isSidebarCollapsed ? "gap-2" : ""
          }`}
          style={{
            background: "linear-gradient(135deg, var(--theme-primary), var(--theme-primary-container))",
            color: "var(--theme-on-primary)",
            border: "1px solid color-mix(in srgb, var(--theme-primary) 30%, transparent)",
            boxShadow: "0 10px 20px color-mix(in srgb, var(--theme-primary) 22%, transparent)",
          }}
          title={isSidebarCollapsed ? "Add Transaction" : undefined}
        >
          <span className="material-symbols-outlined">add</span>
          {!isSidebarCollapsed && "Add Transaction"}
        </button>
      </div>
    </aside>
  );
}
