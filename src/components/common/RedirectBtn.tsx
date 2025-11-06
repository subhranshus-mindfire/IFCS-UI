import React from "react";

interface RedirectProps {
  icon: string; // path to SVG, e.g., PrintIcon
  label: string;
  handleClick: () => void;
}

const RedirectBtn: React.FC<RedirectProps> = ({ icon, label, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="flex cursor-pointer items-center gap-1 text-text-secondary hover:text-text-primary transition focus:outline-none"
    >
      <img
        src={icon}
        alt={label}
        className="w-4 h-4 object-contain text-text-tertiary"
      />
      <span className="underline font-normal">{label}</span>
    </button>
  );
};

export default RedirectBtn;
