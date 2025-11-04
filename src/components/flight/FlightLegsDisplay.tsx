import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faPlane,
  faPencilAlt,
  faShoppingCart,
  faUsers,
  faChartLine,
  faPlaneCircleCheck,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Dropdown from "../Dropdown";

interface FlightLegData {
  route: string;
  flightNumber: string;
  type: string;
  date: string;
  depTime: string;
  arrTime: string;
  acType: string;
  acReg: string;
  direction: string;
  businessStudio: number;
  business: number;
  economy: number;
  crew: number;
  child: number;
  crewCount: number;
  status: string;
  loadingPlan: string;
  mealPlan: string;
  crewFlightReports: string[];
  alerts: string[];
  cutOffTimes: {
    meals: string;
    commissary: string;
  };
}

interface FlightLegsDisplayProps {
  legs: FlightLegData[];
}

type DropdownType =
  | "main"
  | "loadingPlan"
  | "mealPlan"
  | "crewFlightReports"
  | "alerts"
  | "cutOffTimes";

const FlightLegsDisplay: React.FC<FlightLegsDisplayProps> = ({ legs }) => {
  const [hoveredLeg, setHoveredLeg] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<{
    legIndex: number;
    type: DropdownType;
  } | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if click is on a cog icon or inside a dropdown
      const isClickOnCog = target.closest('.dropdown-trigger');
      const isClickInDropdown = target.closest('.dropdown-menu');

      if (!isClickOnCog && !isClickInDropdown) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const toggleDropdown = (legIndex: number, type: DropdownType) => {
    setOpenDropdown((prev) =>
      prev?.legIndex === legIndex && prev?.type === type
        ? null
        : { legIndex, type }
    );
  };

  const getMainActions = (legIndex: number) => [
    {
      icon: faPencilAlt,
      label: "Edit Flight",
      onClick: () => console.log("Edit Flight clicked for leg", legIndex),
    },
    {
      icon: faShoppingCart,
      label: "Safety Cart",
      onClick: () => console.log("Safety Cart clicked for leg", legIndex),
    },
    {
      icon: faUsers,
      label: "Dead Heads",
      onClick: () => console.log("Dead Heads clicked for leg", legIndex),
    },
    {
      icon: faChartLine,
      label: "Dynamic Provision",
      onClick: () =>
        console.log("Dynamic Provision clicked for leg", legIndex),
    },
    {
      icon: faPlaneCircleCheck,
      label: "Prepare Flight",
      onClick: () => console.log("Prepare Flight clicked for leg", legIndex),
    },
  ];

  const getViewAllAction = (type: string, legIndex: number) => [
    {
      icon: faEye,
      label: "View All",
      onClick: () => console.log(`View All ${type} clicked for leg`, legIndex),
    },
  ];

  return (
    <div className="space-y-4 w-full overflow-x-auto">
      <h2 className="text-xl md:text-2xl text-gray-700 px-2">Flights (2 Legs)</h2>

      {legs.map((leg, index) => (
        <div
          key={index}
          className="bg-gray-50 rounded-xl shadow-lg min-w-[1200px] lg:min-w-0"
          onMouseEnter={() => setHoveredLeg(index)}
          onMouseLeave={() => setHoveredLeg(null)}
        >
          {/* Flight Header Row */}
          <div className="px-2 sm:px-4 py-3">
            <div className="grid grid-cols-[repeat(16,minmax(60px,1fr))_auto] xl:grid-cols-[repeat(16,1fr)_auto] gap-1 sm:gap-2 items-center text-xs xl:text-base">
              <div className="flex flex-col">
                <span className="text-[10px] xl:text-xs text-gray-500">Route</span>
                <div className="text-sm xl:text-xl text-gray-600">{leg.route}</div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] xl:text-xs text-gray-500">Flight #</span>
                <div className="text-sm xl:text-xl text-gray-600 font-semibold">
                  {leg.flightNumber}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] xl:text-xs text-gray-500">Type</span>
                <div className="text-sm xl:text-xl text-gray-600">{leg.type}</div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] xl:text-xs text-gray-500">Date</span>
                <div className="text-sm xl:text-xl text-gray-600 font-semibold">{leg.date}</div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] xl:text-xs text-gray-500">DEP Time</span>
                <div className="text-sm xl:text-xl text-gray-600 font-semibold">
                  {leg.depTime}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] xl:text-xs text-gray-500">ARR Time</span>
                <div className="text-sm xl:text-xl text-gray-600">
                  {leg.arrTime}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] xl:text-xs text-gray-500">AC Type</span>
                <div className="text-sm xl:text-xl text-gray-600">
                  {leg.acType}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] xl:text-xs text-gray-500">AC Reg</span>
                <div className="text-sm xl:text-xl text-gray-600">{leg.acReg}</div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] xl:text-xs text-gray-500">Direction</span>
                <div className="text-sm xl:text-xl text-gray-600">
                  {leg.direction}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] xl:text-xs text-gray-500">Business</span>
                <span className="text-[10px] xl:text-xs text-gray-500">Studio</span>
                <div className="text-sm xl:text-xl text-gray-600">
                  {leg.businessStudio}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] xl:text-xs text-gray-500">Business</span>
                <div className="text-sm xl:text-xl text-gray-600">
                  {leg.business}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] xl:text-xs text-gray-500">Economy</span>
                <div className="text-sm xl:text-xl text-gray-600">
                  {leg.economy}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] xl:text-xs text-gray-500">Crew</span>
                <div className="text-sm xl:text-xl text-gray-600">
                  {leg.crew}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] xl:text-xs text-gray-500">Child</span>
                <div className="text-sm xl:text-xl text-gray-600">
                  {leg.child}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] xl:text-xs text-gray-500">Crew</span>
                <div className="text-sm xl:text-xl text-gray-600">
                  {leg.crewCount}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] xl:text-xs text-gray-500">Status</span>
                <div className="text-sm xl:text-xl text-gray-600">
                  {leg.status}
                </div>
              </div>

              {/* Settings Icon */}
              <div className="flex items-center justify-center ml-4 relative">
                {hoveredLeg === index ? (
                  <div className="dropdown-trigger">
                    <FontAwesomeIcon
                      icon={faCog}
                      className="text-red-800 text-xl cursor-pointer hover:text-red-900 transition-colors"
                      onClick={() => toggleDropdown(index, "main")}
                    />
                    {openDropdown?.legIndex === index &&
                      openDropdown?.type === "main" && (
                        <Dropdown actions={getMainActions(index)} />
                      )}
                  </div>
                ) : (
                  <FontAwesomeIcon
                    icon={faPlane}
                    className="text-red-800 text-xl"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 xl:gap-4 p-2 sm:p-4">
            {/* Loading Plan Card */}
            <div className="bg-blue-50 rounded-lg p-3 xl:p-4 relative shadow-lg">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-700">
                  Loading Plan
                </h3>
                <div className="relative dropdown-trigger">
                  <FontAwesomeIcon
                    icon={faCog}
                    className="text-red-800 cursor-pointer text-xs sm:text-sm"
                    onClick={() => toggleDropdown(index, "loadingPlan")}
                  />
                  {openDropdown?.legIndex === index &&
                    openDropdown?.type === "loadingPlan" && (
                      <Dropdown
                        actions={getViewAllAction("Loading Plan", index)}
                        width="w-32"
                      />
                    )}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-800 font-medium break-words">
                {leg.loadingPlan}
              </p>
            </div>

            {/* Meal Plan Card */}
            <div className="bg-white rounded-lg p-3 xl:p-4 border border-gray-200 relative shadow-lg">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-700">
                  Meal Plan
                </h3>
                <div className="relative dropdown-trigger">
                  <FontAwesomeIcon
                    icon={faCog}
                    className="text-red-800 cursor-pointer text-xs sm:text-sm"
                    onClick={() => toggleDropdown(index, "mealPlan")}
                  />
                  {openDropdown?.legIndex === index &&
                    openDropdown?.type === "mealPlan" && (
                      <Dropdown
                        actions={getViewAllAction("Meal Plan", index)}
                        width="w-32"
                      />
                    )}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 break-words">{leg.mealPlan}</p>
            </div>

            {/* Crew Flight Reports Card */}
            <div className="bg-white rounded-lg p-3 xl:p-4 border border-gray-200 relative shadow-lg">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-700">
                  Crew Flight Reports
                </h3>
                <div className="relative dropdown-trigger">
                  <FontAwesomeIcon
                    icon={faCog}
                    className="text-red-800 cursor-pointer text-xs sm:text-sm"
                    onClick={() => toggleDropdown(index, "crewFlightReports")}
                  />
                  {openDropdown?.legIndex === index &&
                    openDropdown?.type === "crewFlightReports" && (
                      <Dropdown
                        actions={getViewAllAction("Crew Flight Reports", index)}
                        width="w-32"
                      />
                    )}
                </div>
              </div>
              {leg.crewFlightReports.map((report, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs sm:text-sm text-gray-600"
                >
                  <span className="text-blue-400">📄</span>
                  <span className="break-words">{report}</span>
                </div>
              ))}
            </div>

            {/* Alerts/Messages/Memos Card */}
            <div className="bg-white rounded-lg p-3 xl:p-4 border border-gray-200 relative shadow-lg">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-700">
                  Alerts/Messages/Memos
                </h3>
                <div className="relative dropdown-trigger">
                  <FontAwesomeIcon
                    icon={faCog}
                    className="text-red-800 cursor-pointer text-xs sm:text-sm"
                    onClick={() => toggleDropdown(index, "alerts")}
                  />
                  {openDropdown?.legIndex === index &&
                    openDropdown?.type === "alerts" && (
                      <Dropdown
                        actions={getViewAllAction("Alerts/Messages/Memos", index)}
                        width="w-32"
                      />
                    )}
                </div>
              </div>
              {leg.alerts.map((alert, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs sm:text-sm text-gray-600"
                >
                  <span className="text-gray-400">⚠️</span>
                  <span className="break-words">{alert}</span>
                </div>
              ))}
            </div>

            {/* Cut Off Times Card */}
            <div className="bg-white rounded-lg p-3 xl:p-4 border border-gray-200 relative shadow-lg">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-700">
                  Cut Off Times
                </h3>
                <div className="relative dropdown-trigger">
                  <FontAwesomeIcon
                    icon={faCog}
                    className="text-red-800 cursor-pointer text-xs sm:text-sm"
                    onClick={() => toggleDropdown(index, "cutOffTimes")}
                  />
                  {openDropdown?.legIndex === index &&
                    openDropdown?.type === "cutOffTimes" && (
                      <Dropdown
                        actions={getViewAllAction("Cut Off Times", index)}
                        width="w-32"
                      />
                    )}
                </div>
              </div>
              <div className="space-y-1 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <span>🍽️</span>
                  <span className="break-words">Meals - {leg.cutOffTimes.meals}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>📦</span>
                  <span className="break-words">Commissary - {leg.cutOffTimes.commissary}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightLegsDisplay;
