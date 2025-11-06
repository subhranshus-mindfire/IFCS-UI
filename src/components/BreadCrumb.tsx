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
    if (flightId) {
      navigate(`/dashboard/flight/${flightId}`);
    } else {
      navigate("/dashboard");
    }
  };
  const handleFlightsPress = () => {
    navigate(`/flight-list`);
  };
  const formatScreenName = (name: string) =>
    name.replace(/([A-Z])/g, " $1").trim();

  return (
    <nav className="flex font-rubik items-center w-full bg-white px-6 py-3 text-sm shadow-sm">
      <button
        onClick={handleHomePress}
        className="mx-1 text-text-muted font-medium hover:text-[#602AF3] transition-colors"
      >
        Home
      </button>
      <span className="mx-2 text-gray-400 text-base">›</span>
      <button
        onClick={handleFlightsPress}
        className="mx-1 text-text-muted font-medium hover:text-[#602AF3] transition-colors"
      >
        Flights
      </button>
      <span className="mx-2 text-gray-400 text-base">›</span>{" "}
      <button
        onClick={handleDetailsNav}
        className={`mx-1 text-text-muted font-medium hover:text-[#602AF3] transition-colors, ${
          currentScreen === "details" && "text-xl font-semibold"
        }`}
      >
        Flight Details
      </button>
      {currentScreen !== "details" && (
        <>
          <span className="mx-2 text-gray-400 text-base">›</span>{" "}
          <span className="mx-1 text-text-primary font-semibold text-xl">
            {formatScreenName(currentScreen)}
          </span>
        </>
      )}
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
