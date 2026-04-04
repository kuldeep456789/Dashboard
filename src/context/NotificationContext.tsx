"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message: string;
}

interface NotificationContextType {
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  toasts: [],
  showToast: () => {},
  removeToast: () => {},
});

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const toastIdCounter = useRef(0);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((title: string, message: string, type: ToastType = "info") => {
    toastIdCounter.current += 1;
    const id = `toast-${toastIdCounter.current}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  // Simulate incoming live notifications
  useEffect(() => {
    const timer = setTimeout(() => {
      showToast(
        "Market Alert",
        "Ethereum (ETH) is up +4.2% in the last hour.",
        "success"
      );
    }, 15000); // 15 seconds after load

    const timer2 = setTimeout(() => {
      showToast(
        "Security Alert",
        "New login detected from Mac OS (Safari).",
        "warning"
      );
    }, 45000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [showToast]);

  return (
    <NotificationContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      {/* Toast Container */}
      <div
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              padding: "1rem 1.25rem",
              background: "rgba(2, 19, 43, 0.95)",
              backdropFilter: "blur(12px)",
              borderRadius: "0.75rem",
              border: "1px solid color-mix(in srgb, var(--theme-primary) 20%, transparent)",
              color: "var(--theme-on-surface)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
              minWidth: "300px",
              maxWidth: "400px",
              pointerEvents: "auto",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
              animation: "fadeInUp 0.3s ease forwards",
            }}
          >
            <div
              style={{
                color:
                  toast.type === "success"
                    ? "var(--theme-primary)"
                    : toast.type === "error"
                    ? "var(--theme-error)"
                    : toast.type === "warning"
                    ? "var(--theme-secondary)"
                    : "var(--theme-tertiary)",
              }}
            >
              <span className="material-symbols-outlined">
                {toast.type === "success"
                  ? "check_circle"
                  : toast.type === "error"
                  ? "error"
                  : toast.type === "warning"
                  ? "warning"
                  : "info"}
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, fontSize: "0.875rem", fontWeight: 700, fontFamily: "var(--font-heading)" }}>
                {toast.title}
              </h4>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--theme-on-surface-variant)", marginTop: "0.25rem" }}>
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--theme-on-surface-variant)",
                cursor: "pointer",
                padding: "0.25rem",
                display: "flex",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>
                close
              </span>
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
