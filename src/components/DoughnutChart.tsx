"use client";

interface DoughnutChartProps {
  segments: { label: string; value: number; color: string }[];
  size?: number;
}

const defaultSegments = [
  { label: "North America", value: 45, color: "var(--theme-primary)" },
  { label: "Europe", value: 25, color: "var(--theme-secondary)" },
  { label: "Asia Pacific", value: 18, color: "var(--theme-tertiary)" },
  { label: "Emerging Mkt", value: 12, color: "var(--theme-primary-dim)" },
];

export function DoughnutChart({
  segments = defaultSegments,
  size = 160,
}: DoughnutChartProps) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  const cumulativeValues = segments.map((_, index) =>
    segments.slice(0, index).reduce((sum, seg) => sum + seg.value, 0)
  );
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {segments.map((seg, i) => {
          const pct = seg.value / total;
          const dashLen = circumference * pct;
          const dashGap = circumference - dashLen;
          const offset = circumference * (1 - cumulativeValues[i] / total);

          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashLen} ${dashGap}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)",
                filter: `drop-shadow(0 0 4px color-mix(in srgb, ${seg.color} 25%, transparent))`,
              }}
            />
          );
        })}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius - strokeWidth / 2 - 4}
          fill="var(--color-surface-container-highest)"
        />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {segments.map((seg, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: seg.color,
                boxShadow: `0 0 6px color-mix(in srgb, ${seg.color} 40%, transparent)`,
              }}
            />
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--color-on-surface-variant)",
              }}
            >
              {seg.label}
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--color-on-surface)",
                marginLeft: "auto",
              }}
            >
              {seg.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
