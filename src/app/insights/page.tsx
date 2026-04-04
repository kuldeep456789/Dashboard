"use client";

import { TopBar } from "@/components/TopBar";
import { BarChart } from "@/components/BarChart";
import { PortfolioChart } from "@/components/PortfolioChart";

const spendingCategories = [
  {
    name: "Dining & Lifestyle",
    amount: "$1,240.00",
    count: 8,
    color: "var(--theme-primary)",
    pct: 45,
  },
  {
    name: "Travel & Leisure",
    amount: "$3,850.50",
    count: 2,
    color: "var(--theme-secondary)",
    pct: 72,
  },
  {
    name: "Utilities & Fixed",
    amount: "$420.00",
    count: 5,
    color: "var(--theme-tertiary)",
    pct: 22,
  },
  {
    name: "Entertainment",
    amount: "$680.00",
    count: 3,
    color: "var(--theme-primary-dim)",
    pct: 35,
  },
];

const alerts = [
  {
    icon: "show_chart",
    title: "Market Pulse",
    desc: "S&P 500 up 1.2% this morning",
    color: "var(--theme-primary)",
  },
  {
    icon: "currency_bitcoin",
    title: "Crypto Alert",
    desc: "BTC stable at resistance $68k",
    color: "var(--theme-secondary)",
  },
  {
    icon: "health_and_safety",
    title: "Portfolio Wellness",
    desc: "Risk-adjusted return higher than 84% of similar investors.",
    color: "var(--theme-tertiary)",
  },
];

