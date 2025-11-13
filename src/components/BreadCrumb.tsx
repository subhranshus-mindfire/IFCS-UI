import React from "react";
import { useNavigate } from "react-router-dom";

interface BreadcrumbProps {
  flightId?: string;
  currentScreen: string;
  handleDetailsNav: () => void;
  subItem?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  flightId,
  currentScreen,
  handleDetailsNav,
  subItem,
}) => {
  const navigate = useNavigate();

  const handleHomePress = () => {
    if (flightId) navigate(`/dashboard/flight/${flightId}`);
    else navigate("/dashboard");
  };

  const handleFlightsPress = () => {
    navigate(`/flight-list`);
  };

  const formatScreenName = (name: string) =>
    name.replace(/([A-Z])/g, " $1").trim();

  return (
    <nav className="flex font-rubik items-center w-full py-3 text-sm">
      {/* Home */}
      <button
        onClick={handleHomePress}
        className="text-text-muted font-normal hover:text-bg-button transition-colors"
      >
        Home
      </button>

      {/* Flights */}
      <span className="mx-2 text-gray-400 text-base">›</span>
      <button
        onClick={handleFlightsPress}
        className={`mx-1 text-text-muted font-normal hover:text-bg-button transition-colors ${currentScreen === "Flights" ? "text-text-primary font-medium" : ""
          }`}
      >
        Flights
      </button>

      {/* Stop here if current screen is Flights */}
      {currentScreen !== "Flights" && (
        <>
          <span className="mx-2 text-gray-400 text-base">›</span>

          {/* Flight Details */}
          <button
            onClick={handleDetailsNav}
            className={`mx-1 text-text-muted font-normal hover:text-bg-button transition-colors ${currentScreen === "Details"
                ? "text-text-primary text-base font-medium"
                : ""
              }`}
          >
            Flight Details
          </button>
        </>
      )}

      {/* Show deeper level only if not Details */}
      {currentScreen !== "Flights" && currentScreen !== "Info" && (
        <>
          <span className="mx-2 text-gray-400 text-base">›</span>
          <span className="mx-1 text-text-primary font-medium text-base">
            {formatScreenName(currentScreen)}
          </span>
        </>
      )}

      {/* Optional sub-item */}
      {subItem && (
        <>
          <span className="mx-2 text-gray-400 text-base">›</span>
          <span className="mx-1 text-[#3a3939] font-regular text-base">
            {subItem}
          </span>
        </>
      )}
    </nav>
  );
};
