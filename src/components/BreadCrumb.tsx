import React from "react";
import { useNavigate } from "react-router-dom";

interface BreadcrumbProps {
  flightId?: string;
  currentScreen: string;
  subItem?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  flightId,
  currentScreen,
  subItem,
}) => {
  const navigate = useNavigate();

  const handleHomePress = () => {
    if (flightId) {
      navigate(`/dashboard/flight/${flightId}`);
    } else {
      navigate("/dashboard");
    }
  };

  const formatScreenName = (name: string) =>
    name.replace(/([A-Z])/g, " $1").trim();

  return (
    <nav className="flex items-center w-full bg-white px-6 py-3 text-sm shadow-sm">
      {/* Home */}
      <button
        onClick={handleHomePress}
        className="mx-1 text-gray-600 font-medium hover:text-[#602AF3] transition-colors"
      >
        Home
      </button>

      {/* Separator */}
      <span className="mx-2 text-gray-400 text-base">›</span>

      {/* Current Screen */}
      <span className="mx-1 text-gray-600 font-normal">
        {formatScreenName(currentScreen)}
      </span>

      {/* Subitem (if any) */}
      {subItem && (
        <>
          <span className="mx-2 text-gray-400 text-base">›</span>
          <span className="mx-1 text-[#3a3939] font-semibold text-base">
            {subItem}
          </span>
        </>
      )}
    </nav>
  );
};
