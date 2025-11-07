import React from "react";

interface IssueCategory {
  id: string;
  name: string;
  icon?: string;
  issueCount: number;
}

interface IssueCardProps {
  category: IssueCategory;
  totalIssues: number;
}

const BG_OPACITY = 0.3;

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

const IssueCard: React.FC<IssueCardProps> = ({ category, totalIssues }) => {
  const percentage =
    totalIssues > 0 ? (category.issueCount / totalIssues) * 100 : 0;

  const bgColor = getColorByPercentage(percentage);
  const bgColorWithOpacity = `${bgColor}${Math.round(BG_OPACITY * 255)
    .toString(16)
    .padStart(2, "0")}`;

  return (
    <div
      className="relative font-rubik p-6 rounded-lg flex flex-col items-center justify-center text-center border-2 transition-all duration-200"
      style={{
        backgroundColor: bgColorWithOpacity,
        borderColor: bgColor,
      }}
    >
      <span className="text-4xl font-bold text-gray-800 mb-1">
        {percentage.toFixed(0)}%
      </span>

      <h3 className="text-lg font-semibold text-gray-700">{category.name}</h3>

      <p className="text-gray-600 mt-1">
        ({category.issueCount} {category.issueCount === 1 ? "issue" : "issues"})
      </p>
    </div>
  );
};

export default IssueCard;
