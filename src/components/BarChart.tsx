"use client";

import { useEffect, useRef } from "react";

interface BarChartProps {
  data?: { label: string; income: number; expense: number }[];
  height?: number;
}

const defaultData = [
  { label: "Jun", income: 6200, expense: 3800 },
  { label: "Jul", income: 7100, expense: 4200 },
  { label: "Aug", income: 6800, expense: 3500 },
  { label: "Sep", income: 8200, expense: 4800 },
  { label: "Oct", income: 8500, expense: 5100 },
  { label: "Nov", income: 9200, expense: 4200 },
];

export function BarChart({ data = defaultData, height = 200 }: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const padding = { top: 10, bottom: 30, left: 10, right: 10 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    const maxVal = Math.max(...data.flatMap((d) => [d.income, d.expense]));
    const barGroupWidth = chartW / data.length;
    const barWidth = barGroupWidth * 0.3;
    const gap = barGroupWidth * 0.05;

    let progress = 0;
    const duration = 40;

    function draw() {
      if (!ctx) return;
      progress++;
      const pct = Math.min(progress / duration, 1);
      const ease = 1 - Math.pow(1 - pct, 3);

      ctx.clearRect(0, 0, w, h);

      // Helper to extract hex
      const resolveColor = (c: string) => {
        if (c.startsWith("var(")) {
          const m = c.match(/var\(([^)]+)\)/);
          if (m && typeof window !== "undefined") {
            return window.getComputedStyle(document.documentElement).getPropertyValue(m[1]).trim() || c;
          }
        }
        return c;
      };

      data.forEach((d, i) => {
        const groupX = padding.left + i * barGroupWidth + barGroupWidth * 0.15;

        // Income bar
        const incomeH = (d.income / maxVal) * chartH * ease;
        const incomeGrad = ctx.createLinearGradient(
          0,
          padding.top + chartH - incomeH,
          0,
          padding.top + chartH
        );
        incomeGrad.addColorStop(0, resolveColor("var(--theme-primary)"));
        incomeGrad.addColorStop(1, resolveColor("var(--theme-primary-container)"));
        ctx.beginPath();
        ctx.roundRect(
          groupX,
          padding.top + chartH - incomeH,
          barWidth,
          incomeH,
          [4, 4, 0, 0]
        );
        ctx.fillStyle = incomeGrad;
        ctx.fill();

        // Expense bar
        const expenseH = (d.expense / maxVal) * chartH * ease;
        const expenseGrad = ctx.createLinearGradient(
          0,
          padding.top + chartH - expenseH,
          0,
          padding.top + chartH
        );
        expenseGrad.addColorStop(0, resolveColor("var(--theme-secondary)"));
        expenseGrad.addColorStop(1, resolveColor("var(--theme-secondary-container)"));
        ctx.beginPath();
        ctx.roundRect(
          groupX + barWidth + gap,
          padding.top + chartH - expenseH,
          barWidth,
          expenseH,
          [4, 4, 0, 0]
        );
        ctx.fillStyle = expenseGrad;
        ctx.fill();

        // Label
        ctx.fillStyle = resolveColor("var(--theme-on-surface-variant)");
        ctx.font = "11px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
          d.label,
          groupX + barWidth + gap / 2,
          h - padding.bottom + 18
        );
      });

      if (pct < 1) requestAnimationFrame(draw);
    }

    draw();
  }, [data, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height, display: "block" }}
    />
  );
}
