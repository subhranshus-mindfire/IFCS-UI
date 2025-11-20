import {
  faPencilAlt,
  faShoppingCart,
  faUsers,
  faChartLine,
  faPlaneCircleCheck,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Dropdown from "../Dropdown";
import { CogIcon, NoteBookIcon, WarningIcon, ForkKnifeIcon, DatabaseIcon, AirplaneIcon } from "../../assets/icons";
import { EditFlightModal } from "./EditFlightModal";
import type { FlightData } from "../../types/Flight";
import { formatDateToDDMonYYYY, formatLocalTimeFromISO } from "../../lib/utils";

export interface FlightLegData {
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
  legs: FlightData[];
}

type DropdownType =
  | "main"
  | "loadingPlan"
  | "mealPlan"
  | "crewFlightReports"
  | "alerts"
  | "cutOffTimes"
  | "editPlan";

const FlightLegsDisplay: React.FC<FlightLegsDisplayProps> = ({ legs }) => {
  const [hoveredLeg, setHoveredLeg] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<{
    legIndex: number;
    type: DropdownType;
  } | null>(null);
  const [isEditFlightModalOpen, setIsEditFlightModalOpen] = useState(false);
  const [selectedLegForEdit, setSelectedLegForEdit] = useState<number | null>(
    null
  );
  const [editPlanType, setEditPlanType] = useState<
    "loadingPlan" | "mealPlan" | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isClickOnCog = target.closest(".dropdown-trigger");
      const isClickInDropdown = target.closest(".dropdown-menu");

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
      onClick: () => {
        setSelectedLegForEdit(legIndex);
        setIsEditFlightModalOpen(true);
        setOpenDropdown(null);
      },
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
      onClick: () => console.log("Dynamic Provision clicked for leg", legIndex),
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

  const getPlanCardActions = (
    planType: "loadingPlan" | "mealPlan",
    legIndex: number
  ) => [
      {
        icon: faEye,
        label: "Plan Details",
        onClick: () =>
          console.log(`Plan Details ${planType} clicked for leg`, legIndex),
      },
      {
        icon: faPencilAlt,
        label: "Edit Plan",
        onClick: () => {
          setEditPlanType(planType);
          setOpenDropdown({ legIndex, type: "editPlan" });
        },
      },
    ];


  return (
    <div className="space-y-4 w-full font-rubik">
      <div className="flex justify-between items-center px-2">
        {isLoading ? (
          <div className="relative h-8 w-48 rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
          </div>
        ) : (
          <h2 className="text-xl md:text-2xl text-gray-700">Flights ({legs.length})</h2>
        )}
        {!isLoading && (
          <div className="relative dropdown-trigger">
            <img src={CogIcon} className="h-6 w-6 cursor-pointer" onClick={() => toggleDropdown(-1, "main")} />
            {openDropdown?.legIndex === -1 && openDropdown?.type === "main" && (
              <Dropdown actions={getMainActions(-1)} />
            )}
          </div>
        )}
      </div>
      {isLoading ? (
        // Shimmer skeleton for flight legs
        [...Array(2)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl shadow-lg min-w-[1200px] lg:min-w-0"
          >
            {/* Flight Header Row Shimmer */}
            <div className="px-2 sm:px-4 py-3">
              <div className="grid grid-cols-[repeat(16,minmax(60px,1fr))_auto] xl:grid-cols-[repeat(16,1fr)_auto] gap-1 sm:gap-2">
                {[...Array(16)].map((_, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <div className="relative h-3 w-full rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
                      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                    </div>
                    <div className="relative h-5 w-full rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
                      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-center ml-4">
                  <div className="relative h-5 w-5 rounded-full bg-gray-200 overflow-hidden animate-pulse duration-75">
                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cards Section Shimmer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 xl:gap-3 p-2 sm:p-4">
              {[...Array(5)].map((_, cardIdx) => (
                <div key={cardIdx} className="bg-white rounded-lg p-3 xl:p-4 border border-gray-200 shadow-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="relative h-4 w-24 rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
                      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                    </div>
                    <div className="relative h-5 w-5   cursor-pointer    rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
                      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative h-4 w-full rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
                      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                    </div>
                    <div className="relative h-4 w-3/4 rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
                      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        legs.map((leg, index) => (
          <div
            key={index}
            className=" rounded-xl shadow border border-gray-200 hover:border-2 lg:min-w-0"
            onMouseEnter={() => setHoveredLeg(index)}
            onMouseLeave={() => setHoveredLeg(null)}
          >
            {/* Flight Header Row */}
            <div className="flex justify-between px-2 sm:px-4 py-3">
              <div className="flex gap-4 xl:gap-9 items-center text-xs xl:text-base overflow-x-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    Route
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600">
                    {leg.pairRoute}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    Flight #
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600 font-medium">
                    {leg.flightNumber}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    Type
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600">
                    {leg.flightType}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    Date
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600 font-medium">
                    {formatDateToDDMonYYYY(leg.estimatedDeparture)}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    DEP Time
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600 font-medium">
                    {formatLocalTimeFromISO(leg.estimatedDeparture)}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    ARR Time
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600">
                    {formatLocalTimeFromISO(leg.estimatedArrival)}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    AC Type
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600">
                    {leg.aircraft?.type}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    AC Reg
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600">
                    {leg.aircraft?.registration}
                  </div>
                </div>
                <div className="flex flex-col it">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    Direction
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600">
                    {leg.direction}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    Business
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600">
                    {leg.passengers?.businessCount}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    Economy
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600">
                    {leg.passengers?.economyCount}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    Crew
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600">
                    {leg.passengers?.crewCount}
                  </div>
                </div>
                {/* <div className="flex flex-col">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    Child
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600">
                    {leg.child}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    Crew
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600">
                    {leg.crewCount}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    Status
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600">
                    {leg.status}
                  </div>
                </div> */}

                {/* Settings Icon */}

              </div>
              <div className="flex items-center justify-center ml-4 relative">
                {hoveredLeg === index ? (
                  <div className="dropdown-trigger">
                    <img src={CogIcon} className="h-6 w-6 cursor-pointer" onClick={() => toggleDropdown(index, "main")} />

                    {openDropdown?.legIndex === index &&
                      openDropdown?.type === "main" && (
                        <Dropdown actions={getMainActions(index)} />
                      )}
                  </div>
                ) : (
                  <img src={AirplaneIcon} className="h-6 w-6 cursor-pointer" />

                )}
              </div>
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-2 xl:gap-3 p-2 sm:p-4">
              {/* Loading Plan Card */}
              <div className="bg-blue-50 rounded-lg p-3 xl:p-4 relative shadow-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xs sm:text-sm text-gray-700">
                    Loading Plan
                  </h3>
                  <div className="relative dropdown-trigger">
                    <img src={CogIcon} className="h-5 w-5   cursor-pointer   " onClick={() => toggleDropdown(index, "loadingPlan")} />

                    {openDropdown?.legIndex === index &&
                      openDropdown?.type === "loadingPlan" && (
                        <Dropdown
                          actions={getPlanCardActions("loadingPlan", index)}
                          width="w-35"
                        />
                      )}
                    {openDropdown?.legIndex === index &&
                      openDropdown?.type === "editPlan" &&
                      editPlanType === "loadingPlan" && (
                        <div className="dropdown-menu absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-50">
                          <div className="px-4 py-2 border-b border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-700">
                              Select desired loading plan
                            </h3>
                          </div>
                          <select
                            className="w-full px-4 py-2 text-sm text-gray-700 border-0 focus:outline-none focus:ring-2 focus:ring-red-800 rounded"
                            defaultValue="Saudi Arabia HM"
                          >
                            <option>Saudi Arabia HM</option>
                            <option>Standard Loading Plan</option>
                            <option>Express Loading Plan</option>
                          </select>
                        </div>
                      )}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-800 font-medium wrap-break-words">
                  {leg.loadingPlan?.name || "N/A"}
                </p>
              </div>

              {/* Meal Plan Card */}
              <div className="bg-white rounded-lg p-3 xl:p-4 border border-gray-200 relative shadow-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xs sm:text-sm text-gray-700">Meal Plan</h3>
                  <div className="relative dropdown-trigger">
                    <img src={CogIcon} className="h-5 w-5   cursor-pointer   " onClick={() => toggleDropdown(index, "mealPlan")} />

                    {openDropdown?.legIndex === index &&
                      openDropdown?.type === "mealPlan" && (
                        <Dropdown
                          actions={getPlanCardActions("mealPlan", index)}
                          width="w-35"
                        />
                      )}
                    {openDropdown?.legIndex === index &&
                      openDropdown?.type === "editPlan" &&
                      editPlanType === "mealPlan" && (
                        <div className="dropdown-menu absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                          <div className="px-4 py-2 border-b border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-700">
                              Select desired meal plan
                            </h3>
                          </div>
                          <select
                            className="w-full px-4 py-2 text-sm text-gray-700 border-0 focus:outline-none focus:ring-2 focus:ring-red-800 rounded"
                            defaultValue="No Meal Plan"
                          >
                            <option>No Meal Plan</option>
                            <option>Standard Meal Plan</option>
                            <option>Premium Meal Plan</option>
                          </select>
                        </div>
                      )}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 wrap-break-words font-semibold ">
                  {leg.mealPlan?.name}
                </p>
              </div>

              {/* Crew Flight Reports Card */}
              <div className="bg-white rounded-lg p-3 xl:p-4 border border-gray-200 relative shadow-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xs sm:text-sm text-gray-700">
                    Crew Flight Reports
                  </h3>
                  <div className="relative dropdown-trigger">
                    <img src={CogIcon} className="h-5 w-5   cursor-pointer   " onClick={() => toggleDropdown(index, "crewFlightReports")} />

                    {openDropdown?.legIndex === index &&
                      openDropdown?.type === "crewFlightReports" && (
                        <Dropdown
                          actions={getViewAllAction("Crew Flight Reports", index)}
                          width="w-35"
                        />
                      )}
                  </div>
                </div>
                {Array(2).map((report: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 font-semibold"
                  >
                    <span className="text-blue-400"> <img src={NoteBookIcon} className="h-4 w-4 " />
                    </span>
                    <span className="wrap-break-words">{report}</span>
                  </div>
                ))}
              </div>

              {/* Alerts/Messages/Memos Card */}
              <div className="bg-white rounded-lg p-3 xl:p-4 border border-gray-200 relative shadow-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xs sm:text-sm text-gray-700">
                    Alerts/Messages/Memos
                  </h3>
                  <div className="relative dropdown-trigger">
                    <img src={CogIcon} className="h-5 w-5   cursor-pointer   " onClick={() => toggleDropdown(index, "alerts")} />

                    {openDropdown?.legIndex === index &&
                      openDropdown?.type === "alerts" && (
                        <Dropdown
                          actions={getViewAllAction(
                            "Alerts/Messages/Memos",
                            index
                          )}
                          width="w-35"
                        />
                      )}
                  </div>
                </div>
                {Array(2).map((alert: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 font-semibold"
                  >
                    <span className="text-gray-400"> <img src={WarningIcon} className="h-4 w-4 " />
                    </span>
                    <span className="wrap-break-words">{alert}</span>
                  </div>
                ))}
              </div>

              {/* Cut Off Times Card */}
              <div className="bg-white rounded-lg p-3 xl:p-4 border border-gray-200 relative shadow-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xs sm:text-sm text-gray-700">
                    Cut Off Times
                  </h3>
                  <div className="relative dropdown-trigger">
                    {openDropdown?.legIndex === index &&
                      openDropdown?.type === "cutOffTimes" && (
                        <Dropdown
                          actions={getViewAllAction("Cut Off Times", index)}
                          width="w-35"
                        />
                      )}
                  </div>
                </div>
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-gray-600 font-semibold">
                    <span><img src={ForkKnifeIcon} alt="" className="h-4 w-4" /></span>
                    <span className="wrap-break-words">
                      Meals -
                      {/* {leg.cutOffTimes.meals} */}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 font-semibold">
                    <span><img src={DatabaseIcon} alt="" className="h-4 w-4" /></span>
                    <span className="wrap-break-words">
                      Commissary -
                      {/* {leg.cutOffTimes.commissary} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )))}

      {/* Edit Flight Modal */}
      {selectedLegForEdit !== null && (
        <EditFlightModal
          isEditFlightModalOpen={isEditFlightModalOpen}
          selectedLegForEdit={selectedLegForEdit}
          setIsEditFlightModalOpen={setIsEditFlightModalOpen}
          setSelectedLegForEdit={setSelectedLegForEdit}
          legData={legs[selectedLegForEdit]}
        />
      )}
    </div>
  );
};

export default FlightLegsDisplay;
