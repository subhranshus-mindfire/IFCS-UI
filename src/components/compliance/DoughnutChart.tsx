import React, { useEffect, useRef } from "react";
import * as Chart from "chart.js";

// Register required components
const {
  Chart: ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
} = Chart;
ChartJS.register(ArcElement, Tooltip, Legend, DoughnutController);

interface IssueCategory {
  id: string;
  name: string;
  issueCount: number;
}

interface DoughnutChartProps {
  categories: IssueCategory[];
  totalIssues: number;
}

const BG_OPACITY = 0.8;

// 5-step color gradient (green → yellow → orange → red)
const PERCENTAGE_COLOR_MAP = [
  "#00C853", // 0–20% (Green)
  "#AEEA00", // 21–40% (Yellow-green)
  "#FFD600", // 41–60% (Yellow)
  "#FF9100", // 61–80% (Orange)
  "#D50000", // 81–100% (Red)
];

const getColorByPercentage = (percentage: number): string => {
  if (percentage <= 20) return PERCENTAGE_COLOR_MAP[0];
  if (percentage <= 40) return PERCENTAGE_COLOR_MAP[1];
  if (percentage <= 60) return PERCENTAGE_COLOR_MAP[2];
  if (percentage <= 80) return PERCENTAGE_COLOR_MAP[3];
  return PERCENTAGE_COLOR_MAP[4];
};

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  categories,
  totalIssues,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<InstanceType<typeof ChartJS> | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const data = categories.map((category) => category.issueCount);
    const labels = categories.map((category) => category.name);
    const percentages = categories.map((category) =>
      totalIssues > 0 ? (category.issueCount / totalIssues) * 100 : 0
    );

    const backgroundColors = percentages.map((percentage) => {
      const baseColor = getColorByPercentage(percentage);
      return hexToRgba(baseColor, BG_OPACITY);
    });

    chartInstanceRef.current = new ChartJS(ctx, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: backgroundColors,
            borderColor: "#ffffff",
            borderWidth: 3,
            hoverBorderWidth: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: "70%",
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.parsed;
                const percentage = ((value / totalIssues) * 100).toFixed(1);
                return `${label}: ${value} (${percentage}%)`;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [categories, totalIssues]);

  return (
    <div className="relative font-rubik flex-shrink-0 w-48 h-48 flex items-center justify-center">
      <canvas ref={chartRef} width={180} height={180}></canvas>
      <div className="absolute flex flex-col items-center justify-center pointer-events-none">
        <span className="text-gray-500 text-sm">Total Issues:</span>
        <span className="text-4xl font-bold text-gray-800">{totalIssues}</span>
      </div>
    </div>
  );
};

export default DoughnutChart;
