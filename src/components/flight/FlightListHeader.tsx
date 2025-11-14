import React from "react";
import { Breadcrumb } from "../BreadCrumb";
import type { FlightFilters } from "../../types/Flight";
import {
  AirPlaneTakeOffThin,
  CheckCircleIconThin,
  ClockClockWise,
  PlayCircleThin,
  PlusCircle,
} from "../../assets/icons";

interface FlightHeaderProps {
  totalFlights?: number;
  completeFlights?: number;
  inProgressFlights?: number;
  waitingFlights?: number;
  onAddFlight?: () => void;
  onBack?: () => void;
  onFilterChange: (key: keyof FlightFilters, value: string) => void;
  currentFilters: FlightFilters;
}

const FlightHeader: React.FC<FlightHeaderProps> = ({
  totalFlights = 110,
  completeFlights = 48,
  inProgressFlights = 0,
  waitingFlights = 62,
  onAddFlight,
  onFilterChange,
  currentFilters,
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="bg-bg-surface px-4 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div className="flex flex-col gap-3 flex-1">
          {/* Breadcrumb and Add Flight Button */}
          <div className="flex items-center justify-between">
            <Breadcrumb currentScreen={"Flights"} handleDetailsNav={() => {}} />
            <button
              onClick={onAddFlight}
              className="flex h-8 w-34  items-center  justify-center bg-bg-secondary hover:bg-bg-tertiary gap-2 px-3 py-4.5 border border-border-muted rounded-xl text-sm font-normal text-gray-700  transition-colors"
            >
              <img src={PlusCircle} className=" h-5 w-5" />

              <span>Add Flight</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center">
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={currentFilters.station || ""}
                onChange={(e) => onFilterChange("station", e.target.value)}
                className="px-3 py-2 border border-gray-300 bg-white text-gray-700 text-sm rounded focus:outline-none  focus:border-bg-button w-28 appearance-none"
                style={{
                  backgroundImage: "none",
                }}
              >
                <option value="">Station</option>
                <option value="MCT">MCT</option>
                <option value="MNL">MNL</option>
                <option value="KUL">KUL</option>
                <option value="CAI">CAI</option>
              </select>

              <div className="relative w-36">
                <input
                  type="date"
                  value={currentFilters.date || ""}
                  onChange={(e) => onFilterChange("date", e.target.value)}
                  className="px-3 py-2 border border-gray-300 bg-white text-gray-700 text-sm rounded w-full focus:outline-none  focus:border-bg-button"
                />
              </div>

              <input
                type="text"
                value={currentFilters.flight || ""}
                onChange={(e) => onFilterChange("flight", e.target.value)}
                placeholder="Flight"
                className="px-3 py-2 border border-gray-300 bg-white text-gray-700 text-sm rounded w-28 focus:outline-none  focus:border-bg-button placeholder-gray-400"
              />

              <input
                type="text"
                value={currentFilters.acReg || ""}
                onChange={(e) => onFilterChange("acReg", e.target.value)}
                placeholder="AC Reg"
                className="px-3 py-2 border border-gray-300 bg-white text-gray-700 text-sm rounded w-28 focus:outline-none  focus:border-bg-button placeholder-gray-400"
              />

              <input
                type="text"
                value={currentFilters.acType || ""}
                onChange={(e) => onFilterChange("acType", e.target.value)}
                placeholder="AC Type"
                className="px-3 py-2 border border-gray-300 bg-white text-gray-700 text-sm rounded w-28 focus:outline-none  focus:border-bg-button placeholder-gray-400"
              />

              <input
                type="text"
                value={currentFilters.route || ""}
                onChange={(e) => onFilterChange("route", e.target.value)}
                placeholder="Route"
                className="px-3 py-2 border border-gray-300 bg-white text-gray-700 text-sm rounded w-28 focus:outline-none  focus:border-bg-button placeholder-gray-400"
              />

              <select
                value={currentFilters.client || ""}
                onChange={(e) => onFilterChange("client", e.target.value)}
                className="px-3 py-2 border border-gray-300 bg-white text-gray-700 text-sm rounded focus:outline-none  focus:border-bg-button w-28 appearance-none"
                style={{
                  backgroundImage: "none",
                }}
              >
                <option value="Oman">Oman Air</option>
                <option value="Dubai">Salam Air</option>
                <option value="Abu Dhabi">All</option>
              </select>
            </div>
            {/* Stats */}
            <div className="flex items-center gap-8 ml-auto">
              <div className="flex flex-col items-center">
                <div className="text-xl font-semibold text-gray-800">
                  {totalFlights}
                </div>
                <div className="flex items-center gap-1">
                  <img src={AirPlaneTakeOffThin} className=" h-5 w-5" />
                  <div className="text-xs text-gray-600">Flights</div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-xl font-semibold text-gray-800">
                  {completeFlights}
                </div>
                <div className="flex items-center gap-1">
                  <img src={CheckCircleIconThin} className=" h-5 w-5" />
                  <div className="text-xs text-gray-600">Complete</div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-xl font-semibold text-gray-800">
                  {inProgressFlights}
                </div>
                <div className="flex items-center gap-1">
                  <img src={PlayCircleThin} className=" h-5 w-5" />
                  <div className="text-xs text-gray-600">In Progress</div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-xl font-semibold text-gray-800">
                  {waitingFlights}
                </div>
                <div className="flex items-center gap-1">
                  <img src={ClockClockWise} className=" h-5 w-5" />
                  <div className="text-xs text-gray-600">Waiting</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightHeader;
