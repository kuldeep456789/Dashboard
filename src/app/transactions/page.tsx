"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { TopBar } from "@/components/TopBar";

const transactions = [
  {
    merchant: "Apple Store Soho",
    method: "Visa Card **** 4242",
    date: "Oct 24, 2023",
    amount: "-$1,249.00",
    type: "debit",
    category: "Electronics",
  },
  {
    merchant: "Invoice #8829 - Zenith Agency",
    method: "Direct Deposit",
    date: "Oct 23, 2023",
    amount: "+$8,500.00",
    type: "credit",
    category: "Income",
  },
  {
    merchant: "Lufthansa Airlines",
    method: "Amex Gold **** 1005",
    date: "Oct 21, 2023",
    amount: "-$740.20",
    type: "debit",
    category: "Travel",
  },
  {
    merchant: "Nobu Downtown",
    method: "Visa Card **** 4242",
    date: "Oct 20, 2023",
    amount: "-$315.00",
    type: "debit",
    category: "Dining",
  },
  {
    merchant: "Monthly Rent - 50 Hudson Yards",
    method: "ACH Transfer",
    date: "Oct 01, 2023",
    amount: "-$2,400.00",
    type: "debit",
    category: "Housing",
  },
  {
    merchant: "Freelance Payment - Orion Inc",
    method: "Wire Transfer",
    date: "Sep 28, 2023",
    amount: "+$3,200.00",
    type: "credit",
    category: "Income",
  },
  {
    merchant: "Tesla Supercharger",
    method: "Visa Card **** 4242",
    date: "Sep 25, 2023",
    amount: "-$42.50",
    type: "debit",
    category: "Automotive",
  },
  {
    merchant: "Whole Foods Market",
    method: "Visa Card **** 4242",
    date: "Sep 24, 2023",
    amount: "-$187.30",
    type: "debit",
    category: "Groceries",
  },
];

const filters = ["All", "Income", "Expenses", "Pending"];

type SortMode = "date-desc" | "date-asc" | "amount-desc" | "amount-asc";

