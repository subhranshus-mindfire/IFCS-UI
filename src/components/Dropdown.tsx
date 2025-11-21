import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type React from "react";

export interface DropdownAction {
  icon: React.ReactNode | IconDefinition;
  label: string;
  onClick: () => void;
}

export interface DropdownProps {
  actions: DropdownAction[];
  width?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  actions,
  width = "w-48",
}) => {
  const isIconDefinition = (icon: React.ReactNode | IconDefinition): icon is IconDefinition => {
    return typeof icon === 'object' && icon !== null && 'iconName' in icon;
  };
  return (
    <div
      className={`dropdown-menu absolute right-0 top-full mt-2 ${width} bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50`}
    >
      <div className="px-4 py-2 border-b border-gray-200">
        <h3 className="text-md font-bold text-gray-800">Actions</h3>
      </div>
      {actions.map((action, index) => (
        <button
          key={index}
          className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-50 flex items-center gap-2 text-sm"
          onClick={action.onClick}
        >
          {
            isIconDefinition(action.icon) ? (
              <FontAwesomeIcon icon={action.icon} className="text-sm" />
            ) : (
              action.icon
            )
          }
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Dropdown;
