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
import Button from "../Button";
import { Field, FieldLabel, FieldContent } from "../Field";
import { CogIcon, AirPlaneTakeOffIcon, NoteBookIcon, WarningIcon, ForkKnifeIcon, DatabaseIcon } from "../../assets/icons";

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
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if click is on a cog icon or inside a dropdown
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

  const EditFlightModal = () => {

    if (!isEditFlightModalOpen) return null;

    const legData =
      selectedLegForEdit !== null && selectedLegForEdit >= 0
        ? legs[selectedLegForEdit]
        : null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-bg-surface rounded-lg shadow-xl w-full max-w-xl mx-4">
          {/* Header */}
          <div className="bg-orange-400 text-white px-6 py-2 rounded-t-lg">
            <h2 className="text-sm font-semibold text-center">Edit Mode</h2>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Row 1: Airline Code, Direction, Flight Type */}
            <div className="grid grid-cols-3 gap-2">
              <Field>
                <FieldLabel className="text-sm text-text-tertiary">
                  Airline Code
                </FieldLabel>
                <FieldContent>
                  <select className="w-full border border-border-muted rounded px-3 py-2 text-text-primary bg-bg-surface focus:outline-none focus:ring-2 focus:ring-border-accent">
                    <option>
                      {legData?.flightNumber.substring(0, 2) || "WY"}
                    </option>
                  </select>
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel className="text-sm text-text-tertiary">
                  Direction
                </FieldLabel>
                <FieldContent>
                  <select className="w-full border border-border-muted rounded px-3 py-2 text-text-primary bg-bg-surface focus:outline-none focus:ring-2 focus:ring-border-accent">
                    <option value="">Select</option>
                    <option value="Inbound">Inbound</option>
                    <option value="Outbound">Outbound</option>
                  </select>
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel className="text-sm text-text-tertiary">
                  Flight Type
                </FieldLabel>
                <FieldContent>
                  <div className="flex items-center gap-4 pt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="flightType"
                        value="J"
                        defaultChecked
                        className="text-bg-button focus:ring-bg-button"
                      />
                      <span className="text-text-primary">J</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="flightType"
                        value="P"
                        className="text-bg-button focus:ring-bg-button"
                      />
                      <span className="text-text-primary">P</span>
                    </label>
                  </div>
                </FieldContent>
              </Field>
            </div>

            {/* Row 2: Date, Departure Time, Arrival Time */}
            <div className="grid grid-cols-3 gap-2">
              <Field>
                <FieldLabel className="text-sm text-text-tertiary">
                  Date
                </FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <input
                      type="text"
                      defaultValue={legData?.date || "Oct 22"}
                      className="w-full border border-border-muted rounded px-3 py-2 text-text-primary bg-bg-surface focus:outline-none focus:ring-2 focus:ring-border-accent"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary">
                      📅
                    </span>
                  </div>
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel className="text-sm text-text-tertiary">
                  Departure Time
                </FieldLabel>
                <FieldContent>
                  <input
                    type="text"
                    defaultValue={legData?.depTime || "21:50"}
                    className="w-full border border-border-muted rounded px-3 py-2 text-text-primary bg-bg-surface focus:outline-none focus:ring-2 focus:ring-border-accent"
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel className="text-sm text-text-tertiary">
                  Arrival Time
                </FieldLabel>
                <FieldContent>
                  <input
                    type="text"
                    defaultValue={legData?.arrTime || "0:10"}
                    className="w-full border border-border-muted rounded px-3 py-2 text-text-primary bg-bg-surface focus:outline-none focus:ring-2 focus:ring-border-accent"
                  />
                </FieldContent>
              </Field>
            </div>

            {/* Row 3: Flight Number, Departure Airport, Arrival Airport */}
            <div className="grid grid-cols-3 gap-2">
              <Field>
                <FieldLabel className="text-sm text-text-tertiary">
                  Flight Number
                </FieldLabel>
                <FieldContent>
                  <input
                    type="text"
                    defaultValue={legData?.flightNumber.substring(2) || "673"}
                    className="w-full border border-border-muted rounded px-3 py-2 text-text-primary bg-bg-surface focus:outline-none focus:ring-2 focus:ring-border-accent"
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel className="text-sm text-text-tertiary">
                  Departure Airport
                </FieldLabel>
                <FieldContent>
                  <input
                    type="text"
                    defaultValue="MCT"
                    className="w-full border border-border-muted rounded px-3 py-2 text-text-primary bg-bg-surface focus:outline-none focus:ring-2 focus:ring-border-accent"
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel className="text-sm text-text-tertiary">
                  Arrival Airport
                </FieldLabel>
                <FieldContent>
                  <input
                    type="text"
                    defaultValue="JED"
                    className="w-full border border-border-muted rounded px-3 py-2 text-text-primary bg-bg-surface focus:outline-none focus:ring-2 focus:ring-border-accent"
                  />
                </FieldContent>
              </Field>
            </div>

            {/* Row 4: Aircraft Reg and PAX Count */}
            <div className="grid grid-cols-3 gap-2">
              <Field>
                <FieldLabel className="text-sm text-text-tertiary">
                  Aircraft Reg
                </FieldLabel>
                <FieldContent>
                  <select className="w-full border border-border-muted rounded px-3 py-2 text-text-primary bg-bg-surface focus:outline-none focus:ring-2 focus:ring-border-accent">
                    <option>{legData?.acReg || "A4OMP"}</option>
                  </select>
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel className="text-sm text-text-tertiary">
                  PAX Count
                </FieldLabel>
                <FieldContent>
                  <div className="grid grid-cols-4 gap-1">
                    <div className="flex flex-col">
                      <input
                        type="text"
                        defaultValue={legData?.businessStudio || "2"}
                        className="w-full border border-border-muted rounded px-3 py-2 text-center text-text-primary bg-bg-surface focus:outline-none focus:ring-2 focus:ring-border-accent"
                      />
                      <span className="text-[0.6rem] text-text-tertiary text-center mt-1">
                        Business Studio
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <input
                        type="text"
                        defaultValue={legData?.business || "153"}
                        className="w-full border border-border-muted rounded px-3 py-2 text-center text-text-primary bg-bg-surface focus:outline-none focus:ring-2 focus:ring-border-accent"
                      />
                      <span className="text-[0.6rem] text-text-tertiary text-center mt-1">
                        Business
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <input
                        type="text"
                        defaultValue={legData?.economy || "0"}
                        className="w-full border border-border-muted rounded px-3 py-2 text-center text-text-primary bg-bg-surface focus:outline-none focus:ring-2 focus:ring-border-accent"
                      />
                      <span className="text-[0.6rem] text-text-tertiary text-center mt-1">
                        Economy
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <input
                        type="text"
                        defaultValue={legData?.crew || "0"}
                        className="w-full border border-border-muted rounded px-3 py-2 text-center text-text-primary bg-bg-surface focus:outline-none focus:ring-2 focus:ring-border-accent"
                      />
                      <span className="text-[0.6rem] text-text-tertiary text-center mt-1">
                        Crew
                      </span>
                    </div>
                  </div>
                </FieldContent>
              </Field>
            </div>

            {/* Row 5: Manual Options */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-text-secondary">Manual Pairing</label>
                <input
                  type="radio"
                  className="w-5 h-5 text-bg-button focus:ring-bg-button"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-text-secondary">
                  Manual Loading Plan Selection
                </label>
                <input
                  type="radio"
                  className="w-5 h-5 text-bg-button focus:ring-bg-button"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-text-secondary">
                  Manual Meal Plan Selection
                </label>
                <input
                  type="radio"
                  className="w-5 h-5 text-bg-button focus:ring-bg-button"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-border-muted">
            <Button
              onClick={() => setIsEditFlightModalOpen(false)}
              className="px-6 py-2 bg-bg-secondary rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                console.log("Save clicked");
                setIsEditFlightModalOpen(false);
              }}
              className="px-6 py-2 bg-bg-button text-white rounded hover:opacity-90 transition-opacity"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 w-full font-rubik">
      <div className="flex justify-between items-center px-2">
        {isLoading ? (
          <div className="relative h-8 w-48 rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
          </div>
        ) : (
          <h2 className="text-xl md:text-2xl text-gray-700">Flights (2 Legs)</h2>
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
            className="bg-gray-50 rounded-xl shadow hover:border hover:border-gray-300 lg:min-w-0"
            onMouseEnter={() => setHoveredLeg(index)}
            onMouseLeave={() => setHoveredLeg(null)}
          >
            {/* Flight Header Row */}
            <div className="flex justify-between px-2 sm:px-4 py-3">
              <div className="flex gap-4 xl:gap-12 items-center text-xs xl:text-base overflow-x-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    Route
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600">
                    {leg.route}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    Flight #
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600 font-semibold">
                    {leg.flightNumber}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    Type
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600">
                    {leg.type}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    Date
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600 font-semibold">
                    {leg.date}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    DEP Time
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600 font-semibold">
                    {leg.depTime}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    ARR Time
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600">
                    {leg.arrTime}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    AC Type
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600">
                    {leg.acType}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    AC Reg
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600">
                    {leg.acReg}
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
                    {leg.business}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    Economy
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600">
                    {leg.economy}
                  </div>
                </div>
                {/* <div className="flex flex-col hidden">
                  <span className="text-[10px] xl:text-xs text-gray-500">
                    Crew
                  </span>
                  <div className="text-sm xl:text-xl text-gray-600">
                    {leg.crew}
                  </div>
                </div>
                <div className="flex flex-col">
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
                  <img src={AirPlaneTakeOffIcon} className="h-6 w-6 cursor-pointer" />

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
                  {leg.loadingPlan}
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
                  {leg.mealPlan}
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
                {leg.crewFlightReports.map((report: string, idx: number) => (
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
                {leg.alerts.map((alert: string, idx: number) => (
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
                      Meals - {leg.cutOffTimes.meals}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 font-semibold">
                    <span><img src={DatabaseIcon} alt="" className="h-4 w-4" /></span>
                    <span className="wrap-break-words">
                      Commissary - {leg.cutOffTimes.commissary}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )))}

      {/* Edit Flight Modal */}
      <EditFlightModal />
    </div>
  );
};

export default FlightLegsDisplay;
