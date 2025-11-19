export const ProgressCircle: React.FC<{
  label: string;
  percentage: number;
  issues: number;
  color?: string;
  size: number;
}> = ({ label, percentage, issues, color = "#4CAF50", size }) => {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center min-w-0 flex-shrink-0">
      <div className="relative mb-2">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#f0f0f0"
            strokeWidth="4"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-gray-800">{percentage}</span>
          <span className="text-xs text-gray-500">%</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
        <p className="text-xs text-gray-500">{issues} Issues</p>
      </div>
    </div>
  );
};
