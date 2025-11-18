import { useState } from "react";
import { ProgressCircle } from "./ProgressCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";

interface Metric {
  label: string;
  percentage: number;
  issues: number;
  color?: string;
}

const metrics: Metric[] = [
  { label: "Hygiene", percentage: 20.8, issues: 5, color: "#4CAF50" },
  { label: "Equipment", percentage: 4.2, issues: 1, color: "#4CAF50" },
  { label: "Cleaning", percentage: 8.3, issues: 2, color: "#4CAF50" },
  { label: "Check-in", percentage: 16.7, issues: 4, color: "#4CAF50" },
  { label: "Assistance", percentage: 12.5, issues: 3, color: "#4CAF50" },
  { label: "Data Error", percentage: 12.5, issues: 3, color: "#4CAF50" },
  { label: "Delays", percentage: 1.3, issues: 3, color: "#4CAF50" },
  { label: "Quality", percentage: 5.7, issues: 13, color: "#4CAF50" },
  { label: "Compliance", percentage: 3.9, issues: 9, color: "#4CAF50" },
  { label: "Provisioning", percentage: 1.3, issues: 3, color: "#4CAF50" },
  { label: "Safety", percentage: 15.2, issues: 7, color: "#FF9800" },
  { label: "Unclassified", percentage: 86.8, issues: 198, color: "#FF1744" },
];

const DashboardMetrics: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(metrics.length / itemsPerPage);

  const nextPage = () => setCurrentIndex((prev) => (prev + 1) % totalPages);
  const prevPage = () =>
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);

  const getCurrentMetrics = () => {
    const start = currentIndex * itemsPerPage;
    const end = start + itemsPerPage;
    return metrics.slice(start, end);
  };

  return (
    <div className="relative bg-white rounded-xl shadow-lg mt-6 mx-2 sm:mx-0">
      <button
        onClick={prevPage}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition-colors"
        disabled={totalPages <= 1}
      >
        <FontAwesomeIcon icon={faAnglesLeft} />
      </button>

      <button
        onClick={nextPage}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition-colors"
        disabled={totalPages <= 1}
      >
        <FontAwesomeIcon icon={faAnglesRight} />
      </button>

      <div className="px-4 sm:px-12 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {getCurrentMetrics().map((metric, idx) => (
            <ProgressCircle
              key={`${currentIndex}-${idx}`}
              label={metric.label}
              percentage={metric.percentage}
              issues={metric.issues}
              color={metric.color}
              size={80}
            />
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center pb-4 space-x-2">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-colors ${
                idx === currentIndex ? "bg-gray-700" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardMetrics;
