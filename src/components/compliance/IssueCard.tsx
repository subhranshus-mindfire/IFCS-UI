import React, { useState, useRef, useEffect } from "react";
import { InfoIcon } from "../../assets/icons";

interface IssueCategory {
  id: string;
  name: string;
  icon?: string;
  issueCount: number;
}

interface IssueCardProps {
  category: IssueCategory;
  totalIssues: number;
  cardIcon: string;
}

const BG_OPACITY = 0.3;

const PERCENTAGE_COLOR_MAP = [
  "#00C853", // 0–20% (Green)
  "#AEEA00", // 21–40% (Yellow-green)
  "#FFD600", // 41–60% (Yellow)
  "#FF9100", // 61–80% (Orange)
  "#D50000", // 81–100% (Red)
];

const LEVEL_DATA = [
  { level: 1, range: "0%–10%", color: "#00C853" },
  { level: 2, range: "11%–20%", color: "#AEEA00" },
  { level: 3, range: "21%–30%", color: "#FFD600" },
  { level: 4, range: "31%–50%", color: "#FF9100" },
  { level: 5, range: "51%–100%", color: "#D50000" },
];

const getColorByPercentage = (percentage: number): string => {
  if (percentage <= 20) return PERCENTAGE_COLOR_MAP[0];
  if (percentage <= 40) return PERCENTAGE_COLOR_MAP[1];
  if (percentage <= 60) return PERCENTAGE_COLOR_MAP[2];
  if (percentage <= 80) return PERCENTAGE_COLOR_MAP[3];
  return PERCENTAGE_COLOR_MAP[4];
};

const InfoModal: React.FC<{
  onClose: () => void;
  position: { top: number; left: number };
}> = ({ onClose, position }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="absolute z-50 bg-white rounded-lg shadow-lg p-3 w-[140px]"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {LEVEL_DATA.map((level) => (
        <div
          key={level.level}
          className="flex items-center gap-2 mb-2 last:mb-0"
        >
          <div
            className="w-5 h-5 rounded flex-shrink-0"
            style={{
              backgroundColor: `${level.color}${Math.round(BG_OPACITY * 255)
                .toString(16)
                .padStart(2, "0")}`,
            }}
          />
          <div className="flex flex-col text-xs leading-tight">
            <span className="font-medium text-gray-800">
              Level {level.level}
            </span>
            <span className="text-gray-600">{level.range}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const IssueCard: React.FC<IssueCardProps> = ({
  category,
  totalIssues,
  cardIcon,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const infoIconRef = useRef<HTMLImageElement>(null);

  const percentage =
    totalIssues > 0 ? (category.issueCount / totalIssues) * 100 : 0;

  const bgColor = getColorByPercentage(percentage);
  const bgColorWithOpacity = `${bgColor}${Math.round(BG_OPACITY * 255)
    .toString(16)
    .padStart(2, "0")}`;

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (infoIconRef.current) {
      const rect = infoIconRef.current.getBoundingClientRect();
      const cardRect = infoIconRef.current
        .closest(".relative")
        ?.getBoundingClientRect();

      if (cardRect) {
        setModalPosition({
          top: rect.bottom - cardRect.top + 4,
          left: rect.left - cardRect.left - 60,
        });
      }
    }

    setShowModal(!showModal);
  };

  return (
    <div
      className="relative font-rubik p-4 rounded-lg flex flex-col items-center justify-center text-center border-2 transition-all duration-200 w-full max-w-[180px] mx-auto"
      style={{
        backgroundColor: bgColorWithOpacity,
        borderColor: bgColor,
      }}
    >
      {/* Info icon */}
      <img
        ref={infoIconRef}
        src={InfoIcon}
        alt="Info"
        className="absolute top-2 right-2 w-4 h-4 opacity-70 hover:opacity-100 cursor-pointer"
        onClick={handleInfoClick}
      />

      {/* Modal */}
      {showModal && (
        <InfoModal
          onClose={() => setShowModal(false)}
          position={modalPosition}
        />
      )}

      <span className="text-3xl font-[500] text-text-primary mb-1">
        {percentage.toFixed(0)}%
      </span>

      <h3 className="text-sm text-text-secondary font-[400] flex items-center justify-center gap-2 mt-1">
        <img src={cardIcon} alt={`${category.name} icon`} className="w-4 h-4" />
        {category.name}
      </h3>

      <p className="text-xs text-text-secondary font-[400] mt-1">
        ({category.issueCount} {category.issueCount === 1 ? "issue" : "issues"})
      </p>
    </div>
  );
};

export default IssueCard;