export default function TransactionsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("date-desc");

  const visibleTransactions = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    const filtered = transactions.filter((t) => {
      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "Income" && t.type === "credit") ||
        (activeFilter === "Expenses" && t.type === "debit");

      if (!matchesFilter) return false;
      if (!normalizedQuery) return true;

      const searchableText = `${t.merchant} ${t.method} ${t.category} ${t.date} ${t.amount}`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });

    const getAmountValue = (amount: string) => {
      const sign = amount.startsWith("-") ? -1 : 1;
      const numeric = Number(amount.replace(/[^0-9.]/g, ""));
      return sign * numeric;
    };

    const sorted = [...filtered].sort((a, b) => {
      if (sortMode === "amount-asc") return getAmountValue(a.amount) - getAmountValue(b.amount);
      if (sortMode === "amount-desc") return getAmountValue(b.amount) - getAmountValue(a.amount);

      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortMode === "date-asc" ? dateA - dateB : dateB - dateA;
    });

    return sorted;
  }, [activeFilter, searchTerm, sortMode]);

  const exportVisibleTransactions = () => {
    if (visibleTransactions.length === 0) return;

    const headers = ["Merchant", "Payment Method", "Category", "Date", "Type", "Amount"];
    const rows = visibleTransactions.map((tx) => [
      tx.merchant,
      tx.method,
      tx.category,
      tx.date,
      tx.type,
      tx.amount,
    ]);

    const escapeCell = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCell).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `transactions-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <TopBar title="Transactions" />

      {/* Summary Cards */}
      <div
        className="animate-fade-in-up grid grid-cols-1 gap-5 mb-8 md:grid-cols-2 xl:grid-cols-3"
      >
        <div className="stat-card">
          <div
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-on-surface-variant)",
              opacity: 0.5,
              marginBottom: "0.5rem",
            }}
          >
            Total Inflow
          </div>
          <div
            className="emissive-positive"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.75rem",
              fontWeight: 800,
            }}
          >
            $42,920.00
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              marginTop: "0.5rem",
            }}
          >
            <span
              className="material-symbols-rounded emissive-positive"
              style={{ fontSize: "1rem" }}
            >
              trending_up
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--color-on-surface-variant)",
              }}
            >
              +8.2% from last month
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-on-surface-variant)",
              opacity: 0.5,
              marginBottom: "0.5rem",
            }}
          >
            Total Outflow
          </div>
          <div
            className="emissive-negative"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.75rem",
              fontWeight: 800,
            }}
          >
            $18,450.00
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              marginTop: "0.5rem",
            }}
          >
            <span
              className="material-symbols-rounded emissive-negative"
              style={{ fontSize: "1rem" }}
            >
              trending_down
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--color-on-surface-variant)",
              }}
            >
              -3.1% from last month
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-on-surface-variant)",
              opacity: 0.5,
              marginBottom: "0.5rem",
            }}
          >
            Current Net Balance
          </div>
          <div
            className="emissive-primary"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.75rem",
              fontWeight: 800,
            }}
          >
            $124,470.50
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              marginTop: "0.5rem",
            }}
          >
            <span
              className="material-symbols-rounded"
              style={{ color: "var(--color-primary)", fontSize: "1rem" }}
            >
              account_balance
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--color-on-surface-variant)",
              }}
            >
              Across all accounts
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs + Table */}
      <div
        className="glass-card animate-fade-in-up animate-delay-100"
        style={{ padding: "1.5rem" }}
      >
        {/* Filter Tabs */}
        <div
          className="flex flex-wrap gap-2 mb-6"
        >
          {filters.map((f) => (
            <button
              key={f}
              className={activeFilter === f ? "btn-primary" : "btn-ghost"}
              style={{ fontSize: "0.75rem", padding: "0.5rem 1rem" }}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}

          <div className="ml-0 sm:ml-auto flex w-full sm:w-auto gap-2">
            <button className="btn-ghost flex-1 sm:flex-none justify-center" style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.75rem", padding: "0.5rem 0.75rem" }}>
              <span className="material-symbols-rounded" style={{ fontSize: "1rem" }}>
                filter_list
              </span>
              Filter
            </button>
            <button
              className="btn-ghost flex-1 sm:flex-none justify-center"
              style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.75rem", padding: "0.5rem 0.75rem" }}
              onClick={exportVisibleTransactions}
              disabled={visibleTransactions.length === 0}
              title={visibleTransactions.length === 0 ? "No data to export" : "Export visible transactions as CSV"}
            >
              <span className="material-symbols-rounded" style={{ fontSize: "1rem" }}>
                download
              </span>
              Export CSV
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by merchant, category, method..."
            aria-label="Search transactions"
            style={{
              width: "100%",
              borderRadius: "0.6rem",
              border: "1px solid color-mix(in srgb, var(--color-outline-variant) 85%, transparent)",
              background: "color-mix(in srgb, var(--color-surface-container-low) 86%, transparent)",
              color: "var(--color-on-surface)",
              padding: "0.6rem 0.8rem",
              fontSize: "0.8rem",
            }}
          />

          <select
            value={sortMode}
            onChange={(event) => setSortMode(event.target.value as SortMode)}
            aria-label="Sort transactions"
            style={{
              width: "100%",
              borderRadius: "0.6rem",
              border: "1px solid color-mix(in srgb, var(--color-outline-variant) 85%, transparent)",
              background: "color-mix(in srgb, var(--color-surface-container-low) 86%, transparent)",
              color: "var(--color-on-surface)",
              padding: "0.6rem 0.8rem",
              fontSize: "0.8rem",
            }}
          >
            <option value="date-desc">Newest first</option>
            <option value="date-asc">Oldest first</option>
            <option value="amount-desc">Highest amount</option>
            <option value="amount-asc">Lowest amount</option>
          </select>
        </div>

        {/* Table */}
        <div className="table-scroll transaction-table-wrap">
        <table className="data-table transactions-table">
          <thead>
            <tr>
              <th>Merchant</th>
              <th>Payment Method</th>
              <th>Category</th>
              <th>Date</th>
              <th style={{ textAlign: "right" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {visibleTransactions.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "2rem 1rem", color: "var(--color-on-surface-variant)" }}>
                  No transactions match your current filter/search.
                </td>
              </tr>
            ) : (
            visibleTransactions.map((tx, i) => (
              <tr
                key={i}
                className="transaction-row"
                style={{
                  "--tx-accent":
                    tx.type === "credit"
                      ? "var(--color-tertiary)"
                      : "var(--color-error)",
                } as CSSProperties}
              >
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <div
                      className="transaction-type-chip"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "0.5rem",
                        background:
                          tx.type === "credit"
                            ? "rgba(184,255,187,0.1)"
                            : "rgba(255,113,108,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{
                          fontSize: "1rem",
                          color:
                            tx.type === "credit"
                              ? "var(--color-tertiary)"
                              : "var(--color-on-surface-variant)",
                        }}
                      >
                        {tx.type === "credit"
                          ? "arrow_downward"
                          : "arrow_upward"}
                      </span>
                    </div>
                    <span className="transaction-merchant" style={{ fontWeight: 600 }}>
                      {tx.merchant}
                    </span>
                  </div>
                </td>
                <td style={{ color: "var(--color-on-surface-variant)" }}>
                  {tx.method}
                </td>
                <td>
                  <span className="badge badge-pending">{tx.category}</span>
                </td>
                <td style={{ color: "var(--color-on-surface-variant)" }}>
                  {tx.date}
                </td>
                <td style={{ textAlign: "right" }}>
                  <span
                    className={
                      tx.type === "credit"
                        ? "emissive-positive"
                        : "emissive-negative"
                    }
                    style={{ fontWeight: 700 }}
                  >
                    {tx.amount}
                  </span>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
        </div>

        {/* Pagination */}
        <div
          className="mt-6 pt-4 border-t border-[rgba(59,72,97,0.15)] flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center"
        >
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--color-on-surface-variant)",
            }}
          >
            {visibleTransactions.length === 0
              ? "Showing 0 of 256 transactions"
              : `Showing 1-${visibleTransactions.length} of 256 transactions`}
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              className="btn-ghost"
              style={{ padding: "0.375rem 0.625rem", fontSize: "0.75rem" }}
            >
              ← Prev
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={p === 1 ? "btn-primary" : "btn-ghost"}
                style={{ padding: "0.375rem 0.625rem", fontSize: "0.75rem" }}
              >
                {p}
              </button>
            ))}
            <button
              className="btn-ghost"
              style={{ padding: "0.375rem 0.625rem", fontSize: "0.75rem" }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
