import React from "react";

interface HollowBtnProps {
  icon: string;
  label: string;
  isActive?: boolean;
  handleClick: () => void;
  className?: string;
}

const HollowBtn: React.FC<HollowBtnProps> = ({
  icon,
  label,
  isActive = false,
  handleClick,
  className = "",
}) => {
  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition cursor-pointer font-rubik
        ${
          isActive
            ? "bg-bg-accent text-text-primary shadow-sm border border-border-accent"
            : "text-text-tertiary bg-bg-secondary"
        } ${className}`}
    >
      <img src={icon} alt={label} className="w-4 h-4" />
      {label}
    </button>
  );
};

export default HollowBtn;