export default function InsightsPage() {
  const highestSpendingCategory = spendingCategories.reduce((max, current) =>
    current.pct > max.pct ? current : max
  );

  return (
    <>
      <TopBar
        title="Financial Intelligence"
        subtitle="Real-time analysis of your wealth ecosystem."
      />

      {/* Savings Goal */}
      <div
        className="glass-card animate-fade-in-up grid grid-cols-1 gap-8 items-center lg:grid-cols-2"
        style={{
          padding: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <span
              className="material-symbols-rounded"
              style={{ color: "var(--color-primary)", fontSize: "1.5rem" }}
            >
              savings
            </span>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--color-on-surface)",
                margin: 0,
              }}
            >
              Island Villa Fund
            </h2>
          </div>
          <div style={{ marginBottom: "0.75rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <span
                className="emissive-primary"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                }}
              >
                $15,240
              </span>
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-on-surface-variant)",
                }}
              >
                of $20,000
              </span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: "76%" }} />
            </div>
          </div>
          <div className="insight-card" style={{ padding: "0.75rem 1rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span
                className="material-symbols-rounded"
                style={{ color: "var(--color-tertiary)", fontSize: "1.125rem" }}
              >
                tips_and_updates
              </span>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-on-surface-variant)",
                }}
              >
                <strong style={{ color: "var(--color-tertiary)" }}>
                  Smart Tip:
                </strong>{" "}
                You are 12 days ahead of your saving schedule this month. Keep it up!
              </span>
            </div>
          </div>
        </div>
        <PortfolioChart color="var(--theme-secondary)" height={180} />
      </div>

      {/* Monthly Comparison + Growth Streak */}
      <div
        className="grid grid-cols-1 gap-5 mb-6 xl:grid-cols-[minmax(0,1fr)_340px]"
      >
        <div
          className="glass-card animate-fade-in-up animate-delay-100"
          style={{ padding: "1.5rem" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--color-on-surface)",
              margin: "0 0 0.25rem",
            }}
          >
            Monthly Comparison
          </h2>
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--color-on-surface-variant)",
              margin: "0 0 1rem",
            }}
          >
            Income vs. Expenses
          </p>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              flexWrap: "wrap",
              marginBottom: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--theme-primary)",
                }}
              />
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-on-surface-variant)",
                }}
              >
                Income
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--theme-secondary)",
                }}
              />
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-on-surface-variant)",
                }}
              >
                Expenses
              </span>
            </div>
          </div>
          <BarChart height={200} />
        </div>

        {/* Growth Streak */}
        <div
          className="glass-card animate-fade-in-up animate-delay-200"
          style={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <span
              className="material-symbols-rounded emissive-positive"
              style={{ fontSize: "2rem" }}
            >
              local_fire_department
            </span>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: "var(--color-on-surface)",
                }}
              >
                Growth Streak
              </div>
              <div
                className="emissive-positive"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "2rem",
                  fontWeight: 800,
                }}
              >
                4 Months
              </div>
            </div>
          </div>
          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--color-on-surface-variant)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Your savings rate has increased for 4 consecutive months. This
            trajectory predicts a{" "}
            <strong className="emissive-positive">15% surplus</strong> by
            year-end.
          </p>
        </div>
      </div>

      {/* Deep Spending + Alerts */}
      <div
        className="grid grid-cols-1 gap-5 mb-6 xl:grid-cols-2"
      >
        {/* Spending */}
        <div
          className="glass-card animate-fade-in-up animate-delay-300"
          style={{ padding: "1.5rem" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--color-on-surface)",
              margin: "0 0 0.25rem",
            }}
          >
            Deep Spending Analysis
          </h2>
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--color-on-surface-variant)",
              margin: "0 0 1rem",
            }}
          >
            Targeting high-impact categories.
          </p>

          <div
            style={{
              borderRadius: "0.65rem",
              border: "1px solid color-mix(in srgb, var(--color-outline-variant) 82%, transparent)",
              background: "color-mix(in srgb, var(--color-surface-container-low) 85%, transparent)",
              padding: "0.65rem 0.8rem",
              marginBottom: "0.9rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "0.7rem",
            }}
          >
            <span style={{ fontSize: "0.73rem", color: "var(--color-on-surface-variant)" }}>
              Highest spending category
            </span>
            <span style={{ fontSize: "0.78rem", color: highestSpendingCategory.color, fontWeight: 700 }}>
              {highestSpendingCategory.name} ({highestSpendingCategory.pct}%)
            </span>
          </div>

          <div>
            {spendingCategories.map((cat, i) => (
              <div key={i} className="spending-category">
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.375rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        color: "var(--color-on-surface)",
                      }}
                    >
                      {cat.name}
                    </span>
                    <span
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 700,
                        color: cat.color,
                        textShadow: `0 0 8px ${cat.color}40`,
                      }}
                    >
                      {cat.amount}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <div className="progress-track" style={{ flex: 1 }}>
                      <div
                        className="progress-fill"
                        style={{
                          width: `${cat.pct}%`,
                          background: `linear-gradient(90deg, ${cat.color}, ${cat.color}80)`,
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: "0.6875rem",
                        color: "var(--color-on-surface-variant)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {cat.count} transactions
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div
          className="animate-fade-in-up animate-delay-400"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {alerts.map((alert, i) => (
            <div
              key={i}
              className="insight-card"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "0.5rem",
                  background: `${alert.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  className="material-symbols-rounded"
                  style={{ color: alert.color, fontSize: "1.25rem" }}
                >
                  {alert.icon}
                </span>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    color: "var(--color-on-surface)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {alert.title}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-on-surface-variant)",
                    lineHeight: 1.5,
                  }}
                >
                  {alert.desc}
                </div>
              </div>
            </div>
          ))}

          {/* Predictive CTA */}
          <div className="cta-card" style={{ padding: "1.25rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <span
                className="material-symbols-rounded"
                style={{ color: "var(--color-primary)", fontSize: "1.25rem" }}
              >
                neurology
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: "var(--color-on-surface)",
                  margin: 0,
                }}
              >
                Predictive Cashflow Modeling
              </h3>
            </div>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--color-on-surface-variant)",
                lineHeight: 1.5,
                margin: "0 0 0.75rem",
              }}
            >
              Use our proprietary neural network to forecast your net worth 10
              years into the future based on current habits.
            </p>
            <button className="btn-primary" style={{ fontSize: "0.75rem" }}>
              Launch Forecast →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
